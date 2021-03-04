import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersList, deliverOrder } from "../../store/actions/order";
import { Link, useHistory } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import Table from "react-bootstrap/Table";

const OrdersList = () => {
  const history = useHistory();
  const { loading, error, orders } = useSelector((state) => state.orderList);
  const { userInfo } = useSelector((state) => state.user);
  const orderMarkAsDelivered = useSelector(
    (state) => state.orderMarkAsDelivered
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  });
  useEffect(() => {
    dispatch(getOrdersList());
  }, [dispatch]);
  return (
    <>
      <h3 className='my-3'>Orders</h3>
      {(loading || orderMarkAsDelivered.loading) && <Loader />}
      {error && <Message variant='danger'> {error} </Message>}
      {orderMarkAsDelivered.error && (
        <Message variant='danger'> {orderMarkAsDelivered.error} </Message>
      )}
      {!loading && !error && (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Date</th>
              <th>Total Price</th>
              <th>Paid Info</th>
              <th>Delivered</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td> {order._id} </td>
                <td> {order.user && order.user.name} </td>
                <td> {order.createdAt.substr(0, 10)} </td>
                <td>$ {order.totalPrice.toFixed(2)} </td>
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
                    <button
                      className='btn btn-success btn-sm'
                      disabled={orderMarkAsDelivered.loading || !order.isPaid}
                      onClick={() => dispatch(deliverOrder(order._id))}
                    >
                      Deliver Order
                    </button>
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

export default OrdersList;
