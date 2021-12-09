import React from "react";
import { Component } from "react";
import { Navigate } from "react-router";
import axios from "axios";
import Cookies from "universal-cookie/es6";
import { NavLink } from "react-router-dom";



const cookies = new Cookies();

class EditarProducto extends Component{
    path = null;
    url = [];
    productoId = null;
    codigo = React.createRef();
    producto = React.createRef();
    nit = React.createRef();
    precioCompra = React.createRef();
    iva = React.createRef();
    precioVenta = React.createRef();

    state = {
        producto:[],
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
        this.path = window.location.pathname;
        this.url = this.path.split("/");
        console.log(this.url);
        this.productoId = this.url[2];
        this.getProducto(this.productoId);
    }

    getProducto = (id) => {
        axios.get("http://localhost:8080/consultarProducto/"+id)
            .then(res=>{
                this.setState({
                    producto:res.data
                })
                
            });

    }

    guardarProducto = (e) =>{
        e.preventDefault();
        var producto = {
            _id:this.productoId,
            codigoProducto:this.codigo.current.value,
            nombreProducto:this.producto.current.value,
            nitproveedor:this.nit.current.value,
            precioCompra:this.precioCompra.current.value,
            ivacompra:this.iva.current.value,
            precioVenta:this.precioVenta.current.value,
        }

        axios.put("http://localhost:8080/Updateproducto/" + this.productoId, producto)
           .then(res=>{
               this.setState({
                   status:"success"
               })
            });
    }

    render(){
        console.log(this.state.producto);

        if(this.state.status === "success"){
            return<Navigate to ="/productos" />
        }
        return(
            <body>
            <div>

             <nav class="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
             <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
              </button>

              <div class="collapse navbar-collapse" id="navbarSupportedContent" >
              <ul class="navbar-nav mr-auto">
                      <li class="navbar-brand">Tiendas la Genérica - Sucursal {cookies.get('ciudad')} | Editar Productos</li>
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


        
                  <form class="form-inline my-2 my-lg-0">
                  <button class="btn btn-outline-danger my-2 my-sm-0" onClick={()=>this.cerrarSesion()}>Cerrar Sesión</button>
                  </form>
                </div> 
             </nav>


            <form onSubmit = {this.guardarProducto}>
                <div class= "container1">

                    <div class="form-row">
                        <div class="col">
                            <input type="text" class="form-control" placeholder="Código del producto" name = "codigo" ref={this.codigo} defaultValue={this.state.producto.codigoProducto}/>
                        </div>
                        <br />
                        <div class="col">
                                <input type="text" class="form-control" placeholder="Producto" name = "producto" ref={this.producto} defaultValue={this.state.producto.nombreProducto}/>
                        </div>
                        <br />
                        <div class="col">
                             <input type="text" class="form-control" placeholder="NIT" name = "nit" ref={this.nit} defaultValue={this.state.producto.nitproveedor}/>
                        </div>
                        <br />
                        <div class="col">
                            <input type="text" class="form-control" placeholder="Precio de compra" name = "precioCompra" ref={this.precioCompra} defaultValue={this.state.producto.precioCompra}/>
                        </div>
                        <br />
                        <div class="col">
                             <input type="text" class="form-control" placeholder="IVA" name = "iva" ref={this.iva} defaultValue={this.state.producto.ivacompra}/>
                        </div>
                        <br />
                        <div class="col">
                             <input type="text" class="form-control" placeholder="Precio de venta" name = "precioVenta" ref={this.precioVenta} defaultValue={this.state.producto.precioVenta}/>
                        </div>
                        <br />
                        <div class="btn-group" role="group" >
                                 <input type = "submit" class="btn btn-outline-info"/>
                         </div>
                    </div>
                </div>
            </form>
        </div>
        </body>
        );
    }
}

export default EditarProducto;