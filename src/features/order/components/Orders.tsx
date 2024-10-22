import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { selectLoggedInUser } from "../../auth/authSlice";
import { Link, useParams } from "react-router-dom";
import { fetchUserOrderByIdAsync, selectOrders } from "../orderSlice";
import Heading from "../../../components/PrimeComponents/Heading";
import { PaperClipIcon } from "@heroicons/react/24/outline";

const Orders = () => {
  const dispatch = useDispatch<AppDispatch>();
  const loggedInUser = useSelector(selectLoggedInUser);
  const userId = loggedInUser.id;
  //user orders
  const userOrders: OrderType[] = useSelector(selectOrders);
  //fetching user orders
  useEffect(() => {
    if (!loggedInUser.id) return;
    dispatch(fetchUserOrderByIdAsync(userId));
  }, [dispatch]);
  console.log(userOrders);
  return (
    <>
      {!userOrders.length ? (
        <Heading>No Orders Found</Heading>
      ) : (
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-14">
          {userOrders.map((product, index) => (
            <div
              key={product.id}
              className=" bg-white rounded-lg p-3 px-5 shadow my-3"
            >
              <div>
                <div className="flex justify-between items-center my-4">
                  <Heading className="mx-5">{`Order# ${product.id}`}</Heading>
                  <span
                    className={`font-semibold ${product.status === "Pending" ? "text-red-600" : "text-green-500"}`}
                  >
                    Order Status: {product.status}
                  </span>
                </div>
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {product.products.map((item, index) => (
                      <li key={item?.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            alt={item.title}
                            src={item.image}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <Link to="#">{item.title}</Link>
                              </h3>
                              <p className="ml-4">${item.price}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {/* todo: add color here instread of user */}
                              {item.user}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="flex gap-2 items-baseline ">
                              <label
                                htmlFor="qty-select"
                                className="block mb-2 text-sm font-medium text-gray-900"
                              >
                                Qty: {item.quantity}
                              </label>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  dd
                </div>
              </div>
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6 mt-6">
                {/* for address */}
                <div>
                  <div>
                    <dl className="divide-y divide-gray-100">
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          Address
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {product.address.streetAddress +
                            ", " +
                            product.address.city}
                        </dd>
                      </div>
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          Payment Method
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {product.paymentMethod}
                        </dd>
                      </div>
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          Email address
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {product.address.email}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
                {/* address end */}
                {/* subtotoal start */}
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>${product.totalPrice}</p>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Total Items</p>
                  <p>{product.totalProducts} Items</p>
                </div>
                {/* subtotoal start */}
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                did
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Orders;
