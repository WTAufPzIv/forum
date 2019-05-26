import React from 'react'
import {connect} from 'react-redux'
import './loginAndRegister.css'
import axios from 'axios'
import { Alert } from 'antd';
import { Pagination } from 'antd';
class LoginAndRegister extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            email:'',
            password:'',
            nickname:'',
            repassword:'',
            setboli:'blur(0px)',
            display:'none',
            rotate1:'rotate(45deg)',
            rotate2:'rotate(-45deg)',
            op:'1',
            tip:'',
            tip1:'',
            tiptype:'success',
            tipdis:'none',
            tiptype1:'success',
            tipdis1:'none'
            //name:'123'
        }
    }
    render(){
        const sumbmit = ({nickname,password,repassword,email})=>{
            if(!nickname || !password || !repassword || !email){
                this.setState({tip:'请输入完整信息'})
                this.setState({tiptype:'info'})
                this.setState({tipdis:'inline'})
            }
            else{
                if(password !== repassword){
                    this.setState({tip:'两次密码不一致'})
                    this.setState({tiptype:'error'})
                    this.setState({tipdis:'inline'})
                }
                else{
                    console.log(nickname,password,email,'测试通过')
                    const data = {nickname:'123',password:'123',email:'123'}
                    axios.post('/user/register',{nickname,password,email})
                    .then(res=>{
                        if(res.status === 200){
                            if(res.data.code === 0){
                                
                                this.setState({tip:'注册成功',setboli:'blur(0px)',display:'none'})
                                this.setState({tiptype:'success'})
                                this.setState({tipdis:'inline'})
                            }
                            else if(res.data.code === 1){
                                this.setState({tip:'该用户名已被注册'})
                                this.setState({tiptype:'error'})
                                this.setState({tipdis:'inline'})
                            }
                        }
                    })
                    //跨域测试
                    // axios.get('/user/info')
                    // .then(res=>{
                    //     if(res.status === 200){
                    //         console.log(res.data.code)
                    //     }
                    // })
                }
            }
            //console.log(nickname,password,repassword,email)
        }
        const login = ({nickname,password})=>{
            if(!nickname || !password){
                this.setState({tip1:'请输入正确的登录信息'})
                this.setState({tiptype1:'info'})
                this.setState({tipdis1:'inline'})
            }
            else{
                axios.post('/user/login',{nickname,password})
                .then(res=>{
                    if(res.status === 200){
                        if(res.data.code === 0){
                            this.setState({tip1:'登录成功'})
                            this.setState({tiptype1:'success'})
                            this.setState({tipdis1:'inline'})
                            window.location.href='http://localhost:3000';
                        }
                        else if(res.data.code === 1){
                            this.setState({tip1:'该用户不存在'})
                            this.setState({tiptype1:'error'})
                            this.setState({tipdis1:'inline'})
                        }
                        else if(res.data.code === 2){
                            this.setState({tiptype1:'error'})
                            this.setState({tipdis1:'inline'})
                            this.setState({tip1:'密码错误'})
                        }
                    }
                })
            }
        }
        const loginCss = {
            position: 'absolute',
            width:'100%',
            height: '1230px',
            backgroundImage: "url(" + require("./img/a.jpg") + ")"
        }
        const boli = {
            webkitFilter: this.state.setboli,
            mozFilter: this.state.setboli,
            oFilter: this.state.setboli,
            msFilter: this.state.setboli,
            filter: this.state.setboli,
            transition: 'all 0.3s linear'
        }
        const close = {
            position:'absolute',
            width:'50px',
            height:'50px',
            
            top:'0px',
            right:'0px',
            textAlign:'center',
        }
        const close1 = {
            position:'absolute',
            width:"40px",
            height:'5px',
            backgroundColor:'white',
            transition: 'all 0.2s linear',
            left:'5px',
            top:'22px',
            transform:this.state.rotate1
        }
        const close2 = {
            position:'absolute',
            width:"40px",
            height:'5px',
            backgroundColor:'white',
            left:'5px',
            top:'22px',
            transition: 'all 0.2s linear',
            transform:this.state.rotate2
        }
        return (
            <div style = {loginCss} className = 'loginCss'>
            <div style = {boli}>
                <div className = "title">
                    <span className = 'titleText'>Hello World</span>
                </div>
                <div className = "welcome">
                    <div className = "welcomeText"><span>Welcome to this website</span></div>
                    <div className = "welcomeText"><span>This is an experimental project</span></div>
                    <div className = "welcomeText"><span>Like most forums, you can speak freely, but it is also a newborn baby. More elements still need to be explored.</span></div>
                </div>
                <div className = "loginInput">
                    <div style = {{textAlign:'center'}}><span style = {{position:'relative', top:'50px',fontSize:"45px"}}>LOGIN YOUR ACCOUNT</span></div>
                    <div className = 'input'>
                    <input className = "nameInput" placeholder="Your nickname" onChange = {(e)=>{this.setState({nickname:e.target.value})}}></input>
                    <input className = "pwdInput" placeholder="Password" type="password" onChange = {(e)=>{this.setState({password:e.target.value})}}></input>
                    <button className = 'loginButton' onClick = {()=>{login(this.state);console.log(this.state)}}>LOGIN</button>
                    <button className = 'REButton'  onClick = {()=>{
                       this.setState({setboli:'blur(15px)'})
                       this.setState({display:'block'})
                       this.setState({op:'1'})
                    }}>REGISTER</button>
                    <div style = {{textAlign:'center',width:"100%"}}><Alert message={this.state.tip1} type={this.state.tiptype1} showIcon style = {{position:'relative',display:this.state.tipdis1,width:'300px',top:"30px"}}/></div>
                    </div>
                </div>
                </div>
                <div className = "registerInput" style = {{display:this.state.display,opacity:this.state.op}}>
                    <div style = {{textAlign:'center',position:'relative',top:'70px'}}><span style = {{fontSize:'40px'}}>CREATE YOUR ACCOUNT</span></div>
                    <div style = {close} onMouseOver = {()=>{
                        this.setState({rotate1:'rotate(0deg)'})
                        this.setState({rotate2:'rotate(0deg)'})
                    }} onMouseOut = {()=>{
                        this.setState({rotate1:'rotate(45deg)'})
                        this.setState({rotate2:'rotate(-45deg)'})
                    }} onClick = {()=>{
                        this.setState({setboli:'blur(0px)'})
                        this.setState({display:'none'})
                        this.setState({op:'0'})
                    }}>
                        <div style = {close1}></div>
                        <div style = {close2}></div>
                    </div>
                    <div style = {{textAlign:'center'}}><input className = "nameInput1" placeholder="nickname" onChange = {(e)=>{this.setState({nickname:e.target.value})}}></input></div>
                    <div style = {{textAlign:'center'}}><input className = "nameInput1" placeholder="example@qq.com" onChange = {(e)=>{this.setState({email:e.target.value})}}></input></div>
                    <div style = {{textAlign:'center'}}><input className = "pwdInput1" placeholder="setting your password" type="password" onChange = {(e)=>{this.setState({password:e.target.value})}}></input></div>
                    <div style = {{textAlign:'center'}}><input className = "pwdInput1" placeholder="repeat your password" type="password" onChange = {(e)=>{this.setState({repassword:e.target.value})}}></input></div>
                    {/* <span style = {{position:'absolute',top:'400px',left:'40%',fontSize:'13px'}}>{this.state.tip}</span> */}
                    
                    <div style = {{textAlign:'center'}}><button className = 'REButton1' onClick = {()=>{sumbmit(this.state);console.log(this.state)}}>SIGN</button></div>
                    <div style = {{textAlign:'center'}}><Alert message={this.state.tip} type={this.state.tiptype} showIcon style = {{position:'relative',display:this.state.tipdis,top:'200px'}}/></div>
                </div>
            </div>
        )
    }
}
export default LoginAndRegister