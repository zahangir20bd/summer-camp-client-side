import { useQuery } from "@tanstack/react-query";

const useClasses = () => {
  const { refetch, data: classes = [] } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/classes`);
      return res.json();
    },
  });

  const approvedClasses = classes.filter(
    (singleClass) => singleClass.status === "Approved"
  );

  const sortClasses = [...approvedClasses].sort(
    (a, b) => a.available_seats - b.available_seats
  );

  const popularClasses = sortClasses.slice(0, 6);

  return [approvedClasses, popularClasses, classes, refetch];
};

export default useClasses;
