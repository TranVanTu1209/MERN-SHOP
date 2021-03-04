import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Card,
  Button,
  Image,
  Form,
} from "react-bootstrap";
import Rating from "../../components/Rating/Rating";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import {
  fetchProductDetail,
  createProductReview,
} from "../../store/actions/product";
import { useDispatch, useSelector } from "react-redux";

const Product = ({ history, match }) => {
  const { product, loading, error } = useSelector(
    (state) => state.productDetail
  );
  const productCreateReview = useSelector((state) => state.productCreateReview);
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const productId = match.params.pId;

  useEffect(() => {
    dispatch(fetchProductDetail(productId));
  }, [productId, dispatch]);

  useEffect(() => {
    if (productCreateReview.success) {
      setRating(0);
      setComment("");
    }
  }, [productCreateReview.success]);

  const addToCartHandler = () => {
    history.push(`/cart/${productId}?qty=${qty}`);
  };
  const createReviewHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(product._id, { rating: Number(rating), comment })
    );
  };
  return (
    <React.Fragment>
      <Link to='/' className='mb-3 btn btn-secondary'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'> {error} </Message>
      ) : (
        <>
          <Row>
            <Col md={5}>
              <Image src={product?.image} alt={product?.title} fluid />
            </Col>
            <Col md={4}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3> {product?.name} </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating || 0}
                    text={`${product?.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price : $ {product?.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description : $ {product?.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price</Col>
                      <Col>
                        <strong> $ {product?.price} </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status</Col>
                      <Col>
                        <strong>
                          {product?.countInStock > 0
                            ? "In Stock"
                            : "Out of Stock"}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantity</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                            size='sm'
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (item) => (
                                <option key={item + 1} value={item + 1}>
                                  {item + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      block
                      disabled={product?.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2 className='mt-2'>Review</h2>
              {product.reviews.length === 0 ? (
                <Message>No review</Message>
              ) : (
                <ListGroup variant='flush'>
                  {product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong> {review.name} </strong>
                      <Rating value={review.rating} />
                      <p> {review?.createdAt?.substr(0, 10)} </p>
                      <p> {review.comment} </p>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
              <ListGroup.Item>
                {userInfo ? (
                  <Form onSubmit={createReviewHandler}>
                    {productCreateReview.loading && <Loader />}
                    <Form.Group>
                      <Form.Label controlid='rating'>Rating</Form.Label>
                      <Form.Control
                        as='select'
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value=''>Select...</option>
                        <option value={1}>1-Poor</option>
                        <option value={2}>2-Fair</option>
                        <option value={3}>3-Good</option>
                        <option value={4}>4-Very Good</option>
                        <option value={5}>5-Exellent</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label controlid='comment'>Comment</Form.Label>
                      <Form.Control
                        as='textarea'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary'>
                      Submit
                    </Button>
                  </Form>
                ) : (
                  <Message>
                    Please
                    <Link to='/login'>login</Link> to write a review
                  </Message>
                )}
              </ListGroup.Item>
            </Col>
          </Row>
        </>
      )}
    </React.Fragment>
  );
};

export default Product;
