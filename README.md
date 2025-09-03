<<<<<<< HEAD
# Stavanger Twin - Digital Democracy Revolution

> **For the honor, not the glory—by the people, for the people.**

A rebellious, anti-establishment digital twin platform that empowers citizens and exposes corruption through blockchain-verified transparency. Built to revolutionize democracy in Stavanger, Norway.

## 🚀 Features

### Core Functionality
- **🗳️ Digital Voting**: Blockchain-verified voting with hCaptcha protection
- **👤 Politician Dossiers**: Comprehensive corruption tracking and transparency reports
- **📊 Policy Simulations**: Interactive data visualizations with Plotly charts
- **🎮 Gamification**: Badges, points, and streaks to encourage civic engagement
- **🔍 Transparency Reports**: Blockchain-verified data with full audit trails
- **📱 Offline Mode**: Service Workers for rural Norway access
- **🌍 Multi-language**: English, Swedish, and Norwegian support
- **🛡️ GDPR Compliant**: Minimal data collection with full privacy controls

### Technical Stack
- **Frontend**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS with custom anti-establishment theme
- **3D Graphics**: Three.js for interactive Stavanger maps
- **Charts**: Plotly.js for policy simulations
- **Blockchain**: Polygon integration for data verification
- **Database**: Supabase with PostGIS for geospatial data
- **Deployment**: Vercel-ready with PWA support

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/stavanger-twin.git
   cd stavanger-twin/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   # Edit .env.local with your actual values
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Homepage
│   │   ├── vote/              # Voting interface
│   │   ├── dossiers/          # Politician dossiers
│   │   ├── simulations/       # Policy simulations
│   │   ├── profile/           # User profile
│   │   ├── transparency/      # Blockchain transparency
│   │   ├── offline/           # Offline page
│   │   └── privacy/           # Privacy policy
│   ├── components/            # React components
│   │   ├── StavangerMap.tsx   # 3D map component
│   │   ├── PeoplePulse.tsx    # Live ticker
│   │   ├── CorruptionAlert.tsx # Corruption alerts
│   │   ├── GamificationSystem.tsx # Badges & points
│   │   ├── Navigation.tsx     # Main navigation
│   │   ├── LanguageSwitcher.tsx # Multi-language
│   │   └── GDPRConsentBanner.tsx # Privacy compliance
│   ├── lib/                   # Utilities
│   │   └── translations.ts    # Multi-language support
│   └── styles/                # Global styles
├── public/                    # Static assets
│   ├── sw.js                  # Service Worker
│   └── manifest.json          # PWA manifest
├── vercel.json               # Vercel deployment config
└── tailwind.config.ts        # Tailwind configuration
```

## 🎨 Design System

### Color Palette
- **Rebel Red** (`#ef4444`): Corruption alerts, urgent actions
- **Truth Blue** (`#0ea5e9`): Transparency, verification
- **People Green** (`#22c55e`): Positive actions, democracy
- **Corruption Gray** (`#1e293b`): Background, neutral elements

### Typography
- **Primary**: Inter (clean, modern)
- **Monospace**: JetBrains Mono (code, data)

### Components
- Dark mode by default (for the people who see through lies)
- Anti-establishment scrollbar styling
- Corruption pattern backgrounds
- People's power glow effects
- Truth reveal animations

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_HCAPTCHA_SITEKEY` | hCaptcha site key for voting | Yes |
| `NEXT_PUBLIC_POLYGON_RPC_URL` | Polygon blockchain RPC | Yes |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase database URL | Yes |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Mapbox token for maps | Optional |

### Tailwind Configuration
The project uses a custom Tailwind configuration with:
- Dark mode enabled by default
- Custom color palette
- Anti-establishment animations
- Responsive design utilities

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
   ```bash
   npm install -g vercel
   vercel login
   vercel
   ```

2. **Set environment variables** in Vercel dashboard

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📱 PWA Features

- **Offline Support**: Service Workers cache essential content
- **Install Prompt**: Users can install as a native app
- **Background Sync**: Offline actions sync when online
- **Push Notifications**: Corruption alerts and voting reminders

## 🔒 Security & Privacy

- **GDPR Compliant**: Minimal data collection with full consent controls
- **Blockchain Verification**: All votes and reports are cryptographically secured
- **No Tracking**: No analytics, no ads, no behavioral profiling
- **Open Source**: Full transparency in code and data handling

## 🌍 Internationalization

Supports three languages:
- **English** (en): Default language
- **Swedish** (sv): For Swedish-speaking users
- **Norwegian** (no): For Norwegian users

Language switching is available in the navigation bar.

## 🤝 Contributing

We welcome contributions from fellow democracy revolutionaries!

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Add tests** if applicable
5. **Commit with a clear message**
   ```bash
   git commit -m "Add feature: brief description"
   ```
6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Create a Pull Request**

### Code Style
- Use TypeScript for all new code
- Follow the existing component structure
- Add snarky comments targeting corrupt politicians
- Ensure accessibility for ages 18-80
- Test on mobile devices

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **The People**: For demanding transparency and accountability
- **Open Source Community**: For the amazing tools that make this possible
- **Stavanger Citizens**: For inspiring this digital democracy revolution

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-username/stavanger-twin/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/stavanger-twin/discussions)
- **Email**: support@stavanger-twin.no

---

**Remember**: *"We fight for the people, not the system. For the honor, not the glory—by the people, for the people."*

Built with ❤️ and rebellion in Norway.
=======
# stavanger-twin.
>>>>>>> 4cd701726a93d91267123308c344e5ce9d7dfe3e
