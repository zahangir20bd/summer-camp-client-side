import Banner from "../Banner/Banner";
import OfferedClass from "../OfferedClass/OfferedClass";
import PopularClasses from "../PopularClasses/PopularClasses";
import PopularInstructors from "../PopularInstructors/PopularInstructors";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <PopularClasses></PopularClasses>
      <PopularInstructors></PopularInstructors>
      <OfferedClass></OfferedClass>
      <h2>This is Home</h2>
    </div>
  );
};

export default Home;
