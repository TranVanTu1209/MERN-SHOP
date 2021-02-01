import React, { useEffect, useState } from "react";
import axios from "../../store/axios";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import { PayPalButton } from "react-paypal-button-v2";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getOrderDetail, payOrder } from "../../store/actions/order";
import { addPayPalScript } from "../../utils/paypal";
import { ORDER_PAY_RESET } from "../../store/actions/types";

const OrderDetail = ({ match }) => {
  const [sdkReady, setSdkReady] = useState(false);
  const orderId = match.params.id;
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading, order, error } = useSelector((state) => state.orderDetail);
  const orderPay = useSelector((state) => state.orderPay);

  useEffect(() => {
    if (orderId) {
      dispatch(getOrderDetail(orderId));
    } else {
      history.push("/");
    }
  }, [history, orderId, dispatch]);

  useEffect(() => {
    if (order && order._id !== orderId) {
      dispatch(getOrderDetail(orderId));
    }
  }, [order, orderId, dispatch]);

  useEffect(() => {
    const fetchPaypalApiKey = async () => {
      try {
        const res = await axios.get("/api/v1/config/paypal");
        addPayPalScript(res.data);
        setSdkReady(true);
      } catch (error) {
        history.push("/");
      }
    };
    if (!order?.isPaid) {
      fetchPaypalApiKey();
    }
    // eslint-disable-next-line
  }, [history]);

  useEffect(() => {
    if (orderPay.success) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetail(orderId));
    }
  }, [orderPay.success, orderId, dispatch]);

  const itemsPrice = order?.orderItems?.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const shippingPrice = itemsPrice > 100 ? 0 : 5;
  const taxPrice = 0.1 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };
  return (
    <>
      {loading && <Loader />}
      {error && <Message variant='danger'> {error} </Message>}
      {order && order.user && (
        <>
          <h1 className='ml-4'>Order : {order._id} </h1>
          <Row>
            <Col md={8}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <strong> Name : {order.user.name} </strong>
                  <p>
                    Email :{" "}
                    <a href={`mailto:${order.user.email}`}>
                      {order.user.email}
                    </a>
                  </p>
                  <p>
                    <strong>Address : </strong> {order.shippingAddress.address},
                    {order.shippingAddress.city},
                    {order.shippingAddress.postalCode},
                    {order.shippingAddress.country}
                  </p>
                  {order.isDelivered ? (
                    <Message variant='success'>
                      Delivered on {order.deliveredAt.substr(0, 10)}
                    </Message>
                  ) : (
                    <Message variant='danger'>Not delivered yet</Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <p>
                    <strong>Method : </strong> {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                    <Message variant='success'>
                      Paid on {order.paidAt.substr(0, 10)}
                    </Message>
                  ) : (
                    <Message variant='danger'>Not paid yet</Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Order Items</h2>
                  {order.orderItems.length === 0 ? (
                    <Message>Your cart is empty</Message>
                  ) : (
                    <ListGroup variant='flush'>
                      {order.orderItems.map((item) => (
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
                                {item.name}
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
                  <ListGroup.Item>
                    {!order.isPaid && (
                      <>
                        {orderPay.loading && <Loader />}
                        {!sdkReady || orderPay.loading ? (
                          <Loader />
                        ) : (
                          <PayPalButton
                            amount={order.totalPrice.toFixed(2)}
                            onSuccess={successPaymentHandler}
                          />
                        )}
                      </>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default OrderDetail;
