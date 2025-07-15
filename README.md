# Sporky 🎵

A modern web application that displays your top Spotify tracks with beautiful visualizations and responsive design.

## ✨ Features

- 🎯 View your top tracks from different time periods (4 weeks, 6 months, 1 year)
- 🔐 Secure Spotify OAuth authentication
- 📱 Fully responsive design with Tailwind CSS
- ⚡ Fast and modern built with Nuxt 3 and Vue 3
- 🔄 Real-time loading states and error handling
- 🎨 Beautiful card-based track display with album artwork

## 🛠️ Tech Stack

- **Framework**: [Nuxt 3](https://nuxt.com/) - The intuitive Vue framework
- **Frontend**: [Vue 3](https://vuejs.org/) with Composition API
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **State Management**: [Pinia](https://pinia.vuejs.org/) - The Vue Store
- **Language**: TypeScript for type safety
- **API**: Spotify Web API integration

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or later)
- **npm** or **yarn**
- **Spotify Developer Account** ([Create one here](https://developer.spotify.com/dashboard/applications))

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/simone98dm/sporky.git
   cd sporky
   ```

2. **Install dependencies**

   ```bash
   yarn install
   # or
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Then edit `.env` with your Spotify app credentials:

   ```env
   NUXT_CLIENT_ID=your_spotify_client_id
   NUXT_CLIENT_SECRET=your_spotify_client_secret
   NUXT_BASE_URL=localhost:3000
   ```

4. **Generate SSL certificates** (required for Spotify OAuth)

   ```bash
   yarn generate-cert
   ```

5. **Configure your Spotify App**

   - Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications)
   - Create a new app or edit existing one
   - Add `https://localhost:3000/api/callback` to Redirect URIs

6. **Start the development server**

   ```bash
   yarn dev
   ```

   The app will be available at `https://localhost:3000`

## 📖 Usage

1. **Login**: Click "Login with Spotify" to authenticate
2. **Select Time Range**: Choose between short-term, medium-term, or long-term tracks
3. **Browse**: Scroll through your personalized top tracks
4. **Interact**: Click "Open" to view tracks in Spotify

## 🔧 Development

### Code Quality

```bash
# Linting
yarn lint              # Check for linting errors
yarn lint:fix          # Fix auto-fixable linting errors

# Formatting
yarn format            # Format code with Prettier

# Type checking
yarn type-check        # Run TypeScript type checking
```

### Project Structure

```
sporky/
├── components/          # Vue components
│   ├── ErrorMessage.vue
│   ├── LoadingSpinner.vue
│   ├── SongInfo.vue
│   └── TimeRangeSelector.vue
├── composables/         # Reusable composition functions
│   ├── useErrorHandler.ts
│   └── useSpotifyApi.ts
├── layouts/            # App layouts
├── middleware/         # Route middleware
├── pages/              # App pages (file-based routing)
├── server/             # Server-side API routes
├── stores/             # Pinia stores
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Spotify Web API](https://developer.spotify.com/documentation/web-api/) for providing access to music data
- [Nuxt.js](https://nuxt.com/) team for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first styling approach
