import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useGetOrdersQuery } from "../../slices/ordersApiSlice";

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
      <h1>Orders</h1>
      {isLoading===true ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
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
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
