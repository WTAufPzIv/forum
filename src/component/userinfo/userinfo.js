import React from 'react'
import axios from 'axios'
import browserCookies from 'browser-cookies'//对cookie进行操作
import './userinfo.css'
import {Button} from 'antd'
import { List, Avatar } from 'antd';
import { Pagination } from 'antd';
import { Carousel } from 'antd';
import { Breadcrumb } from 'antd';
class Userinfo extends React.Component{
    componentDidMount(){
        axios.get('api/v1/user/'+this.state.user)
        .then(res=>{
            console.log(res.data.data)
            this.setState({avatar:res.data.data.avatar_url})
            this.setState({score:res.data.data.score})
            this.setState({git:res.data.data.githubUsername})
            this.setState({nickname:res.data.data.loginname})
            this.setState({createTiem:res.data.data.create_at})
            this.setState({topic:res.data.data.recent_topics})
            this.setState({reply:res.data.data.recent_replies})
            this.setState({lastreply:res.data.data.last_reply_at})
        })
        axios.get('/user/info')
        .then(res=>{
            if(res.data.code === 0){
                this.setState({info:res.data.nickname})
                this.setState({url:'http://localhost:3000/person'})
                this.setState({logout:'退出登录'})
            }
            else{
                this.setState({info:'未登录'})
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
            avatar:'',
            score:0,
            git:'',
            user:getQueryString('nickname'),
            createTiem:'',
            topic:[],
            reply:[],
            lastreply:''
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
                    <div className = 'head' style = {{height:'270px',padding:'15px'}}>
                        <div>
                            <br></br>
                            <img src = {this.state.avatar} style = {{height:'120px'}}></img>
                            <span style = {{fontSize:'20px',color:'rgb(119,128,166)',marginLeft:'20px'}}>{this.state.nickname}</span>
                            <span></span>
                        </div>
                        <span style = {{fontSize:'20px',color:'rgb(119,128,166)'}}>账号创建于:{this.state.createTiem}</span>
                        <br></br>
                        <span style = {{fontSize:'20px',color:'rgb(119,128,166)'}}>积分：{this.state.score}</span>
                        <br></br>
                        <span style = {{fontSize:'20px',color:'rgb(119,128,166)'}}>github:<a href = {'https://github.com/'+this.state.git}>{this.state.git}</a></span>
                    </div>
                    <div className = 'author1' style = {{top:'-270px'}}>
                        <div style = {{width:'100%',backgroundColor:'white',height:'80px',textAlign:'center'}}>
                            <Button type = 'primary' style = {{position:'relative',top:'20px'}}>发布帖子</Button>
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
                    <div className = 'body1' style = {{top:'310px'}}>
                        <div style = {{width:'100%',backgroundColor:'rgb(246,246,246)',height:'30px',lineHeight:'30px',textAlign:'center'}}>ta发布的帖子</div>
                        <div style = {{width:'100%',backgroundColor:'white',padding:'10px'}}>
                        <List
                    size = 'large'
                    itemLayout="horizontal"
                    dataSource={this.state.topic}
                    renderItem={item => (
                <List.Item >
                    <List.Item.Meta
                    avatar={<Avatar src={item.author.avatar_url} />}
                    title={<a href={"http://localhost:3000/post?id="+item.id}>{item.title}</a>}
                    description={<span>最后回复时间：{item.last_reply_at}</span>}
                    />
                </List.Item>
                    )}
                    />
                        </div>
                        <div style = {{width:'100%',position:'relative',top: '20px',backgroundColor:'rgb(246,246,246)',padding:'10px',height:'30px',lineHeight:'10px',textAlign:'center'}}>ta最近参与的讨论</div>
                        <div style = {{width:'100%',position:'relative',top: '20px',backgroundColor:'white',padding:'10px'}}>
                        <List
                    size = 'large'
                    itemLayout="horizontal"
                    dataSource={this.state.reply}
                    renderItem={item => (
                <List.Item >
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
                    {/* <div className = 'author'></div>
                    <div className = 'body'></div> */}
                </div>
            </div>
        )
    }
}
export default Userinfo