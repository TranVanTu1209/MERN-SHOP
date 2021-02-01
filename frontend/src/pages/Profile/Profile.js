import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import { getUserDetails, updateUserProfile } from "../../store/actions/user";
import MyOrders from "../../components/MyOrders/MyOrders";

const Profile = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const { profile, error, loading } = useSelector((state) => state.userDetail);
  const { userInfo } = useSelector((state) => state.user);
  const { success } = useSelector((state) => state.userUpdateProfile);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) history.push("/login");
    else {
      if (!profile) {
        dispatch(getUserDetails("profile"));
      } else {
        setName(profile.name);
        setEmail(profile.email);
      }
    }
  }, [history, userInfo, dispatch, profile]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) setMessage("Password Not Matched");
    else
      dispatch(updateUserProfile({ id: userInfo._id, name, email, password }));
  };
  return (
    <Row>
      <Col md={3}>
        <h3 className='my-3'>User Profile</h3>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        {success && (
          <Message variant='success'>Update Profile Successfully</Message>
        )}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>User name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter your name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type='submit'>Update Profile</Button>
        </Form>
        <Link to='/' className='btn btn-light mt-3'>
          Back to shopping
        </Link>
      </Col>
      <Col md={9}>
        <h3 className='my-3'>My Orders</h3>
        <MyOrders />
      </Col>
    </Row>
  );
};

export default Profile;
