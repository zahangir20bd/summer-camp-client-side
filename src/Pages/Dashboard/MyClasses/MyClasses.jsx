import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle";

const MyClasses = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const { data: myclasses = [] } = useQuery(["myclasses"], async () => {
    const res = await axiosSecure.get(`/myclasses?email=${user?.email}`);
    return res.data;
  });
  return (
    <section className="w-full mb-10 -mt-20">
      <Helmet>
        <title>My Classes | Focus Academy</title>
      </Helmet>
      <SectionTitle heading="My All Classes" />
      <div className="px-10">
        <h2 className="text-2xl font-bold">
          My total classes: {myclasses.length}
        </h2>
        <table className="table">
          {/* Table Header */}
          <thead className="text-lg">
            <tr>
              <th>
                <label>#</label>
              </th>
              <th>Class Name</th>
              <th>Status</th>
              <th className="text-center">N. of Student</th>
              <th className="text-center">A. Seats</th>
              <th>Price</th>
              <th className="text-center">Feedback</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {myclasses.map((item, index) => (
              <tr key={item._id}>
                <th>
                  <label>{index + 1}</label>
                </th>
                <td>{item.class_name}</td>
                <td>{item.status}</td>
                <td className="text-center">
                  {item.status !== "Approved"
                    ? 0
                    : item.total_seats - item.available_seats}
                </td>
                <td className="text-center">
                  {item.status !== "Approved" ? 0 : item.available_seats}
                </td>
                <td>${item.price.toFixed(2)}</td>
                <td className="text-center">
                  {item.status === "Deny" && item.feedback?.feedback}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MyClasses;
