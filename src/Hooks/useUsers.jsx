import { useQuery } from "@tanstack/react-query";

const useUsers = () => {
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/users`);
      return res.json();
    },
  });

  const admins = users.filter((user) => user.user_role === "Admin");

  const instructors = users.filter((user) => user.user_role === "Instructor");

  const students = users.filter((user) => user.user_role === "Student");

  return [users, admins, instructors, students, refetch];
};

export default useUsers;
