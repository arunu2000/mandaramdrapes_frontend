import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css'
import Signup from './login/Signup'
import Login from './login/Login'
import Admindashboard from "./dashboard/Admindashboard";
import Customerdashboard from "./dashboard/Customerdashboard";
import Home from "./home/Home";
import ManageUsers from "./users/ManageUsers";
import Adduser from "./users/Adduser";
import Listusers from "./users/Listusers";
import Managecategories from "./categories/Managecategories";
import Addcategory from "./categories/Addcategory";
import Deletecategory from "./categories/Deletecategory"; 
import Manageproducts from "./products/Manageproducts";
import Addproducts from "./products/Addproducts";
import Updateproduct from "./products/Updateproduct";
import Deleteproduct from "./products/Deleteproduct";
import Listproducts from "./products/Listproducts";
import Listcategory from "./categories/Listcategory";
import Cartpage from "./cart/Cartpage";


function App() {

  return (
    <>

    <Router>
      <Routes>
        {/* Admin Layout */}
        <Route path="/admindashboard" element={<Admindashboard />}>
          <Route index element={<Home />} />
          <Route path="manageuser" element={<ManageUsers />} />
          <Route path="manageuser/adduser" element={<Adduser />} />
          <Route path="manageuser/listusers" element={<Listusers />} />
           <Route path="managecategories" element={<Managecategories />} />
          <Route path="managecategories/addcategory" element={<Addcategory/>} />
          {/* <Route path="managecategories/updatecategory" element={<Updatecategory />} /> */}
            {/* <Route path="managecategories/deletecategory" element={<Deletecategory/>} /> */}
             <Route path="managecategories/listcategory" element={<Listcategory/>} />
           <Route path="manageproducts" element={<Manageproducts />} />
            <Route path="manageproducts/addproducts" element={<Addproducts/>} />
            {/* <Route path="manageproducts/updateproduct" element={<Updateproduct/>} />
            <Route path="manageproducts/deleteproduct" element={<Deleteproduct/>} /> */}
             <Route path="manageproducts/Listproducts" element={<Listproducts/>} />
        </Route>

         <Route path="/customerdashboard" element={<Customerdashboard />} />
        <Route path="/cart" element={<Cartpage />} />
        {/* Authentication */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
   
    </>
  )
}

export default App


