export interface Concert {
  id: number,
  title: string,
  description: string,
  place: string,
  unitPrice: number,
  genre: string,
  genreId: number,
  dateEvent: string,
  timeEvent: string,
  imageUrl: string,
  ticketsQuantity: number,
  finalized: boolean,
  status: string
}

export const emptyConcert: Concert = {
  id: 0,
  title: '',
  description: '',
  place: '',
  unitPrice: 0,
  genre: '',
  genreId: 0,
  dateEvent: '',
  timeEvent: '',
  imageUrl: '',
  ticketsQuantity: 0,
  finalized: false,
  status: ''
}

//---- API

// POST
export interface ConcertPostApiResponse {
  data: number;
  success: boolean;
  errorMessage: string;
}
export interface ConcertPostApiRequest {
  title: string;
  description: string;
  place: string;
  unitPrice: number;
  genreId: number;
  dateEvent: string;
  timeEvent: string;
  imageUrl: string;
  imageName: string;
  imageFile: File;
  ticketsQuantity: number;
  status: boolean;
}
// GET
export interface ConcertGetApiResponse {
  data: ConcertGetApiResponseDto[];
  success: boolean;
  errorMessage: string;
}
export interface ConcertGetApiResponseDto {
  id?: number,
  title: string,
  description: string,
  place: string,
  unitPrice: number,
  genreId: number,
  genre: string,
  dateEvent: string,
  timeEvent: string,
  imageUrl: string,
  ticketsQuantity: number,
  finalized: boolean,
  status: boolean
}
