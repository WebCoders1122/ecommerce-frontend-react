import axios, { AxiosResponse } from "axios";

export const fetchProductsBy__Query = async ({
  filters,
  sort,
  pagination,
}: {
  filters?: FilterOptionsType[];
  sort?: SortOptionsType;
  pagination?: PaginationType;
}) => {
  let queryString = "";
  filters?.map(item => {
    // todo: this should be corrected as per query search in real database
    for (const key in item) {
      if (key === "category") {
        queryString += `${key}=${item[key].split(" ").join("-").toLowerCase()}&`;
      } else {
        queryString += `${key}=${item[key].split(" ").join("%20")}&`;
      }
    }
  });
  //for adding sort options
  if (sort?._sort !== "") {
    queryString += `_sort=${sort?.order === "asc" ? sort?._sort : "-" + sort?._sort}&`;
  }
  // if (sort?.length) {
  //   sort?.map(item => {
  //     queryString += `sortBy=${item.sortBy}&order=${item.order}&`;
  //   });
  // }
  //for pagination
  for (const key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  const response: AxiosResponse = await axios.get(
    `http://localhost:8080/products?${queryString}`,
  );
  //todo: actual products when fetching from original server
  const totalItems: number = response.data.data.length;
  // const totalItems: AxiosResponse = await axios.get(
  //   `http://localhost:8080/total`,
  // );

  const data: {
    products: ProductType[];
    totalProducts: number;
  } = {
    products: response.data.data,
    totalProducts: totalItems,
  };
  return data;
};
export const fetchBrands = (): Promise<CategoryType[]> => {
  return new Promise(async resolve => {
    let response: AxiosResponse = await axios.get(
      `http://localhost:8080/brands`,
    );
    const data: CategoryType[] = response.data;
    resolve(data);
  });
};
export const fetchCategories = (): Promise<CategoryType[]> => {
  return new Promise(async resolve => {
    let response: AxiosResponse = await axios.get(
      `http://localhost:8080/category`,
    );
    const data: CategoryType[] = response.data;
    resolve(data);
  });
};

// for fecthing product by id
export const fetchProductById = (id: number): Promise<ProductType> => {
  return new Promise(async (resolve, reject) => {
    const response: AxiosResponse = await axios.get(
      `http://localhost:8080/products/${id}`,
    );
    const data: ProductType = response.data;
    if (data) {
      resolve(data);
    } else {
      reject("Product not found");
    }
  });
};
//todo: remove all un necessary console logs
