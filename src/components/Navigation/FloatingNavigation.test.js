import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router';
import FloatingNavigation from './FloatingNavigation.vue';

// Mock the composable
vi.mock('@/composables/usePortfolioConfig', () => ({
  usePortfolioConfig: vi.fn(() => ({})),
  getSocialLinks: vi.fn(() => [
    {
      id: 'github',
      url: 'https://github.com/test',
      label: 'GitHub',
      icon: '🐙',
      iconType: 'emoji',
    },
    {
      id: 'linkedin',
      url: 'https://linkedin.com/test',
      label: 'LinkedIn',
      icon: '<svg>test</svg>',
      iconType: 'svg',
    },
  ]),
  getBrandAssets: vi.fn(() => ({ resume: '/test-resume.pdf' })),
}));

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: { template: '<div>Home</div>' } },
    {
      path: '/planet/:id',
      name: 'planet',
      component: { template: '<div>Planet</div>' },
    },
  ],
});

describe('FloatingNavigation.vue', () => {
  let wrapper;

  beforeEach(async () => {
    await router.push('/');
    wrapper = mount(FloatingNavigation, {
      global: {
        plugins: [router],
      },
    });
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('has correct navigation structure', () => {
    expect(wrapper.find('.nav-floating').exists()).toBe(true);
    expect(wrapper.find('.nav-content').exists()).toBe(true);
  });

  it('does not show home button when on home route', () => {
    expect(wrapper.find('.nav-home').exists()).toBe(false);
  });

  it('shows home button when not on home route', async () => {
    await router.push('/planet/test');
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.nav-home').exists()).toBe(true);
  });

  it('renders social links correctly', () => {
    const socialLinks = wrapper.findAll('.nav-link');
    expect(socialLinks.length).toBe(2);

    // Check first link (emoji)
    expect(socialLinks[0].attributes('href')).toBe('https://github.com/test');
    expect(socialLinks[0].attributes('aria-label')).toBe('GitHub');
    expect(socialLinks[0].find('.nav-icon-emoji').text()).toBe('🐙');

    // Check second link (svg)
    expect(socialLinks[1].attributes('href')).toBe('https://linkedin.com/test');
    expect(socialLinks[1].attributes('aria-label')).toBe('LinkedIn');
    expect(socialLinks[1].find('.nav-icon-svg').exists()).toBe(true);
  });

  it('renders resume button', () => {
    const resumeButton = wrapper.find('.nav-resume');
    expect(resumeButton.exists()).toBe(true);
    expect(resumeButton.text()).toBe('📄');
  });

  it('handles home navigation', async () => {
    await router.push('/planet/test');
    await wrapper.vm.$nextTick();

    const homeButton = wrapper.find('.nav-home');
    const routerPushSpy = vi.spyOn(router, 'push');

    await homeButton.trigger('click');

    // Wait for the timeout in handleGoHome
    await new Promise(resolve => setTimeout(resolve, 650));

    expect(routerPushSpy).toHaveBeenCalledWith('/');
  });

  it('shows navigation state during transition', async () => {
    await router.push('/planet/test');
    await wrapper.vm.$nextTick();

    const homeButton = wrapper.find('.nav-home');
    await homeButton.trigger('click');

    // Check immediate state after click
    expect(wrapper.vm.isNavigating).toBe(true);
    expect(homeButton.classes()).toContain('navigating');
    expect(homeButton.attributes('disabled')).toBe('');
  });

  it('downloads resume when resume button is clicked', () => {
    const windowOpenSpy = vi.spyOn(window, 'open').mockImplementation(() => {});

    const resumeButton = wrapper.find('.nav-resume');
    resumeButton.trigger('click');

    expect(windowOpenSpy).toHaveBeenCalledWith('/test-resume.pdf', '_blank');

    windowOpenSpy.mockRestore();
  });

  it('has proper accessibility attributes', () => {
    const homeButton = wrapper.find('.nav-home');
    if (homeButton.exists()) {
      expect(homeButton.attributes('aria-label')).toBe(
        'Return to solar system'
      );
    }

    const resumeButton = wrapper.find('.nav-resume');
    expect(resumeButton.attributes('aria-label')).toBe('Download resume');

    const socialLinks = wrapper.findAll('.nav-link');
    socialLinks.forEach(link => {
      expect(link.attributes('aria-label')).toBeDefined();
      expect(link.attributes('target')).toBe('_blank');
      expect(link.attributes('rel')).toBe('noopener noreferrer');
    });
  });
});
