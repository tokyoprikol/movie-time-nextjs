export interface ImageResponse {
  backdrops: {
    file_path: string;
    width: string;
    height: string;
  }[];
  id: number;
  logos: {
    file_path: string;
    width: string;
    height: string;
  }[];
  posters: {
    file_path: string;
    width: string;
    height: string;
  }[];
}

export interface MediaResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface People {
  gender: number;
  id: number;
  known_for: {
    media_type: string;
    title?: string;
    name?: string;
  }[];
  name: string;
  profile_path: string;

  biography?: string;
  birthday?: string;
  deathday?: string;
  place_of_birth?: string;
}

export interface Movie {
  backdrop_path: string;
  poster_path: string;
  id: number;
  overview: string;
  title: string;
  release_date: string;
  vote_average: number;
  vote_count: number;

  genre_ids?: number[];
  genres?: Genre[];
  tagline?: string;
  release_dates?: {
    results: {
      iso_3166_1: string;
      release_dates: {
        certification: string;
      }[];
    }[];
  };
  runtime?: number;
  production_companies?: {
    name: string;
  }[];

  credits?: {
    cast: {
      cast_id: number;
      character: string;
      name: string;
      profile_path: string;
    }[];
  };

  status?: string;
  original_language?: string;
  budget?: number;
  revenue?: number;
  keywords: {
    keywords: { id: number; name: string }[];
  };

  reviews: {
    page: number;
    results: {
      author: string;
      author_details: {
        avatar_path: string;
        name: string;
        rating: number;
        username: string;
      };
      content: string;
      created_at: string;
      id: number;
    }[];
  };
}

export interface TvSeries {
  backdrop_path: string;
  poster_path: string;
  id: number;
  name: string;
  overview: string;
  first_air_date: string;
  vote_average: number;
  vote_count: number;

  genre_ids?: number[];
  genres?: Genre[];
  created_by?: {
    name: string;
  }[];
  number_of_episodes?: number;
  number_of_seasons?: number;
}

export interface Genre {
  id: number;
  name: string;
}
