import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductList,
  deleteProduct,
  createProduct,
} from "../../store/actions/product";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { Link, useHistory } from "react-router-dom";
import Paginate from "../../components/Paginate";

const ProductList = ({ match }) => {
  const pageNumber = match.params.pageNumber || 1;
  const { loading, error, products, page, pages } = useSelector(
    (state) => state.productList
  );
  const productCreate = useSelector((state) => state.productCreate);
  const productDelete = useSelector((state) => state.productDelete);
  const history = useHistory();
  const {
    userInfo: { isAdmin },
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isAdmin) {
      dispatch(fetchProductList("", pageNumber));
    } else {
      history.push("/");
    }
  }, [dispatch, isAdmin, history, pageNumber]);
  const createProductHandler = () => {
    dispatch(createProduct({}));
  };
  const deleteProductHandler = (id) => {
    if (id && window.confirm("Are you sure want to delete this product")) {
      dispatch(deleteProduct(id));
    }
  };
  return (
    <>
      <div className='d-flex justify-content-between align-items-center mb-3'>
        <h1>Product List</h1>
        <Button disabled={productCreate.loading} onClick={createProductHandler}>
          {productCreate.loading ? (
            <Spinner animation='border' variant='light' />
          ) : (
            <>
              <i className='fas fa-plus'></i> New Product
            </>
          )}
        </Button>
      </div>
      {(loading || productDelete.loading) && <Loader />}
      {error && <Message variant='danger'> {error} </Message>}
      {productDelete.error && (
        <Message variant='danger'> {productDelete.error} </Message>
      )}
      {!loading && !error && (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Count In Stock</th>
                <th>Brand</th>
                <th>Rating</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <img
                      src={product.image}
                      alt={product.name}
                      className='w-80px'
                    />
                  </td>
                  <td>
                    <Link to={`/product/${product._id}`}>
                      {product.name.substr(0, 25)}
                      {product.name.length > 25 ? "..." : ""}
                    </Link>
                  </td>
                  <td>$ {product.price}</td>
                  <td>{product.category}</td>
                  <td> {product.countInStock} </td>
                  <td>{product.brand}</td>
                  <td> {product.rating} </td>
                  <td>
                    <Link
                      to={`/admin/product/${product._id}`}
                      className='btn btn-info btn-sm mr-2'
                    >
                      <i className='fas fa-edit'></i>
                    </Link>
                    <Button
                      className='btn-sm'
                      variant='danger'
                      onClick={() => deleteProductHandler(product._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate page={page} pages={pages} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductList;
