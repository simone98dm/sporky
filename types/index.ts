export interface TrackDTO {
  items: TrackDetails[];
  total: number;
  limit: number;
  offset: number;
  previous: null;
  href: string;
  next: string;
}

export interface Track {
  name: string;
  artists: any[];
  album: string;
  cover: string;
  url: string;
  preview: string;
}

export interface TrackDetails {
  album: AlbumDTO;
  artists: ArtistDTO[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIDS;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: ItemType;
  uri: string;
}

export interface AlbumDTO {
  album_type: AlbumType;
  artists: ArtistDTO[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: ReleaseDatePrecision;
  total_tracks: number;
  type: AlbumTypeEnum;
  uri: string;
}

export enum AlbumType {
  Album = 'ALBUM',
  Compilation = 'COMPILATION',
  Single = 'SINGLE',
}

export interface ArtistDTO {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: ArtistType;
  uri: string;
}

export interface ExternalUrls {
  spotify: string;
}

export enum ArtistType {
  Artist = 'artist',
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

export enum ReleaseDatePrecision {
  Day = 'day',
  Month = 'month',
  Year = 'year',
}

export enum AlbumTypeEnum {
  Album = 'album',
}

export interface ExternalIDS {
  isrc: string;
}

export enum ItemType {
  Track = 'track',
}

export interface CreatePlaylistResponse {
  collaborative: any;
  description: any;
  external_urls: any;
  followers: any;
  href: any;
  id: any;
  images: any;
  name: any;
  owner: any;
  primary_color: any;
  _public: any;
  snapshot_id: any;
  tracks: any;
  type: any;
  uri: any;
}

export interface UserDTO {
  country: string;
  display_name: string;
  email: string;
  explicit_content: ExplicitContent;
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  images: Image[];
  product: string;
  type: string;
  uri: string;
}

export interface ExplicitContent {
  filter_enabled: boolean;
  filter_locked: boolean;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Followers {
  href: string;
  total: number;
}

export interface Image {
  url: string;
  height: number;
  width: number;
}

export interface OAuthTokens {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}
