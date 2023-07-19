import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../slices/usersApiSlice";
import { FaTimes, FaCheck, FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { LinkContainer } from "react-router-bootstrap";
import "./BlinkButton.css";
import { useDeleteOrdersMutation } from "../../slices/ordersApiSlice";

const UsersListScreen = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const [deleteUser] = useDeleteUserMutation();

  const [deleteOrders] = useDeleteOrdersMutation();

  const [blinkingProduct, setBlinkingProduct] = useState(null);

  const deleteHandler = async (userId) => {
    if (window.confirm("Are you sure?")) {
      try {
        setBlinkingProduct(userId);
        await deleteOrders({ id: userId });
        await deleteUser(userId);
        refetch();
        toast.success("User Deleted");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
        setBlinkingProduct(null);
      }
    }
  };

  return (
    <>
      <h1>Users</h1>
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
                  NAME
                </div>
              </th>
              <th>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  E-MAIL
                </div>
              </th>
              <th>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  ADMIN
                </div>
              </th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  {" "}
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    {user._id}
                  </div>
                </td>
                <td>
                  {" "}
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    {user.name}
                  </div>
                </td>
                <td>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
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
                    {user.isAdmin === true ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </div>
                </td>
                <td>
                  <LinkContainer
                    to={`/admin/user/${user._id}/edit`}
                    style={{
                      padding: 0,
                      backgroundColor: "transparent",
                      border: "none",
                      boxShadow: "none",
                      outline: "none",
                    }}
                  >
                    <Button disabled={user.isAdmin === true}>
                      <FaEdit
                        style={{
                          color: user.isAdmin === true ? "black" : "red",
                        }}
                      />
                    </Button>
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
                    disabled={user.isAdmin === true}
                    onClick={() => deleteHandler(user._id)}
                    className={blinkingProduct === user._id ? "blinking" : ""}
                  >
                    <FaTrash
                      style={{ color: user.isAdmin === true ? "blue" : "red" }}
                    />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UsersListScreen;
