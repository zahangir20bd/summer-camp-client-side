import { useState } from "react";

const ClassCard = ({ singleClass }) => {
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const {
    class_image,
    class_name,
    instructor_image,
    instructor_name,
    available_seats,
    price,
  } = singleClass;

  console.log(singleClass);

  const selectDisabled = available_seats === 0;

  const buttonClasses = `btn btn-ghost border-slate-700 border-b-4 ${
    selectDisabled || buttonDisabled ? " cursor-not-allowed" : ""
  }`;

  const handleSelectClass = ({ singleClass }) => {
    console.log(singleClass);

    setButtonDisabled(true);
  };

  return (
    <div
      className={`card card-side ${
        available_seats === 0 ? "bg-red-500 text-white" : "bg-base-100"
      } shadow-xl`}
    >
      <figure>
        <img src={class_image} alt="Movie" />
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
            onClick={() => handleSelectClass(singleClass)}
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
