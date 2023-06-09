import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const navMenus = (
    <>
      <li>
        <Link>Dashboard</Link>
      </li>
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
    <div className="navbar fixed z-10 bg-slate-100 bg-opacity-50 container">
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
      <div className="navbar-end">
        <Link to="/login" className="btn">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
