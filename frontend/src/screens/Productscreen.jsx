import { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useGetProductsDetailsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { addToCart } from "../slices/cartSlice";
import { toast } from "react-toastify";

const Productscreen = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductsDetailsQuery(productId);
  const addToCartHandler = () => {
    const cartSchema = {
      product: product._id, // id of the product
      name: product.name,
      image: product.image,
      price: product.price,
      countInStock: product.countInStock,
      qty,
    };
    dispatch(addToCart(cartSchema));
    toast.success("Added successfully", {
      autoClose: 500,
    });
  };

  return (
    <>
      <div>
        <Link
          className="btn btn-dark my-3"
          style={{ color: "whitesmoke" }}
          to="/"
        >
          Go Back
        </Link>
      </div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Row style={{ alignItems: "center", columnGap: "6.5rem" }}>
          <Col md={3}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>

          <Col md={4}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item> Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>{product.description}</ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={3} style={{ marginTop: "3rem" }}>
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
                    <Col>Stock:</Col>
                    <Col>
                      <strong>
                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col style={{ alignItems: "center", display: "flex" }}>
                        Qty
                      </Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value))}
                        >
                          {[
                            ...Array(Math.min(product.countInStock, 5)).keys(),
                          ].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  {product.countInStock > 0 ? (
                    <Button
                      className="btn-block"
                      type="button"
                      onClick={addToCartHandler}
                    >
                      Add to Cart
                    </Button>
                  ) : (
                    <span>
                      <strong>It's dry out here!</strong>
                    </span>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Productscreen;
