import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle";

const InstructorHome = () => {
  return (
    <div>
      <Helmet>
        <title>Instructor Home | Focus Academy</title>
      </Helmet>
      <SectionTitle heading="My Dashboard" />
    </div>
  );
};

export default InstructorHome;
