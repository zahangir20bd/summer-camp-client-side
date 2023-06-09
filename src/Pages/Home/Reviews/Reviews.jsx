import { useEffect, useState } from "react";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("reviews.json")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      });
  }, []);
  console.log(reviews);

  return <h2>{reviews.length}</h2>;
};

export default Reviews;
