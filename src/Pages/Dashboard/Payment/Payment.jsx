import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../../../components/CheckOutForm";
import useMySelectedClasses from "../../../Hooks/useMySelectedClasses";

const Payment = () => {
  const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
  const [mySelectClasses] = useMySelectedClasses();
  const total = mySelectClasses
    .reduce((sum, selectClass) => selectClass.price + sum, 0)
    .toFixed(2);
  const price = parseFloat(total);
  console.log(price);
  return (
    <section className="w-full -mt-20 mb-10">
      <Helmet>
        <title>Payment | Focus Academy</title>
      </Helmet>
      <SectionTitle heading="Payment" />
      <div className="px-10">
        <div className="w-1/2 mx-auto mt-20">
          <Elements stripe={stripePromise}>
            <CheckOutForm
              price={price}
              mySelectClasses={mySelectClasses}
            ></CheckOutForm>
          </Elements>
        </div>
      </div>
    </section>
  );
};

export default Payment;
