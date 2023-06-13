import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

import "swiper/css";
import "swiper/css/navigation";
import SectionTitle from "../../../components/SectionTitle";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("https://focus-academy-server.vercel.app/reviews")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      });
  }, []);
  // console.log(reviews);

  return (
    <section className="mb-20">
      <SectionTitle heading="Inspiring Reviews"></SectionTitle>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper mt-20"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review._id}>
            <div className="flex flex-col items-center justify-center gap-5">
              <div className="w-28">
                <img
                  className="rounded-full"
                  src={review.reviewer_image}
                  alt=""
                />
              </div>

              <Rating
                className="text-warning"
                style={{ maxWidth: 180 }}
                value={review.rating}
                readOnly
              />
              <p className="w-10/12">{review.review}</p>
              <h2 className="text-2xl font-semibold">{review.reviewer}</h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Reviews;
