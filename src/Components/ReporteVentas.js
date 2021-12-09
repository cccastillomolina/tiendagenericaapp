import React from "react";
import { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie/es6";
import { NavLink } from "react-router-dom";

const cookies = new Cookies();


class ReporteVentas extends Component{
    state = {
        ventas:[],
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
        this.getVentas();
    }

    getVentas= () =>{
        axios.get("http://localhost:8080/ventas/"+cookies.get('ciudad'))
           .then(res => {
               console.log(res.data);
               this.setState({
                   ventas:res.data
               })
           });
    }
    // calcularTotal(cedula){
    //     this.state.ventas.map
    // }


        render() {
        return(
            <div>
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
                 <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                     <span class="navbar-toggler-icon"></span>
                 </button>

                 <div class="collapse navbar-collapse" id="navbarSupportedContent" >
                 <ul class="navbar-nav mr-auto">
                      <li class="navbar-brand">Tiendas la Genérica - Sucursal {cookies.get('ciudad')} | Reporte Ventas</li>
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
             
                <table className="table table-hover table-sm">
                <thead class="table-dark">
                            <tr>
                                <th>Cédula</th>
                                <th>Nombre</th>
                                <th>Valor Total Ventas</th>
                                <th>Acciones</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.ventas.map(
                                    cliente =>
                                    <tr key = {cliente.cedulaCliente}>
                                        <td> {cliente.cedulaCliente}</td>
                                        <td> {cliente.nombreCliente}</td>
                                        <td></td>{/* <td> {this.calcularTotal(cliente.cedulaCliente)}</td> */}
                                        <td>
                                        <div class="btn-group" role="group" >
                                             <a class="btn btn-outline-info" href="/#" role="button"  > Editar</a>
                                             <button type="button" class="btn btn-outline-danger" onClick = {()=>{ this.borrarCliente(cliente.cedulaCliente)}}> Eliminar</button>
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

export default ReporteVentas;