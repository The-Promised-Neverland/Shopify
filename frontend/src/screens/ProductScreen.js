import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { listProductDetails } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductScreen = () => {
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();
  
  const productDetail = useSelector((state) => state.productDetail); //  states of productdproduct from the reducer in store.js
  const { loading, error, product } = productDetail; // destructuring the required states

  const { id } = useParams(); // productID from url

  useEffect(() => {
    if(!product || product._id!==id){
      dispatch(listProductDetails(id));
    }
  }, [dispatch, id]); // whenever id is changed, fetchProduct will be triggered

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const goBack = () => {
    navigate("/");
  };

  return (
    <>
      <Button className="btn btn-light my-3" onClick={goBack}>
        Go Back
      </Button>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6} style={{ width: "33.3%" }}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3} style={{ width: "33.3%" }}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>{product.name}</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating value={product.rating} text={`${product.numReviews}`} />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3} style={{ width: "33.3%" }}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item style={{ margin: "0 auto" }}>
                  <Button
                    className="btn-block"
                    type="button"
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
            <Col></Col>
          </Col>
        </Row>
        // <span></span>
      )}
    </>
  );
};

export default ProductScreen;
