import { Link } from "react-router-dom";
import useClasses from "../../../Hooks/useClasses";
import SectionTitle from "../../../components/SectionTitle";
import "./PopularInstructors.css";
import { FaLink } from "react-icons/fa";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const PopularInstructors = () => {
  const [, popularClasses] = useClasses();
  return (
    <section>
      <SectionTitle heading="Popular Instructors"></SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {popularClasses.map((instructor) => (
          <div
            key={instructor._id}
            className="card mx-auto w-96 bg-base-100 shadow-xl"
          >
            <figure className="imgHover">
              <img
                src={instructor.instructor_image}
                alt="Instructor Image"
                className="rounded-t-xl"
              />
              <Link className="text-4xl text-white z-10">
                <FaLink className="ProfileLink" />
              </Link>
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Name: {instructor.instructor_name}</h2>
              <p className="text-lg">Class Name: {instructor.class_name}</p>
              <Rating
                className="text-warning my-2"
                style={{ maxWidth: 120 }}
                value={instructor.ratings}
                readOnly
              />
              <div className="card-actions mt-5">
                <button className="btn btn-ghost border-slate-700 border-b-4">
                  See Classes
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularInstructors;
