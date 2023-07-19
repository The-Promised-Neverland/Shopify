import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Button,
  Spinner,
} from "react-bootstrap";
import Message from "../../components/Message";
import { useCreateOrderMutation, useStripeCheckoutSessionMutation } from "../../slices/ordersApiSlice";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const OrderScreen_Stripe = () => {
  const navigate = useNavigate();

  const [URL, setURL] = useState(null);
  const { userInfo } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (!cart || cart.cartItems.length === 0 || !userInfo) {
      navigate("/");
    }
  }, [cart, userInfo]);

  const [
    StripeCheckoutSession,
    { isLoading: stripeLoading, error: stripeError },
  ] = useStripeCheckoutSessionMutation();

  useEffect(() => {
    const loadStripeSession = async () => {
      try {
        const { data } = await StripeCheckoutSession({
          orderItems: cart.cartItems,
          itemsPrice: cart.itemsPrice,
          userID: userInfo._id,
          shippingAddress: cart.shippingAddress,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
        });
        setURL(data.url)
      } catch (error) {
        console.error(error);
      }
    };

    loadStripeSession();
  }, []);

  return (
    <>
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        Payment via Stripe
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
                {stripeLoading === false ? (
                  <>
                    {stripeError ? (
                      <Message variant="danger">Reload the page</Message>
                    ) : (
                      <Button
                        style={{ padding: "0", border: "none" }}
                        onClick={() => (window.location.href = URL)}
                      >
                        <Image
                          src="https://user-images.githubusercontent.com/157270/38515749-f53f8392-3be9-11e8-8917-61ef78dd354a.png"
                          alt="Stripe"
                          style={{ height: "4.2rem" }}
                        />
                      </Button>
                    )}
                  </>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <Spinner animation="border" />
                    <span>Loading Stripe...</span>
                  </div>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen_Stripe;
