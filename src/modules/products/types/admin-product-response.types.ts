export interface AdminProductTypeResponse {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  createdAt: Date;
}

export interface AdminProductResponse {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  productTypes: AdminProductTypeResponse[];
}

export interface PaginatedAdminProductResponse {
  data: AdminProductResponse[];
  meta: {
    totalItems: number;
    currentPage: number;
    totalPages: number;
    perPage: number;
  };
}
