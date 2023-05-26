import React, { useState, useEffect } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getOrderDetails, updateOrderPayStatus } from "../actions/orderActions";
import { ORDER_PAY_RESET } from "../constants/orderConstants";

const OrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let { id } = useParams(); // gets the orderID from the url (OrderId)

  const [SDKready, SetSDKReady] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { orderInfo, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay; // renaming loading to loadingPay

  useEffect(() => {
    const injectPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal"); // renaming data to clientId

      //Creating script dynamically
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        // script ready, SDK ready
        SetSDKReady(true);
      };

      //injecting the script in the HTML
      document.body.appendChild(script);
    };

    if (!orderInfo || orderInfo._id !== id || successPay) {
      // TO AVOID INFINITE LOOP/REFRESHING AFTER PAYING
      dispatch({
        type: ORDER_PAY_RESET,
      });
      /* if order does not exist, or,
         the fetched orderid does not match the required order id ,or,
         if payment is successful, then dispatch and fetch the required order */
      dispatch(getOrderDetails(id)); // passing order id
    } else if (!orderInfo.isPaid) {
      // if order is not paid
      if (!window.paypal) {
        // if paypal script is not there
        injectPayPalScript();
      } else {
        SetSDKReady(true);
      }
    }

    if (successPay === true) {
      navigate("/profile");
    }
  }, [dispatch, orderInfo, id, successPay]);

  // React Paypal button documentation- https://www.npmjs.com/package/react-paypal-button-v2
  const successPaymentHandler = (paymentStatus) => {
    dispatch(updateOrderPayStatus(id, paymentStatus)); // action takes {orderId,paymentStatus}
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order {orderInfo._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {orderInfo.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${orderInfo.user.email}`}>
                  {orderInfo.user.email}
                </a>
              </p>
              <p>
                <strong>Address: </strong>
                {orderInfo.shippingAddress.address},{" "}
                {orderInfo.shippingAddress.city},{" "}
                {orderInfo.shippingAddress.postalCode},{" "}
                {orderInfo.shippingAddress.country}
              </p>
              {orderInfo.isDelivered ? (
                <Message variant="success">
                  Delivered on {orderInfo.deliveredAt}
                </Message>
              ) : (
                <Message variant="warning">Not yet Delivered.</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment</h2>
              <p>
                <strong>Gateway: </strong>
                {orderInfo.paymentGateway}
              </p>
              {orderInfo.isPaid ? (
                <Message variant="success">Paid on {orderInfo.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Orders</h2>
              {orderInfo.orderItems.length === 0 ? (
                <Message>Empty Order!</Message>
              ) : (
                <ListGroup variant="flush">
                  {orderInfo.orderItems.map((eachItem, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={eachItem.image}
                            alt={eachItem.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link
                            to={`/product/${eachItem.product}`} // product is the product_id in mongoDB
                            className="bold-up-link"
                          >
                            {eachItem.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {eachItem.quantity} x ${eachItem.price} = $
                          {eachItem.quantity * eachItem.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${orderInfo.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${orderInfo.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${orderInfo.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${orderInfo.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {/* React Paypal button documentation- https://www.npmjs.com/package/react-paypal-button-v2 */}
              {!orderInfo.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!SDKready ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={orderInfo.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
