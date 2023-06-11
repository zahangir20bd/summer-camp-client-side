import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle";
import useMySelectedClasses from "../../../Hooks/useMySelectedClasses";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const SelectClasses = () => {
  const [mySelectClasses, refetch] = useMySelectedClasses();
  const total = mySelectClasses
    .reduce((sum, selectClass) => selectClass.price + sum, 0)
    .toFixed(2);

  const handleDelete = (selectClass) => {
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
        fetch(`http://localhost:5000/selectclasses/${selectClass._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire(
                "Deleted!",
                "Class deleted from Selected Class",
                "success"
              );
            }
          });
      }
    });
  };
  return (
    <section className="w-full mb-10">
      <Helmet>
        <title>Selected Classes | Focus Academy</title>
      </Helmet>
      <SectionTitle heading="My Selected Classes"></SectionTitle>
      <div className="px-10">
        <h2 className="text-3xl font-bold">
          My Total Selected Classes: {mySelectClasses.length}{" "}
        </h2>
        <div>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead className="text-lg">
                <tr>
                  <th>
                    <label>#</label>
                  </th>
                  <th>Class Name</th>
                  <th>Instructor</th>
                  <th className="text-center">Available Seats</th>
                  <th className="text-end">Course Fee</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {mySelectClasses.map((selectClass, index) => (
                  <tr key={selectClass._id}>
                    <th>
                      <label>{index + 1}</label>
                    </th>
                    <td>{selectClass.class_name}</td>
                    <td>{selectClass.instructor_name}</td>
                    <td className="text-center">
                      {selectClass.available_seats}
                    </td>
                    <td className="text-end">
                      $ {selectClass.price.toFixed(2)}
                    </td>
                    <th className="text-center">
                      <button
                        onClick={() => handleDelete(selectClass)}
                        className="btn btn-ghost btn-circle text-2xl"
                      >
                        <FaTrash />
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
              {/* foot */}
              <tfoot className="text-lg">
                <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th className="text-end">Total: </th>
                  <th className="text-end">$ {total}</th>
                  <th>
                    <Link>
                      <button className="btn btn-neutral btn-sm">Pay</button>
                    </Link>
                  </th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelectClasses;
