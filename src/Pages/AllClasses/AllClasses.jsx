import useClasses from "../../Hooks/useClasses";

const AllClasses = () => {
  const [classes] = useClasses();
  return (
    <div>
      <h2>Total Class: {classes.length} </h2>
    </div>
  );
};

export default AllClasses;
