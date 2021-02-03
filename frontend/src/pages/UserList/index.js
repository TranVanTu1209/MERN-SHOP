import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deleteUser } from "../../store/actions/user";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link, useHistory } from "react-router-dom";

const UserList = () => {
  const { loading, error, users } = useSelector((state) => state.userList);
  const userDelete = useSelector((state) => state.userDelete);
  const history = useHistory();
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getUsers());
    } else {
      history.push("/");
    }
  }, [dispatch, userInfo, history]);
  const deleteUserHandler = (id) => {
    if (id && window.confirm("Are you sure want to delete this user"))
      dispatch(deleteUser(id));
  };
  return (
    <>
      <h1>User List</h1>
      {loading && <Loader />}
      {userDelete.loading && <Loader />}
      {error && <Message variant='danger'> {error} </Message>}
      {userDelete.error && (
        <Message variant='danger'> {userDelete.error} </Message>
      )}
      {!loading && !error && (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td> {user._id} </td>
                <td> {user.name} </td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className='fas fa-check text-success'></i>
                  ) : (
                    <i className='fas fa-times text-danger cursor-pointer'></i>
                  )}
                </td>
                <td>
                  <Link
                    to={`/admin/user/${user._id}`}
                    disabled={userDelete.loading}
                    className='btn btn-info btn-sm mr-2'
                  >
                    <i className='fas fa-edit'></i>
                  </Link>
                  <Button
                    className='btn-sm'
                    variant='danger'
                    disabled={userDelete.loading}
                    onClick={() => deleteUserHandler(user._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserList;
