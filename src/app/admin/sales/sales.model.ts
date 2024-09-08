import { Sale } from '../../shared/models/sale.model';

export interface SalesApiResponse {
  data: Sale[];
  success: boolean;
  errorMessage: string;
}

export interface FormattedDataModel {
  client: string;
  event: string;
  tickets: number;
  total: number;
  eventDate: string;
  saleDate: string;
  genre: string;
}
// get
export interface SalesCustomerApiResponse {
  data: SaleResponseDto[];
  success: boolean;
  errorMessage: string;
}
export interface SaleResponseDto {
  saleId: number
  dateEvent: string
  timeEvent: string
  genre: string
  imageUrl: string
  title: string
  operationNumber: string
  fullName: string
  quantity: number
  saleDate: string
  total: number
}
