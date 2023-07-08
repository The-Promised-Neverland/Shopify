import { useState } from "react";
import {Form , Button} from 'react-bootstrap';
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddrress } from "../slices/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";


const ShippingScreen = () => {
    const cart = useSelector((state) => state.cart);
    const {shippingAddress} = cart;
    
    
    const [address, setAddress] = useState(shippingAddress?.address || '');
    const [city, setCity] = useState(shippingAddress?.city || "");
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || "");
    const [country, setCountry] = useState(shippingAddress?.country || "");
    const dispatch = useDispatch();
    const navigate= useNavigate();


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddrress({address , city ,postalCode, country}));
        navigate('/payment');

    }
    return (
      <FormContainer>
        <CheckoutSteps step1 step2 />
        <h1>Shipping Screen</h1>

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="address" className="my-2">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="='text"
              placeholder="Enter Address"
              value={address}
              onChange={(f) => setAddress(f.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="city" className="my-2">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="='text"
              placeholder="Enter city"
              value={city}
              onChange={(f) => setCity(f.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="postalCode" className="my-2">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type="='text"
              placeholder="Enter postalCode"
              value={postalCode}
              onChange={(f) => setPostalCode(f.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="country" className="my-2">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="='text"
              placeholder="Enter country"
              value={country}
              onChange={(f) => setCountry(f.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant="primary" className="my-2">
            Continue
          </Button>
        </Form>
      </FormContainer>
    );
};

export default ShippingScreen;
