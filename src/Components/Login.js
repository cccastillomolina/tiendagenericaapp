import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import md5 from "md5";
import Cookies from "universal-cookie/es6";

const baseUrl="http://localhost:8080/loginUsuario";
const cookies = new Cookies();

class Login extends Component {
    state={
        form:{
            username: '',
            password: ''
        },
        usuarios: {},
        status: null

    }

    handleChange=async e=>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        
    }

    iniciarSesion=async()=>{
        await axios.post(baseUrl, {usuario: this.state.form.username, password: md5(this.state.form.password)})
        .then(response=>{
            this.setState({usuarios: response.data})
            console.log(this.state.usuarios);
            return this.state.usuarios;
        })
        .then(response=>{
            if(response!='' || response==null){                
                var respuesta=this.state.usuarios;
                cookies.set('nombreUsuario', respuesta.nombreUsuario, {path: "/"});
                cookies.set('ciudad', respuesta.ciudad, {path: "/"});
                alert('Bienvenido  '+respuesta.nombreUsuario);
                window.location.href="./menu";

            }else {
                alert('usuario o contraseña errados, intente de nuevo');
            }
        })
        .catch(error=>{
            console.log(error);
        })
    }
    
    componentDidMount() {
        if (cookies.get('nombreUsuario')){
            window.location.href="./menu";
        }
    }
    
    render(){
        return (
            <div class= "container1">
                <label><h2>Bienvenido a Tienda La Genérica</h2> </label>
                <br />
                <br />
                <label><h5>Usuario</h5> </label>
                <br />
                <input type="text" name="username" onChange={this.handleChange}/>
                <br />
                <br />
                <label><h5>Contraseña</h5> </label>
                <br />
                <input type="password" name="password" onChange={this.handleChange}/>
                <br />
                <br />
                <button  class="btn btn-secondary" onClick={()=>this.iniciarSesion()}> Iniciar Sesión </button>
            </div>
        )
    }
}

export default Login;