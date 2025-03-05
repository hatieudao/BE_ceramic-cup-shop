export interface RawProductResult {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  minPrice: string;
  maxPrice: string;
  imageUrls: string | null;
}

export interface ProductResponse {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  minPrice: number;
  maxPrice: number;
  imageUrls: string[];
}

export interface PaginatedProductResponse {
  data: ProductResponse[];
  meta: {
    totalItems: number;
    currentPage: number;
    totalPages: number;
    perPage: number;
  };
}
