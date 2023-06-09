import Swiper from "react-id-swiper";

import SectionTitle from "../../../components/SectionTitle";
import useClasses from "../../../Hooks/useClasses";
import { Link } from "react-router-dom";

const PopularClasses = () => {
  const [, popularClasses] = useClasses();

  //   console.log(classes);

  console.log(popularClasses);

  const params = {
    slidesPerView: 4,
    spaceBetween: 30,
    grabCursor: true,
    freeMode: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  };

  return (
    <section className="overflow-hidden ">
      <SectionTitle heading="Popular Classes"></SectionTitle>

      <Swiper {...params}>
        {popularClasses.map((singleClass) => (
          <div key={singleClass._id}>
            <img src={singleClass.class_image} alt="" />
            <p className="absolute bottom-3 text-white px-1">
              {singleClass.class_name}
            </p>
          </div>
        ))}
      </Swiper>
      <div className="flex items-center justify-center mt-10">
        <Link to="classes">
          <button className="btn btn-ghost border-slate-700 border-b-4">
            View All Classes
          </button>
        </Link>
      </div>
    </section>
  );
};

export default PopularClasses;
