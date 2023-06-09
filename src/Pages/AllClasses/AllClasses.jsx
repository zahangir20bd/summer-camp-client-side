import { Helmet } from "react-helmet-async";
import useClasses from "../../Hooks/useClasses";
import SectionTitle from "../../components/SectionTitle";
import ClassCard from "./ClassCard";

const AllClasses = () => {
  const [classes] = useClasses();
  console.log(classes);

  return (
    <div className="pt-1 mb-20">
      <Helmet>
        <title>Classes | Focus Academy</title>
      </Helmet>
      <SectionTitle heading="All Classes"></SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {classes.map((singleClass) => (
          <ClassCard
            key={singleClass._id}
            singleClass={singleClass}
          ></ClassCard>
        ))}
      </div>
    </div>
  );
};

export default AllClasses;
