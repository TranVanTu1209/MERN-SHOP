import React from 'react';
import { addToCart, removeFromCart } from '../../store/actions/cart';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message/Message';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Button, Card, Form } from 'react-bootstrap';
import { useEffect } from 'react';

const Cart = ({ match, location, history }) => {
  const dispatch = useDispatch();
  const productId = match.params.id;
  const qty = location.search ? location.search.split('=')[1] : 1;
  const { cartItems } = useSelector(state => state.cart);

  useEffect(() => {
    if (productId)
    {
      dispatch(addToCart(productId, Number(qty)));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  }
  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  }
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {
          cartItems.length === 0 ? <Message>Your cart is empty <Link to="/">Go Back</Link> </Message> :
            (
              <ListGroup variant="flush">
                {
                  cartItems.map(item => <ListGroup.Item key={item.product}>
                    <Row>
                      <Col md={2} className="pl-0">
                        <Image src={item.image} fluid rounded />
                      </Col>
                      <Col md={4}>
                        <Link to={`/product/${item.product}`}> {item.name} </Link>
                      </Col>
                      <Col md={2}>
                        $ {item.price}
                      </Col>
                      <Col md={2}>
                        <Form.Control as="select" value={item.qty} size="sm"
                          onChange={e => dispatch(addToCart(item.product, Number(e.target.value)))} >
                          {
                            [...Array(item.countInStock).keys()].map(item => (
                              <option key={item + 1} value={item + 1}>
                                {item + 1}
                              </option>
                            ))
                          }
                        </Form.Control>
                      </Col>
                      <Col md={2}>
                        <Button variant="light" type="button" onClick={() => removeFromCartHandler(item.product)}>
                          <i className="fas fa-trash"></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>)
                }
              </ListGroup>
            )
        }
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup>
            <ListGroup.Item>
              <h3>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items </h3>
              <strong>
                $ {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
              </strong>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button type="button" className="btn-block" disabled={cartItems.length === 0} onClick={checkoutHandler}>
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}

export default Cart;
