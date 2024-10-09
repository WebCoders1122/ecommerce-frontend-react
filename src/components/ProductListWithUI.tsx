import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
  StarIcon,
} from "@heroicons/react/20/solid";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchBrandsAsync,
  fetchCategoriesAsync,
  fetchProductsByQuery,
  selectAllProducts,
  selectBrands,
  selectCategories,
  selectTotalProducts,
} from "../features/ProductList/productListSlice";
import { AppDispatch } from "../app/store";
import { ITEMS_PER_PAGE } from "../app/constants";
import { Link } from "react-router-dom";

// options and fitlers of sidebars
const sortOptions: SortType[] = [
  // { name: "Most Popular", href: "#", current: true },
  // { name: "Best Rating", href: "#", current: false },
  // { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", query: "price", order: "asc", current: false },
  { name: "Price: High to Low", query: "price", order: "desc", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const ProductListWithUI = () => {
  //state to hold sort options
  const [filterOptions, setFilterOptions] = useState<FilterOptionsType[]>([]);
  const [sortQuery, setSortQuery] = useState<SortOptionsType>({
    _sort: "",
    order: "",
  });
  // this is product data
  const products: ProductType[] = useSelector(selectAllProducts);
  //unique brands and categroies
  const brands: CategoryType[] = useSelector(selectBrands);
  const categories: CategoryType[] = useSelector(selectCategories);
  //dispatch
  // todo: remove
  console.log(brands);
  const dispatch: AppDispatch = useDispatch();
  const filters: {
    id: string;
    name: string;
    options: CategoryType[];
  }[] = [
    {
      id: "category",
      name: "Category",
      options: categories,
    },
    {
      id: "brand",
      name: "Brands",
      options: brands,
    },
    // {
    //   id: "color",
    //   name: "Color",
    //   options: [
    //     { value: "white", label: "White", checked: false },
    //     { value: "beige", label: "Beige", checked: false },
    //     { value: "blue", label: "Blue", checked: true },
    //     { value: "brown", label: "Brown", checked: false },
    //     { value: "green", label: "Green", checked: false },
    //     { value: "purple", label: "Purple", checked: false },
    //   ],
    // },
  ];
  // to handle mobile sidebar
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  // to handle sort options
  const handleChangeFilter = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log("filter");
    // todo:uncomment the code for server-side multi values search
    let newFilterOptions: FilterOptionsType[] = [];
    if (!e.target.checked) {
      //todo: check this logic
      newFilterOptions = filterOptions.filter(item => {
        for (const key in item) {
          return item[key] !== e.target.value;
        }
      });
    } else {
      newFilterOptions = [
        ...filterOptions,
        { [(e.target as HTMLInputElement).name]: e.target.value },
      ];
    }
    setFilterOptions(newFilterOptions);
    setPage(1);
    dispatch(
      fetchProductsByQuery({ filters: newFilterOptions, sort: sortQuery }),
    );
  };
  const handleSort = (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
    option: SortType,
  ): void => {
    console.log("sort;");
    let newSortOptions = { _sort: option.query, order: option.order };
    setSortQuery(newSortOptions);
    setPage(1);
    dispatch(
      fetchProductsByQuery({ filters: filterOptions, sort: newSortOptions }),
    );
  };

  // ==== this is for pagination
  //for pagination
  const [page, setPage] = useState<number>(1);
  //getting total products and products
  const totalProducts: number = useSelector(selectTotalProducts);
  //useEffect for pagination
  useEffect(() => {
    const paginationOptions: PaginationType = {
      _page: page,
      _per_page: ITEMS_PER_PAGE,
    };
    dispatch(
      fetchProductsByQuery({
        filters: filterOptions,
        sort: sortQuery,
        pagination: paginationOptions,
      }),
    );
  }, [page, filterOptions, sortQuery]);

  // to fetch brands and categories
  useEffect(() => {
    dispatch(fetchBrandsAsync());
    dispatch(fetchCategoriesAsync());
  }, []);
  // console.log("effect", page, filterOptions, sortQuery);

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <MobileFilters
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
          filters={filters}
          handleChangeFilter={handleChangeFilter}
        />

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              New Arrivals
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  {/* sort options start */}
                  <div className="py-1">
                    {sortOptions.map(option => (
                      <MenuItem key={option.name}>
                        <p
                          onMouseDownCapture={e => handleSort(e, option)}
                          className={classNames(
                            option.current
                              ? "font-medium text-gray-900"
                              : "text-gray-500",
                            "block px-4 py-2 text-sm data-[focus]:bg-gray-100",
                          )}
                        >
                          {option.name}
                        </p>
                      </MenuItem>
                    ))}
                  </div>
                  {/* sort options end */}
                </MenuItems>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon aria-hidden="true" className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <DesktopFilters
                filters={filters}
                handleChangeFilter={handleChangeFilter}
              />

              {/* Product grid */}
              <div className="lg:col-span-3">
                <ProductList products={products} />
              </div>
            </div>
          </section>
          <Pagination
            page={page}
            setPage={setPage}
            totalProducts={totalProducts}
          />
        </main>
      </div>
    </div>
  );
};
export default ProductListWithUI;

const MobileFilters = ({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  filters,
  handleChangeFilter,
}: {
  mobileFiltersOpen: boolean;
  setMobileFiltersOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filters: {
    id: string;
    name: string;
    options: CategoryType[];
  }[];
  handleChangeFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <Dialog
      open={mobileFiltersOpen}
      onClose={setMobileFiltersOpen}
      className="relative z-40 lg:hidden"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 z-40 flex">
        <DialogPanel
          transition
          className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
        >
          <div className="flex items-center justify-between px-4">
            <h2 className="text-lg font-medium text-gray-900">Filters</h2>
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(false)}
              className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>

          {/* Filters */}
          <form className="mt-4 border-t border-gray-200">
            {filters.map(section => (
              <Disclosure
                key={section.id}
                as="div"
                className="border-t border-gray-200 px-4 py-6"
              >
                <h3 className="-mx-2 -my-3 flow-root">
                  <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                    <span className="font-medium text-gray-900">
                      {section.name}
                    </span>
                    <span className="ml-6 flex items-center">
                      <PlusIcon
                        aria-hidden="true"
                        className="h-5 w-5 group-data-[open]:hidden"
                      />
                      <MinusIcon
                        aria-hidden="true"
                        className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                      />
                    </span>
                  </DisclosureButton>
                </h3>
                {/* mobile menu start */}
                <DisclosurePanel className="pt-6">
                  <div className="space-y-6">
                    {section.options.map((option, optionIdx) => (
                      <div key={option.value} className="flex items-center">
                        <input
                          defaultValue={option.value}
                          defaultChecked={option.checked}
                          id={`filter-mobile-${section.id}-${optionIdx}`}
                          name={`${section.id}`}
                          onChange={handleChangeFilter}
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label
                          htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                          className="ml-3 min-w-0 flex-1 text-gray-500"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </DisclosurePanel>
                {/* mobile menu end */}
              </Disclosure>
            ))}
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

const DesktopFilters = ({
  filters,
  handleChangeFilter,
}: {
  filters: {
    id: string;
    name: string;
    options: CategoryType[];
  }[];
  handleChangeFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <form className="hidden lg:block">
      {filters.map(section => (
        <Disclosure
          key={section.id}
          as="div"
          className="border-b border-gray-200 py-6"
        >
          <h3 className="-my-3 flow-root">
            <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
              <span className="font-medium text-gray-900">{section.name}</span>
              <span className="ml-6 flex items-center">
                <PlusIcon
                  aria-hidden="true"
                  className="h-5 w-5 group-data-[open]:hidden"
                />
                <MinusIcon
                  aria-hidden="true"
                  className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                />
              </span>
            </DisclosureButton>
          </h3>
          <DisclosurePanel className="pt-6">
            <div className="space-y-4">
              {section.options.map((option, optionIdx) => (
                <div key={option.value} className="flex items-center">
                  <input
                    defaultValue={option.value}
                    defaultChecked={option.checked}
                    id={`filter-${section.id}-${optionIdx}`}
                    name={`${section.id}`}
                    onChange={handleChangeFilter}
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor={`filter-${section.id}-${optionIdx}`}
                    className="ml-3 text-sm text-gray-600"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </DisclosurePanel>
        </Disclosure>
      ))}
    </form>
  );
};
const Pagination = ({
  page,
  setPage,
  totalProducts,
}: {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalProducts: number;
}) => {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => setPage(page => (page > 1 ? page - 1 : page))}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </button>
        <button
          onClick={() =>
            setPage(page =>
              page < Math.ceil(totalProducts / ITEMS_PER_PAGE)
                ? page + 1
                : page,
            )
          }
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {(page - 1) * ITEMS_PER_PAGE + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {totalProducts > page * ITEMS_PER_PAGE
                ? page * ITEMS_PER_PAGE
                : totalProducts}
            </span>{" "}
            of <span className="font-medium">{totalProducts}</span> results
          </p>
        </div>
        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          >
            <button
              onClick={() => setPage(page => (page > 1 ? page - 1 : page))}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
            </button>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            {Array.from({
              length: Math.floor(totalProducts / ITEMS_PER_PAGE) + 1,
            }).map((item, index) => {
              return (
                <button
                  key={"pagination" + index}
                  aria-current="page"
                  onClick={() => setPage(index + 1)}
                  className={
                    page === index + 1
                      ? `relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`
                      : `relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`
                  }
                >
                  {index + 1}
                </button>
              );
            })}
            <div
              onClick={() =>
                setPage(page =>
                  page < Math.ceil(totalProducts / ITEMS_PER_PAGE)
                    ? page + 1
                    : page,
                )
              }
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

const ProductList = ({ products }: { products: ProductType[] }) => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {/* <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2> */}

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products.map(product => (
            <div
              key={product.id}
              className="group relative p-1 rounded-lg border shadow"
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                <img
                  alt={product.title}
                  src={product.thumbnail}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between px-3">
                <div>
                  <h3 className="text-sm text-gray-700">
                    {/* todo: change this # with actual link */}
                    <Link to="/product">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    <span className="align-bottom mr-1">
                      <StarIcon className="w-6 h-6 inline" />
                    </span>
                    {product.rating}
                  </p>
                </div>
                <div className="flex flex-col justify-end items-end">
                  {product.discountPercentage > 0 ? (
                    <p className="text-sm font-medium text-gray-900">
                      <span className="text-sm border border-green-500 rounded text-green-500 text-[10px] p-0.5">
                        {Math.floor(product.discountPercentage)}% off
                      </span>
                      <br />
                      <span>
                        $
                        {product.price -
                          Math.round(
                            product.price * (product.discountPercentage / 100),
                          )}
                      </span>
                    </p>
                  ) : null}
                  <p className="text-sm font-sm text-gray-400 line-through">
                    ${product.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
