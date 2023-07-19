import React from "react";
import { useState, useEffect } from "react";
import { Table, Form, Button, Row, Col, Spinner } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useProfileMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { useGetUserOrdersQuery } from "../slices/ordersApiSlice";
import { FaTimes } from "react-icons/fa";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  const { data: orders, isLoading, error } = useGetUserOrdersQuery();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo, userInfo.name, userInfo.email]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success("Profile Updated Successfully");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    }
  };
  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>

        <Form
          onSubmit={submitHandler}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Form.Group controlId="name" className="my-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email" className="my-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password" className="my-2">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirm Password" className="my-2">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary" className="my-2">
            {loadingUpdateProfile && (
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
                style={{ marginRight: "1rem" }}
              />
            )}
            Update
          </Button>
        </Form>
      </Col>

      {userInfo.isAdmin === true &&
        (error ? (
          <Col md={9}>
            <Message variant="danger">
              {error?.data?.message || error.message}
            </Message>
          </Col>
        ) : (
          <Col md={9}>
            <h2 style={{ display: "flex", justifyContent: "center" }}>
              Admin Chat Section
            </h2>
          </Col>
        ))}

      {!userInfo.isAdmin && (
        <Col md={9}>
          <h2 style={{ display: "flex", justifyContent: "center" }}>
            My Orders
          </h2>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">
              {error?.data?.message || error.message}
            </Message>
          ) : (
            <Table striped hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      ORDER_ID
                    </div>
                  </th>
                  <th>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      DATE
                    </div>
                  </th>
                  <th>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      TOTAL
                    </div>
                  </th>
                  <th>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      PAID
                    </div>
                  </th>
                  <th>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      DELIVERED
                    </div>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "6px",
                        }}
                      >
                        {order._id}
                      </div>
                    </td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "6px",
                        }}
                      >
                        {order.createdAt.substring(0, 10)}
                      </div>
                    </td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "6px",
                        }}
                      >
                        ${order.totalPrice}
                      </div>
                    </td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "6px",
                        }}
                      >
                        {order.isPaid === true ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          <FaTimes style={{ color: "red" }} />
                        )}
                      </div>
                    </td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "6px",
                        }}
                      >
                        {order.isDelivered === true ? (
                          order.deliveredAt.substring(0, 10)
                        ) : (
                          <FaTimes style={{ color: "red" }} />
                        )}
                      </div>
                    </td>
                    <td>
                      <LinkContainer
                        to={`/orderDetails/${order._id}`}
                        style={{ color: "ghostwhite" }}
                      >
                        <Button className="btn-sm" variant="dark">
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      )}
    </Row>
  );
};

export default ProfileScreen;
