type ProductType = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: { width: number; height: number; depth: number };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
};

type Review = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

type CategoryType = { value: string; label: string; checked: boolean };

type FilterOptionsType = {
  key: string;
  value: string;
};

type SortType = {
  name: string;
  query: string;
  order: string;
  current: boolean;
};

type FiltersType = {
  id?: string;
  name: string;
  options: CategoryType[];
}[];

type SortOptionsType = {
  sortBy: string;
  order: string;
};

type PaginationType = {
  [skip: string]: number;
  [limit: string]: number;
};
