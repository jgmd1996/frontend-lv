import { BrowserRouter, Routes, Route } from 'react-router-dom'

import ProductList from './pages/Product/ProductList';
import CreateProduct from './pages/Product/ CreateProduct';
import UpdateProduct from './pages/Product/UpdateProduct';

import Home from './pages/Home'

import CreateSuppliers from './pages/Suppliers/CreateSuppliers';
import SuppliersList from './pages/Suppliers/SuppliersList';
import UpdateSuppliers from './pages/Suppliers/UpdateSuppliers';

import CreateClient from './pages/Client/CreateClient';
import ClientList from './pages/Client/ClientList';
import UpdateClient from './pages/Client/UpdateClient';

import OrderList from './pages/Order/OrderList';
import CreateOrder from './pages/Order/ CreateOrder';
import UpdateOrder from './pages/Order/UpdateOrder';





const Rotas =() => {
  return (
    <div className='routes'>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/createProduct" element={<CreateProduct />} />
        <Route path="/productList" element={<ProductList />} />
        <Route path="/updateProduct" element={<UpdateProduct/>} />

        <Route path="/CreateSuppliers" element={<CreateSuppliers />} />
        <Route path="/SuppliersList" element={<SuppliersList />} />
        <Route path="/UpdateSuppliers" element={<UpdateSuppliers />} />

        <Route path="/CreateClient" element={<CreateClient />} />
        <Route path="/ClientList" element={<ClientList />} />
        <Route path="/UpdateClient" element={<UpdateClient />} />

        <Route path="/CreateOrder" element={<CreateOrder />} />
        <Route path="/OrderList" element={<OrderList />} />
        <Route path="/UpdateOrder" element={<UpdateOrder />} />
    
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Rotas;