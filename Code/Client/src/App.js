import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import './css/index.css';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

// Components
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { Home } from './components/Home/Home';
import { Dashboard } from './components/Dashboard/Dashboard';
import { Menu } from './components/Menu/Menu';
import { Homemenu } from './components/Menu/Homemenu';
import { Itemdashboard } from './components/Dashboard/Itemdashboard';
import { SellerMenu } from './components/Menu/SellerMenu';
import { Useredit } from './components/user/Edit_user';
import { Selleredit } from './components/user/Edit_seller';
import { Sellerdashboard } from './components/Dashboard/Sellerdashboard';
import { Adminmenu } from './components/Menu/Adminmenu';
import { Userlist } from './components/Dashboard/Userlist';
import { Sellerlist } from './components/Dashboard/Sellerlist';
import { Productlist } from './components/Dashboard/Productlist';
import { Message } from './components/Dashboard/Message';



function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={[<Homemenu/>,<Home/>]}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>

        <Route path='/user_home/:user_id' element={[<Menu/>,<Home/>]}></Route>
        <Route path='/user_products/:user_id' element={[<Menu/>,<Dashboard/>]}></Route>
        <Route path='/user_edit/:user_id' element={[<Menu/>,<Useredit/>]}></Route>
        <Route path='/user_delete/:user_id' element={<Login/>}></Route>
        <Route path='/itemdashboard/:user_id/:seller_id/:product_id' element={[<Menu/>,<Itemdashboard/>]}></Route>

        <Route path='/seller_home/:seller_id' element={[<SellerMenu/>,<Home/>]}></Route>
        <Route path='/seller_products/:seller_id' element={[<SellerMenu/>,<Sellerdashboard/>]}></Route>
        <Route path='/seller_edit/:seller_id' element={[<SellerMenu/>,<Selleredit/>]}></Route>  
        <Route path='/seller_messages/:seller_id' element={[<SellerMenu/>,<Message/>]}></Route>  
        <Route path='/seler_delete/:seller_id' element={<Login/>}></Route>                       
        <Route path='/sellerdashboard' element={[<SellerMenu/>,<Dashboard/>]}></Route>

        <Route path='/homepage/:admin_id' element={[<Adminmenu/>,<Home/>]}></Route>
        <Route path='/users/:admin_id' element={[<Adminmenu/>,<Userlist/>]}></Route>
        <Route path='/userupdate/:user_id' element={[<Adminmenu/>,<Useredit/>]}></Route>
        <Route path='/sellers/:admin_id' element={[<Adminmenu/>,<Sellerlist/>]}></Route>
        <Route path='/sellersupdate/:seller_id' element={[<Adminmenu/>,<Selleredit/>]}></Route>
        <Route path='/products/:admin_id' element={[<Adminmenu/>,<Productlist/>]}></Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
