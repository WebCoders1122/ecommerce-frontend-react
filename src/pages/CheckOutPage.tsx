import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { AppDispatch } from "../app/store";
import Navbar from "../components/Navbar";
import Heading from "../components/PrimeComponents/Heading";
import {
  removeFromCartAsync,
  selectCartProducts,
  updateProductQuantityAsync,
} from "../features/cart/cartSlice";
//react hook forms
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {
  createNewOrderAsync,
  selectCurrentOrder,
  selectPlacement,
} from "../features/order/orderSlice";
import { addNewAddressAsync, selectUserInfo } from "../features/user/userSlice";

type Props = {};

const CheckOutPage = (props: Props) => {
  //user and user addresses for chekcout page
  const user = useSelector(selectUserInfo);
  const addresses: AddressType[] = user.addresses || [];
  //selected address payments
  const [selectedAddress, setSelectedAddress] = useState<AddressType | null>(
    null,
  );
  const [selectedPayment, setSelectedPayment] = useState("COD");
  const paymentOptions = ["COD", "Card Payment"];
  // for cart
  const cartProducts = useSelector(selectCartProducts);
  const dispatch = useDispatch<AppDispatch>();
  const totalPrice = +cartProducts
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);
  const totalProducts = cartProducts.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );
  // to update quantity
  const handleQuantity = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number,
  ) => {
    const newQuantity = Number(e.target.value);
    const productToUpdate = cartProducts[index];
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

  // react hook forms
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>();
  //to add new address
  const handleNewAddress: SubmitHandler<FieldValues> = data => {
    const newAddress: AddressType = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      country: data.county,
      streetAddress: data.streetAddress,
      city: data.city,
      region: data.region,
      postalCode: data.postalCode,
    };
    dispatch(addNewAddressAsync({ address: newAddress, userId: user.id }));
    reset();
  };
  //to place new order
  const handleOrder = () => {
    if (selectedAddress && selectedPayment) {
      const newOrder: OrderType = {
        userId: user.id,
        products: cartProducts,
        totalPrice: totalPrice,
        totalProducts: totalProducts,
        address: selectedAddress,
        paymentMethod: selectedPayment,
        status: "Pending",
      };
      dispatch(createNewOrderAsync(newOrder));
    } else {
      alert("Please select a payment method and Address");
    }

    // todo: redirect to success page on successfull order complition
    // todo: update to stock record
    // todo: clrear cart after successfull order
  };
  //to check order success
  const orderPlacement: boolean = useSelector(selectPlacement);
  const order = useSelector(selectCurrentOrder);
  console.log(selectedAddress, selectedPayment);
  return (
    <>
      {!cartProducts.length && <Navigate to={"/"}></Navigate>}
      {orderPlacement && (
        <Navigate to={`/order-success/${order.id}`}></Navigate>
      )}
      <Navbar />
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-6 flex flex-col md:flex-row items-start justify-between gap-3">
        {/* checkout form started */}
        <form
          noValidate
          onSubmit={handleSubmit(handleNewAddress)}
          className="bg-white rounded-lg p-3 px-5 shadow w-full md:w-auto flex-1 mb-5"
        >
          {/* form feilds */}
          <div>
            <Heading className="mt-2">Personal Information</Heading>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Use a permanent address where you can receive mail.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  First name
                </label>
                <div className="mt-2">
                  <input
                    id="firstName"
                    {...register("firstName", {
                      required: "First Name is Required",
                    })}
                    type="text"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors["firstName"] && (
                  <span className="text-red-500 text-sm">
                    {errors["firstName"].message as string}
                  </span>
                )}
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    id="lastName"
                    {...register("lastName", {
                      required: "Last Name is Required",
                    })}
                    type="text"
                    autoComplete="familyName"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors["lastName"] && (
                  <span className="text-red-500 text-sm">
                    {errors["lastName"].message as string}
                  </span>
                )}
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    {...register("email", {
                      required: "Email is Required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors["email"] && (
                  <span className="text-red-500 text-sm">
                    {errors["email"].message as string}
                  </span>
                )}
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Country
                </label>
                <div className="mt-2">
                  <select
                    id="country"
                    {...register("country", {
                      required: "Country is Required",
                    })}
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>Pakistan</option>
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
                </div>
                {errors["country"] && (
                  <span className="text-red-500 text-sm">
                    {errors["country"].message as string}
                  </span>
                )}
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Street address
                </label>
                <div className="mt-2">
                  <input
                    id="streetAddress"
                    {...register("streetAddress", {
                      required: "Street Address is Required",
                    })}
                    type="text"
                    autoComplete="streetAddress"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors["streetAddress"] && (
                  <span className="text-red-500 text-sm">
                    {errors["streetAddress"].message as string}
                  </span>
                )}
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  City
                </label>
                <div className="mt-2">
                  <input
                    id="city"
                    {...register("city", { required: "City is Required" })}
                    type="text"
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors["city"] && (
                  <span className="text-red-500 text-sm">
                    {errors["city"].message as string}
                  </span>
                )}
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="region"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  State / Province
                </label>
                <div className="mt-2">
                  <input
                    id="region"
                    {...register("region", {
                      required: "State / Province is Required",
                    })}
                    type="text"
                    autoComplete="address-level1"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors["region"] && (
                  <span className="text-red-500 text-sm">
                    {errors["region"].message as string}
                  </span>
                )}
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="postalCode"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  ZIP / Postal code
                </label>
                <div className="mt-2">
                  <input
                    id="postalCode"
                    {...register("postalCode", {
                      required: "ZIP / Postal code is Required",
                    })}
                    type="text"
                    autoComplete="postalCode"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors["postalCode"] && (
                  <span className="text-red-500 text-sm">
                    {errors["postalCode"].message as string}
                  </span>
                )}
              </div>
            </div>
          </div>
          {/* form feilds end*/}

          {/* buttons */}
          <div className="mt-6 flex items-center justify-end gap-x-6 border-b border-gray-900/10 pb-5">
            <button
              onClick={() => reset()}
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Reset
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Address
            </button>
          </div>
          {/* buttons end*/}

          {/* saved address */}
          <ul role="list" className="divide-y divide-gray-100">
            {addresses &&
              addresses.map((address, index) => (
                <div
                  key={"address" + index}
                  className="flex items-center gap-x-3 w-full"
                >
                  <input
                    id="address_selection"
                    name="address"
                    type="radio"
                    onClick={() => setSelectedAddress(address)}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="address_selection"
                    className="block text-sm font-medium leading-6 text-gray-900 w-full"
                  >
                    <li
                      key={address.id}
                      className="flex justify-between gap-x-6 py-5 w-full"
                    >
                      <div className="flex min-w-0 gap-x-4">
                        <div className="min-w-0 flex-auto">
                          <p className="text-sm font-semibold leading-6 text-gray-900">
                            City: {address.city}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            Street: {address.streetAddress}
                            <br />
                            Zip Code: <span>{address.postalCode}</span>
                          </p>
                        </div>
                      </div>
                      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900">
                          {/* todo: add phone number  */}
                          {"address.phoneNumber"}
                        </p>
                        {address.email ? (
                          <p className="mt-1 text-xs leading-5 text-gray-500">
                            {address.email}
                          </p>
                        ) : (
                          <div className="mt-1 flex items-center gap-x-1.5">
                            <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            </div>
                            <p className="text-xs leading-5 text-gray-500">
                              Online
                            </p>
                          </div>
                        )}
                      </div>
                    </li>
                  </label>
                </div>
              ))}
          </ul>
          {/* saved address end */}
          {/* payment options */}
          <div className="mt-6 border-t border-gray-900/10 pt-5">
            <h3 className="text-xl font-semibold leading-7 text-gray-900 py-4">
              Payment Options:
            </h3>
            {paymentOptions.map((item, index) => (
              <div key={"payment" + index} className="flex gap-2 items-center">
                <input
                  key={index}
                  id={item}
                  name="payment"
                  type="radio"
                  checked={selectedPayment === item}
                  onChange={() => setSelectedPayment(item)}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label htmlFor={item}>{item}</label>
              </div>
            ))}
          </div>

          {/* payment options end*/}
        </form>
        {/* cart section */}
        <div className="mx-auto max-w-7xl px-2 sm:px-2 lg:px-2 ">
          <div className=" bg-white rounded-lg p-3 px-5 shadow">
            <div className="">
              <Heading className="mt-2 mb-5">Cart</Heading>
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {cartProducts.map((product, index) => (
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
                <button
                  onClick={handleOrder}
                  className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 w-full"
                >
                  Place Order
                </button>
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
        {/* cart section end */}
        {/* checkout form end */}
      </div>
    </>
  );
};

export default CheckOutPage;
