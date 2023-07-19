import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import OrderScreen_PayPal from "../screens/orderScreens/OrderScreen_PayPal";
import OrderScreen_Stripe from "../screens/orderScreens/OrderScreen_Stripe";
import { useParams } from "react-router-dom";

const PaymentRoute = () => {
  const {id: gateway} = useParams();


  if (gateway === "PayPal") {
    return (
      <PayPalScriptProvider>
        <OrderScreen_PayPal />
      </PayPalScriptProvider>
    );
  } else {
    return <OrderScreen_Stripe />;
  }
};

export default PaymentRoute;
