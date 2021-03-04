import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SearchBar = ({ history }) => {
  const [keywords, setKeywords] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    if (keywords) {
      history.push("/search/" + keywords);
    } else {
      history.push("/");
    }
  };
  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type='text'
        value={keywords}
        className='mr-sm-2'
        onChange={(e) => setKeywords(e.target.value.trim())}
        placeholder='Search products...'
      ></Form.Control>
      <Button type='submit' variant='outline-success'>
        Search
      </Button>
    </Form>
  );
};

export default SearchBar;
