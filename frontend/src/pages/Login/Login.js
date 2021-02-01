import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message/Message';
import Loader from '../../components/Loader/Loader';
import FormContainer from '../../components/FormContainer/FormContainer';
import { login } from '../../store/actions/user';

const Login = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split('=')[1] : '/';
  const { loading, error, userInfo } = useSelector(state => state.user);

  useEffect(() => {
    if (userInfo)
    {
      history.push(redirect);
    }
  }, [userInfo, redirect, history]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(login(email, password));
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)}>
          </Form.Control>
        </Form.Group>
        <Button type="submit">
          Sign In
        </Button>
      </Form>
      <Row className="py-2">
        <Col>
          New customers ? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default Login;
