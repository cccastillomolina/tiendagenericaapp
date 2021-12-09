import React from "react";
import { Component } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie/es6";
import { NavLink } from "react-router-dom";

const cookies = new Cookies();

class Productos extends Component{
    state = {
        productos:[],
        status:null
    }

    cerrarSesion=()=>{
        cookies.remove('nombreUsuario', {path: "/"});
        cookies.remove('ciudad', {path: "/"});
        window.location.href='./';
    }

    componentDidMount() {
        if (!cookies.get('nombreUsuario')){
            window.location.href="./";
        }
    }

    componentWillMount(){
        this.getProductos();
    }

    getProductos = () =>{
        axios.get("http://localhost:8080/todosLosProductos")
           .then(res => {
               console.log(res.data);
               this.setState({
                   productos:res.data
               })
           });
    }

    borrarProducto = (id) =>{
        var resultado = window.confirm('¿Estas seguro de borrar el producto?');
        if (resultado){
            axios.delete("http://localhost:8080/borrar/" + id)
            .then(res=>{
                this.setState({
                    status:"deleted"
                });
    
                window.location.reload(true);
            })
        }

    }
    render() {
        return(
            <div>
             <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
             <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent" >
              <ul class="navbar-nav mr-auto">
                      <li class="navbar-brand">Tiendas la Genérica - Sucursal {cookies.get('ciudad')} | Productos</li>
                      <li class="nav-item active">
                         <a class="nav-link Productos" href="/productos">Productos <span class="sr-only"></span></a>
                      </li>
                      <li class="nav-item">
                         <a class="nav-link Proveedores" href="/proveedores">Proveedores</a>
                      </li>
                      <li class="nav-item">
                         <a class="nav-link Clientes" href="/clientes">Clientes</a>
                      </li>
                      <li class="nav-item">
                         <a class="nav-link Usuarios" href="/usuarios">Usuarios</a>
                      </li>
                      <li class="nav-item">
                         <a class="nav-link Usuarios" href="/ventas">Ventas</a>
                      </li>
                  </ul>
                  <form class="form-inline my-2 my-lg-0" class="btn-group " role="group">
                  <a class="btn btn-outline-success" href="/agregarProducto" role="button" > Agregar Producto</a>
                  <button class="btn btn-outline-danger my-2 my-sm-0" onClick={()=>this.cerrarSesion()}>Cerrar Sesión</button>
                  </form>
                </div> 
             </nav>


                <table className="table table-hover table-sm">
                    <thead class="table-dark">
                        <tr >
                            <th>Código del producto</th>
                            <th>Nombre del producto</th>
                            <th>NIT del proveedor</th>
                            <th>Precio de compra</th>
                            <th>IVA</th>
                            <th>Precio de venta</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.productos.map(
                                producto =>
                                <tr key = {producto.codigoProducto}>
                                    <td> {producto.codigoProducto}</td>
                                    <td> {producto.nombreProducto}</td>
                                    <td> {producto.nitproveedor}</td>
                                    <td> {producto.precioCompra}</td>
                                    <td> {producto.ivacompra}</td>
                                    <td> {producto.precioVenta}</td>
                                    <td>
                                    <div class="btn-group" role="group" >
                                    <a class="btn btn-outline-info" href={"/editarProducto/" + producto._id} role="button"  > Editar</a>
                                    <button type="button" class="btn btn-outline-danger" onClick = {()=>{ this.borrarProducto(producto.codigoProducto)}}> Eliminar</button>
                                    </div>
                                    </td>
                                    </tr>

                            )
                        }

                        
                    </tbody>
                </table>
               </div>      
        );
    }
}

export default Productos;