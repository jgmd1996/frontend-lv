import { BrowserRouter, Routes, Route } from 'react-router-dom'
//importação das rotas das páginas de cliente, produto, pedidos, fornecedorese, home
import Home from './pages/Home'

import ProductList from './pages/Product/ProductList';
import CreateProduct from './pages/Product/ CreateProduct';
import UpdateProduct from './pages/Product/UpdateProduct';

import CreateSuppliers from './pages/Suppliers/CreateSuppliers';
import SuppliersList from './pages/Suppliers/SuppliersList';
import UpdateSuppliers from './pages/Suppliers/UpdateSuppliers';

import CreateClient from './pages/Client/CreateClient';
import ClientList from './pages/Client/ClientList';
import UpdateClient from './pages/Client/UpdateClient';

import OrderList from './pages/Order/OrderList';
import CreateOrder from './pages/Order/ CreateOrder';
import UpdateOrder from './pages/Order/UpdateOrder';
//
const Rotas = () => {//aqui eu defino as rotas das páginas
  return (
    <div className='routes'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* rotas de produto */}
          <Route path="/createProduct" element={<CreateProduct />} />
          <Route path="/productList" element={<ProductList />} />
          <Route path="/updateProduct" element={<UpdateProduct />} />

          {/* rotas de fornecedores */}
          <Route path="/CreateSuppliers" element={<CreateSuppliers />} />
          <Route path="/SuppliersList" element={<SuppliersList />} />
          <Route path="/UpdateSuppliers" element={<UpdateSuppliers />} />

          {/* rotas de clientes */}
          <Route path="/CreateClient" element={<CreateClient />} />
          <Route path="/ClientList" element={<ClientList />} />
          <Route path="/UpdateClient" element={<UpdateClient />} />

          {/* rotas de pedidos */}
          <Route path="/CreateOrder" element={<CreateOrder />} />
          <Route path="/OrderList" element={<OrderList />} />
          <Route path="/UpdateOrder" element={<UpdateOrder />} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Rotas;