import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import CheckoutSteps from '../../components/CheckoutSteps/CheckoutSteps';
import FormContainer from '../../components/FormContainer/FormContainer';
import { savePaymentMethod } from '../../store/actions/cart';

const PaymentMethod = ({ history }) => {
  const { shippingAddress } = useSelector(state => state.cart);
  const [paymentMethod, setPaymentMethod] = useState('paypal');
  const dispatch = useDispatch();

  if (!shippingAddress.address)
  {
    return <Redirect to="/shipping" />;
  }

  const submitHandler = e => {
    e.preventDefault();
    const data = paymentMethod;
    dispatch(savePaymentMethod(data));
    history.push('/placeorder');
  }
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check type="radio" label="Paypal or Credit Card" id="paypal" name="paymentMethod" value="paypal" checked
              onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
          </Col>
          <Col>
            <Form.Check type="radio" label="Stripe" id="stripe" name="paymentMethod" value="stripe"
              onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}

export default PaymentMethod;

