import React from 'react'
import axios from 'axios'
import browserCookies from 'browser-cookies'//对cookie进行操作
import './user.css'
import Doawer from '../../container/Drawer/Drawer'
import {Button,List,Avatar} from 'antd'
let topicArray = [{"id":''}]
let mytopicArray = [{"id":''}]
let flag = 0
class User extends React.Component{
    componentDidMount(){
        axios.get('api/v1/user/zxh2459917510')
        .then(res=>{
            console.log(res.data.data)
            this.setState({avatar:res.data.data.avatar_url})
            this.setState({score:res.data.data.score})
            this.setState({git:res.data.data.githubUsername})
            this.setState({alltopic:res.data.data.recent_topics})
            //topicArray = res.data.data.recent_topics;
            this.setState({mytopic:res.data.data.recent_topics})
            this.setState({replytopic:res.data.data.recent_replies})
            // for(let i = 0;i < topicArray.length; i++){
            //     flag = 0
            //     for(let j = 0;j < mytopicArray.length;j++){
            //         if(topicArray[i].id !== mytopicArray[j].id){
            //             flag++
            //         }
            //     }
            //     if(flag === mytopicArray.length){
            //         delete topicArray[i]
            //         console.log(topicArray)
            //         this.setState({mytopic:topicArray})
            //     }
            // }
            
        })
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
        axios.post('/user/mytopic')
        .then(res=>{
            console.log(res.data.topic)
            //this.setState({mytopic:res.data.topic})
            mytopicArray = res.data.topic
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
            avatar:'',
            score:0,
            git:'',
            title:'',
            email:'' ,
            visible: false,
            mytopic:[],
            replytopic:[]
        }
    }
    showDrawer = () => {
        this.setState({
          visible: true,
        });
      };
      onClose = () => {
        this.setState({
          visible: false,
        });
      };
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
                    <div className = 'Qnavitem'><a className = 'Qnavitemtext' href = {'https://cnodejs.org/api/v1/topic/'+this.state.id}>后台API</a></div>
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



                
                
                <div className = 'total1'>
                    <div className = 'head' style = {{padding:'15px',height:'330px'}}>
                        <div>
                            <br></br>
                            <img src = {this.state.avatar}></img>
                            <span style = {{fontSize:'20px',color:'rgb(119,128,166)',marginLeft:'20px'}}>{this.state.nickname}</span>
                            <span></span>
                        </div>
                        <span style = {{fontSize:'20px',color:'rgb(119,128,166)',fontStyle:'italic'}}>{this.state.title}</span>
                        <br></br>
                        <span style = {{fontSize:'20px',color:'rgb(119,128,166)'}}>积分：{this.state.score}</span>
                        <br></br>
                        <span style = {{fontSize:'20px',color:'rgb(119,128,166)'}}>GitHub:@<a href = {'https://github.com/'+this.state.git}>{this.state.git}</a></span>
                        <br></br>
                        <span style = {{fontSize:'20px',color:'rgb(119,128,166)'}}>email:<a href = 'https://mail.qq.com/cgi-bin/loginpage'>{this.state.email}</a></span>
                        {/* <Button style = {{position:'relative',marginLeft:'50px'}} onClick = {this.showDrawer}> 修改信息 </Button> */}
                        <Doawer  nickname = {this.state.nickname} title = {this.state.title} email = {this.state.email}/>
                    </div>
                    <div className = 'author1'>
                        <div style = {{width:'100%',backgroundColor:'white',height:'80px',textAlign:'center'}}>
                            <Button type = 'primary' style = {{position:'relative',top:'20px'}} onClick = {()=>{window.location.href = 'http://localhost:3000/add?nickname='+this.state.nickname}}>发布帖子</Button>
                        </div>
                        <div style = {{width:'100%',position:'relative',top: '20px',backgroundColor:'white',padding:'10px',height:'600px'}}>
                        <span style = {{fontSize:'20px'}}>广告位长期招租了喂~~~~~~~~</span>
                            <div style = {{width:'100%'}}><img src = {require('./img/1.jpg')} style = {{width:'100%'}}></img></div>
                            <div style = {{width:'100%',position:'relative',top:'10px'}}><img src = {require('./img/2.jpg')} style = {{width:'100%'}}></img></div>
                            <div style = {{width:'100%',position:'relative',top:'20px'}}><img src = {require('./img/3.jpg')} style = {{width:'100%'}}></img></div>
                            <div style = {{width:'100%',position:'relative',top:'30px'}}><img src = {require('./img/4.jpg')} style = {{width:'100%'}}></img></div>
                            <div style = {{width:'100%',position:'relative',top:'40px'}}><img src = {require('./img/5.jpg')} style = {{width:'100%'}}></img></div>
                            <div style = {{width:'100%',position:'relative',top:'50px'}}><img src = {require('./img/6.jpg')} style = {{width:'100%'}}></img></div>
                        </div>
                    </div>
                    <div className = 'body1'>
                        <div style = {{width:'100%',backgroundColor:'rgb(246,246,246)',height:'30px',textAlign:'center',lineHeight:'30px'}}>helloworld发布的帖子</div>
                        <div style = {{width:'100%',backgroundColor:'white',textAlign:'center',padding:'10px',textAlign:'left'}}>
                        <List itemLayout="horizontal" dataSource={this.state.mytopic}
                            renderItem={item => (
                                <List.Item>
                                  <List.Item.Meta
                                    avatar={<Avatar src={item.author.avatar_url} />}
                                    title={<a href={"http://localhost:3000/post?id="+item.id}>{item.title}</a>}
                                    description={<span>最后回复时间：{item.last_reply_at} </span>}
                                  />
                                </List.Item>
                              )}
                        />
                        </div>
                        <div style = {{width:'100%',position:'relative',top: '20px',backgroundColor:'rgb(246,246,246)',padding:'10px',height:'30px',textAlign:'center',lineHeight:'10px'}}>helloworld最近参与</div>
                        <div style = {{width:'100%',position:'relative',top: '20px',backgroundColor:'white',padding:'10px'}}>
                        <List itemLayout="horizontal" dataSource={this.state.replytopic}
                            renderItem={item => (
                                <List.Item>
                                  <List.Item.Meta
                                    avatar={<Avatar src={item.author.avatar_url} />}
                                    title={<a href={"http://localhost:3000/post?id="+item.id}>{item.title}</a>}
                                    description={<span>最后回复时间：{item.last_reply_at} </span>}
                                  />
                                </List.Item>
                              )}
                        />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default User