const express = require('express')
const utils = require('utility')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
const userRouter = require('./user')
app.use(bodyParser());
app.use(bodyParser.json())//让后端可以解析到前端传来的数据
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(cookieParser())
//wrnm什么垃圾设定啊，解析模块调用要在其他模块之前
app.use('/user',userRouter)//使用user这个路由
app.listen(9093,function(){
    console.log("node app have started at port 9093")
})