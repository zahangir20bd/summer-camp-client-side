import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useMySelectedClasses = () => {
  const { user } = useAuth();

  const { refetch, data: mySelectClasses = [] } = useQuery({
    queryKey: ["selectclasses", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/selectclasses?email=${user?.email}`
      );
      return res.json();
    },
  });
  return [mySelectClasses, refetch];
};

export default useMySelectedClasses;
