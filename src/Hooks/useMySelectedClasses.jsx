import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useMySelectedClasses = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const { refetch, data: mySelectedClasses = [] } = useQuery(
    ["selectclasses", user?.email],
    async () => {
      if (!user || loading) {
        // Return a placeholder or empty array when user or loading is true
        return [];
      }
      const response = await axiosSecure(`/selectclasses?email=${user.email}`);
      return response.data;
    },
    {
      enabled: !!user && !loading,
    }
  );

  return [mySelectedClasses, refetch];
};

export default useMySelectedClasses;
