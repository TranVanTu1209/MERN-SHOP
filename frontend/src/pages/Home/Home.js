import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../../components/Product/Product";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductList } from "../../store/actions/product";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import Paginate from "../../components/Paginate";

const Home = ({ match }) => {
  const keywords = match.params.keywords;
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();
  const { products, loading, error, page, pages } = useSelector(
    (state) => state.productList
  );
  useEffect(() => {
    dispatch(fetchProductList(keywords, pageNumber));
  }, [dispatch, keywords, pageNumber]);

  return (
    <React.Fragment>
      <h1>Lastest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'> {error} </Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            page={page}
            pages={pages}
            keywords={keywords ? keywords : ""  }
          />
        </>
      )}
    </React.Fragment>
  );
};
export default Home;
