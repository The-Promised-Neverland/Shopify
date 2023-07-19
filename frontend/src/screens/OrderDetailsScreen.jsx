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
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
} from "../slices/ordersApiSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const OrderDetailsScreen = () => {

  const { id: orderId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success("Order delivered");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };


  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger" />
  ) : (
    <>
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        Order Detail
      </h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong> {order.user.email}
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              <p>
                <strong>OrderID: </strong>
                {order._id}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Gateway</h2>
              <p>
                <strong>Payment Platform: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Item</h2>
              {order.orderItems.length === 0 && <span>not</span>}
              {order.orderItems.map((item, index) => (
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
              <ListGroup.Item
                style={{
                  backgroundColor: "ghostwhite",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <h2 style={{ display: "flex", justifyContent: "center" }}>
                  Order Summary
                </h2>
                <ListGroup.Item>
                  <Row>
                    <Col>MRP</Col>
                    <Col>${order.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping Price</Col>
                    <Col>${order.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax Price</Col>
                    <Col>${order.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Final Price</strong>
                    </Col>
                    <Col>${order.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
                

                {userInfo &&
                  userInfo.isAdmin === true &&
                  order.isPaid === true &&
                  order.isDelivered === false && (
                    <ListGroup.Item
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}
                    >
                      <Button
                        type="button"
                        className="btn btn-block"
                        onClick={deliverOrderHandler}
                      >
                        {loadingDeliver === true && (
                          <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                        )}
                        Mark as Delivered
                      </Button>
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

export default OrderDetailsScreen;
