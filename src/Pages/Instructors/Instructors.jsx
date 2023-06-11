import { Helmet } from "react-helmet-async";
import SectionTitle from "../../components/SectionTitle";
import { Link } from "react-router-dom";
import { FaLink } from "react-icons/fa";
import "./Instructors.css";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import useUsers from "../../Hooks/useUsers";

const Instructors = () => {
  const [, , instructors] = useUsers();

  return (
    <section className="pt-1 mb-10">
      <Helmet>
        <title>Instructors | Focus Academy</title>
      </Helmet>
      <SectionTitle heading="Respective Instructors"></SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {instructors.map((instructor) => (
          <div
            key={instructor._id}
            className="card mx-auto w-96 bg-base-100 shadow-xl"
          >
            <figure className="imgHover">
              <img
                src={instructor.user_image}
                alt="Instructor Image"
                className="rounded-t-xl"
              />
              <Link className="text-4xl text-white z-10">
                <FaLink className="ProfileLink" />
              </Link>
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Name: {instructor.user_name}</h2>
              <p className="text-lg">Email: {instructor.user_email}</p>
              <p className="text-lg">Phone: {instructor.phone_number}</p>

              <Rating
                className="text-warning my-2"
                style={{ maxWidth: 120 }}
                value={instructor.ratings}
                readOnly
              />

              <div className="flex items-center justify-between w-full">
                <p>
                  <span className="font-bold">Gender:</span> {instructor.gender}
                </p>
                <p>
                  <span className="font-bold">Date of Birth:</span>
                  {instructor.date_of_birth}
                </p>
              </div>
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

export default Instructors;
