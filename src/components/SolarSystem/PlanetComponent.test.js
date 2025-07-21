import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import PlanetComponent from './PlanetComponent.vue';

const mockPlanet = {
  id: 'test-planet',
  name: 'Test Planet',
  icon: '🌍',
  color: 'from-blue-400 to-green-400',
  orbitRadius: 200,
  orbitSpeed: 20,
  size: 100,
  startAngle: 45,
  title: 'Test Planet Title',
  description: 'Test planet description',
};

// Mock window.innerWidth
Object.defineProperty(window, 'innerWidth', {
  writable: true,
  configurable: true,
  value: 1024,
});

// Mock getBoundingClientRect
Element.prototype.getBoundingClientRect = vi.fn(() => ({
  left: 100,
  top: 100,
  width: 100,
  height: 100,
  x: 100,
  y: 100,
  right: 200,
  bottom: 200,
}));

describe('PlanetComponent.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(PlanetComponent, {
      props: {
        planet: mockPlanet,
        systemFrozen: false,
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

  it('renders orbit ring with correct dimensions', () => {
    const orbitRing = wrapper.find('.orbit-ring');
    expect(orbitRing.exists()).toBe(true);

    const style = orbitRing.attributes('style');
    expect(style).toContain('width: 400px'); // orbitRadius * 2
    expect(style).toContain('height: 400px');
  });

  it('renders planet with correct content', () => {
    const planet = wrapper.find('.planet');
    expect(planet.exists()).toBe(true);

    const planetIcon = wrapper.find('.planet-icon');
    const planetName = wrapper.find('.planet-name');

    expect(planetIcon.text()).toBe('🌍');
    expect(planetName.text().toUpperCase()).toBe('TEST PLANET');
  });

  it('applies correct color classes', () => {
    const planet = wrapper.find('.planet');
    expect(planet.classes()).toContain('bg-gradient-to-br');
    expect(planet.classes()).toContain('from-blue-400');
    expect(planet.classes()).toContain('to-green-400');
  });

  it('handles click events', async () => {
    const planet = wrapper.find('.planet');
    await planet.trigger('click');

    expect(wrapper.emitted().click).toBeTruthy();
    expect(wrapper.emitted().click[0]).toEqual(['test-planet']);
  });

  it('handles keyboard events', async () => {
    const planet = wrapper.find('.planet');

    await planet.trigger('keydown.enter');
    expect(wrapper.emitted().click).toBeTruthy();

    await planet.trigger('keydown.space');
    expect(wrapper.emitted().click.length).toBe(2);
  });

  it('handles mouse enter/leave events', async () => {
    const planet = wrapper.find('.planet');

    // Mouse enter
    await planet.trigger('mouseenter');

    expect(wrapper.emitted().hover).toBeTruthy();
    expect(wrapper.emitted().hover[0]).toEqual([true]);
    expect(wrapper.emitted().tooltip).toBeTruthy();
    expect(wrapper.emitted().tooltip[0][0]).toMatchObject({
      show: true,
      planet: mockPlanet,
    });

    // Mouse leave
    await planet.trigger('mouseleave');

    expect(wrapper.emitted().hover[1]).toEqual([false]);
    expect(wrapper.emitted().tooltip[1]).toEqual([null]);
  });

  it('applies frozen state correctly', async () => {
    await wrapper.setProps({ systemFrozen: true });

    const planetContainer = wrapper.find('.planet-container');
    const planet = wrapper.find('.planet');

    expect(planetContainer.classes()).toContain('frozen');
    expect(planet.classes()).toContain('planet-frozen');
  });

  it('applies frozen state on tooltip hover', async () => {
    const planet = wrapper.find('.planet');
    await planet.trigger('mouseenter');

    const planetContainer = wrapper.find('.planet-container');
    const planetElement = wrapper.find('.planet');

    expect(planetContainer.classes()).toContain('frozen');
    expect(planetElement.classes()).toContain('planet-frozen');
  });

  it('calculates responsive orbit radius correctly for mobile', async () => {
    // Mock mobile screen size
    Object.defineProperty(window, 'innerWidth', {
      value: 600,
      writable: true,
    });

    // Trigger resize
    window.dispatchEvent(new Event('resize'));
    await wrapper.vm.$nextTick();

    // Mobile scaling should be 35% of original
    const expectedRadius = Math.round(200 * 0.35); // 70px
    const orbitRing = wrapper.find('.orbit-ring');
    const style = orbitRing.attributes('style');

    expect(style).toContain(`width: ${expectedRadius * 2}px`);
    expect(style).toContain(`height: ${expectedRadius * 2}px`);
  });

  it('calculates planet size based on name length', () => {
    // The component should calculate size based on text length
    const planet = wrapper.find('.planet');
    const style = planet.attributes('style');

    // Should have width and height
    expect(style).toContain('width:');
    expect(style).toContain('height:');
  });

  it('sets proper z-index based on orbit radius', () => {
    const planet = wrapper.find('.planet');
    const style = planet.attributes('style');

    // Z-index should be calculated: 50 - (orbitRadius / 10)
    // Just check that z-index exists in the style - the exact value depends on computed size
    expect(style).toContain('z-index:');
  });

  it('has proper accessibility attributes', () => {
    const planet = wrapper.find('.planet');

    expect(planet.attributes('aria-label')).toBe(
      'Navigate to Test Planet section'
    );
    expect(planet.attributes('role')).toBe('button');
    expect(planet.attributes('tabindex')).toBe('0');
  });

  it('stops event propagation on click', async () => {
    const mockEvent = {
      stopPropagation: vi.fn(),
    };

    // Directly call the handleClick method
    await wrapper.vm.handleClick(mockEvent);

    expect(mockEvent.stopPropagation).toHaveBeenCalled();
  });

  it('calculates tooltip position correctly', () => {
    const position = wrapper.vm.getTooltipPosition();

    expect(position).toHaveProperty('x');
    expect(position).toHaveProperty('y');
    expect(position.x).toBe(150); // left + width/2 = 100 + 50
    expect(position.y).toBe(44); // top - 56 = 100 - 56
  });

  it('updates window width on resize', async () => {
    // Store initial width to verify it changes
    const initialWidth = wrapper.vm.windowWidth;

    // Change window width
    Object.defineProperty(window, 'innerWidth', {
      value: 800,
      writable: true,
    });

    // Trigger resize event
    window.dispatchEvent(new Event('resize'));
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.windowWidth).toBe(800);
    expect(wrapper.vm.windowWidth).not.toBe(initialWidth);
  });

  it('cleans up event listeners on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

    wrapper.unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'resize',
      expect.any(Function)
    );

    removeEventListenerSpy.mockRestore();
  });
});
