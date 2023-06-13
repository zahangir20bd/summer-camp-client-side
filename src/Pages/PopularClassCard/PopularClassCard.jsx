/* eslint-disable no-unused-vars */
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import useClasses from "../../Hooks/useClasses";
import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../components/SectionTitle";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import useAdmin from "../../Hooks/useAdmin";
import useInstructor from "../../Hooks/useInstructor";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useMySelectedClasses from "../../Hooks/useMySelectedClasses";
import { useQuery } from "@tanstack/react-query";

const PopularClassCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const { user, loading } = useAuth();
  const [, popularClasses] = useClasses();
  const [, refetch] = useMySelectedClasses();
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();
  const [axiosSecure] = useAxiosSecure();

  const { id } = useParams();

  // filter expected popular class
  const popularClass = popularClasses.find(
    (singleClass) => singleClass._id === id
  );

  // select button disable if condition is true
  const selectDisabled =
    popularClass?.available_seats === 0 || isAdmin || isInstructor;

  // conditional class for select button
  const buttonClasses = `btn btn-ghost border-slate-700 border-b-4 ${
    selectDisabled || buttonDisabled ? " cursor-not-allowed" : ""
  }`;

  // Handle Select Option and add to database
  const handleSelectClass = () => {
    if (user && user?.email) {
      const selectClass = {
        class_id: popularClass?._id,
        class_image: popularClass?.class_image,
        class_name: popularClass?.class_name,
        instructor_image: popularClass?.instructor_image,
        instructor_name: popularClass?.instructor_name,
        available_seats: popularClass?.available_seats,
        price: popularClass?.price,
        user_email: user.email,
      };
      axiosSecure.post("/selectclasses", selectClass).then((res) => {
        console.log("select class", res.data);
        if (res.data.insertedId) {
          refetch();
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

  // // Conditional disable select button if class select previous
  const { data: mySelectClasses = [] } = useQuery(
    ["mySelectClasses"],
    async () => {
      const res = await axiosSecure.get(`/selectclasses?email=${user?.email}`);
      // console.log("select classes", res.data);
      const selectedClass = res.data.find(
        (item) => item.class_id === popularClass._id
      );
      if (selectedClass) {
        setButtonDisabled(true);
      }
      // console.log(selectedClass);
      return res.data;
    },
    {
      enabled: !!user && !loading,
    }
  );

  return (
    <section className="pt-1">
      <Helmet>
        <title>Popular Class | Focus Academy</title>
      </Helmet>
      <SectionTitle heading={popularClass?.class_name}></SectionTitle>
      <div
        className={`card card-side my-10 md:w-2/3 mx-auto ${
          popularClass?.available_seats === 0
            ? "bg-red-500 text-white"
            : "bg-base-100"
        } shadow-xl`}
      >
        <figure>
          <img src={popularClass?.class_image} alt="Class Image" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{popularClass?.class_name}</h2>
          <img
            className="w-20 rounded-full"
            src={popularClass?.instructor_image}
            alt=""
          />
          <div>
            <p className="text-xl font-serif font-semibold">
              Instructor: {popularClass?.instructor_name}
            </p>
            <div className="text-lg my-3">
              <Rating
                className="text-warning my-2"
                style={{ maxWidth: 120 }}
                value={popularClass?.ratings}
                readOnly
              />
            </div>
            <p className="text-lg my-3">
              Available Seats: {popularClass?.available_seats}
            </p>
            <p className="text-lg">Course Fee: ${popularClass?.price}</p>
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
    </section>
  );
};

export default PopularClassCard;
