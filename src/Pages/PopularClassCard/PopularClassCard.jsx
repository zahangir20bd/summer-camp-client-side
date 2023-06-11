import { useParams } from "react-router-dom";

const PopularClassCard = () => {
  const { id } = useParams();
  console.log("Id from Params", id);

  return (
    <div>
      <h1>{id}</h1>
    </div>
  );
};

export default PopularClassCard;
