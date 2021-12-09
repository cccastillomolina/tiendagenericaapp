import React from "react";
import { Component } from "react";
import { Navigate } from "react-router";
import axios from "axios";
import Cookies from "universal-cookie/es6";
import { NavLink } from "react-router-dom";
import md5 from "md5";

const cookies = new Cookies();

class EditarUsuario extends Component{
    cedula = React.createRef();
    correo = React.createRef();
    nombre = React.createRef();
    clave = React.createRef();
    usuario = React.createRef();
    ciudad = React.createRef();

    state = {
        usuarios:[],
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

    guardarUsuario = (e) =>{
        e.preventDefault();
        var usuario = {
            cedulaUsuario:this.cedula.current.value,
            emailUsuario:this.correo.current.value,
            nombreUsuario:this.nombre.current.value,
            password:md5(this.clave.current.value),
            usuario:this.usuario.current.value,
            ciudad:this.ciudad.current.value,
        }

        axios.post("http://localhost:8080/addUsuario", usuario)
           .then(res=>{
               this.setState({
                   status:"success"
               })
            });
    }

    render(){
        if(this.state.status === "success"){
            return<Navigate to ="/usuarios" />
        }
        return(
            <div>

                <nav class="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
                 <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                     <span class="navbar-toggler-icon"></span>
                 </button>

                 <div class="collapse navbar-collapse" id="navbarSupportedContent" >
                 <ul class="navbar-nav mr-auto">
                      <li class="navbar-brand">Tiendas la Genérica - Sucursal {cookies.get('ciudad')} | Editar Usuarios</li>
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

                <form onSubmit = {this.guardarUsuario}>

                        <div class= "container1">
             
                         <div class="form-row">
                             <div class="col">
                                 <input type="text" class="form-control" placeholder="Cédula del Cliente" name = "cedula" ref={this.cedula}/>
                             </div>
                             <br />
                             <div class="col">
                                     <input type="text" class="form-control" placeholder="E-mail" name = "correo" ref={this.correo}/>
                             </div>
                             <br />
                             <div class="col">
                                  <input type="text" class="form-control" placeholder="Nombre" name = "nombre" ref={this.nombre}/>
                             </div>
                             <br />
                             <div class="col">
                                 <input type="text" class="form-control" placeholder="Contraseña" type = "password" name = "clave" ref={this.clave}/>
                             </div>
                             <br />
                             <div class="col">
                                  <input type="text" class="form-control" placeholder="Usuario" name = "usuario" ref={this.usuario}/>
                             </div>
                             <br />
                             <div>
                             <select class="form-control "  name = "ciudad" ref={this.ciudad}>
                                 <option> Seleccione la ciudad</option>
                                 <option>Bogota</option> 
                                 <option>Cali</option>
                                 <option>Medellin</option>
                             </select>
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

export default EditarUsuario;