import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card, ListGroupItem } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails } from "../actions/orderActions";


const OrderScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id } = useParams(); // gets the orderID from the url (OrderId)

    const orderDetails = useSelector((state) => state.orderDetails)
    const { orderInfo, loading, error } = orderDetails

    useEffect(() => {
        dispatch(getOrderDetails(id))  // passing order id
    }, [])

    return loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> :
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
                                <strong>Email: </strong><a href={`mailto:${orderInfo.user.email}`}>{orderInfo.user.email}</a>
                            </p>
                            <p>
                                <strong>Address: </strong>
                                {orderInfo.shippingAddress.address}, {orderInfo.shippingAddress.city}, {orderInfo.shippingAddress.postalCode}, {orderInfo.shippingAddress.country}
                            </p>
                            {orderInfo.isDelivered ? <Message variant='success'>Delivered on {orderInfo.deliveredAt}</Message> :
                                <Message variant='warning'>Not yet Delivered.</Message>}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment</h2>
                            <p>
                                <strong>Gateway: </strong>
                                {orderInfo.paymentGateway}
                            </p>
                            {orderInfo.isPaid ? <Message variant='success'>Paid on {orderInfo.paidAt}</Message> :
                                <Message variant='danger'>Not Paid</Message>}
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
                                                    <Image src={eachItem.image} alt={eachItem.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${eachItem.product}`} className="bold-up-link">
                                                        {eachItem.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {eachItem.quantity} x ${eachItem.price} = ${eachItem.quantity * eachItem.price}
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

                            <ListGroup.Item style={{ display: "contents" }}>
                                <Button style={{ margin: "7px" }} type="button" className="btn-block" disabled={orderInfo.orderItems.length === 0} >Pay Order</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
}

export default OrderScreen
