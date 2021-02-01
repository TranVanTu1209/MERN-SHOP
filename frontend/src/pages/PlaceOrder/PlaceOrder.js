import React, { useEffect } from "react";
import { Row, Col, ListGroup, Image, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import { createOrder } from "../../store/actions/order";

const PlaceOrder = ({ history }) => {
  const dispatch = useDispatch();
  const { shippingAddress, paymentMethod, cartItems } = useSelector(
    (state) => state.cart
  );
  const { address, city, country, postalCode } = shippingAddress;
  const { loading, order, error, success } = useSelector(
    (state) => state.orderCreate
  );

  useEffect(() => {
    if (success) history.push(`/orders/${order._id}`);
    // eslint-disable-next-line
  }, [history, success]);

  if (!paymentMethod) {
    return <Redirect to='/payment' />;
  }
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const shippingPrice = itemsPrice > 100 ? 0 : 5;
  const taxPrice = 0.1 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        shippingAddress,
        orderItems: cartItems,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      })
    );
  };
  return (
    <React.Fragment>
      <CheckoutSteps step1 step2 step3 step4 />
      {loading && <Loader />}
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address : </strong> {address}, {city}, {postalCode},{" "}
                {country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method : </strong> {paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cartItems.map((item) => (
                    <ListGroup.Item key={item.product}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {" "}
                            {item.name}{" "}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x {item.price} = ${" "}
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col> $ {itemsPrice.toFixed(2)} </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col> $ {shippingPrice.toFixed(2)} </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col> $ {taxPrice.toFixed(2)} </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col> $ {totalPrice.toFixed(2)} </Col>
                </Row>
              </ListGroup.Item>
              {error && (
                <ListGroup.Item>
                  <Message variant='danger'> {error} </Message>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Button
                  type='button'
                  disabled={cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Pay Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default PlaceOrder;
