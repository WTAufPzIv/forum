import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import reducer from './reducer'
import { createStore, applyMiddleware, compose } from 'redux'
import { BrowserRouter, Route,  Switch, Link  } from 'react-router-dom'
import  Userinfo  from './component/userinfo/userinfo'
import Home from './component/home/home'
import User from './component/user/user'
import Post from './component/post/post'
import Add from './component/add/add'
import ChangeInfo from './component/changeinfo/changeinfo'
import LoginAndRegister from './component/loginAndRegister/loginAndRegister'
import AuthRouter from './authroute/authrouter'
const reduxDevtools = window.devToolsExtension?window.devToolsExtension():f=>f
//通过中间件实现请求
const store= createStore(reducer,compose(
    applyMiddleware(thunk),
    reduxDevtools
))
ReactDOM.render(
    (
        <Provider store = { store }>
            <BrowserRouter>
                <div>
                {/* <Switch> */}
                    {/* <AuthRouter></AuthRouter> */}
                    <Route  path = '/loginAndRegister' component = {LoginAndRegister}></Route> 
                    {/* 登录注册 */}
                    <Route exact path = '/' component = {Home}></Route> 
                    
                    <Route path = '/home' component = {Home}></Route> 
                    
                    <Route path = '/post' component = {Post}></Route> 
                    
                    <Route path = '/person' component = {User}></Route> 
                    
                    <Route path = '/createpost' component = {Add}></Route> 
                    
                    <Route path = '/changeinfo' component = {ChangeInfo}></Route> 

                    <Route path = '/personinfo' component = {Userinfo}></Route> 

                    <Route path = '/add' component = {Add}></Route> 
                    
                {/* </Switch>  */}
                </div>
            </BrowserRouter>
        </Provider>
    ),
    
    
    
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
