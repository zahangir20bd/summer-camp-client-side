// import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";

const useClasses = () => {
  // const [classes, setClasses] = useState([]);

  const { refetch, data: classes = [] } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/classes`);
      return res.json();
    },
  });

  const sortClasses = [...classes].sort(
    (a, b) => a.available_seats - b.available_seats
  );

  const popularClasses = sortClasses.slice(0, 6);

  return [classes, popularClasses, refetch];
};

export default useClasses;
