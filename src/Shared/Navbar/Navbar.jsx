import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { FaUserAlt } from "react-icons/fa";

const Navbar = () => {
  const [isProfileVisible, setProfileVisible] = useState(false);
  const { user, signingOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const view = () => {
    setProfileVisible(true);
  };

  const hide = () => {
    setProfileVisible(false);
  };

  const handleSignOut = () => {
    signingOut()
      .then(() => {
        navigate("/signin");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const navMenus = (
    <>
      {user ? (
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
      ) : (
        ""
      )}
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link>Instructors</Link>
      </li>
      <li>
        <Link to="/classes">Classes</Link>
      </li>
    </>
  );
  return (
    <div className="navbar fixed z-50 bg-slate-100 bg-opacity-50 container">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-slate-100 bg-opacity-80 rounded-box w-52"
          >
            {navMenus}
          </ul>
        </div>
        <Link>
          <img className="w-44" src={logo} alt="web site logo" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navMenus}</ul>
      </div>
      {user ? (
        <div className="relative navbar-end">
          <button
            type="button"
            onMouseEnter={view}
            onMouseLeave={hide}
            className="flex items-center justify-center w-10 h-10 rounded-full focus:outline-none"
          >
            {user?.photoURL ? (
              <img className="" src={user?.photoURL} alt="User Image" />
            ) : (
              <FaUserAlt className="text-6xl" />
            )}
          </button>

          {isProfileVisible && (
            <div
              onMouseEnter={view}
              onMouseLeave={hide}
              className="absolute z-10 -right-2 top-12  py-2 w-44 bg-slate-100  bg-opacity-50 rounded shadow-lg transition-opacity duration-1000"
            >
              <h1 className="ps-4 pr-2 py-2 ">{user?.email}</h1>
              <button className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">
                View Profile
              </button>
              <button
                onClick={handleSignOut}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="navbar-end">
          <Link to="/signin" className="btn">
            Sign In
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
