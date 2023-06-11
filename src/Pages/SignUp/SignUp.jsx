/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SocialSignIn from "../../components/SocialSignIn";
import useAuth from "../../Hooks/useAuth";

const SignUp = () => {
  const [viewPassword, setViewPassword] = useState(false);
  const [viewConfirmPassword, setViewConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { createUser, updateUserProfile } = useAuth();

  const password = watch("password");
  const confirmPassword = watch("confirm_password");
  const isMatched = password === confirmPassword;

  const onSubmit = (data) => {
    // console.log("Data from SignUP", data);
    createUser(data.email, data.password).then((result) => {
      const currentUser = result.user;
      // console.log(currentUser);
      updateUserProfile(data.name, data.photo, data.phone_number)
        .then(() => {
          const newUser = {
            user_name: data.name,
            user_email: data.email,
            user_image: data.photo,
            user_role: "student",
            gender: data.gender,
            date_of_birth: data.date_of_birth,
            phone_number: data.phone_number,
            address: data.address,
          };
          fetch("http://localhost:5000/users", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(newUser),
          })
            .then((res) => res.json())
            .then((data) => {
              // console.log("response", data);
              if (data.insertedId) {
                reset();
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Sign Up Successful",
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigate(from, { replace: true });
              }
            });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  const toggleViewPassword = () => {
    setViewPassword(!viewPassword);
  };
  const toggleViewConfirmPassword = () => {
    setViewConfirmPassword(!viewConfirmPassword);
  };

  return (
    <section className="pt-1 mb-20">
      <Helmet>
        <title>Sign Up | Focus Academy</title>
      </Helmet>
      <div className="relative mt-20 flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-black uppercase">
            Sign Up
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Name*
              </label>
              <input
                type="text"
                placeholder="Your Name"
                {...register("name", { required: true })}
                className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            {errors.name && (
              <span className="text-red-500">Name is required.</span>
            )}
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Email*
              </label>
              <input
                type="email"
                name="email"
                {...register("email", { required: true })}
                placeholder="Email"
                className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            {errors.email && (
              <span className="text-red-500">Email is required</span>
            )}
            <div className="mb-2 relative">
              <label className="block text-sm font-semibold text-gray-800">
                Password*
              </label>
              <input
                type={viewPassword ? "text" : "password"}
                name="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                })}
                placeholder="Password"
                className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
              />
              <button
                type="button"
                onClick={toggleViewPassword}
                className="absolute right-2 bottom-3 text-lg"
              >
                {viewPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password?.type === "required" && (
              <span className="text-red-500">Password is required</span>
            )}
            {errors.password?.type === "minLength" && (
              <span className="text-red-500">Use minimum 6 characters</span>
            )}
            {errors.password?.type === "maxLength" && (
              <span className="text-red-500">Use maximum 20 characters</span>
            )}
            {errors.password?.type === "pattern" && (
              <span className="text-red-500">
                Use uppercase, lowercase, numbers and special characters
              </span>
            )}
            <div className="mb-2 relative">
              <label className="block text-sm font-semibold text-gray-800">
                Confirm Password*
              </label>
              <input
                type={viewConfirmPassword ? "text" : "password"}
                name="confirm_password"
                {...register("confirm_password", { required: true })}
                placeholder="Confirm Password"
                className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
              />
              <button
                type="button"
                onClick={toggleViewConfirmPassword}
                className="absolute right-2 bottom-3 text-lg"
              >
                {viewConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {!isMatched && (
              <span className="text-red-500">Password does not matched.</span>
            )}
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Photo Url*
              </label>
              <input
                type="text"
                name="photo"
                {...register("photo", { required: true })}
                placeholder="Photo Url"
                className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            {errors.photo && (
              <span className="text-red-500">Photo Url is required</span>
            )}
            <div className="mb-2 relative w-full grid grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-800">
                  Gender*
                </label>
                <select
                  type="text"
                  name="gender"
                  {...register("gender", { required: true })}
                  defaultValue="Select One"
                  className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
                >
                  <option value="">Select One</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              <div>
                <label className=" block text-sm font-semibold text-gray-800">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="date_of_birth"
                  {...register("date_of_birth", { required: true })}
                  id=""
                  className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Phone Number
              </label>
              <input
                type="number"
                name="phone_number"
                {...register("phone_number")}
                placeholder="+8801xxxxxxxx"
                className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Address
              </label>
              <input
                type="text"
                name="address"
                {...register("address")}
                placeholder="Your Address"
                className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mt-6">
              <button
                type="submit"
                disabled={!isMatched}
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform rounded-md  focus:outline-none btn btn-neutral"
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className="relative flex items-center justify-center w-full mt-6 border border-t">
            <div className="absolute px-5 bg-white">Or</div>
          </div>
          <SocialSignIn></SocialSignIn>
          <p className="mt-8 text-xs font-light text-center text-gray-700">
            {" "}
            Have an account?{" "}
            <Link
              to="/signin"
              className="font-medium text-blue-500 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
