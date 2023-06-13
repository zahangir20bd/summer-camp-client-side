import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";

const CheckOutForm = ({ price, mySelectClasses }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [paymentError, setPaymentError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    if (price > 0) {
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        // console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setTransactionId("");
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setPaymentError(error.message);
    } else {
      setPaymentError("");
      // console.log("Payment Method", paymentMethod);
    }

    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "unknown",
            email: user?.email || "no email",
          },
        },
      });
    if (confirmError) {
      console.log(confirmError);
      // setPaymentError(confirmError);
    }

    // console.log("payment Intent", paymentIntent);

    setProcessing(false);

    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);

      // API POST for Save Payment information
      const payment = {
        user_name: user?.displayName,
        user_email: user?.email,
        transactionId: paymentIntent.id,
        pay_amount: price,
        date: new Date(),
        quantity: mySelectClasses.length,
        payment_classes: mySelectClasses.map((item) => item._id),
        enrolled_classes: mySelectClasses.map(
          (selectedClass) => selectedClass.class_id
        ),
        status: "Pending",
      };

      axiosSecure.post("/payments", payment).then((res) => {
        // console.log(res.data);
        if (res.data.insertedId) {
          // display confirmation
        }
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <div className="w-2/3 mx-auto">
          <button
            className="btn btn-neutral text-white w-full mt-5"
            type="submit"
            disabled={!stripe || !clientSecret || processing}
          >
            Pay
          </button>
        </div>
      </form>
      <div className="w-full text-center mt-5">
        {paymentError && <span className=" text-red-500">{paymentError}</span>}
        {transactionId && (
          <span className="text-green-700">
            Transaction Successful. Your TransactionID: {transactionId}
          </span>
        )}
      </div>
    </>
  );
};

export default CheckOutForm;
