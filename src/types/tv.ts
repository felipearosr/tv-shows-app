export interface TVShow {
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    vote_average: number;
    first_air_date: string;
  }
  
  export interface TVShowResponse {
    page: number;
    results: TVShow[];
    total_pages: number;
    total_results: number;
  }