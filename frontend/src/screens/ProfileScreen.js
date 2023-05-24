// Bug in this file...The changes in the form if successful, do not persist


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";

const ProfileScreen = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { success } = userUpdateProfile // if update is successful

    const submitHandler = (e) => {
        e.preventDefault(); // allows us to have single page application behaviour. This prevents the traditional form submission behaviour
        setMessage(null)
        setIsSuccess(false)
        if (password !== confirmPassword) {
            setMessage("Password do not match");
        } else {
            dispatch(updateUserProfile({ name, email, password }))  // see updateUserProfile controller
            if (success === true) {
                setIsSuccess(true);
            }
        }
    };

    useEffect(() => {
        if (!userInfo) { // if user is null
            navigate('/login');
        }
        else {
            if (!user.name) {
                dispatch(getUserDetails('profile'))
            }
            else {
                setEmail(user.email)
                setName(user.name)
            }
        }
    }, [dispatch, navigate, userInfo, user]);

    return <Row>
        <Col md={3}>
            <h2>User Profile</h2>
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {isSuccess && <Message variant='success'>Profile Updated!</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="name"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Re-enter Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary">
                    Update
                </Button>
            </Form>
        </Col>
        <Col md={9}>
            <h2>My orders</h2>
        </Col>
    </Row>
};

export default ProfileScreen;