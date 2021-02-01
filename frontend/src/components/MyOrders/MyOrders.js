import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders } from "../../store/actions/order";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import Message from "../Message/Message";
import Table from "react-bootstrap/Table";

const MyOrders = () => {
  const { loading, error, orders } = useSelector((state) => state.orderListMy);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);
  return (
    <>
      {loading && <Loader />}
      {error && <Message variant='danger'> {error} </Message>}
      {!loading && !error && (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td> {order._id} </td>
                <td> {order.createdAt.substr(0, 10)} </td>
                <td> {order.totalPrice.toFixed(2)} </td>
                <td>
                  {order.isPaid ? (
                    <span className='text-success'>
                      Paid at {order.paidAt.substr(0, 10)}
                    </span>
                  ) : (
                    <i className='fas fa-times text-danger cursor-pointer'></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    <span className='text-success'>
                      Delivered at {order.deliveredAt.substr(0, 10)}
                    </span>
                  ) : (
                    <span className='text-danger'>Not Delivered Yet</span>
                  )}
                </td>
                <td>
                  <Link
                    to={`/orders/${order._id}`}
                    className='btn btn-info btn-sm'
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default MyOrders;
