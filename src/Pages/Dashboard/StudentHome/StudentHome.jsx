import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle";
import useAuth from "../../../Hooks/useAuth";
import useMySelectedClasses from "../../../Hooks/useMySelectedClasses";

const StudentHome = () => {
  const { user } = useAuth();
  const [mySelectClasses] = useMySelectedClasses();

  return (
    <div className="w-full mb-10 -mt-20">
      <Helmet>Student Home | Focus Academy</Helmet>
      <SectionTitle heading="MY Dashboard" />
      <div className="mx-10">
        <h2 className="text-3xl font-bold mt-3 mb-5 font-serif">
          Hi {user?.displayName}, Welcome Back
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="px-2 border-2 text-center">
            <img className="w-10/12 py-3 mx-auto" src={user?.photoURL} alt="" />
          </div>
          <div className="px-2">
            <div className="flex items-center gap-2 my-5">
              <h2 className="text-2xl">My Selected Classes</h2>
              <div className="w-28 h-20 bg-slate-400 flex items-center justify-center rounded-lg">
                <span className="text-4xl font-bold">
                  {mySelectClasses.length}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 my-5">
              <h2 className="text-2xl">My Enrolled Classes</h2>
              <div className="w-28 h-20 bg-cyan-200 flex items-center justify-center rounded-lg">
                <span className="text-4xl font-bold">0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
