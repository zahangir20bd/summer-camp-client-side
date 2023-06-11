/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";

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

  const { createUser, updateUserProfile, googleSignIn, gitHubSignIn } =
    useContext(AuthContext);

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

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const currentUser = result.user;
        console.log(currentUser);

        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGithubSignIn = () => {
    gitHubSignIn()
      .then((result) => {
        const currentUser = result.user;
        console.log(currentUser);

        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
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
          <div className="flex mt-4 gap-x-2">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="w-5 h-5 fill-current"
              >
                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
              </svg>
              <span className="ms-2">Google</span>
            </button>
            <button
              type="button"
              onClick={handleGithubSignIn}
              className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="w-5 h-5 fill-current"
              >
                <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
              </svg>
              <span className="ms-2">Github</span>
            </button>
          </div>

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
