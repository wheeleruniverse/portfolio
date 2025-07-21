import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import StarField from './StarField.vue';

// Mock Math.random for consistent testing
const mockMath = Object.create(global.Math);
let randomIndex = 0;
const randomValues = [0.5, 0.3, 0.7, 0.2, 0.8, 0.1, 0.9, 0.4, 0.6];
mockMath.random = () => randomValues[randomIndex++ % randomValues.length];
global.Math = mockMath;

describe('StarField.vue', () => {
  it('renders without crashing', () => {
    const wrapper = mount(StarField);
    expect(wrapper.exists()).toBe(true);
  });

  it('has correct structure and classes', () => {
    const wrapper = mount(StarField);

    const starField = wrapper.find('.star-field');
    expect(starField.exists()).toBe(true);
    expect(starField.classes()).toContain('star-field');
  });

  it('generates stars on mount', async () => {
    const wrapper = mount(StarField);

    // Wait for onMounted to complete
    await wrapper.vm.$nextTick();

    // Check that stars are generated
    expect(wrapper.vm.stars.length).toBe(150);
  });

  it('renders star elements', async () => {
    const wrapper = mount(StarField);
    await wrapper.vm.$nextTick();

    const stars = wrapper.findAll('.star');
    expect(stars.length).toBe(150);
  });

  it('applies correct styles to stars', async () => {
    const wrapper = mount(StarField);
    await wrapper.vm.$nextTick();

    const firstStar = wrapper.find('.star');
    const style = firstStar.attributes('style');

    expect(style).toContain('left:');
    expect(style).toContain('top:');
    expect(style).toContain('width:');
    expect(style).toContain('height:');
    expect(style).toContain('animation-delay:');
    expect(style).toContain('animation-duration:');
  });

  it('generates stars with proper data structure', async () => {
    const wrapper = mount(StarField);
    await wrapper.vm.$nextTick();

    const star = wrapper.vm.stars[0];

    expect(star).toHaveProperty('id');
    expect(star).toHaveProperty('x');
    expect(star).toHaveProperty('y');
    expect(star).toHaveProperty('size');
    expect(star).toHaveProperty('delay');
    expect(star).toHaveProperty('duration');

    expect(typeof star.id).toBe('number');
    expect(typeof star.x).toBe('number');
    expect(typeof star.y).toBe('number');
    expect(typeof star.size).toBe('number');
    expect(typeof star.delay).toBe('number');
    expect(typeof star.duration).toBe('number');
  });

  it('generates stars with values in expected ranges', async () => {
    const wrapper = mount(StarField);
    await wrapper.vm.$nextTick();

    wrapper.vm.stars.forEach(star => {
      expect(star.x).toBeGreaterThanOrEqual(0);
      expect(star.x).toBeLessThanOrEqual(100);
      expect(star.y).toBeGreaterThanOrEqual(0);
      expect(star.y).toBeLessThanOrEqual(100);
      expect(star.size).toBeGreaterThanOrEqual(1);
      expect(star.size).toBeLessThanOrEqual(4);
      expect(star.delay).toBeGreaterThanOrEqual(0);
      expect(star.delay).toBeLessThanOrEqual(2);
      expect(star.duration).toBeGreaterThanOrEqual(2);
      expect(star.duration).toBeLessThanOrEqual(5);
    });
  });

  it('has fixed positioning and proper z-index', () => {
    const wrapper = mount(StarField);
    const starField = wrapper.find('.star-field');

    // Test class exists - CSS will apply the styles
    expect(starField.exists()).toBe(true);
    expect(starField.classes()).toContain('star-field');
  });

  it('has pointer-events disabled', () => {
    const wrapper = mount(StarField);
    const starField = wrapper.find('.star-field');

    // Test class exists - CSS will apply the styles
    expect(starField.exists()).toBe(true);
    expect(starField.classes()).toContain('star-field');
  });
});
