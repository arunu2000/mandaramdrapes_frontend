import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from './login/Signup';
import Login from './login/Login';
import Admindashboard from "./dashboard/Admindashboard";
import Customerdashboard from "./dashboard/Customerdashboard";
import Home from "./home/Home";
import ManageUsers from "./users/ManageUsers";
import Adduser from "./users/Adduser";
import Listusers from "./users/Listusers";
import Managecategories from "./categories/Managecategories";
import Addcategory from "./categories/Addcategory";
import Listcategory from "./categories/Listcategory";
import Manageproducts from "./products/Manageproducts";
import Addproducts from "./products/Addproducts";
import Listproducts from "./products/Listproducts";
import Cartpage from "./cart/Cartpage";
import CategoryProductPage from "./cart/CategoryProductPage";
import ProductDetailPage from "./cart/ProductDetailPage";
import MyOrdersPage from "./orders/MyOrdersPage";
import AdminOrderManagement from "./dashboard/AdminOrderManagement";
import NotFound from "./pages/NotFound";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Admin Layout */}
        <Route path="/admindashboard" element={<Admindashboard />}>
          <Route index element={<Home />} />
          <Route path="manageuser" element={<ManageUsers />} />
          <Route path="manageuser/adduser" element={<Adduser />} />
          <Route path="manageuser/listusers" element={<Listusers />} />
          <Route path="managecategories" element={<Managecategories />} />
          <Route path="managecategories/addcategory" element={<Addcategory />} />
          <Route path="managecategories/listcategory" element={<Listcategory />} />
          <Route path="manageproducts" element={<Manageproducts />} />
          <Route path="manageproducts/addproducts" element={<Addproducts />} />
          <Route path="manageproducts/Listproducts" element={<Listproducts />} />
          <Route path="adminordermanagement" element={<AdminOrderManagement />} />
        </Route>

        <Route path="/" element={<Customerdashboard />} />
        <Route path="/cart" element={<Cartpage />} />
        <Route path="/categories/:slug" element={<CategoryProductPage />} />
        <Route path="/products/:productId" element={<ProductDetailPage />} />
        <Route path="/myorders" element={<MyOrdersPage />} />

        {/* Authentication */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
