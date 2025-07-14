# Wheeler Universe Portfolio

A modern, interactive space-themed portfolio website showcasing Justin Wheeler's professional journey through the cosmos of cloud expertise, development skills, and community contributions.

## 🚀 Features

- **Interactive Solar System**: Navigate through different career aspects represented as planets
- **Space-themed Design**: Immersive visual experience with animated stars and cosmic elements
- **Responsive Design**: Optimized for all devices from mobile to desktop
- **TypeScript**: Full type safety and better developer experience
- **Modern Stack**: Built with Vue 3, Vite, and Tailwind CSS
- **Performance Optimized**: Fast loading with lazy loading and optimized assets

## 🌌 Planet Navigation

- **☁️ AWS Planet**: Cloud certifications and expertise
- **💻 Development Planet**: Programming skills and technologies
- **🤝 Community Planet**: Community contributions and involvement
- **🏢 Experience Planet**: Professional work history
- **🎓 Education Planet**: Learning journey and certifications
- **🚀 Projects Planet**: Portfolio projects and GitHub activity

## 🛠️ Tech Stack

- **Frontend**: Vue 3, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **Animations**: CSS animations and transitions
- **Icons**: Emojis and custom styling
- **Deployment**: Ready for Netlify/Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/justinwheeler/wheeler-universe-portfolio.git
cd wheeler-universe-portfolio
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## 🏗️ Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 📁 Project Structure

```
wheeler-universe-portfolio/
├── src/
│   ├── components/
│   │   ├── SolarSystem/       # Solar system components
│   │   ├── Planets/          # Individual planet components
│   │   ├── Navigation/       # Navigation components
│   │   └── common/          # Shared components
│   ├── views/               # Page components
│   ├── assets/             # Static assets
│   ├── types/              # TypeScript types
│   └── router/             # Vue Router configuration
├── public/                 # Public assets
└── [config files]
```

## 🎨 Customization

### Colors

The color scheme is defined in `tailwind.config.js`:

- Primary: Deep purple (#4B1F8E)
- Secondary: Coral (#F4A460)
- Accent: Gold (#FFD700)
- Background: Dark navy (#0B1426)

### Content

Update the content in each planet component:

- AWS certifications in `AWSPlanet.vue`
- Skills in `DevelopmentPlanet.vue`
- Community activities in `CommunityPlanet.vue`
- Work experience in `ExperiencePlanet.vue`
- Education in `EducationPlanet.vue`
- Projects in `ProjectsPlanet.vue`

## 🌟 Features in Detail

### Solar System Animation

- Realistic orbital mechanics with different speeds
- Hover effects and interactive tooltips
- Smooth transitions between views

### Responsive Design

- Mobile-first approach
- Adaptive layouts for different screen sizes
- Touch-friendly navigation

### Accessibility

- Keyboard navigation support
- Screen reader friendly
- High contrast options
- Semantic HTML structure

### Performance

- Lazy loading for components
- Optimized images and assets
- Minimal bundle size
- Fast loading times

## 🚀 Deployment

### Netlify

1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`

### Vercel

1. Import your GitHub repository
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript checks

## 🤝 Contributing

Feel free to submit issues and pull requests to improve the portfolio!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🌟 Inspiration

This portfolio was inspired by the vastness of space and the journey of exploration, mirroring the continuous learning and growth in the world of technology.

---

**Wheeler Universe** - Where technology meets the cosmos 🌌
