import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import HomeScreen from "./screens/HomeScreen";
import Productscreen from "./screens/Productscreen";
import CartScreen from "./screens/CartScreen";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import './assets/bootstrap.custom.css';
import { Provider } from 'react-redux';
import store from './store.js';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PrivateRoute from './components/PrivateRoute';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import AdminRoute from './components/AdminRoute';
import OrderListScreen from './screens/admin/OrderListScreen';
import ProductListScreen from './screens/admin/ProductListScreen';
import UsersListScreen from './screens/admin/UsersListScreen';
import ProductEditScreen from './screens/admin/ProductEditScreen';
import UserEditScreen from './screens/admin/UserEditScreen';
import NotFound from './components/NotFound';
import PaymentRoute from "./components/PaymentRoute";
import OrderDetailsScreen from "./screens/OrderDetailsScreen";
import SuccessScreen from "./screens/SuccessScreen";
import FailedScreen from "./screens/FailedScreen";


const router = createBrowserRouter(
  createRoutesFromElements(

    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/search/:keyword" element={<HomeScreen />} />
      <Route path="/page/:pageNumber" element={<HomeScreen />} />
      <Route path="/search/:keyword/page/:pageNumber" element={<HomeScreen />} />
      <Route path="/product/:id" element={<Productscreen />} />
      <Route path="/Cart" element={<CartScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />

      {/* // routes you need to be logged in for */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
        <Route path="/orderPayments/:id" element={<PaymentRoute />} />
        <Route path="/orderDetails/:id" element={<OrderDetailsScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/success" element={<SuccessScreen />} />
        <Route path="/failed" element={<FailedScreen />} />

        
      </Route>
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/orderList" element={<OrderListScreen />} />
        <Route path='/admin/productList' element={<ProductListScreen />} />
        <Route path='/admin/productList/:pageNumber' element={<ProductListScreen />} />
        <Route path='/admin/userList' element={<UsersListScreen />} />
        <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
        <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
        <Route path="/admin/productList" element={<ProductListScreen />} />
        <Route path="/admin/userList" element={<UsersListScreen />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

