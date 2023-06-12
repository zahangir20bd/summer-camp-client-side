import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useInstructor = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const { data: isInstructor, isLoading: isInstructorLoading } = useQuery({
    queryKey: ["isInstructor", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/users/instructor/${user?.email}`
      );
      // console.log("isInstructor response", response);
      return response.data.instructor;
    },
    enabled: !!user?.email && !loading,
  });
  return [isInstructor, isInstructorLoading];
};

export default useInstructor;
