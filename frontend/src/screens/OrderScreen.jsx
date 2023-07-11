import { Link, useParams } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
} from "../slices/ordersApiSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import React from "react";
import { useEffect } from "react";

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const { data: order, refetch ,isLoading, error } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(()=>{
    if(!errorPayPal && !loadingPayPal && paypal.clientId){
      const loadPayPalScript = async() => {
        paypalDispatch({
          type: 'resetOptions',
          value : {
            'client-id': paypal.clientId,
            currency: 'USD',
          }
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending'});
      }
      if(order && !order.isPaid){
        if(!window.paypal){
          loadPayPalScript();
        }
      }
    }

  }, [order,paypal, paypalDispatch, loadingPayPal, errorPayPal]);

  function onApprove(data , actions) {
    return actions.order.capture().then(async function (details){ 
      try {
        await payOrder({orderId, details});
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error.message);
        
      }
    });
  }
  async function onApproveTest() { 
     await payOrder({ orderId, details : { payer: {} } });
     refetch();
     toast.success('Payment successfull')
  }
  function onError(err) { 
    toast.error(err.message);
  }
  function createOrder(data, actions) {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: order.totalPrice,
          }
        }
      ]
    })
    .then((orderId) => {
      return orderId;
    });
   }

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger" />
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
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
              {order.isDelivered ? (
                <Message variant="success">Delivered</Message>
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
                <Message variant="success">Paid on { order.paidAt}</Message>
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
                    <Col md={1}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col>
                      <Link
                        to={`/product/${item.product}`}
                        style={{ textDecoration: "none" }}
                      >
                        {item.name}
                      </Link>
                    </Col>
                    <Col md={4}>
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
                    <Col>Items:</Col>
                    <Col>${order.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping Price:</Col>
                    <Col>${order.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax Price:</Col>
                    <Col>${order.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Total Price:</strong>
                    </Col>
                    <Col>${order.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
                {!order.isPaid && (
                  <ListGroup.Item>
                    {loadingPay && <Loader />}

                    {isPending ? (
                      <Loader />
                    ) : (
                      <div
                        style={{ display: "flex",flexDirection: 'column', justifyContent: "center" }}
                      >
                        {/* <Button
                          onClick={onApproveTest}
                          style={{ marginBottom: "10px" }}
                        >
                          Test Pay Order
                        </Button> */}
                        <div>
                          <PayPalButtons
                            createOrder={createOrder}
                            onApprove={onApprove}
                            onError={onError}
                          ></PayPalButtons>
                        </div>
                      </div>
                    )}
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

export default OrderScreen;
