import './App.css';

import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import AgregarProducto from "./Components/AgregarProducto";
import EditarProducto from './Components/EditarProducto';
import AgregarProveedor from "./Components/AgregarProveedor";
import EditarProveedor from './Components/EditarProveedor';
import AgregarUsuario from './Components/AgregarUsuario';
import EditarUsuario from './Components/EditarUsuario';
import AgregarCliente from './Components/AgregarCliente';
import EditarCliente from './Components/EditarCliente';


import Clientes from "./Components/Clientes";
import Productos from "./Components/Productos";
import Proveedores from "./Components/Proveedores";
import Login from "./Components/Login";
import Menu from './Components/Menu';
import Usuarios from './Components/Usuarios';
import Ventas from './Components/Ventas';
import ReporteClientes from './Components/ReporteClientes';
import ReporteVentas from './Components/ReporteVentas';




function App() {

  return (

    <div className="App">
  
      <div>
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Login />} />
          <Route path = "/menu" element = {<Menu />} /> 
          <Route path = "/productos" element = {<Productos />} />
          <Route path = "/proveedores" element = {<Proveedores />} />
          <Route path = "/clientes" element = {<Clientes />} />
          <Route path = "/usuarios" element = {<Usuarios />} />
          <Route path = "/agregarProducto" element = {<AgregarProducto />} />
          <Route path = "/editarProducto/:id" element = {<EditarProducto />} />
          <Route path = "/editarProveedor" element = {<EditarProveedor />} />
          <Route path = "/editarCliente" element = {<EditarCliente />} />
          <Route path = "/editarUsuario" element = {<EditarUsuario />} />
          <Route path = "/agregarProveedor" element = {<AgregarProveedor />} />  
          <Route path = "/agregarCliente" element = {<AgregarCliente />} />  
          <Route path = "/agregarUsuario" element = {<AgregarUsuario />} />
          <Route path = "/ventas" element = {<Ventas />} /> 
          <Route path = "/ReporteClientes" element = {<ReporteClientes />} /> 
          <Route path = "/ReporteVentas" element = {<ReporteVentas />} />  
        </Routes>
      </BrowserRouter>
      </div>
    </div>
   
  );
}

export default App;
