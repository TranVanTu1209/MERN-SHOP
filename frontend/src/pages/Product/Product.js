import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Card, Button, Image, Form } from 'react-bootstrap';
import Rating from '../../components/Rating/Rating';
import Loader from '../../components/Loader/Loader';
import Message from '../../components/Message/Message';
import { fetchProductDetail } from '../../store/actions/product';
import { useDispatch, useSelector } from 'react-redux';

const Product = ({ history, match }) => {
  const { product, loading, error } = useSelector(state => state.productDetail);
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const productId = match.params.pId;

  useEffect(() => {
    dispatch(fetchProductDetail(productId));
  }, [productId, dispatch]);

  const addToCartHandler = () => {
    history.push(`/cart/${productId}?qty=${qty}`);
  }
  return (<React.Fragment>
    <Link to="/" className="mb-3 btn btn-secondary">
      Go Back
    </Link>
    {
      loading ? <Loader /> : error ? <Message variant="danger"> {error} </Message> : <Row>
        <Col md={5}>
          <Image src={product?.image} alt={product?.title} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3> {product?.name} </h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={product.rating || 0} text={`${product?.numReviews} reviews`} />
            </ListGroup.Item>
            <ListGroup.Item>
              Price : $ {product?.price}
            </ListGroup.Item>
            <ListGroup.Item>
              Description : $ {product?.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>
                    Price
                  </Col>
                  <Col>
                    <strong> $ {product?.price} </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    Status
                  </Col>
                  <Col>
                    <strong> {product?.countInStock > 0 ? 'In Stock' : 'Out of Stock'} </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              {
                product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        Quantity
                      </Col>
                      <Col>
                        <Form.Control as="select" value={qty} onChange={e => setQty(e.target.value)} size="sm">
                          {
                            [...Array(product.countInStock).keys()].map(item => (
                              <option key={item + 1} value={item + 1}>
                                {item + 1}
                              </option>
                            ))
                          }
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )
              }
              <ListGroup.Item>
                <Button block disabled={product?.countInStock === 0} onClick={addToCartHandler}>
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    }
  </React.Fragment>
  );
}

export default Product;
