import type { Planet } from '@/types';
import { readonly, ref } from 'vue';

interface PortfolioConfig {
  personal: {
    name: string;
    title: string;
    tagline: string;
  };
  brand: {
    logo: string;
    resume: string;
  };
  social: Array<{
    id: string;
    platform: string;
    url: string;
    icon: string;
    iconType: 'emoji' | 'svg';
    label: string;
  }>;
  planets: Planet[];
  certifications: Array<{
    id: string;
    name: string;
    issuer: string;
    date: string;
    credlyUrl: string;
    description: string;
    vendor?: string;
    level?: string;
    issueDate?: string;
    expiryDate?: string;
  }>;
  experience: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    location: string;
    description: string;
    achievements: string[];
    technologies: string[];
  }>;
  projects: Array<{
    id: string;
    name: string;
    description: string;
    technologies: string[];
    githubUrl: string;
    liveUrl?: string;
    featured: boolean;
    category: string;
  }>;
  skills: {
    cloud: string[];
    programming: string[];
    frontend: string[];
    backend: string[];
    devops: string[];
  };
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    startDate: string;
    endDate: string;
    location: string;
    highlights: string[];
    icon?: string;
  }>;
  community: Array<{
    id: string;
    title: string;
    url: string;
    date: string;
    description: string;
  }>;
}

const config = ref<PortfolioConfig | null>(null);
const isLoading = ref(true);
const error = ref<string | null>(null);

let configPromise: Promise<void> | null = null;

const loadConfig = async (): Promise<void> => {
  if (configPromise) {
    return configPromise;
  }

  configPromise = (async () => {
    try {
      isLoading.value = true;
      error.value = null;

      const response = await fetch('/portfolio-config.json');
      if (!response.ok) {
        throw new Error(
          `Failed to load portfolio config: ${response.statusText}`
        );
      }

      config.value = await response.json();
    } catch (err) {
      error.value =
        err instanceof Error
          ? err.message
          : 'Failed to load portfolio configuration';
      console.error('Error loading portfolio config:', err);
    } finally {
      isLoading.value = false;
    }
  })();

  return configPromise;
};

export const usePortfolioConfig = () => {
  // Auto-load config on first use
  if (!config.value && !configPromise) {
    loadConfig();
  }

  return {
    config,
    isLoading: readonly(isLoading),
    error: readonly(error),
    loadConfig,
  };
};

// Helper functions to get specific data
export const getSocialLinks = () => config.value?.social || [];
export const getPlanets = () => config.value?.planets || [];
export const getBrandAssets = () => config.value?.brand;
export const getCertifications = () => config.value?.certifications || [];
export const getExperience = () => config.value?.experience || [];
export const getProjects = () => config.value?.projects || [];
export const getSkills = () => config.value?.skills;
export const getEducation = () => config.value?.education || [];
export const getCommunity = () => config.value?.community || [];
export const getPersonalInfo = () => config.value?.personal;
