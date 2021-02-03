import React from "react";
import { Container } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Footer from "./components/Footer/Footer";
import GoTop from "./components/GoTop";
import Header from "./components/Header/Header";
import Cart from "./pages/Cart/Cart";
import EditUser from "./pages/EditUser";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import OrderDetail from "./pages/OrderDetail/OrderDetail";
import PaymentMethod from "./pages/PaymentMethod/PaymentMethod";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Product from "./pages/Product/Product";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register/Register";
import Shipping from "./pages/Shipping/Shipping";
import UserList from "./pages/UserList";
import ProductList from "./pages/ProductList";

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/product/:pId' component={Product} />
            <Route path='/cart/:id?' component={Cart} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/profile' component={Profile} />
            <Route path='/shipping' component={Shipping} />
            <Route path='/payment' component={PaymentMethod} />
            <Route path='/placeorder' component={PlaceOrder} />
            <Route path='/orders/:id' component={OrderDetail} />
            <Route path='/admin/user-list' component={UserList} />
            <Route path='/admin/product-list' component={ProductList} />
            <Route path='/admin/user/:id' component={EditUser} />
            <Route render={() => <Redirect to='/' />} />
          </Switch>
        </Container>
      </main>
      <GoTop />
      <Footer />
    </Router>
  );
};

export default App;
