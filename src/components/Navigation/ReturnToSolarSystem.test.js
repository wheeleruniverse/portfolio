import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router';
import ReturnToSolarSystem from './ReturnToSolarSystem.vue';

// Mock window properties
Object.defineProperty(window, 'innerHeight', {
  writable: true,
  configurable: true,
  value: 800,
});

Object.defineProperty(window, 'scrollY', {
  writable: true,
  configurable: true,
  value: 0,
});

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: { template: '<div>Home</div>' } },
    { path: '/planet/:id', component: { template: '<div>Planet</div>' } },
  ],
});

describe('ReturnToSolarSystem.vue', () => {
  let wrapper;

  beforeEach(async () => {
    await router.push('/planet/test');
    wrapper = mount(ReturnToSolarSystem, {
      global: {
        plugins: [router],
      },
    });
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
    // Clean up any scroll listeners
    window.scrollY = 0;
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('has correct structure', () => {
    expect(wrapper.find('.return-to-solar-system').exists()).toBe(true);
    expect(wrapper.find('.return-button').exists()).toBe(true);
  });

  it('initially is not visible', () => {
    const button = wrapper.find('.return-button');
    expect(button.classes()).not.toContain('visible');
    expect(wrapper.vm.isVisible).toBe(false);
  });

  it('shows when scrolled down more than half screen', async () => {
    // Mock scroll position
    Object.defineProperty(window, 'scrollY', { value: 500 });

    // Call handleScroll directly since it's hard to trigger scroll in tests
    wrapper.vm.handleScroll();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.isVisible).toBe(true);
    expect(wrapper.find('.return-button').classes()).toContain('visible');
  });

  it('hides when scrolled up', async () => {
    // First show the button
    Object.defineProperty(window, 'scrollY', { value: 500 });
    wrapper.vm.handleScroll();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isVisible).toBe(true);

    // Then scroll up
    Object.defineProperty(window, 'scrollY', { value: 100 });
    wrapper.vm.handleScroll();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.isVisible).toBe(false);
    expect(wrapper.find('.return-button').classes()).not.toContain('visible');
  });

  it('renders correct content when not navigating', () => {
    const returnContent = wrapper.find('.return-content');
    expect(returnContent.exists()).toBe(true);

    expect(wrapper.find('.return-icon').text()).toBe('🚀');
    expect(wrapper.find('.return-text').text()).toBe('Solar System');

    expect(wrapper.find('.loading-content').exists()).toBe(false);
  });

  it('renders loading content when navigating', async () => {
    // Trigger navigation to set state
    const button = wrapper.find('.return-button');
    await button.trigger('click');

    // Check state immediately after click
    expect(wrapper.vm.isNavigating).toBe(true);
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.return-content').exists()).toBe(false);
    expect(wrapper.find('.loading-content').exists()).toBe(true);
    expect(wrapper.find('.spinner').exists()).toBe(true);
    expect(wrapper.find('.loading-text').text()).toBe('Returning...');
  });

  it('handles return to solar system navigation', async () => {
    const routerPushSpy = vi.spyOn(router, 'push');
    const button = wrapper.find('.return-button');

    await button.trigger('click');

    expect(wrapper.vm.isNavigating).toBe(true);

    // Wait for the timeout
    await new Promise(resolve => setTimeout(resolve, 650));

    expect(routerPushSpy).toHaveBeenCalledWith('/');
  });

  it('applies navigating class when navigating', async () => {
    // Trigger navigation to set state
    const button = wrapper.find('.return-button');
    await button.trigger('click');

    expect(wrapper.vm.isNavigating).toBe(true);
    await wrapper.vm.$nextTick();

    expect(button.classes()).toContain('navigating');
    expect(button.attributes('disabled')).toBe('');
  });

  it('resets navigation state on route change', async () => {
    wrapper.vm.isNavigating = true;

    await router.push('/');
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.isNavigating).toBe(false);
  });

  it('adds and removes page transition class', async () => {
    const addClassSpy = vi.spyOn(document.body.classList, 'add');
    const removeClassSpy = vi.spyOn(document.body.classList, 'remove');

    const button = wrapper.find('.return-button');
    await button.trigger('click');

    expect(addClassSpy).toHaveBeenCalledWith('page-transitioning');

    // Route change should remove the class
    await router.push('/');
    await wrapper.vm.$nextTick();

    expect(removeClassSpy).toHaveBeenCalledWith('page-transitioning');

    addClassSpy.mockRestore();
    removeClassSpy.mockRestore();
  });

  it('adds scroll event listener on mount', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');

    mount(ReturnToSolarSystem, {
      global: { plugins: [router] },
    });

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function)
    );

    addEventListenerSpy.mockRestore();
  });

  it('removes scroll event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const removeClassSpy = vi.spyOn(document.body.classList, 'remove');

    wrapper.unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function)
    );
    expect(removeClassSpy).toHaveBeenCalledWith('page-transitioning');

    removeEventListenerSpy.mockRestore();
    removeClassSpy.mockRestore();
  });

  it('has proper accessibility attributes', () => {
    const button = wrapper.find('.return-button');
    expect(button.attributes('title')).toBe('Return to Solar System');
  });

  it('calculates scroll threshold correctly', () => {
    // Window height is 800, so threshold should be 400
    Object.defineProperty(window, 'scrollY', { value: 399 });
    wrapper.vm.handleScroll();
    expect(wrapper.vm.isVisible).toBe(false);

    Object.defineProperty(window, 'scrollY', { value: 401 });
    wrapper.vm.handleScroll();
    expect(wrapper.vm.isVisible).toBe(true);
  });
});
