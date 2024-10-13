import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch } from "../../app/store";
import Heading from "../../components/PrimeComponents/Heading";
import { selectLoggedInUser } from "../auth/authSlice";
import {
  removeFromCartAsync,
  selectCartProducts,
  updateProductQuantityAsync,
} from "./cartSlice";

const Cart = () => {
  const products = useSelector(selectCartProducts);
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectLoggedInUser);
  const totalPrice = +products
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);
  const totalProducts = products.reduce((acc, item) => acc + item.quantity, 0);
  // to update quantity
  const handleQuantity = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number,
  ) => {
    const newQuantity = Number(e.target.value);
    const productToUpdate = products[index];
    if (productToUpdate) {
      const updatedProduct = { ...productToUpdate, quantity: newQuantity };
      dispatch(updateProductQuantityAsync(updatedProduct));
    }
  };
  //to remove products from cart
  const handleRemove = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    product: ProductToAddType,
  ) => {
    dispatch(removeFromCartAsync(product));
  };

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-14">
      <div className=" bg-white rounded-lg p-3 px-5 shadow">
        <div className="mt-8">
          <Heading className="m-5">Cart</Heading>
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {products.map((product, index) => (
                <li key={product?.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      alt={product.title}
                      src={product.image}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <Link to="#">{product.title}</Link>
                        </h3>
                        <p className="ml-4">${product.price}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {/* todo: add color here instread of user */}
                        {product.user}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="flex gap-2 items-baseline ">
                        <label
                          htmlFor="qty-select"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Qty:
                        </label>
                        <select
                          value={product.quantity}
                          id="qty-select"
                          onChange={e => handleQuantity(e, index)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                          // dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                        >
                          {/* todo: add qty as per stock */}
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>

                      <div className="flex">
                        <button
                          onClick={e => handleRemove(e, product)}
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6 mt-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>${totalPrice}</p>
          </div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Total Items</p>
            <p>{totalProducts} Items</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            <Link
              to={user ? "/checkout" : "/login"}
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </Link>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or{" "}
              <Link
                to={"/"}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart;
