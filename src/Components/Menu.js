import React from "react";
import { Component } from "react";
import Cookies from "universal-cookie/es6";
import { NavLink } from "react-router-dom";

const cookies = new Cookies();

class Menu extends Component {

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

    render() {
        return(
            <div>

                <nav class="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
                 <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                     <span class="navbar-toggler-icon"></span>
                 </button>

                 <div class="collapse navbar-collapse" id="navbarSupportedContent" >
                 <ul class="navbar-nav mr-auto">
                      <li class="navbar-brand">Tiendas la Genérica - Sucursal {cookies.get('ciudad')} | Menú</li>
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

             <h1> Menú Principal</h1>
            </div>
             )
             }

}

export default Menu;