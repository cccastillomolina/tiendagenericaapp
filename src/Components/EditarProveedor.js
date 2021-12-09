import React from "react";
import { Component } from "react";
import { Navigate } from "react-router";
import axios from "axios";
import Cookies from "universal-cookie/es6";
import { NavLink } from "react-router-dom";

const cookies = new Cookies();

class EditarProveedor extends Component{
    nit = React.createRef();
    ciudad = React.createRef();
    direccion = React.createRef();
    nombre = React.createRef();
    telefono = React.createRef();
 
    state = {
        proveedores:[],
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

    guardarProveedor = (e) =>{
        e.preventDefault();
        var proveedor = {
            nitproveedor:this.nit.current.value,
            ciudadProveedor:this.ciudad.current.value,
            direccionProveedor:this.direccion.current.value,
            nombreProveedor:this.nombre.current.value,
            telefonoProveedor:this.telefono.current.value,
        }

        axios.post("http://localhost:8080/addProveedor", proveedor)
           .then(res=>{
               this.setState({
                   status:"success"
               })
            });
    }

    render(){
        if(this.state.status === "success"){
            return<Navigate to ="/proveedores" />
        }
        return(
            <div>
             <nav class="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
                 <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                     <span class="navbar-toggler-icon"></span>
                 </button>

              <div class="collapse navbar-collapse" id="navbarSupportedContent" >
                 <ul class="navbar-nav mr-auto">
                      <li class="navbar-brand">Tiendas la Genérica - Sucursal {cookies.get('ciudad')} | Editar Proveedores</li>
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
                                <input type="text" class="form-control" placeholder="NIT del proveedor" name = "nit" ref={this.nit}/>
                            </div>
                            <br />
                            <div class="col">
                                    <input type="text" class="form-control" placeholder="Nombre del proveedor" name = "nombre" ref={this.nombre}/>
                            </div>
                            <br />
                            <div class="col">
                                 <input type="text" class="form-control" placeholder="Dirección" name = "direccion" ref={this.direccion}/>
                            </div>
                            <br />
                            <div class="col">
                                <input type="text" class="form-control" placeholder="Teléfono" name = "telefono" ref={this.telefono}/>
                            </div>
                            <br />
                            <div class="col">
                                 <input type="text" class="form-control" placeholder="Ciudad" name = "ciudad" ref={this.ciudad}/>
                            </div>
                            <br />
                            <div class="btn-group" role="group" >
                                     <input type = "submit" class="btn btn-outline-info"/>
                             </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default EditarProveedor;