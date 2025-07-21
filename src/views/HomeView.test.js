import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { ref } from 'vue';
import HomeView from './HomeView.vue';

// Mock data
const mockCertifications = [
  { id: 1, name: 'AWS Solution Architect', expiryDate: '2025-12-31' },
  { id: 2, name: 'Azure Developer', expiryDate: '2024-01-01' }, // Expired
  { id: 3, name: 'Google Cloud Professional', expiryDate: null }, // No expiry
];

// Mock the composable with proper reactive ref
vi.mock('@/composables/usePortfolioConfig', () => ({
  usePortfolioConfig: vi.fn(() => ({
    config: ref({ certifications: mockCertifications }),
  })),
}));

// Mock SolarSystem component
const SolarSystem = {
  emits: ['system-frozen'],
  template:
    '<div class="solar-system-mock" @click="$emit(\'system-frozen\', true)">Solar System</div>',
};

describe('HomeView.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(HomeView, {
      global: {
        components: {
          SolarSystem,
        },
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

  it('has correct structure', () => {
    expect(wrapper.find('.home-view').exists()).toBe(true);
    expect(wrapper.find('.hero-section').exists()).toBe(true);
    expect(wrapper.findComponent(SolarSystem).exists()).toBe(true);
  });

  it('renders main title', () => {
    const title = wrapper.find('h1');
    expect(title.text()).toBe('Wheeler Universe');
    expect(title.classes()).toContain('text-6xl');
    expect(title.classes()).toContain('font-orbitron');
    expect(title.classes()).toContain('text-space-gold');
  });

  it('renders description', () => {
    const description = wrapper.find('p');
    expect(description.text()).toContain(
      'Explore the cosmos of cloud expertise'
    );
    expect(description.classes()).toContain('text-xl');
    expect(description.classes()).toContain('text-gray-300');
  });

  it('renders stats grid', () => {
    const statsGrid = wrapper.find('.stats-grid');
    expect(statsGrid.exists()).toBe(true);

    const statCards = wrapper.findAll('.stat-card');
    expect(statCards.length).toBe(4);
  });

  it('displays correct certification count', () => {
    const statCards = wrapper.findAll('.stat-card');
    const certificationCard = statCards.find(
      card => card.find('.stat-label').text() === 'Active Certifications'
    );

    expect(certificationCard.exists()).toBe(true);
    // Should count active certifications: AWS (active), Azure (expired), Google (no expiry)
    // So 2 active certifications
    expect(certificationCard.find('.stat-number').text()).toBe('2');
  });

  it('displays other stats correctly', () => {
    const statCards = wrapper.findAll('.stat-card');

    // Years Experience
    const experienceCard = statCards.find(
      card => card.find('.stat-label').text() === 'Years Experience'
    );
    expect(experienceCard.find('.stat-number').text()).toBe('8+');

    // Remote
    const remoteCard = statCards.find(
      card => card.find('.stat-label').text() === 'Remote'
    );
    expect(remoteCard.find('.stat-number').text()).toBe('100%');

    // Community Builder
    const communityCard = statCards.find(
      card => card.find('.stat-label').text() === 'Builder'
    );
    expect(communityCard.find('.stat-number').text()).toBe('Community');
  });

  it('handles system frozen event', async () => {
    const solarSystem = wrapper.findComponent(SolarSystem);

    // Emit system-frozen event
    await solarSystem.vm.$emit('system-frozen', true);

    expect(wrapper.vm.isSystemFrozen).toBe(true);
    expect(wrapper.find('.home-view').classes()).toContain('system-frozen');
  });

  it('correctly identifies active certifications', () => {
    const activeWithExpiry = wrapper.vm.isActiveCertification({
      expiryDate: '2025-12-31',
    });
    expect(activeWithExpiry).toBe(true);

    const expiredCert = wrapper.vm.isActiveCertification({
      expiryDate: '2024-01-01',
    });
    expect(expiredCert).toBe(false);

    const noExpiryCert = wrapper.vm.isActiveCertification({
      expiryDate: null,
    });
    expect(noExpiryCert).toBe(true);
  });

  it('calculates total certifications correctly', () => {
    // Test the calculation logic - should count non-expired certs
    // AWS: 2025-12-31 (active), Azure: 2024-01-01 (expired), Google: null (active)
    // So should be 2 active certifications
    expect(wrapper.vm.totalCertifications).toBe(2);
  });

  it('handles empty certifications config', async () => {
    // Mock empty certifications
    vi.mocked(
      await import('@/composables/usePortfolioConfig')
    ).usePortfolioConfig.mockReturnValue({
      config: { value: { certifications: [] } },
    });

    const emptyWrapper = mount(HomeView, {
      global: {
        components: { SolarSystem },
      },
    });

    expect(emptyWrapper.vm.totalCertifications).toBe(0);

    emptyWrapper.unmount();
  });

  it('applies correct responsive classes', () => {
    const title = wrapper.find('h1');
    expect(title.classes()).toContain('md:text-8xl');

    const description = wrapper.find('p');
    expect(description.classes()).toContain('md:text-2xl');

    const statsGrid = wrapper.find('.stats-grid');
    expect(statsGrid.classes()).toContain('md:grid-cols-4');
  });
});
