import { NavLink, Outlet } from "react-router-dom";
import logo from "../assets/logo.png";
import {
  FaBookOpen,
  FaBookReader,
  FaHome,
  FaIndent,
  FaOpencart,
  FaUserTie,
  FaUsers,
} from "react-icons/fa";
import useMySelectedClasses from "../Hooks/useMySelectedClasses";

const Dashboard = () => {
  const [mySelectClasses] = useMySelectedClasses();

  // TODO: Load Data from the server to have dynamic isAdmin based on Data
  const isAdmin = true;
  const isInstructor = false;

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
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/users">
                  <FaUsers /> Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/classes">
                  <FaBookReader /> Manage Classes
                </NavLink>
              </li>
            </>
          ) : isInstructor ? (
            <>
              <li>
                <NavLink to="">
                  <FaBookOpen /> Add A Class
                </NavLink>
              </li>
              <li>
                <NavLink to="">
                  <FaIndent /> My Classes
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
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
              </li>
              <li>
                <NavLink to="/dashboard/enrolledclasses">
                  <FaBookReader /> My Enrolled Classes
                </NavLink>
              </li>
            </>
          )}

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
