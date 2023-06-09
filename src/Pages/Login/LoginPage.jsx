import { useState } from "react";

function LoginPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="pt-40">
      <label htmlFor="password">Password</label>
      <div className="relative">
        <input
          type={passwordVisible ? "text" : "password"}
          id="password"
          value={password}
          onChange={handlePasswordChange}
          className="border border-gray-300 rounded-md px-3 py-2"
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 px-3 py-2"
        >
          {passwordVisible ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.343 4.343a8 8 0 0111.314 0M1 1l22 22"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v.01M8 5v.01M4 6v.01M4 10v.01M4 14v.01M8 19v.01M12 20v.01M16 19v.01M20 18v.01M20 14v.01M20 10v.01M16 5v.01"
              />
            </svg>
          )}
        </button>
      </div>
      <button type="submit">Log in</button>
    </div>
  );
}

export default LoginPage;
