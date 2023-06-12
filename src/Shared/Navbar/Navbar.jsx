import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { FaOpencart, FaSignOutAlt, FaUser, FaUserAlt } from "react-icons/fa";
import useMySelectedClasses from "../../Hooks/useMySelectedClasses";
import useAdmin from "../../Hooks/useAdmin";
import useInstructor from "../../Hooks/useInstructor";

const Navbar = () => {
  const [isProfileVisible, setProfileVisible] = useState(false);
  const [isTransparent, setTransparent] = useState(true);
  const { user, signingOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();

  const [mySelectClasses] = useMySelectedClasses();

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

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;
      setTransparent(scrollPosition < scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navMenus = (
    <>
      {user ? (
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
      ) : (
        ""
      )}
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/instructors">Instructors</NavLink>
      </li>
      <li>
        <NavLink to="/classes">Classes</NavLink>
      </li>
    </>
  );

  return (
    <nav
      className={`navbar fixed z-50 bg-slate-100 ${
        isTransparent ? "bg-opacity-50" : "bg-opacity-100"
      } container`}
    >
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
            className="flex items-center justify-center w-14 h-10 rounded-full focus:outline-none"
          >
            {user?.photoURL ? (
              <img
                className="w-14 h-14 rounded-full border-2 border-gray-400 shadow-lg"
                src={user?.photoURL}
                alt="User Image"
              />
            ) : (
              <FaUserAlt className="text-6xl" />
            )}
          </button>

          {isProfileVisible && (
            <div
              onMouseEnter={view}
              onMouseLeave={hide}
              className="absolute z-20 -right-2 top-12  py-2 w-52 bg-slate-100   rounded shadow-lg transition-opacity duration-1000"
            >
              <h1 className="ps-4 pr-2 py-2 font-bold">{user?.displayName}</h1>
              <button className="px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left block">
                <NavLink>
                  <div className="flex items-center gap-2">
                    <FaUser className="text-lg" /> <span>View Profile</span>
                  </div>
                </NavLink>
              </button>

              {!isInstructor && !isAdmin && (
                <button className="px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left block">
                  <NavLink to="/dashboard/selectclasses">
                    <div className="flex items-center gap-2">
                      <FaOpencart className="text-lg" />
                      <div>
                        Select Classes{" "}
                        <span className="badge badge-neutral">
                          +{mySelectClasses?.length || 0}
                        </span>
                      </div>
                    </div>
                  </NavLink>
                </button>
              )}

              <button
                onClick={handleSignOut}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
              >
                <div className="flex items-center gap-2">
                  <FaSignOutAlt className="text-lg" /> <span>Sign Out</span>
                </div>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="navbar-end">
          <NavLink to="/signin" className="btn">
            Sign In
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
