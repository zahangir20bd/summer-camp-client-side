import { useEffect, useState } from "react";

const useClasses = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/classes")
      .then((res) => res.json())
      .then((data) => {
        setClasses(data);
      });
  }, []);

  //   sorting minimum available seats to maximum available seats
  const sortClasses = [...classes].sort(
    (a, b) => a.available_seats - b.available_seats
  );
  //   console.log(newClasses);

  const popularClasses = sortClasses.slice(0, 6);
  //   console.log(popularClasses);

  return [classes, popularClasses];
};

export default useClasses;
