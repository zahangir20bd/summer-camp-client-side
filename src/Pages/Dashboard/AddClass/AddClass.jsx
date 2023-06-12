import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddClass = () => {
  const [axiosSecure] = useAxiosSecure();
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();

  const handleAddClass = (data) => {
    const newClass = {
      class_image: data.class_image,
      class_name: data.class_name,
      instructor_name: user?.displayName,
      instructor_email: user?.email,
      instructor_image: user?.photoURL,
      total_seats: data.available_seats,
      available_seats: data.available_seats,
      price: parseFloat(data.price),
      status: "Pending",
    };
    // console.log(newClass);
    axiosSecure.post("/classes", newClass).then((res) => {
      console.log("after Posting new Class", res.data);
      if (res.data.insertedId) {
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "New Class Added Successful",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  return (
    <section className="w-full mb-10 ">
      <Helmet>
        <title>Add Class | Focus Academy</title>
      </Helmet>

      <div className="relative mt-10 flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
          <h1 className="mb-14 text-3xl font-semibold text-center text-black uppercase">
            Add a new class
          </h1>
          <form onSubmit={handleSubmit(handleAddClass)} className="mt-6">
            <div className="mb-2 relative w-full grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="mb-2">
                <label className="block text-sm font-semibold text-gray-800">
                  Class Name
                </label>

                <input
                  type="text"
                  placeholder={"Class name"}
                  {...register("class_name", { required: true })}
                  className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div className="mb-2">
                <label className="block text-sm font-semibold text-gray-800">
                  Class Image
                </label>
                <input
                  type="text"
                  {...register("class_image", { required: true })}
                  placeholder="Image url"
                  className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
            </div>
            <div className="mb-2 relative w-full grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="mb-2">
                <label className="block text-sm font-semibold text-gray-800">
                  Instructor Name
                </label>
                <input
                  readOnly
                  placeholder={user?.displayName}
                  className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-semibold text-gray-800">
                  Instructor Email
                </label>
                <input
                  readOnly
                  placeholder={user?.email}
                  className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
            </div>
            <div className="mb-2 relative w-full grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="mb-2">
                <label className="block text-sm font-semibold text-gray-800">
                  Available Seats
                </label>
                <input
                  type="text"
                  {...register("available_seats", { required: true })}
                  placeholder="Available seats"
                  className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-semibold text-gray-800">
                  Price
                </label>
                <input
                  type="number"
                  {...register("price", { required: true })}
                  placeholder="Price"
                  className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform rounded-md  focus:outline-none btn btn-neutral"
              >
                Add Class
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddClass;
