import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useGetUsersQuery } from "../../slices/usersApiSlice";
import { FaTimes, FaCheck, FaTrash } from "react-icons/fa";

const UsersListScreen = () => {
  const { data: users, isLoading, error } = useGetUsersQuery();

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
                  ADMIN ACCESS
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
                    {user.email}
                  </div>
                </td>
                <td>
                  <div style={{ display: "flex", justifyContent: "center" , marginTop:'6px' }}>
                    {user.isAdmin === true ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </div>
                </td>
                <td>
                    <Button
                      className="btn-sm"
                      style={{
                        color: "ghostwhite",
                      }}
                    >
                      Make Admin
                    </Button>
                  
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
                  >
                    <FaTrash
                      style={{ color: user.isAdmin === true ? "black" : "red" }}
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
