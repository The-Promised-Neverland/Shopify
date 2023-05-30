import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { listProducts } from "../actions/productActions";
import { useLocation } from "react-router-dom";

const Search = () => {
  const location = useLocation(); // gives the current URL
  const dispatch = useDispatch();

  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    dispatch(listProducts(searchKeyword));
  }, [dispatch, searchKeyword]);

  useEffect(() => {
    setSearchKeyword(""); // Reset search keyword when location,i.e.,URL changes
  }, [location]);

  return (
    <Form style={{ display: "flex" }}>
      <Form.Control
        type="text"
        name="q"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        placeholder="Search products..."
        className="mr-sm-2 ml-sm-5"
        style={{ marginRight: "10px" }}
      />
    </Form>
  );
};

export default Search;