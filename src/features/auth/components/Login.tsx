import { Link, Navigate } from "react-router-dom";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { loginUserAsync, selectError, selectLoggedInUser } from "../authSlice";
import { useEffect } from "react";

type Props = {};
const Login = (props: Props) => {
  //to check login user
  const user = useSelector(selectLoggedInUser);
  const error = useSelector(selectError);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>();
  // to login user
  const dispatch = useDispatch<AppDispatch>();
  const handleLogin: SubmitHandler<FieldValues> = data => {
    const loginData: { email: string; password: string } = {
      email: data.email,
      password: data.password,
    };
    dispatch(loginUserAsync(loginData));
  };

  return (
    <>
      {user && <Navigate to={"/"} replace={true}></Navigate>}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={handleSubmit(handleLogin)}
            noValidate
            className="space-y-6"
          >
            <div>
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
                    required: "Email Address is Required",
                    pattern: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                  })}
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.email && (
                <p className="text-red-500">
                  {errors?.email?.message as string}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  // todo: make these errors on seperate lines
                  {...register("password", {
                    required: `Password is required`,
                  })}
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.password && (
                <p className="text-red-500">
                  {errors?.password?.message as string}
                </p>
              )}
            </div>

            <div>
              {error && <p className="text-red-500">{error}</p>}
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not Registered?{" "}
            <Link
              to="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
export default Login;

//todo: remove additional props from components if exists
