import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import OfferedClass from "../OfferedClass/OfferedClass";
import PopularClasses from "../PopularClasses/PopularClasses";
import PopularInstructors from "../PopularInstructors/PopularInstructors";
import Reviews from "../Reviews/Reviews";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home | Focus Academy</title>
      </Helmet>
      <Banner></Banner>
      <PopularClasses></PopularClasses>
      <PopularInstructors></PopularInstructors>
      <OfferedClass></OfferedClass>
      <Reviews></Reviews>
    </div>
  );
};

export default Home;
