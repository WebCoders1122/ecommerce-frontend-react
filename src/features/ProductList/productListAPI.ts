import axios, { AxiosResponse } from "axios";

export const fetchProductsBy__Query = async ({
  filters,
  sort,
}: {
  filters?: FilterOptionsType[];
  sort?: SortOptionsType[];
}) => {
  let queryString = "";
  filters?.map(item => {
    // todo: this should be corrected as per query search in real database
    item.key === "category"
      ? (queryString = `/category/${item.value}`)
      : (queryString = "/search?q" + "=" + item.value?.split(" ").join("-"));
    if (sort?.length) {
      sort?.map(item => {
        queryString += `&sortBy=${item.sortBy}&order=${item.order}`;
      });
    }
  });
  console.log(queryString);
  const response: AxiosResponse = await axios.get(
    `https://dummyjson.com/products${queryString}`,
  );
  return response.data.products;
};

//todo: remove all un necessary console logs
