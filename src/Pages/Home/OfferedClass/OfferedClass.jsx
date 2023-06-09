/* eslint-disable react/no-unescaped-entities */
import SectionTitle from "../../../components/SectionTitle";
import "./OfferedClass.css";

const OfferedClass = () => {
  return (
    <div className="BackgroundImage bg-fixed text-white mt-20 bg-cover">
      <div className="w-full h-full bg-black bg-opacity-50 pt-1">
        <SectionTitle heading="Offered Class"></SectionTitle>
        <div className="md:flex justify-center items-center mt-10 pb-20 px-36">
          <div className="w-2/5">
            <img
              className="rounded-lg"
              src="https://i.ibb.co/HzF2GgR/tumblr-ms21cu-Ne-Jb1qa0ri9o1-1280.jpg"
              alt=""
            />
          </div>
          <div className="md:ms-10 w-3/5">
            <h4 className="text-lg">We Are Offering 30% Discount on</h4>
            <h2 className="text-2xl uppercase my-3">Wild Life Photography</h2>
            <p className="text-justify">
              "📸 Capture the beauty of wildlife! 🦁🌿 Join our exciting
              'Wildlife Photography' class and embark on an incredible journey
              to master the art of capturing nature's most magnificent
              creatures. 🐾✨ For a limited time, we're thrilled to offer a
              special discount of 30% off on the 'Wildlife Photography' class.
              Don't miss this opportunity to learn from our expert instructor,
              Jennifer Adams, and develop your skills in photographing wildlife
              in their natural habitats. 📷🌍 Reserve your spot today and unlock
              the secrets of wildlife photography at an unbeatable price! 🎉🐆
              #WildlifePhotography #PhotographyClass #DiscountOffer"
            </p>
            <button className="btn btn-ghost  border-slate-700 border-b-4 mt-5">
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferedClass;
