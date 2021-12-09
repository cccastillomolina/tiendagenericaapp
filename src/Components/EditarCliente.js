import React from "react";
import { Component } from "react";
import { Navigate } from "react-router";
import axios from "axios";
import Cookies from "universal-cookie/es6";
import { NavLink } from "react-router-dom";

const cookies = new Cookies();

class EditarCliente extends Component{
    cedulaCliente = React.createRef();
    direccionCliente = React.createRef();
    emailCliente = React.createRef();
    nombreCliente = React.createRef();
    telefonoCliente = React.createRef();
 
    state = {
        clientes:[],
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

    guardarCliente = (e) =>{
        e.preventDefault();
        var proveedor = {
            cedulaCliente:this.cedulaCliente.current.value,
            direccionCliente:this.direccionCliente.current.value,
            emailCliente:this.emailCliente.current.value,
            nombreCliente:this.nombreCliente.current.value,
            telefonoCliente:this.telefonoCliente.current.value,
        }

        axios.post("http://localhost:8080/addCliente", proveedor)
           .then(res=>{
               this.setState({
                   status:"success"
               })
            });
    }

    render(){
        if(this.state.status === "success"){
            return<Navigate to ="/clientes" />
        }
        return(
            <div>
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
                 <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                     <span class="navbar-toggler-icon"></span>
                 </button>

                 <div class="collapse navbar-collapse" id="navbarSupportedContent" >
                 <ul class="navbar-nav mr-auto">
                      <li class="navbar-brand">Tiendas la Genérica - Sucursal {cookies.get('ciudad')} | Editar Clientes</li>
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

                <form onSubmit = {this.guardarCliente}>
                         <div class= "container1">

                         <div class="form-row">
                                <div class="col">
                                    <input type="text" class="form-control" placeholder="Cédula del Cliente" name = "cedula" ref={this.cedulaCliente}/>
                                </div>
                                <br />
                                <div class="col">
                                        <input type="text" class="form-control" placeholder="Nombre del Cliente" name = "nombre" ref={this.nombreCliente}/>
                                </div>
                                <br />
                                <div class="col">
                                     <input type="text" class="form-control" placeholder="Dirección" name = "direccion" ref={this.direccionCliente}/>
                                </div>
                                <br />
                                <div class="col">
                                    <input type="text" class="form-control" placeholder="Teléfono" name = "telefono" ref={this.telefonoCliente}/>
                                </div>
                                <br />
                                <div class="col">
                                     <input type="text" class="form-control" placeholder="Correo Electronico" name = "ciudad" ref={this.emailCliente}/>
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

export default EditarCliente;