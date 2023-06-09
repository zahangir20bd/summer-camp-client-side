import Banner from "../Banner/Banner";
import OfferedClass from "../OfferedClass/OfferedClass";
import PopularClasses from "../PopularClasses/PopularClasses";
import PopularInstructors from "../PopularInstructors/PopularInstructors";
import Reviews from "../Reviews/Reviews";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <PopularClasses></PopularClasses>
      <PopularInstructors></PopularInstructors>
      <OfferedClass></OfferedClass>
      <Reviews></Reviews>
      <h2>This is Home</h2>
    </div>
  );
};

export default Home;
