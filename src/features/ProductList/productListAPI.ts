import axios, { AxiosResponse } from "axios";

export const fetchProductsBy__Query = async ({
  filters,
  sort,
  pagination,
}: {
  filters?: FilterOptionsType[];
  sort?: SortOptionsType[];
  pagination?: PaginationType;
}) => {
  let queryString = "";
  filters?.map(item => {
    // todo: this should be corrected as per query search in real database
    item.key === "category"
      ? (queryString = `/category/${item.value}`)
      : (queryString = "/search?q" + "=" + item.value?.split(" ").join("-"));
  });
  //for adding sort options
  if (sort?.length) {
    sort?.map(item => {
      queryString += `sortBy=${item.sortBy}&order=${item.order}&`;
    });
  }
  //for pagination
  for (const key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  console.log(queryString);
  const response: AxiosResponse = await axios.get(
    `https://dummyjson.com/products?${queryString}`,
  );
  console.log(response.data.total);
  const data: {
    products: ProductType[];
    totalProducts: number;
  } = {
    products: response.data.products,
    totalProducts: response.data.total,
  };
  return data;
};

//todo: remove all un necessary console logs
