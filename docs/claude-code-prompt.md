# Wheeler Universe Portfolio Website - Claude Code Prompt

## Project Overview

Create a modern, interactive portfolio website for Justin Wheeler (Wheeler Universe) with a space-themed solar system visualization. The portfolio should showcase professional achievements, certifications, and community contributions in an engaging, visually stunning way that stands out to potential employers.

## Design Requirements

### Brand Identity

- **Primary Color**: Deep purple (#4B1F8E or similar from the logo)
- **Secondary Colors**:
  - Peach/coral (#F4A460 or similar from the logo)
  - Gold/yellow accents for stars and highlights
  - Dark navy/black for space background
- **Typography**: Modern, clean fonts (consider Space Grotesk, Orbitron for headers, Inter for body)
- **Logo**: Include the provided Wheeler Universe logo with Saturn-like planet and stars

### Visual Concept - Interactive Solar System

- **Main View**: Animated solar system with orbiting planets
- **Planets** represent different career aspects:
  1. **AWS Planet** (largest) - All AWS certifications and cloud expertise
  2. **Development Planet** - Programming languages, frameworks, projects
  3. **Community Planet** - AWS Community Builder, speaking, writing
  4. **Experience Planet** - Work history and achievements
  5. **Education Planet** - Degrees and learning journey
  6. **Projects Planet** - GitHub projects, open source contributions

### Interactive Features

1. **3D Solar System Navigation**:
   - Planets orbit around central "Wheeler Universe" sun
   - Click/hover planets to see preview info
   - Click to "zoom into" planet for detailed view
   - Smooth transitions between views
   - Optional: Use Three.js for 3D effects or CSS 3D transforms

2. **Planet Detail Views**:
   - Each planet expands into a dedicated section
   - Smooth scroll or transition animation
   - "Return to orbit" button to go back to solar system

3. **Animations**:
   - Subtle star twinkling in background
   - Orbiting planets with varying speeds
   - Hover effects with glow/pulse
   - Smooth page transitions
   - Loading animation with rocket or satellite

## Tech Stack Requirements

- Vue 3 with Composition API
- TypeScript for type safety
- Tailwind CSS for styling
- Vite for fast builds
- Three.js or GSAP for advanced animations (optional)
- Intersection Observer for scroll animations
- Vue Router for navigation

## Content Structure

### Home/Solar System View

```
Welcome to the Wheeler Universe
[Interactive Solar System]
Quick Stats:
- 15+ AWS Certifications
- 8+ Years Experience
- AWS Community Builder
- 100% Remote
```

### AWS Planet Content

- Grid of all 15+ AWS certification badges
- Certification timeline visualization
- Key AWS skills and specialties
- Link to Credly profile

### Development Planet Content

- Programming language proficiency chart
- Tech stack visualization (Frontend/Backend/DevOps)
- Code statistics from GitHub
- Featured code snippets or algorithms

### Community Planet Content

- AWS Community Builder badge prominently displayed
- Blog post previews (fetch from DEV.to API if possible)
- Speaking engagements
- Virtual Coffee community involvement
- Red Monk interview mention

### Experience Planet Content

- Interactive timeline of positions
- Key achievements at each role
- Technologies used per position
- Impact metrics and accomplishments

### Projects Planet Content

- Featured projects carousel
- GitHub repository cards
- Live demo links
- Technology tags per project

### Education Planet Content

- Degree information
- Continuous learning journey
- Online courses and certifications

## Additional Features

### Navigation

- Floating space-themed navigation menu
- Quick access to all planets
- Social links (LinkedIn, GitHub, Blog, etc.)
- Download resume button

### Responsive Design

- Mobile: Simplified 2D planet view
- Tablet: Adaptive 2.5D view
- Desktop: Full 3D experience

### Performance

- Lazy load planet content
- Optimize images and animations
- Progressive enhancement
- Smooth 60fps animations

### Accessibility

- Keyboard navigation for all interactions
- ARIA labels for screen readers
- Reduced motion option
- High contrast mode support

### Special Effects

- Parallax star background
- Particle effects for space dust
- Comet or shooting star Easter eggs
- Planet glow effects on hover

## External Integrations

- Link to existing blog (wheeleruniverse.netlify.app)
- Linktree integration
- Wheeler Recommends project link
- Social media links

## SEO & Meta

- Proper meta tags for sharing
- Open Graph images
- Structured data for job seeking
- Sitemap generation

## Deployment

- Deploy to Netlify or Vercel
- Custom domain if available
- Analytics integration
- Performance monitoring

## File Structure

```
wheeler-universe-portfolio/
├── src/
│   ├── components/
│   │   ├── SolarSystem/
│   │   ├── Planets/
│   │   ├── Navigation/
│   │   └── common/
│   ├── views/
│   │   ├── HomeView.vue
│   │   └── PlanetViews/
│   ├── composables/
│   ├── assets/
│   │   ├── images/
│   │   └── styles/
│   └── router/
├── public/
└── [config files]
```

## Key Implementation Notes

1. Start with static solar system, add animations progressively
2. Use CSS Grid/Flexbox for responsive planet layouts
3. Implement smooth scroll behavior between sections
4. Add loading states for all async content
5. Consider using Suspense for async components
6. Implement error boundaries for robustness

## Inspiration & References

- NASA.gov for space aesthetics
- GitHub's contribution graph for activity visualization
- Apple's product pages for smooth scrolling
- Stripe's documentation for clean technical presentation

## Success Metrics

- Page load time under 3 seconds
- Smooth animations at 60fps
- All content accessible without JavaScript (progressive enhancement)
- 100% Lighthouse scores where possible

Please build this portfolio as a standout piece that will impress technical recruiters and hiring managers, emphasizing the space theme throughout while maintaining professionalism and showcasing technical excellence.
