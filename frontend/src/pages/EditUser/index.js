import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import { getUserDetails, updateUser } from "../../store/actions/user";
import { useSelector, useDispatch } from "react-redux";

const EditUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const { profile, error, loading } = useSelector((state) => state.userDetail);
  const userUpdate = useSelector((state) => state.userUpdate);
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (id) {
      dispatch(getUserDetails(id));
    } else {
      history.push("/admin/user-list");
    }
  }, [history, id, dispatch]);

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setEmail(profile.email);
      setIsAdmin(profile.isAdmin);
    }
  }, [profile]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser(id, { name, email, isAdmin }));
  };
  return (
    <div className='w-50-lg'>
      <h3 className='my-3'>Edit User</h3>
      {userUpdate.message && userUpdate.success && (
        <Message variant='success'>{userUpdate.message}</Message>
      )}
      {error && <Message variant='danger'>{error}</Message>}
      {userUpdate.error && (
        <Message variant='danger'>{userUpdate.error}</Message>
      )}
      {(loading || userUpdate.loading) && <Loader />}
      {!loading && !error && (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>User name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter your name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='formBasicCheckbox'>
            <Form.Check
              type='checkbox'
              label='Is Admin Account'
              checked={isAdmin}
              onChange={(event) => {
                setIsAdmin(event.target.checked);
              }}
            />
          </Form.Group>
          <Button disabled={loading || userUpdate.loading} type='submit'>
            {userUpdate.loading ? "Updating User..." : "Update User"}
          </Button>
        </Form>
      )}
      <Link to='/admin/user-list' className='btn btn-light mt-3'>
        Back to user list
      </Link>
    </div>
  );
};

export default EditUser;
