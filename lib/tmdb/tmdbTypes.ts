export interface Params {
  params: Promise<{ id: string }>;
}

export interface MediaResponse<T> {
  page: number;
  results: T;
  total_pages: number;
  total_results: number;
}

interface ImageFile {
  file_path: string;
  width: number;
  height: number;
}

export interface GenresResponse {
  genres: {
    id: number;
    name: string;
  }[];
}

export interface Images {
  backdrops: ImageFile[];
  logos: ImageFile[];
  posters: ImageFile[];
}

export interface Videos {
  results: {
    id: string;
    key: string;
    name: string;
    site: string;
    type: string;
  }[];
}

export interface Review {
  id: string;
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string | null;
    rating: number;
  };
  content: string;
  created_at: string;
}

export interface Genres {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path?: string;
  origin_country?: string;
}

//-------------------------------- BASE TYPES ----------------------------------
interface BaseMediaListItem {
  media_type: "movie" | "tv";

  id: number;

  backdrop_path: string | null;
  poster_path: string | null;

  original_language: string;

  overview: string;

  popularity: number;
  vote_average: number;
  vote_count: number;

  genre_ids: number[];
}

interface BaseMediaDetails {
  media_type: "movie" | "tv";

  id: number;

  backdrop_path: string | null;
  poster_path: string | null;

  homepage?: string;
  original_language: string;

  overview: string;
  tagline: string | null;

  popularity: number;
  vote_average: number;
  vote_count: number;

  status: string;

  genres: Genres[];
  production_companies: ProductionCompany[];

  reviews: {
    results: Review[];
  };

  images: Images;

  videos: Videos;
}

//-------------------------------- MOVIE TYPES ----------------------------------
export interface MovieListItem extends BaseMediaListItem {
  media_type: "movie";

  title: string;
  release_date: string;
}

export interface MovieDetails extends BaseMediaDetails {
  media_type: "movie";

  title: string;
  release_date: string;

  runtime: number | null;

  budget: number;
  revenue: number;

  // APPEND_TO_RESPONSE TYPES
  credits: {
    cast: {
      id: number;
      name: string;
      character: string;
      profile_path: string | null;
    }[];
  };

  release_dates: {
    results: {
      iso_3166_1: string;
      release_dates: {
        certification: string;
      }[];
    }[];
  };

  keywords: {
    keywords: {
      id: number;
      name: string;
    }[];
  };
}

//-------------------------------- TV TYPES ----------------------------------
export interface TvListItem extends BaseMediaListItem {
  media_type: "tv";

  name: string;
  first_air_date: string;
}

export interface TvDetails extends BaseMediaDetails {
  media_type: "tv";

  name: string;
  first_air_date: string;
  last_air_date: string;

  created_by: {
    id: number;
    name: string;
    gender: number;
    profile_path: string | null;
  }[];

  // APPEND_TO_RESPONSE TYPES
  aggregate_credits: {
    cast: {
      id: number;
      name: string;
      profile_path: string | null;
      roles: {
        character: string;
        episode_count: number;
      }[];
    }[];
  };

  content_ratings: {
    results: {
      iso_3166_1: string;
      rating: string;
    }[];
  };

  keywords: {
    results: {
      id: number;
      name: string;
    }[];
  };
}

//-------------------------------- PEOPLE TYPES ----------------------------------s
export interface PersonListItem {
  id: number;
  name: string;

  gender: number;
  profile_path: string | null;

  popularity: number;
  known_for: (MovieListItem | TvListItem)[];
  known_for_department: string;
}

export interface PersonDetails {
  id: number;
  name: string;
  profile_path: string | null;

  biography: string;
  gender: number;

  place_of_birth: string;
  birthday: string | null;
  deathday: string | null;

  popularity: number;
  also_known_as: string[];
  known_for_department: string;

  combined_credits: {
    cast: ((MovieListItem | TvListItem) & {
      character: string;
    })[];
  };
}
