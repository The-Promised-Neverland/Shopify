import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../../slices/productsApiSlice";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const ProductListScreen = () => {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const [deleteProduct] = useDeleteProductMutation();

  const deleteHandler = async (productId) => {
    alert(productId)
    try {
      await deleteProduct({productId});
      toast.success('Product Deleted');
    } catch (error) {
      toast.error("Try again");
    }
  };

  const createProductHandler = async () => {
    if (window.confirm("Are you sure you want to create a new product?")) {
      try {
        await createProduct();
        refetch();
      } catch (err) {
        toast.error(err.message || err.error);
      }
    }
  };
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm m-3" onClick={createProductHandler}>
            <FaEdit /> Create Product
          </Button>
        </Col>
      </Row>

      {loadingCreate && <Loader />}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    ID
                  </div>
                </th>
                <th>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    NAME
                  </div>
                </th>
                <th>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    PRICE
                  </div>
                </th>
                <th>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    CATEGORY
                  </div>
                </th>
                <th>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    BRAND
                  </div>
                </th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      {product._id}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      {product.name}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      {product.price}
                    </div>
                  </td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {product.category}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      {product.brand}
                    </div>
                  </td>
                  <td>
                    <LinkContainer
                      to={`/admin/product/${product._id}/edit`}
                      style={{ padding: "0", color: "green" }}
                    >
                      <FaEdit />
                    </LinkContainer>
                  </td>
                  <td>
                    <Button
                      style={{
                        padding: "0",
                        backgroundColor: "transparent",
                        border: "none",
                        boxShadow: "none",
                        outline: "none",
                      }}
                      onClick={() => deleteHandler(product._id)}
                    >
                      <FaTrash style={{ color: "red" }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default ProductListScreen;
