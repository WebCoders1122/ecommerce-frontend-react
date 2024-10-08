import { useState } from "react";
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
} from "@heroicons/react/20/solid";
import Pagination from "./Pagination";
import ProductList from "../features/ProductList/components/ProductList";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsByQuery,
  selectBrands,
  selectCategories,
} from "../features/ProductList/productListSlice";
import { AppDispatch } from "../app/store";

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
  const [sortQuery, setSortQuery] = useState<SortOptionsType[]>([]);

  //unique brands and categroies
  const brands: CategoryType[] = useSelector(selectBrands);
  const categories: CategoryType[] = useSelector(selectCategories);
  //dispatch
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
    // todo:uncomment the code for server-side multi values search
    // console.log(e.target.checked)
    let newFilterOptions: FilterOptionsType[] = [];
    if (!e.target.checked) {
      newFilterOptions = filterOptions.filter(
        item => item.value !== e.target.value,
      );
    } else {
      newFilterOptions = [
        ...filterOptions,
        { key: (e.target as HTMLInputElement).name, value: e.target.value },
      ];
      setFilterOptions(newFilterOptions);
      dispatch(
        fetchProductsByQuery({ filters: newFilterOptions, sort: sortQuery }),
      );
    }
  };
  const handleSort = (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
    option: SortType,
  ): void => {
    let newSortOptions = [{ sortBy: option.query, order: option.order }];
    setSortQuery(newSortOptions);
    dispatch(
      fetchProductsByQuery({ filters: filterOptions, sort: newSortOptions }),
    );
  };

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
                <ProductList />
              </div>
            </div>
          </section>
          <Pagination />
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
