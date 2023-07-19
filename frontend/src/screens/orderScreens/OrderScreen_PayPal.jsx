import { Link, useNavigate } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { Spinner } from "react-bootstrap";
import {
  usePlaceOrderMutation,
  useGetPayPalClientIdQuery,
} from "../../slices/ordersApiSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import React from "react";
import { useEffect } from "react";

const OrderScreen_PayPal = () => {
  const navigate = useNavigate();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const [placeOrder] = usePlaceOrderMutation();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();

  const { userInfo } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (!cart || cart.cartItems.length === 0 || !userInfo) {
      navigate("/");
    }
  }, [cart, userInfo]);

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (!window.paypal) {
        loadPayPalScript();
      }
    }
  }, []);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await placeOrder({
          orderItems: cart.cartItems, //array
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
          paymentDetails: details,
        });
        navigate("/success");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    });
  }

  function onError(err) {
    toast.error(err.message);
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: cart.totalPrice,
            },
          },
        ],
      })
      .then((order) => {
        return order; // Return the order ID here
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  return (
    <>
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        Order Details
      </h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <p>
                <strong>Name: </strong> {userInfo.name}
              </p>
              <p>
                <strong>Email: </strong> {userInfo.email}
              </p>
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Gateway</h2>
              <p>
                <strong>Payment Platform: </strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.map((item, index) => (
                <ListGroup.Item key={index} style={{ border: "0px" }}>
                  <Row>
                    <Col
                      md={2}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col style={{ display: "flex", alignItems: "center" }}>
                      <Link
                        to={`/product/${item.product}`}
                        style={{ textDecoration: "none" }}
                      >
                        {item.name}
                      </Link>
                    </Col>
                    <Col
                      md={4}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      {item.qty} x ${item.price} = ${item.qty * item.price}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col>
          <Card>
            <ListGroup variant="flush">
              <h2 style={{ display: "flex", justifyContent: "center" }}>
                Order Summary
              </h2>
              <ListGroup.Item>
                <Row>
                  <Col>MRP</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping Price</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax Price</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Final Price</strong>
                  </Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item
                style={{ display: "flex", justifyContent: "center" }}
              >
                {isPending ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <Spinner animation="border" />
                    <span>Loading PayPal...</span>
                  </div>
                ) : (
                  <ListGroup.Item style={{ width: "100%", paddingBottom: "0" }}>
                    <PayPalButtons
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={onError}
                    />
                  </ListGroup.Item>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen_PayPal;
