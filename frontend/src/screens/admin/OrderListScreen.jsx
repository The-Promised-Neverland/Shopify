import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useGetOrdersQuery } from "../../slices/ordersApiSlice";
import { FaTimes } from "react-icons/fa";

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  console.log(orders);

  return (
    <>
      <h1>Orders</h1>
      {isLoading === true ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
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
                  USER
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
                  {" "}
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    {order._id}
                  </div>
                </td>
                <td>
                  {" "}
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    {order.user && order.user.name}
                  </div>
                </td>
                <td>
                  {" "}
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    {order.createdAt.substring(0, 10)}
                  </div>
                </td>
                <td>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    ${order.totalPrice}
                  </div>
                </td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "4px",
                    }}
                  >
                    {order.isPaid ? (
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
                      marginTop: "4px",
                    }}
                  >
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </div>
                </td>
                <td>
                  <LinkContainer
                    to={`/orderDetails/${order._id}`}
                    style={{ backgroundColor: "#7b8a8b" }}
                  >
                    <Button
                      className="btn-sm"
                      style={{
                        color: "ghostwhite",
                      }}
                    >
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
