import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectCurrentOrder } from "../orderSlice";

const OrderSuccess = () => {
  const params = useParams();
  const order = useSelector(selectCurrentOrder);
  return (
    <main className="grid min-h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Order Placed Successfully...!
        </h1>
        <p className="mt-6 text-base text-left  mb-2 leading-7 text-gray-600">
          Order # {order.id}{" "}
        </p>
        <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {order.products.map((product, index) => (
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
                      <div className="flex flex-col items-start gap-5">
                        <p className="ml-4">${product.price}</p>
                        <p className="ml-4">
                          Total: $
                          {(product.price * product.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="flex gap-2 items-baseline ">
                      <label
                        htmlFor="qty-select"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Qty:{product.quantity}
                      </label>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6 mt-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>${order.totalPrice}</p>
          </div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Total Items</p>
            <p>{order.totalProducts} Items</p>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full"
          >
            Go back home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default OrderSuccess;
