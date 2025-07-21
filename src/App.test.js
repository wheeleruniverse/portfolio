import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';

// Mock components
const StarField = { template: '<div class="star-field-mock"></div>' };
const FloatingNavigation = {
  template: '<nav class="floating-navigation-mock"></nav>',
};

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: { template: '<div>Home</div>' } }],
});

describe('App.vue', () => {
  it('renders without crashing', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
        components: {
          StarField,
          FloatingNavigation,
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('has correct structure and classes', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
        components: {
          StarField,
          FloatingNavigation,
        },
      },
    });

    const appDiv = wrapper.find('#app');
    expect(appDiv.exists()).toBe(true);
    expect(appDiv.classes()).toContain('min-h-screen');
    expect(appDiv.classes()).toContain('bg-space-dark');
    expect(appDiv.classes()).toContain('relative');
    expect(appDiv.classes()).toContain('overflow-hidden');
  });

  it('renders StarField component', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
        components: {
          StarField,
          FloatingNavigation,
        },
      },
    });

    expect(wrapper.findComponent(StarField).exists()).toBe(true);
  });

  it('renders FloatingNavigation component', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
        components: {
          StarField,
          FloatingNavigation,
        },
      },
    });

    expect(wrapper.findComponent(FloatingNavigation).exists()).toBe(true);
  });

  it('renders RouterView', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
        components: {
          StarField,
          FloatingNavigation,
        },
      },
    });

    expect(wrapper.html()).toContain('Home');
  });
});
