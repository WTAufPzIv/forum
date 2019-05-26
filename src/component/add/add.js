import React from 'react'
import axios from 'axios'
import browserCookies from 'browser-cookies'//对cookie进行操作
import './add.css'
import {Button,Input,message} from 'antd'
const { TextArea } = Input;

class Add extends React.Component{
    componentDidMount(){
       
        axios.get('/user/info')
        .then(res=>{
            if(res.data.code === 0){
                this.setState({info:res.data.nickname})
                this.setState({url:'http://localhost:3000/person?nickname='+this.state.nickname})
                this.setState({logout:'退出登录'})
                this.setState({nickname:res.data.nickname})
            }
            else{
                this.setState({info:'未登录'})
            }
        })
        axios.get('/user/userinfo')
        .then(res=>{
            if(res.data.code === 0){
                this.setState({nickname:res.data.nickname})
                this.setState({email:res.data.email})
                this.setState({title:res.data.title})
            }
        })
        
    }
    constructor(props){
        function getQueryString(name) {  
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
            var r = window.location.search.substr(1).match(reg);  
            if (r != null) return unescape(r[2]);  
            return null;  
        }
        super(props)
        this.state = {
            nickname:getQueryString('nickname'),
            info:'未登录',
            logout:'',
            url:'http://localhost:3000/loginandregister',
            title:'',
            content:'',
            Texttitle:''
        }
    }
    render(){
        return (
            <div>
                <div className = 'QQnav'>
                    <div style = {{position:'relative',height:'50px',marginLeft:'100px'}}>
                        <div className = 'QQlogo2'>
                            <span style = {{fontSize:'30px',fontStyle:'Helvetica'}}>HelloWorld</span>
                        </div>
                    </div>
                    <div className = 'Qnav1' style = {{display:'block'}}>
                    <div className = 'Qnavitem1'><a className = 'Qnavitemtext' href = 'http://localhost:3000'>论坛首页</a></div>
                    <div className = 'Qnavitem'><a className = 'Qnavitemtext' href = {'https://cnodejs.org/api'}>后台API</a></div>
                    <div className = 'Qnavitem'><a  className = 'Qnavitemtext' onClick = {()=>{
                    window.location.href = this.state.url
                    }}>{this.state.info}</a></div>
                    <div className = 'Qnavitem'><a className = 'Qnavitemtext' onClick = {()=>{
                    alert("退出登录")
                    browserCookies.erase('userid')
                    window.location.href = window.location.href
                }}>{this.state.logout}</a></div>
                    </div>
                </div>



                
                
                <div className = 'total2'>
                    <div className = 'head' style = {{height:'440px',padding:'0',textAlign:'center'}}>
                        <div style = {{width:'100%',backgroundColor:'rgb(246,246,246)',height:'40px',textAlign:'center',lineHeight:'40px'}}>发布话题</div>
                        <br></br>
                        
                        <Input placeholder="请输入标题(十个字以上)" style = {{width:'80%'}} onChange = {value=>{
                            this.setState({Texttitle:value.target.value})
                        }}/>
                        <br></br>
                        <br></br>
                        <TextArea rows={10} placeholder="输入正文  ..." style = {{width:'80%'}} onChange = {value=>{
                            this.setState({content:value.target.value})
                        }}/>
                        {/* <span style = {{fontSize:"10px",color:'rgb(100,100,100)',position:'relative',marginLeft:'-600px'}}>正文</span> */}
                        <br></br>
                        
                        <hr style = {{color:'rgb(233,233,233)',width:'100%'}}></hr>
                        <Button type = 'primary' onClick = {()=>{
                           
                            if(this.state.info === '未登录'){
                                message.error("请先登录")
                            }
                            else{
                                let data = {
                                    'accesstoken':'9541acf2-5098-4ea5-8fc2-f67903b4efe4',
                                    'title':this.state.Texttitle,
                                    'tab':'dev',
                                    'content':this.state.content
                                }
                                axios.post('/api/v1/topics',data)
                                .then(res=>{
                                    console.log(res.data)
                                    if(res.data.success === true){
                                        axios.post('/user/add',res.data)
                                        .then(result=>{
                                            if(result.data.code === 0){
                                                message.success("发布成功")
                                                window.location.href = 'http://localhost:3000/post?id='+res.data.topic_id
                                            }
                                        })
                                        
                                    }
                                })
                            }
                        }}>提交</Button>
                    </div>
                    <div className = 'author2'>
                        <div style = {{width:'100%',position:'relative',top: '0px',backgroundColor:'white',height:'300px'}}>
                            <div style = {{width:'100%',backgroundColor:'rgb(246,246,246)',height:'40px',textAlign:'center',lineHeight:'40px'}}>格式提示</div>
                            <br></br>
                            
                            <div style = {{width:'100%',position:'relative',top:'0px',textAlign:'center'}}>### 单行的标题</div>
                            <div style = {{width:'100%',position:'relative',top:'10px',textAlign:'center'}}>**粗体**</div>
                            <div style = {{width:'100%',position:'relative',top:'20px',textAlign:'center'}}>`console.log('行内代码')`</div>
                            <div style = {{width:'100%',position:'relative',top:'30px',textAlign:'center'}}>```js\n code \n``` 标记代码块</div>
                            <div style = {{width:'100%',position:'relative',top:'40px',textAlign:'center'}}>[内容](链接)</div>
                            <div style = {{width:'100%',position:'relative',top:'50px',textAlign:'center'}}>![文字说明](图片链接)</div>
                            <div style = {{width:'100%',position:'relative',top:'60px',textAlign:'center'}}><a href = 'https://segmentfault.com/markdown'>Markdown 文档</a></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Add