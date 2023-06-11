import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle";
import useClasses from "../../../Hooks/useClasses";
import { FaCheck, FaComment, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";

const ManageClasses = () => {
  const [classes, , refetch] = useClasses();
  console.log(classes);

  // Class Approved handler
  const handleApproved = (id) => {
    fetch(`http://localhost:5000/classes/approved/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Class Approved Successful",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  const handleDeny = (id) => {
    fetch(`http://localhost:5000/classes/deny/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "warning",
            title: "Class has been denied",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <section className="w-full mb-10 -mt-20">
      <Helmet>
        <title>Manage Classes | Focus Academy</title>
      </Helmet>
      <SectionTitle heading="Manage Classes" />
      <div className="px-10">
        <h2 className="text-3xl font-bold">Total Classes: {classes.length}</h2>
        <div className="overflow-x-auto">
          <table className="table">
            {/* Table Header */}
            <thead className="text-lg">
              <tr>
                <th>
                  <label>#</label>
                </th>
                <th>Image</th>
                <th>Name</th>
                <th>Instructor</th>
                <th>Email</th>
                <th className="text-center">A. Seats</th>
                <th>Fees</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {classes.map((item, index) => (
                <tr key={item._id}>
                  <th>
                    <label>{index + 1}</label>
                  </th>
                  <td>
                    <img
                      className="rounded"
                      src={item.class_image}
                      alt="Class Image"
                    />
                  </td>
                  <td>{item.class_name}</td>
                  <td>{item.instructor_name}</td>
                  <td>{item.instructor_email}</td>
                  <td className="text-center">{item.available_seats}</td>
                  <td className="text-center">${item.price.toFixed(2)}</td>
                  <td className="text-center">{item.status}</td>
                  <th className="text-center">
                    <button
                      onClick={() => handleApproved(item._id)}
                      disabled={item.status === "Approved" || "Deny"}
                      className="btn btn-success btn-circle btn-sm text-xl"
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={() => handleDeny(item._id)}
                      disabled={item.status === "Approved" || "Deny"}
                      className="btn btn-warning m-1 btn-circle btn-sm text-xl"
                    >
                      <FaTimes />
                    </button>
                    <button className="btn btn-neutral btn-circle btn-sm text-xl">
                      <FaComment />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ManageClasses;
