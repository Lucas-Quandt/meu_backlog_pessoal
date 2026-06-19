export interface Game {
  id: string;
  title: string;
  coverUrl: string;
  platform: string;
  releaseYear: number;
  completedDate: string;
  hoursToComplete: number;
  rating: number;
  isPlatinum: boolean;
  completionCount?: number;
  isReplay?: boolean;
  notes?: string;
  watchCount?: number;
  isRewatch?: boolean;
}

export interface Movie {
  id: string;
  title: string;
  posterUrl: string;
  director: string;
  releaseYear: number;
  watchedDate: string;
  duration: number;
  rating: number;
  genre: string;
  notes?: string;
  watchCount?: number;
  isRewatch?: boolean;
}

export interface Series {
  id: string;
  title: string;
  bannerUrl: string;
  platform: string;
  releaseYear: number;
  totalSeasons: number;
  currentSeason: number;
  currentEpisode: number;
  totalEpisodes: number;
  status: 'watching' | 'completed' | 'paused';
  rating: number;
  genre: string;
  notes?: string;
  watchCount?: number;
  isRewatch?: boolean;
}

export interface Anime {
  id: string;
  title: string;
  coverUrl: string;
  studio: string;
  releaseYear: number;
  totalEpisodes: number;
  watchedEpisodes: number;
  status: 'watching' | 'completed' | 'paused';
  rating: number;
  type: 'TV' | 'Movie' | 'OVA' | 'ONA';
  notes?: string;
  watchCount?: number;
  isRewatch?: boolean;
}

export interface Book {
  id: string;
  title: string;
  coverUrl: string;
  author: string;
  releaseYear: number;
  totalPages: number;
  readPages: number;
  status: 'reading' | 'completed' | 'paused';
  rating: number;
  genre: string;
  startedDate?: string;
  completedDate?: string;
  notes?: string;
  watchCount?: number;
  isRewatch?: boolean;
}

export interface Comic {
  id: string;
  title: string;
  coverUrl: string;
  author: string;
  publisher: string;
  releaseYear: number;
  totalIssues: number;
  readIssues: number;
  status: 'reading' | 'completed' | 'paused';
  rating: number;
  type: 'Manga' | 'Comic' | 'Graphic Novel';
  notes?: string;
  watchCount?: number;
  isRewatch?: boolean;
}

export type Category = 'games' | 'movies' | 'series' | 'animes' | 'books' | 'comics';
export type SortOption = 'recent' | 'oldest' | 'mostHours' | 'leastHours' | 'rating';
export type FilterOption = 'all' | 'completed' | 'platinum';
