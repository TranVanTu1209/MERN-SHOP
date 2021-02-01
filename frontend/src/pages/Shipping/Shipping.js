import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../../components/CheckoutSteps/CheckoutSteps';
import FormContainer from '../../components/FormContainer/FormContainer';
import { saveShippingAddress } from '../../store/actions/cart';

const Shipping = ({ history }) => {
  const { shippingAddress } = useSelector(state => state.cart);
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || '');
  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();
    const data = { address, city, postalCode, country };
    dispatch(saveShippingAddress(data));
    history.push('/payment');
  }
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" placeholder="Enter  address" value={address} required
            onChange={e => setAddress(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeholder="Enter city" value={city} required
            onChange={e => setCity(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control type="text" placeholder="Enter postal code" value={postalCode} required
            onChange={e => setPostalCode(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control type="text" placeholder="Enter country" value={country} required
            onChange={e => setCountry(e.target.value)}></Form.Control>
        </Form.Group>
        <Button type="submit">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}

export default Shipping;
