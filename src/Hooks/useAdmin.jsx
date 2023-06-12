import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: ["isAdmin", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/users/admin/${user?.email}`);
      // console.log("isAdmin response", response);
      return response.data.admin;
    },
    enabled: !!user?.email && !loading,
  });
  return [isAdmin, isAdminLoading];
};

export default useAdmin;
