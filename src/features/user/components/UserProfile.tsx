import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo, updateUserAsync } from "../userSlice";
import { Navigate } from "react-router-dom";
import { PaperClipIcon } from "@heroicons/react/24/outline";
import Heading from "../../../components/PrimeComponents/Heading";
import { AppDispatch } from "../../../app/store";
import { FieldValues, useForm } from "react-hook-form";

type Props = {};

const UserProfile = (props: Props) => {
  //dispatch
  const dispatch = useDispatch<AppDispatch>();
  const user: UserInfoType = useSelector(selectUserInfo);
  const addresses: AddressType[] = user.addresses || [];

  //functions to edit
  //to show or hide form for editing
  const [showEditForm, setShowEditForm] = useState<number>(-1);
  // react hook forms
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>();
  const handleUpdateAddress = (data: FieldValues, index: number) => {
    // todo: try to add id in each new and updating address
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
    const newAddresses: AddressType[] = [...addresses];
    newAddresses[index] = newAddress;
    const newUser = { ...user, addresses: newAddresses };
    dispatch(updateUserAsync(newUser));
    setShowEditForm(-1);
  };
  const handleEditAddress = (address: AddressType, index: number) => {
    setValue("firstName", address.firstName);
    setValue("lastName", address.lastName);
    setValue("email", address.email);
    setValue("country", address.country);
    setValue("streetAddress", address.streetAddress);
    setValue("city", address.city);
    setValue("region", address.region);
    setValue("postalCode", address.postalCode);
    setShowEditForm(index);
  };

  // function to remove addresses
  const handleRemoveAddress = (address: AddressType, index: number) => {
    const newAddreses: AddressType[] = [...addresses];
    newAddreses.splice(index, 1);
    const newUser = { ...user, addresses: newAddreses };
    dispatch(updateUserAsync(newUser));
  };
  return (
    <>
      {!user.id && <Navigate to={"/login"}></Navigate>}
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-6">
        <div className="px-4 sm:px-0">
          <Heading>User Information</Heading>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Full name
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                xxxxxxxxxxxxxxx name
              </dd>
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Email address
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                xxxxxxxxxxxxxxxxxxx margotfoster@example.com
              </dd>
            </div>
            {/* Addresses start */}
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Addresses
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <ul role="list" className="divide-y divide-gray-100">
                  {addresses &&
                    addresses.map((address, index) => (
                      <div key={address.id || "address" + index}>
                        {/* checkout form started */}
                        {showEditForm === index && (
                          <form
                            noValidate
                            onSubmit={handleSubmit(data =>
                              handleUpdateAddress(data, index),
                            )}
                            className="bg-white rounded-lg p-3 px-5 shadow w-full md:w-auto flex-1 mb-5"
                          >
                            {/* form feilds */}
                            <div>
                              <Heading className="mt-2">
                                Personal Information
                              </Heading>
                              <p className="mt-1 text-sm leading-6 text-gray-600">
                                Use a permanent address where you can receive
                                mail.
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
                                          value:
                                            /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
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
                                      {
                                        errors["streetAddress"]
                                          .message as string
                                      }
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
                                      {...register("city", {
                                        required: "City is Required",
                                      })}
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
                                        required:
                                          "State / Province is Required",
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
                                        required:
                                          "ZIP / Postal code is Required",
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
                                onClick={() => setShowEditForm(-1)}
                                type="button"
                                className="text-sm font-semibold leading-6 text-gray-900"
                              >
                                Cencel
                              </button>
                              <button
                                type="submit"
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              >
                                Update Address
                              </button>
                            </div>
                            {/* buttons end*/}
                          </form>
                        )}
                        {/* checkout form end */}
                        <li className="flex justify-between gap-x-6 py-5 w-full">
                          <div>
                            <div className="flex min-w-0 gap-x-4">
                              <div className="min-w-0 flex-auto">
                                <p className="text-base font-semibold leading-6 text-gray-900">
                                  {address.firstName} {address.lastName}
                                </p>
                                <p className="mt-1 truncate text-sm leading-5 text-gray-600">
                                  Street: {address.streetAddress}
                                </p>
                                <div className="flex gap-10 items-center">
                                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                    City: {address.city}
                                    <br />
                                    Zip Code: <span>{address.postalCode}</span>
                                  </p>
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
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={e => handleEditAddress(address, index)}
                              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                              Edit
                            </button>
                            <button
                              onClick={e => handleRemoveAddress(address, index)}
                              className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                            >
                              Remove
                            </button>
                          </div>
                        </li>
                      </div>
                    ))}
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
