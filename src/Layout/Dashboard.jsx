import { NavLink, Outlet } from "react-router-dom";
import logo from "../assets/logo.png";
import {
  FaBookOpen,
  FaBookReader,
  FaHome,
  FaOpencart,
  FaUserTie,
} from "react-icons/fa";
import useMySelectedClasses from "../Hooks/useMySelectedClasses";

const Dashboard = () => {
  const [mySelectClasses] = useMySelectedClasses();
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content border-r-2 flex flex-col items-center justify-center">
        <Outlet></Outlet>
        <label
          htmlFor="my-drawer-2"
          className="btn btn-neutral drawer-button lg:hidden"
        >
          Open Menu
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
          <img className="mb-10" src={logo} alt="" />

          <li>
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
          </li>
          <li>
            <NavLink to="enrolledclasses">
              <FaBookReader /> My Enrolled Classes
            </NavLink>
          </li>
          <div className="divider"></div>
          <li>
            <NavLink to="/">
              <FaHome /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/instructors">
              <FaUserTie /> Instructors
            </NavLink>
          </li>
          <li>
            <NavLink to="/classes">
              <FaBookOpen /> Classes
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
