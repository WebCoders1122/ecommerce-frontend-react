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
  [key: string]: string;
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
  _sort: string;
  order: string;
};

type PaginationType = {
  [_page: string]: number;
  [_per_page: string]: number;
};

//cart feature
type ProductToAddType = {
  id?: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
  user: string;
};

//checkout page
type AddressType = {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  streetAddress: string;
  city: string;
  region: string;
  postalCode: number;
};

//order feat
type OrderType = {
  id?: string;
  userId: string;
  products: ProductToAddType[];
  totalPrice: number;
  totalProducts: number;
  address: AddressType;
  paymentMethod: string;
  status: string;
};

//user ffeat
type UserInfoType = {
  id: string;
  email: string;
  addresses?: AddressType[];
};
