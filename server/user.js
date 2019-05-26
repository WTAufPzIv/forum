const express = require('express')
const Router = express.Router()
const utils = require('utility')//md5加密依赖
const model = require('./model')
const User = model.getModel('user')
const pwdnotsee = {'password':0}
Router.get('/list',function(req,res){
    User.find({},function(err,doc){
        return res.json(doc)
    })
})
Router.post('/login',function(req,res){
    const data = {nickname:req.body.nickname,password:md5pwd(req.body.password)}
    User.findOne({nickname:req.body.nickname},function(err,doc){
        if(!doc){
            return res.json({code:1,msg:'nicknamenotexist'})
        }
        else{
             if(doc.password !== data.password)
             return res.json({code:2,msg:'wapwd'})
             else{
                 res.cookie('userid',doc._id)//使用 cookie保存用户登录状态
                return res.json({code:0,msg:'loginsuccess'})
             }
            //console.log(doc)
        }
    })
})
Router.post('/register',function(req,res){
    console.log(req.body)
    const data = {nickname:req.body.nickname,password:md5pwd(req.body.password),email:req.body.email,title:'这个人很懒，还什么都没有写'}
    User.findOne({nickname:req.body.nickname},function(err,doc){
        if(doc){
            return res.json({code:1,msg:'nicknamerepeat'})
        }
        else{ 
            User.create(data,function(e,d){
                if(e){
                    return res.json({code:1,msg:'后端错误'})
                }
                else{
                    //res.cookie('userid',d._id)
                    return res.json({code:0})
                }
            })
        }
    })
})
Router.get('/info',function(req,res){//判断用户是否登录
    const {userid} = req.cookies
    if(!userid){
        return res.json({code:2})//没有cookie
    }
    else{
        User.findOne({_id:userid},function(err,doc){
            if(doc){
                return res.json({code:0,nickname:doc.nickname})
            }
        })
    }
})
Router.get('/userinfo',function(req,res){//返回用户信息
    const {userid} = req.cookies
    if(!userid){
        return res.json({code:2})//没有cookie
    }
    else{
        User.findOne({_id:userid},function(err,doc){
            if(doc){
                return res.json({code:0,nickname:doc.nickname,email:doc.email,title:doc.title})
            }
        })
    }
})
Router.post('/setnickname',function(req,resq){//返回用户信息
    const {userid} = req.cookies
    const data = {nickname:req.body.setname}
    console.log(req.body)
    if(!userid){
        return resq.json({code:2})//没有cookie
    }
    else{
        User.findOne({_id:userid},function(err,doc){
            if(doc){
                User.findOne({nickname:data.nickname},function(err,doc1){
                    if(doc1){
                        return resq.json({code:1})
                    }
                    else{
                        //User.update({nickname:data.nickname})
                        var where = {"_id":userid}
                        var update = {$set:{'nickname':data.nickname}}
                        User.updateOne(where,update,function(err,res){
                            if(err){
                                console.log(err)
                            }
                            else{
                                return resq.json({code:0})
                            }
                        })
                    }
                })
            }
        })
    }
})
Router.post('/settitle',function(req,resq){//返回用户信息
    const {userid} = req.cookies
    const data = {title:req.body.settitle}
    if(!userid){
        return resq.json({code:2})//没有cookie
    }
    else{
        User.findOne({_id:userid},function(err,doc){
            if(doc){
                    var where = {"_id":userid}
                    var update = {$set:{'title':data.title}}
                    User.updateOne(where,update,function(err,res){
                        if(err){
                            console.log(err)
                        }
                        else{
                            return resq.json({code:0})
                        }
                    })
                
            }
        })
    }
})
Router.post('/setemail',function(req,res){//返回用户信息
    const {userid} = req.cookies
    const data = {email:req.body.setemail}
    if(!userid){
        return res.json({code:2})//没有cookie
    }
    else{
        User.findOne({_id:userid},function(err,doc){
            if(doc){
                User.findOne({email:data.email},function(err,doc1){
                    if(doc1){
                        return res.json({code:1})
                    }
                    else{
                        //User.update({nickname:data.nickname})
                        var where = {"_id":userid}
                        var update = {$set:{'email':data.email}}
                        User.updateOne(where,update,function(err,resq){
                            if(err){
                                console.log(err)
                            }
                            else{
                                return res.json({code:0})
                            }
                        })
                    }
                })
            }
        })
    }
})
Router.post('/setpwd',function(req,res){//返回用户信息
    const {userid} = req.cookies
    const data = {pwd:md5pwd(req.body.setpwd)}
    if(!userid){
        return res.json({code:1})//没有cookie
    }
    else{
        User.findOne({_id:userid},function(err,doc){
            if(doc){
                    var where = {"_id":userid}
                    var update = {$set:{'password':data.pwd}}
                    User.updateOne(where,update,function(err,resq){
                        if(err){
                            console.log(err)
                        }
                        else{
                            return res.json({code:0})
                        }
                    })
                
            }
        })
    }
})
Router.post('/collect',function(req,res){
    const {userid} = req.cookies
    const data = {id:req.body.id,title:req.body.title,avatar:req.body.avatar}
    if(!userid){
        return res.json({code:2})
    }
    else{
        User.findOne({_id:userid},function(err,doc){
            if(doc){
                var where = {"_id":userid}
                var update = {$addToSet:{'collect':data}}//addToSet用于添加无重复元素
                User.updateOne(where,update,function(err,resq){
                    if(err){
                        console.log(err)
                    }
                    else{
                        return res.json({code:0})
                    }
                })
            }
        })
    }
})
Router.post('/collectOrNot',function(req,res){
    const {userid} = req.cookies
    const data = req.body.id
    if(!userid){
        return res.json({code:2})
    }
    else{
        User.findOne({_id:userid},function(err,doc){
            if(doc){
                User.find({"collect.id":data},function(err,result){
                    if(result.length === 0){
                        console.log(result)
                        return res.json({code:1})
                    }
                    else{
                        console.log(result)
                        return res.json({code:0})
                    }
                })
            }
        })
    }
})
Router.post('/removecollect',function(req,res){
    const {userid} = req.cookies
    const data = {id:req.body.id,title:req.body.title,avatar:req.body.avatar}
    if(!userid){
        return res.json({code:2})
    }
    else{
        User.findOne({_id:userid},function(err,doc){
            if(doc){
                var where = {"_id":userid}
                var update = {$pull:{'collect':data}}
                User.updateOne(where,update,function(err,resq){
                    if(err){
                        console.log(err)
                    }
                    else{
                        return res.json({code:0})
                    }
                })
            }
        })
    }
})
Router.post('/mycollect',function(req,res){
    const {userid} = req.cookies
    if(!userid){
        return res.json({code:2})
    }
    else{
        User.findOne({_id:userid},function(err,doc){
            if(doc){
                return res.json(doc)
                // User.find({},function(err,resq){
                //     if(err){
                //         console.log(err)
                //     }
                //     else{
                //         console.log(resq)
                //         return res.json(resq)
                //     }
                // })
            }
        })
    }
})
Router.post('/add',function(req,res){
    const {userid} = req.cookies
    const data = {id:req.body.topic_id}
    if(!userid){
        return res.json({code:2})
    }
    else{
        User.findOne({_id:userid},function(err,doc){
            if(doc){
                var where = {"_id":userid}
                var update = {$addToSet:{'topic':data}}//addToSet用于添加无重复元素
                User.updateOne(where,update,function(err,resq){
                    if(err){
                        console.log(err)
                    }
                    else{
                        return res.json({code:0})
                    }
                })
            }
        })
    }
})
Router.post('/mytopic',function(req,res){
    const {userid} = req.cookies
    if(!userid){
        return res.json({code:2})
    }
    else{
        User.findOne({_id:userid},function(err,doc){
            if(doc){
                return res.json(doc)
            }
        })
    }
})
function md5pwd(pwd){
    const salt = 'include<bits/stdc++.h>19981014'
    return utils.md5(utils.md5(utils.md5(utils.md5(utils.md5(pwd+salt)))))//五层md5加盐加固密码
}
module.exports = Router