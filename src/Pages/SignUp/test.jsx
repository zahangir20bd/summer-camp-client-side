import { useState } from "react";
import { useForm } from "react-hook-form";

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const isMatched = password === confirmPassword;

  const onSubmit = (data) => {
    console.log(data);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center"
    >
      <label>
        Password:
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", { required: true })}
            className="mb-2 pr-10"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute top-1/2 right-3 transform -translate-y-1/2"
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 4a5 5 0 016.33 6.33l-1.08 1.08A3.5 3.5 0 0012.5 9H11v2h1.5a1.5 1.5 0 010 3H11v1.5a1.5 1.5 0 01-3 0V15H7.5a1.5 1.5 0 010-3H9V9H7.5a3.5 3.5 0 00-2.83 5.65L4.59 15.76A5 5 0 119 4zm2 0a3 3 0 11-6 0 3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.414 4.343a1 1 0 011.414 0L10 7.586l3.293-3.293a1 1 0 011.32-.083l.094.083a1 1 0 010 1.497L11.414 9l3.293 3.293a1 1 0 010 1.414l-.083.094a1 1 0 01-1.497 0L10 10.414l-3.293 3.293a1 1 0 01-1.32.083l-.094-.083a1 1 0 010-1.497L8.586 9 5.293 5.707a1 1 0 010-1.414l.083-.094z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>
      </label>
      <label>
        Confirm Password:
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            {...register("confirmPassword", { required: true })}
            className="mb-2 pr-10"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute top-1/2 right-3 transform -translate-y-1/2"
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 4a5 5 0 016.33 6.33l-1.08 1.08A3.5 3.5 0 0012.5 9H11v2h1.5a1.5 1.5 0 010 3H11v1.5a1.5 1.5 0 01-3 0V15H7.5a1.5 1.5 0 010-3H9V9H7.5a3.5 3.5 0 00-2.83 5.65L4.59 15.76A5 5 0 119 4zm2 0a3 3 0 11-6 0 3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.414 4.343a1 1 0 011.414 0L10 7.586l3.293-3.293a1 1 0 011.32-.083l.094.083a1 1 0 010 1.497L11.414 9l3.293 3.293a1 1 0 010 1.414l-.083.094a1 1 0 01-1.497 0L10 10.414l-3.293 3.293a1 1 0 01-1.32.083l-.094-.083a1 1 0 010-1.497L8.586 9 5.293 5.707a1 1 0 010-1.414l.083-.094z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>
      </label>
      {errors.password && (
        <span className="text-red-500">Password is required.</span>
      )}
      {errors.confirmPassword && (
        <span className="text-red-500">Confirm Password is required.</span>
      )}
      {!isMatched && (
        <span className="text-red-500">Passwords do not match.</span>
      )}
      <button
        type="submit"
        disabled={!isMatched}
        className={`py-2 px-4 rounded ${
          isMatched ? "bg-green-500" : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        Sign Up
      </button>
    </form>
  );
}
