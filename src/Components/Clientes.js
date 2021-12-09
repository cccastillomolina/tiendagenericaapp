import React from "react";
import { Component } from "react";
import axios from "axios";
import swal from "sweetalert";
import Cookies from "universal-cookie/es6";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

const cookies = new Cookies();

class Clientes extends Component{
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

    componentWillMount(){
        this.getClientes();
    }

    getClientes = () =>{
        axios.get("http://localhost:8080/consultarClientes")
           .then(res => {
               console.log(res.data);
               this.setState({
                   clientes:res.data
               })
           });
    }

    borrarCliente = (id) =>{
        var resultado = window.confirm('¿Estas seguro de borrar el cliente?');
        if (resultado){
            axios.delete("http://localhost:8080/borrarCliente/" + id)
            .then(res=>{
                this.setState({
                    status:"deleted"
                });
    
                window.location.reload(true);
            })
        }

    }


    render(){
            return(
                <div>
                    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav mr-auto">
                                <li class="navbar-brand">Tiendas la Genérica - Sucursal {cookies.get('ciudad')} | Clientes</li>
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
                            <form class="form-inline my-2 my-lg-0" class="btn-group" role="group">
                                <a class="btn btn-outline-success" href="/agregarCliente" role="button"> Agregar Cliente</a>
                                <button class="btn btn-outline-danger my-2 my-sm-0" onClick={() => this.cerrarSesion()}>Cerrar Sesión</button>
                            </form>
                        </div>
                    </nav>
                    <table className="table table-hover table-sm">
                    <thead class="table-dark">
                            <tr>
                                <th>Cédula</th>
                                <th>Nombre</th>
                                <th>Dirección</th>
                                <th>Teléfono</th>
                                <th>Correo Electrónico</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.clientes.map(
                                cliente => <tr key={cliente.cedulaCliente}>
                                    <td> {cliente.cedulaCliente}</td>
                                    <td> {cliente.nombreCliente}</td>
                                    <td> {cliente.direccionCliente}</td>
                                    <td> {cliente.telefonoCliente}</td>
                                    <td> {cliente.emailCliente}</td>
                                    <td>
                                    <div class="btn-group" role="group" >
                                    <a class="btn btn-outline-info" href="/EditarCliente"
                                          role="button"  > Editar</a>
                                    <button type="button" class="btn btn-outline-danger" onClick={() => { this.borrarCliente(cliente.cedulaCliente); } }> Eliminar</button>
                                    </div>
                                    </td>
                                    </tr>
                            )}

                        </tbody>
                    </table>
                </div>      
            );
        }
    }

export default Clientes;