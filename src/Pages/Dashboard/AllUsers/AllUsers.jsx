import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle";
import {
  FaTrash,
  FaUserGraduate,
  FaUserShield,
  FaUserTie,
} from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await fetch("http://localhost:5000/users");
    return res.json();
  });

  //   Make Admin Button Handler
  const handleMakeAdmin = (id) => {
    fetch(`http://localhost:5000/users/admin/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User Update as Admin Successful",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  //   Update User as Instructor Handler
  const handleMakeInstructor = (id) => {
    fetch(`http://localhost:5000/users/instructor/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User Update as Instructor Successful",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  //   Update User as Student Handler
  const handleMakeStudent = (id) => {
    fetch(`http://localhost:5000/users/student/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User Update as Student Successful",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  const handleDeleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once you delete you can't revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/users/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire("Deleted!", "User has been deleted.", "success");
            }
          });
      }
    });
  };

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
                        {/* Make Admin Button */}
                        <button
                          onClick={() => handleMakeAdmin(user._id)}
                          disabled={user.user_role === "Admin"}
                          className="btn btn-ghost btn-circle text-2xl"
                        >
                          <FaUserShield />
                        </button>
                        {/* Make Instructor Button */}
                        <button
                          onClick={() => handleMakeInstructor(user._id)}
                          disabled={user.user_role === "Instructor"}
                          className="btn btn-ghost btn-circle text-2xl"
                        >
                          <FaUserTie />
                        </button>
                        {/* Make Student Button */}
                        <button
                          onClick={() => handleMakeStudent(user._id)}
                          disabled={user.user_role === "Student"}
                          className="btn btn-ghost btn-circle text-2xl"
                        >
                          <FaUserGraduate />
                        </button>
                      </td>
                      <th className="text-center">
                        <button
                          onClick={() => handleDeleteUser(user._id)}
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
