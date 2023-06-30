import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import { useGetProductsDetailsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from '../components/Message';


const Productscreen = () => {
  const { id: productId } = useParams();

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductsDetailsQuery(productId);

  return (
    <>
      <Message variant="danger">hello</Message>
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
        <Row>
          <Col md={5}>
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

          <Col md={3} style={{ marginTop: "130px" }}>
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
                <ListGroup.Item
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  {product.countInStock > 0 ? (
                    <Button className="btn-block" type="button">
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
