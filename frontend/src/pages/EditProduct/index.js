import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import { fetchProductDetail, updateProduct } from "../../store/actions/product";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const EditProduct = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const { product, error, loading } = useSelector(
    (state) => state.productDetail
  );
  const productUpdate = useSelector((state) => state.productUpdate);
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!id) {
      history.push("/admin/product-list");
    } else {
      dispatch(fetchProductDetail(id));
    }
  }, [history, id, dispatch]);

  useEffect(() => {
    if (product.name && !loading) {
      setName(product.name);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setPrice(product.price);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product, loading]);

  useEffect(() => {
    if (productUpdate.success) {
      history.push("/admin/product-list");
    }
  }, [productUpdate.success, history]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setIsUploading(true);
    try {
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/v1/upload", formData, config);
      setImage(data);
      setIsUploading(false);
    } catch (error) {
      console.log(error);
      setIsUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct(id, {
        name,
        price,
        category,
        brand,
        countInStock,
        image,
        description,
      })
    );
  };
  return (
    <div className='w-50-lg'>
      <h3 className='my-3'>Edit Product</h3>
      {productUpdate.message && productUpdate.success && (
        <Message variant='success'>{productUpdate.message}</Message>
      )}
      {error && <Message variant='danger'>{error}</Message>}
      {productUpdate.error && (
        <Message variant='danger'>{productUpdate.error}</Message>
      )}
      {(loading || productUpdate.loading) && <Loader />}
      {!loading && !error && (
        <Form onSubmit={submitHandler} encType='multipart/form-data'>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter your name'
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='image'>
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter image URL'
              value={image || ""}
              onChange={(e) => setImage(e.target.value)}
            ></Form.Control>
            <br />
            <Form.File
              title='Image Upload'
              id='file-image'
              data-browse="Browse"
              onChange={uploadFileHandler}
            />
            {isUploading && <Loader />}
          </Form.Group>
          <Form.Group controlId='category'>
            <Form.Label>Category</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter category'
              value={category || ""}
              onChange={(e) => setCategory(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='brand'>
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter brand'
              value={brand || ""}
              onChange={(e) => setBrand(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='price'>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter price'
              value={price || 0}
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='countInStock'>
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter price'
              value={countInStock || 0}
              onChange={(e) => setCountInStock(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='description'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              value={description || ""}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Button disabled={loading || productUpdate.loading} type='submit'>
            {productUpdate.loading ? "Updating Product..." : "Update Product"}
          </Button>
        </Form>
      )}
      <Link to='/admin/product-list' className='btn btn-light mt-3'>
        Back to product list
      </Link>
    </div>
  );
};

export default EditProduct;
