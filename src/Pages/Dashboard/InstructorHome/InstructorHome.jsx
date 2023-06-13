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
  const deniedClass = myclasses.filter((item) => item.status === "Pending");

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
          <div>
            <div className="flex items-center justify-center gap-2">
              <h2 className="text-2xl font-serif font-bold ">
                My Total Classes:{" "}
              </h2>
              <span className="w-32 h-24 bg-gray-200 flex items-center justify-center text-4xl font-bold  rounded-lg ">
                {myclasses.length}
              </span>
            </div>
            <div>
              <h2>My Approved Classes: {approvedClass.length}</h2>
            </div>
            <div>
              <h2>My Pending Classes: {pendingClass.length}</h2>
            </div>
            <div>
              <h2>My Denied Classes: {deniedClass.length}</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstructorHome;
