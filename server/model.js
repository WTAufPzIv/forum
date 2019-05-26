const mongoose = require('mongoose')
const DB_URL = 'mongodb://127.0.0.1:27017/acm_obj'
mongoose.connect(DB_URL)
mongoose.connection.on('connected',function(){
    console.log('mongodb数据库连接成功')
})
const models = {
    user:{
        'nickname':{'type':String,'require':true},
        'password':{'type':String,'require':true},
        'email':{'type':String,'require':true},
        'title':{'type':String},
        'collect':{'type':Array},
        'topic':{'type':Array}
    }
}
for(let m in models){
    mongoose.model(m,new mongoose.Schema(models[m]))
}
module.exports = {
    getModel:function(name){
        return mongoose.model(name)
    }
}