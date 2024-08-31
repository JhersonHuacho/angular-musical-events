export interface Genre {
  id?: number,
  name: string,
  status: boolean
}

export const emptyGenre : Genre = {
  id: 0,
  name: '',
  status: false
}

export interface GenrePostApiResponse {
  data: number;
  success: boolean;
  errorMessage: string;
}

export interface GenreGetApiResponse {
  data: GenreResponse[];
  success: boolean;
  errorMessage: string;
}

export interface GenreResponse {
  id: number,
  name: string,
  status: boolean
}
