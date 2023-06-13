import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const InstructorHome = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const { data: myclasses = [] } = useQuery(["myclasses"], async () => {
    const res = await axiosSecure.get(`/myclasses?email=${user?.email}`);
    return res.data;
  });
  const approvedClass = myclasses.filter((item) => item.status === "Approved");
  const pendingClass = myclasses.filter((item) => item.status === "Pending");
  const deniedClass = myclasses.filter((item) => item.status === "Deny");

  return (
    <section className="w-full mb-10 -mt-20">
      <Helmet>
        <title>Instructor Home | Focus Academy</title>
      </Helmet>
      <SectionTitle heading="My Dashboard" />
      <div className="mx-10">
        <h2 className="text-3xl font-bold font-serif">
          Hi {user?.displayName}, Welcome Back
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-5">
          <div className="border-2 text-center flex items-center justify-center bg-gray-100">
            <img className="w-72 p-10" src={user?.photoURL} alt="" />
          </div>
          <div className="mx-5 grid grid-cols-1 gap-3">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-serif font-bold ">
                My Total Classes:{" "}
              </h2>
              <span className="w-32 h-24 bg-gray-200 flex items-center justify-center text-4xl font-bold  rounded-lg ">
                {myclasses.length}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-serif font-bold ">
                Approved Classes:
              </h2>
              <span className="w-32 h-24 bg-gray-200 flex items-center justify-center text-4xl font-bold  rounded-lg ">
                {approvedClass.length}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-serif font-bold ">
                Pending Classes:
              </h2>
              <span className="w-32 h-24 bg-gray-200 flex items-center justify-center text-4xl font-bold  rounded-lg ">
                {pendingClass.length}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-serif font-bold ">
                Denied Classes:
              </h2>
              <span className="w-32 h-24 bg-gray-200 flex items-center justify-center text-4xl font-bold  rounded-lg ">
                {deniedClass.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstructorHome;
