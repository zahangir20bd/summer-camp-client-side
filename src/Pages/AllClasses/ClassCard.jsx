import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin";
import useInstructor from "../../Hooks/useInstructor";
// import useMySelectedClasses from "../../Hooks/useMySelectedClasses";

const ClassCard = ({ singleClass }) => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const { user } = useAuth();
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();

  const navigate = useNavigate();
  const location = useLocation();
  // const [, refetch] = useMySelectedClasses();
  const token = localStorage.getItem("access-token");

  const {
    _id,
    class_image,
    class_name,
    instructor_image,
    instructor_name,
    available_seats,
    price,
  } = singleClass;

  // console.log(singleClass);

  const selectDisabled = available_seats === 0 || isAdmin || isInstructor;

  const buttonClasses = `btn btn-ghost border-slate-700 border-b-4 ${
    selectDisabled || buttonDisabled ? " cursor-not-allowed" : ""
  }`;

  const handleSelectClass = () => {
    if (user && user?.email) {
      const selectClass = {
        class_id: _id,
        class_image,
        class_name,
        instructor_image,
        instructor_name,
        available_seats,
        price,
        user_email: user.email,
      };
      fetch("https://focus-academy-server.vercel.app/selectclasses", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(selectClass),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            // refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Class Selected Successful",
              showConfirmButton: false,
              timer: 1500,
            });
          }

          setButtonDisabled(true);
        });
    } else {
      Swal.fire({
        title: "You have to sign in to select the class",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sign In",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/signin", { state: { from: location } });
        }
      });
    }
  };
  // console.log("User From useAuth:", user);

  if (user && user?.email) {
    fetch(
      `https://focus-academy-server.vercel.app/selectclasses?email=${user?.email}`,
      {
        headers: {
          authorization: `bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((mySelectClasses) => {
        // console.log(mySelectClasses);
        const selectedClass = mySelectClasses.find(
          (item) => item.class_id === _id
        );
        // console.log(selectedClass);
        if (selectedClass) {
          setButtonDisabled(true);
        }
      });
  }

  return (
    <div
      className={`card card-side ${
        available_seats === 0 ? "bg-red-500 text-white" : "bg-base-100"
      } shadow-xl`}
    >
      <figure>
        <img src={class_image} alt="Class Image" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{class_name}</h2>
        <img className="w-20 rounded-full" src={instructor_image} alt="" />
        <div>
          <p className="text-xl font-serif font-semibold">
            Instructor: {instructor_name}
          </p>
          <p className="text-lg my-3">Available Seats: {available_seats}</p>
          <p className="text-lg">Course Fee: ${price}</p>
        </div>
        <div className="card-actions items-end justify-end h-full">
          <button
            onClick={handleSelectClass}
            disabled={selectDisabled || buttonDisabled}
            className={buttonClasses}
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
