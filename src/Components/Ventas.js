import { Component } from "react";
import Cookies from "universal-cookie/es6";
import React from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const cookies = new Cookies();

class Ventas extends Component{
    txtCedula = React.createRef();
    codigo1 = React.createRef();
    codigo2 = React.createRef();
    codigo3 = React.createRef();
    cantidad1 = React.createRef();
    cantidad2 = React.createRef();
    cantidad3 = React.createRef();

    state = {
        status:null,
        cliente:{},
        nombreCliente:"",
        producto1:{},
        producto2:{},
        producto3:{},
        iva1:0,
        iva2:0,
        iva3:0,
        valorTotal1: 0,
        valorTotal2: 0,
        valorTotal3: 0,
        totalIva: 0,
        totalVenta:0,
        totalConIva:0,
        consecutivo:0
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

    getNombreProducto1() {
        if (!this.state.producto1){
            return "";
        } return this.state.producto1.nombreProducto;
    }
    getNombreProducto2() {
        if (!this.state.producto2){
            return "";
        } return this.state.producto2.nombreProducto;
    }
    getNombreProducto3() {
        if (!this.state.producto3){
            return "";
        } return this.state.producto3.nombreProducto;
    }

    calcularValorVenta1(cantidad){        
        if (this.state.producto1){    
            var subTotal = cantidad * this.state.producto1.precioVenta;
            var iva = this.state.producto1.ivacompra * cantidad * this.state.producto1.precioVenta /100 ;       
            this.setState({
                valorTotal1:  subTotal,
                iva1: iva ,
                totalVenta: subTotal+this.state.valorTotal2+this.state.valorTotal3 ,
                totalIva: iva+this.state.iva2+this.state.iva3
            })
                
        }
    }
    calcularValorVenta2(cantidad){        
        if (this.state.producto2){
            var subTotal = cantidad * this.state.producto2.precioVenta;
            var iva = this.state.producto1.ivacompra * cantidad * this.state.producto1.precioVenta /100 ;
            this.setState({
                valorTotal2: subTotal ,
                iva2: iva,
                totalVenta: subTotal+this.state.valorTotal1+this.state.valorTotal3 ,
                totalIva: iva+this.state.iva1+this.state.iva3
                
            })    
        }
    }
    calcularValorVenta3(cantidad){        
        if (this.state.producto3){
            var subTotal = cantidad * this.state.producto3.precioVenta;
            var iva = this.state.producto1.ivacompra * cantidad * this.state.producto1.precioVenta /100 ;
            this.setState({
                valorTotal3: subTotal ,
                iva3: iva,
                totalVenta: subTotal+this.state.valorTotal1+this.state.valorTotal2 ,
                totalIva: iva+this.state.iva1+this.state.iva2
            })    
        }
    }

    actualizarTotal(){
        this.setState({            
            totalConIva: this.totalIva.current.value + this.totalVenta.current.value
        })
    }

    guardarVenta=(e) =>{
        e.preventDefault();        
        var venta = {
            cedulaCliente:this.state.cliente.cedulaCliente,
            codigoVenta:this.state.consecutivo,
            detalleVenta:[
                {
                    cantidadProducto:this.cantidad1.current.value ,
                    codigoProducto:this.state.producto1.codigoProducto ,
                    valorTotal:this.state.valorTotal1 ,
                    valorVenta:this.state.producto1.precioVenta ,
                    valoriva:this.state.iva1                
                },
                {
                    cantidadProducto:this.cantidad2.current.value ,
                    codigoProducto:this.state.producto2.codigoProducto ,
                    valorTotal:this.state.valorTotal2 ,
                    valorVenta:this.state.producto2.precioVenta ,
                    valoriva:this.state.iva2 
                },
                {
                    cantidadProducto:this.cantidad3.current.value ,
                    codigoProducto:this.state.producto3.codigoProducto ,
                    valorTotal:this.state.valorTotal3 ,
                    valorVenta:this.state.producto3.precioVenta ,
                    valoriva:this.state.iva3 
                }
            ],
            ivaventa:this.state.totalIva,
            totalVenta:this.state.totalVenta,
            valorVenta:this.state.totalVenta+this.state.totalIva ,
            ciudad:cookies.get('ciudad')
        }

        axios.post("http://localhost:8080/addventa", venta)
           .then(res=>{
               this.setState({
                   status:"success"
               })
            });
        window.location.reload(true)
    }

    getCliente = (id) =>{
        axios.get("http://localhost:8080/consecutivo")
           .then(res=>{               
               this.setState({
                   consecutivo:res.data
               })
            })
        axios.get("http://localhost:8080/clientes/"+ cookies.get('ciudad')+"/"+id)
           .then(res => {
               this.setState({
                   cliente:res.data 
               })
               console.log(this.state.cliente)
               return this.state.cliente
            })
            .then(res => {
                console.log(this.state.cliente)
                if(this.state.cliente!=null){
                    this.setState({
                        nombreCliente:this.state.cliente.nombreCliente
                    })
                                       
                }else{
                    alert('Cliente no registrado  ');
                    window.location.href="./clientes"; 
                }
            })
    }

    getProducto1 = (id) =>{
        axios.get("http://localhost:8080/consultarProducto/" + id)
           .then(res => {
               this.setState({
                   producto1:res.data
               })
               if(res.data==null){
                alert('Producto no se encuentra no registrado  ');
               }
           });
           
    }
    getProducto2 = (id) =>{
        axios.get("http://localhost:8080/consultarProducto/" + id)
           .then(res => {
               this.setState({
                   producto2:res.data
               })
               if(res.data==null){
                alert('Producto no se encuentra no registrado  ');
               }
           });
    }
    getProducto3 = (id) =>{
        axios.get("http://localhost:8080/consultarProducto/" + id)
           .then(res => {
               this.setState({
                   producto3:res.data
               })
               if(res.data==null){
                alert('Producto no se encuentra no registrado  ');
               }
           });
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
                      <li class="navbar-brand">Tiendas la Genérica - Sucursal {cookies.get('ciudad')} | Ventas</li>
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

             <body>
             <form onSubmit = {this.guardarVenta}>
             <div class= "container2">
                <table>
                    <tr>
                        <td><label>Cédula</label></td>
                        <td><input type="text" name="txtCedula" placeholder="Cedula Cliente" required="required" ref={this.txtCedula}/></td>
                        <td><button type="button" onClick={()=>this.getCliente(this.txtCedula.current.value)}>Consultar</button></td>
                        <td><label>Cliente</label></td>
                        <td><input type="text" name="cliente" disabled="disabled" value={this.state.nombreCliente} /></td>
                        <td><label>Consecutivo</label></td>
                        <td width="10%"><input type="text" name="consec" disabled="disabled" value={this.state.consecutivo} /></td>
                    </tr>
                    <br></br>
                    <br></br>
                </table>
                <table cellspacing="5" BORDER="0" >
                    <thead>
                        <tr>
                            <td colspan="2"><strong>Codigo</strong></td>
                            <td align="center"><strong>Nombre Producto</strong></td>
                            <td align="center"><strong>Cantidad</strong></td>
                            <td align="center"><strong>Valor Total</strong></td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td width="10%"><input type="number" name="codigo1" ref={this.codigo1}  /></td>
                            <td><button type="button" onClick={()=>this.getProducto1(this.codigo1.current.value)}>Consultar</button></td>
                            <td width="45%"><input type="text" name="producto1" disabled="disabled" value={this.getNombreProducto1()} /></td>
                            <td width="10%"><input type="number" name="cantidad1" ref={this.cantidad1} onChange={()=>this.calcularValorVenta1(this.cantidad1.current.value)}/></td>
                            <td width="32%"><input type="number" name="valorTotal1" disabled="disabled" value={this.state.valorTotal1} ref={this.valorTotal1} /></td>
                        </tr>
                        <tr>
                            <td width="10%"><input type="number" name="codigo2" ref={this.codigo2} /></td>
                            <td><button type="button" onClick={()=>this.getProducto2(this.codigo2.current.value)}>Consultar</button></td>
                            <td width="45%"><input type="text" name="producto2" disabled="disabled" value={this.getNombreProducto2()} /></td>
                            <td width="10%"><input type="text" name="cantidad2" ref={this.cantidad2} onChange={()=>this.calcularValorVenta2(this.cantidad2.current.value)} /></td>
                            <td width="32%"><input type="text" name="valorTotal2" disabled="disabled" value={this.state.valorTotal2} ref={this.valorTotal2} /></td>
                        </tr>
                        <tr>
                            <td width="10%"><input type="number" name="codigo3" ref={this.codigo3} /></td>
                            <td><button type="button" onClick={()=>this.getProducto3(this.codigo3.current.value)}>Consultar</button></td>
                            <td width="45%"><input type="text" name="producto3" disabled="disabled" value={this.getNombreProducto3()} /></td>
                            <td width="10%"><input type="text" name="cantidad3" ref={this.cantidad3} onChange={()=>this.calcularValorVenta3(this.cantidad3.current.value)} /></td>
                            <td width="32%"><input type="text" name="valorTotal3" disabled="disabled" value={this.state.valorTotal3} ref={this.valorTotal3} /></td>
                        </tr>
                        <tr>
                            <td colspan="4" align="right">Total Venta</td>
                            <td><input type="text" name="totalVenta" disabled="disabled" value={this.state.totalVenta} /></td>
                        </tr>
                        <tr>
                            <td colspan="4" align="right">Total IVA</td>
                            <td><input type="text" name="totalIva" disabled="disabled" value={this.state.iva1+this.state.iva2+this.state.iva3} /></td>
                        </tr>
                        <tr>
                            <td colspan="3" align="right"><input type="submit" name="confirmar" value="Confirmar" /></td>
                            <td>Total Con IVA</td>
                            <td><input type="text" required="required" name="totalConIva" disabled="disabled" value={this.state.totalVenta+this.state.totalIva} /></td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </form>
            <br></br>
            <div class= "container2" >
            <div class="btn-group" role="group" >
            <a class="nav-link Usuarios" type="button" class="btn btn-secondary" href="/ReporteClientes">Reporte Clientes</a>
            <a class="nav-link Usuarios" type="button" class="btn btn-secondary" href="/ReporteVentas">Reporte Ventas</a>
            </div>
            </div>

            </body>

        </div>
        )
        }

    }



export default Ventas;