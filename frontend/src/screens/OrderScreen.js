import React, { useState, useEffect } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  getOrderDetails,
  updateOrderDeliverStatus,
  updateOrderPayStatus,
} from "../actions/orderActions";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstants";

const OrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let { id } = useParams(); // gets the orderID from the url (OrderId)

  const [SDKready, SetSDKReady] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { orderInfo, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay; // renaming loading to loadingPay

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver; // renaming loading to loadingPay

  // React Paypal button documentation- https://www.npmjs.com/package/react-paypal-button-v2
  const successPaymentHandler = (paymentStatus) => {
    dispatch(updateOrderPayStatus(id, paymentStatus)); // action takes {orderId,paymentStatus}
  };

  const deliveryHandler = (orderId) => {
    dispatch(updateOrderDeliverStatus(orderId));
  };

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

    if (!userInfo) {
      // user not loaded
      navigate("/login");
    }
    /* if order does not exist, or,
       the fetched orderid does not match the required order id ,or,
       if payment is successful, then dispatch and fetch the required order */
    if (!orderInfo || orderInfo._id !== id || successPay || successDeliver) {
      dispatch(getOrderDetails(id)); // order id
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
  }, [dispatch, navigate, orderInfo, userInfo, id, successPay, successDeliver]);

  return loading || Object.entries(orderInfo).length === 0 ? (
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
              {orderInfo.isDelivered === true ? (
                <Message variant="success">
                  Delivered on {orderInfo.deliveredAt.substring(0, 10)}
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

              {loadingDeliver && <Loader />}
              {errorDeliver && (
                <Message variant="danger">{errorDeliver}</Message>
              )}
              {!orderInfo.isDelivered &&
                orderInfo.isPaid === true &&
                userInfo.isAdmin === true && (
                  <ListGroup.Item style={{ display: "contents" }}>
                    <Button onClick={() => deliveryHandler(orderInfo._id)}>
                      Mark as Delivered
                    </Button>
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
