import { FaQuoteLeft } from "react-icons/fa";
const SectionTitle = ({ heading }) => {
  return (
    <div className="mt-28 mb-10 text-center w-1/2 md:w-1/4 mx-auto">
      <h2 className="text-3xl font-bold font-serif text-center">{heading}</h2>
      <div className="divider">
        <FaQuoteLeft className="text-3xl" />
      </div>
    </div>
  );
};

export default SectionTitle;
