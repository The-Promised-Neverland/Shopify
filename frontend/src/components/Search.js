import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { listProducts } from "../actions/productActions";

const Search = () => {
  const dispatch = useDispatch();

  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    dispatch(listProducts(searchKeyword));
  }, [dispatch, searchKeyword]);

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
