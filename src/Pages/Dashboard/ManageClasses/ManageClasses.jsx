import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle";
import { FaCheck, FaComment, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useState } from "react";
import { useForm } from "react-hook-form";

const ManageClasses = () => {
  const [axiosSecure] = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const [classId, setClassId] = useState(null);
  const { data: classes = [], refetch } = useQuery(["classes"], async () => {
    const res = await axiosSecure.get("/classes");
    return res.data;
  });

  const { register, handleSubmit, reset } = useForm();

  // Class Approved handler
  const handleApproved = (id) => {
    axiosSecure.patch(`/classes/approved/${id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
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

  // Class Deny Handler
  const handleDeny = (id) => {
    axiosSecure.patch(`/classes/deny/${id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
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

  const handleOpenModal = (id) => {
    setIsOpen(true);
    setClassId(id);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleSendFeedback = (data) => {
    const feedback = { feedback: data.feedback };
    axiosSecure.patch(`/classes/feedback/${classId}`, feedback).then((res) => {
      if (res.data.modifiedCount > 0) {
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Feedback send Successfully.",
          showConfirmButton: false,
          timer: 1500,
        });
        handleCloseModal();
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
                      disabled={
                        item.status === "Approved" || item.status === "Deny"
                      }
                      className="btn btn-success btn-circle btn-sm text-xl"
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={() => handleDeny(item._id)}
                      disabled={
                        item.status === "Approved" || item.status === "Deny"
                      }
                      className="btn bg-red-500 hover:bg-red-600 m-1 btn-circle btn-sm text-xl"
                    >
                      <FaTimes />
                    </button>
                    <button
                      //
                      onClick={() => handleOpenModal(item._id)}
                      className="btn btn-neutral btn-circle btn-sm text-xl"
                    >
                      <FaComment />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Modal */}
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            &#8203;
            <form
              onSubmit={handleSubmit(handleSendFeedback)}
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Feedback
                    </h3>
                    <div className="mt-2 w-full">
                      <textarea
                        {...register("feedback", { required: true })}
                        className="resize-none border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 block w-full h-32 p-2"
                        placeholder="Enter your feedback"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 gap-1 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="submit" className="btn btn-neutral">
                  Send
                </button>
                <button className="btn btn-error" onClick={handleCloseModal}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default ManageClasses;
