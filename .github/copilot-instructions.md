# Sporky - AI Coding Guidelines

## 🏗️ Architecture Overview

**4-Layer Architecture** (strict separation of concerns):

```
Components (UI) → Pages (orchestration) → Stores (business logic) → Composables (API + DTO mapping)
```

### Layer Responsibilities

- **Components**: UI only - display data, handle interactions, emit events
- **Pages**: Orchestration - call store methods, manage UI state
- **Stores**: Business logic - state management, data manipulation, validation
- **Composables**: API layer - HTTP requests, DTO mapping, error handling

## 🔑 Critical Patterns

### Authentication & API

```typescript
// Always use composables for API calls, never direct $fetch
const { getTopTracks } = useSpotifyApi();

// Cookie-based auth with Bearer tokens
const headers = { Authorization: `Bearer ${accessToken.value}` };
```

### Component Patterns

```typescript
// Props: Interface naming + destructuring (no withDefaults)
interface SongInfoProps {
  song: Track;
}
const { song } = defineProps<SongInfoProps>();

// Events: Interface naming + Nuxt 4 style
interface SongInfoEvents {
  'open-spotify': [url: string];
}
const emit = defineEmits<SongInfoEvents>();
```

### Store Patterns

```typescript
// Pinia composition API style
export const useSporky = defineStore('sporky-store', () => {
  const tracks = ref<Record<TimeRange, Track[]>>({
    /* ... */
  });
  const { getTopTracks: fetchTopTracks } = useSpotifyApi();

  const getTopTracks = async () => {
    const response = await fetchTopTracks(timeRange.value);
    tracks.value[timeRange.value] = response.items.map(mapTrackToSong);
  };

  return { tracks, getTopTracks };
});
```

### Track Enrichment

```typescript
// Automatic preview URL fetching when missing
const missingPreviewIds = songs.filter(s => !s.preview).map(s => /* extract ID */);
if (missingPreviewIds.length > 0) {
  const tracksResponse = await getTracks(missingPreviewIds);
  // Update songs with preview URLs
}
```

## 🎯 Spotify Integration

### OAuth Scopes

```typescript
const SPOTIFY_SCOPES =
  'user-top-read user-read-private user-read-email playlist-modify-public playlist-modify-private';
```

### Track Mapping

```typescript
// DTO → Domain mapping in composables
export function mapTrackToSong(track: TrackDetails): Track {
  return {
    name: track.name,
    artists: track.artists,
    album: track.album.name,
    cover: track.album.images[0].url,
    preview: track.preview_url, // May be null, gets enriched later
    url: track.uri, // Already in spotify:track:ID format
  };
}
```

## 🚀 Development Workflow

### HTTPS Development (Spotify OAuth requirement)

```bash
# Generate SSL certificates
yarn generate-cert

# Start HTTPS dev server
yarn dev
```

### Key Directories

- `composables/` - API layer + business logic hooks
- `stores/` - Pinia state management
- `components/` - UI components (pure, no API calls)
- `types/` - TypeScript interfaces
- `utils/` - Constants, mappers, helpers

### Error Handling

```typescript
// Centralized error handling in composables
const apiRequest = async <T>(endpoint: string) => {
  try {
    return await $fetch<T>(`${SPOTIFY_API_BASE}${endpoint}`, { headers });
  } catch (error) {
    throw {
      ...error,
      message: getErrorMessage(error),
      isUnauthorized: isUnauthorizedError(error),
    };
  }
};
```

## ⚡ Quick Commands

- `yarn dev` - HTTPS dev server (required for Spotify OAuth)
- `yarn generate-cert` - Create SSL certificates
- `yarn lint` - Format code with Prettier
- `yarn type-check` - TypeScript validation

## 🎵 Audio Player Integration

```typescript
// Store manages audio state
const currentTrack = ref<Track | null>(null);
const isPlaying = ref(false);

// Components use store refs
const { currentTrack, isPlaying } = storeToRefs(sporkyStore);
const sporkyStore = useSporky();

// Play/pause from UI
sporkyStore.playTrack(track);
sporkyStore.toggleAudio();
```

## 🔍 Key Files

- `stores/sporky.ts` - Main state management
- `composables/useSpotifyApi.ts` - Spotify API integration
- `utils/mapper.ts` - DTO → Domain mapping
- `utils/const.ts` - API endpoints, scopes, constants
- `components/AudioPlayer.vue` - Vinyl-style player widget</content>
  <parameter name="filePath">/Users/simonedalmas/source/sporky/.github/copilot-instructions.md
