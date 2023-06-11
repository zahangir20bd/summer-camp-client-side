import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle";
import { FaTrash, FaUserShield, FaUserTie } from "react-icons/fa";

const AllUsers = () => {
  const { data: users = [] } = useQuery(["users"], async () => {
    const res = await fetch("http://localhost:5000/users");
    return res.json();
  });
  return (
    <section className="w-full mb-10 -mt-20">
      <Helmet>
        <title>Manage Users | Focus Academy</title>
      </Helmet>
      <SectionTitle heading="Manage Users" />
      <div className="px-10">
        <h2 className="text-3xl font-bold">Total Users: {users.length}</h2>
        <div>
          <div>
            <div className="overflow-x-auto">
              <table className="table">
                {/* Table Header */}
                <thead className="text-lg">
                  <tr>
                    <th>
                      <label>#</label>
                    </th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th className="text-center">Make</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                {/* Table Body */}
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user._id}>
                      <th>
                        <label>{index + 1}</label>
                      </th>
                      <td>{user.user_name}</td>
                      <td>{user.user_email}</td>
                      <td>{user.user_role}</td>
                      <td className="text-center">
                        <button
                          disabled={user.user_role === "Admin"}
                          className="btn btn-ghost btn-circle text-2xl"
                        >
                          <FaUserShield />
                        </button>
                        <button
                          disabled={user.user_role === "Instructor"}
                          className="btn btn-ghost btn-circle text-2xl"
                        >
                          <FaUserTie />
                        </button>
                      </td>
                      <th className="text-center">
                        <button
                          onClick=""
                          className="btn btn-ghost btn-circle text-2xl"
                        >
                          <FaTrash />
                        </button>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllUsers;
