import React from 'react'
import axios from 'axios'
import './post.css'
import './out1.css'
import browserCookies from 'browser-cookies'//对cookie进行操作
import { Layout } from 'antd';
import { List,Avatar,Button,message,Modal,Input } from 'antd';
const Search = Input.Search;

const {
  Header, Footer, Sider, Content,
} = Layout;
class Post extends React.Component{
    componentDidMount(){
        console.log(this.state.id)
        axios.get('api/v1/topic/'+this.state.id)
        .then(res=>{
            console.log(res)
            this.setState({createtime:res.data.data.create_at})
            this.setState({title:res.data.data.title})
            this.setState({lastreply:res.data.data.last_reply_at})
            this.setState({replynum:res.data.data.reply_count})
            this.setState({visitnum:res.data.data.visit_count})
            this.setState({authorname:res.data.data.author.loginname})
            this.setState({avatar:res.data.data.author.avatar_url})
            this.setState({reply:res.data.data.replies})
            this.setState({content:res.data.data.content})
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
        let postid = {id:this.state.id}
            axios.post('/user/collectOrNot',postid)
            .then(res=>{
                if(res.data.code === 0){
                    this.setState({collectOrNot:'取消收藏'})
                }
            })
            axios.post('/user/mycollect')
            .then(res=>{
                console.log(res)
            this.setState({collectList:res.data.collect})
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
           id:getQueryString('id'),
           createtime:'',
           title:'',
           lastreply:'',
           replynum:'',
           visitnum:'',
           authorname:'',
           avatar:'',
           reply:[],
           current: 'mail',
           info:'未登录',
           logout:'',
           content:'',
           url:'http://localhost:3000/loginandregister',
           linkop:'1',
           collectOrNot:'收藏帖子',
           collectList:[]
        }
    }
    showModal = () => {
        this.setState({
          visible: true,
        });
      }
      handleOk = (e) => {
        console.log(e);
        this.setState({
          visible: false,
        });
      }
    
      handleCancel = (e) => {
        console.log(e);
        this.setState({
          visible: false,
        });
      }
    render(){
        let i = 0
        const bodyDom = ()=>{
            return (<div dangerouslySetInnerHTML={{ __html: this.state.content }}></div>)//粗暴的用react操作dom以动态添加节点,woc这个语句是个好东西，一定要记得
        }
        const replyDom = ()  => {
            
            return (<div><div dangerouslySetInnerHTML={{ __html: this.state.reply[i++].content}}></div></div>)
        }
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
                <div className = 'total'>
                    <div className = 'head'>
                        <h3 style = {{fontSize:'22px',fontWeight:'700',lineHeight:'130%'}}>{this.state.title}</h3>
                        <span>发布于：{this.state.createtime}作者：{this.state.authorname} {this.state.visitnum}次浏览</span>
                    </div>
                    <div className = 'author'>
                        <div style = {{width:'100%',position:'relative',top: '0px',height:'200px',backgroundColor:'white'}}>
                        <div style = {{width:'100px',height:'100px',borderRadius:'00px',overflow:'hidden',position:'relative',margin:'0 auto',top:'20px'}}>
                            <img src = {this.state.avatar} style = {{width:'100px',height:'100px'}}></img>
                        </div>
                        <div style = {{color:'black',fontSize:'15px',position:'relative',top:'50px',fontWeight:'50',width:'100%',textAlign:'center'}}><a href = {'http://localhost:3000/personinfo?nickname='+this.state.authorname} style = {{color:'rgb(119,128,166)',textAlign:'center'}}>{this.state.authorname}</a></div>
                        </div>
                        <div style = {{width:'100%',position:'relative',top: '20px',backgroundColor:'white',padding:'10px',height:'750px'}}>
                            <span style = {{fontSize:'20px'}}>广告位长期招租了喂~~~~~~~~</span>
                            <div style = {{width:'100%'}}><img src = {require('./img/1.jpg')} style = {{width:'100%'}}></img></div>
                            <div style = {{width:'100%',position:'relative',top:'10px'}}><img src = {require('./img/2.jpg')} style = {{width:'100%'}}></img></div>
                            <div style = {{width:'100%',position:'relative',top:'20px'}}><img src = {require('./img/3.jpg')} style = {{width:'100%'}}></img></div>
                            <div style = {{width:'100%',position:'relative',top:'30px'}}><img src = {require('./img/4.jpg')} style = {{width:'100%'}}></img></div>
                            <div style = {{width:'100%',position:'relative',top:'40px'}}><img src = {require('./img/5.jpg')} style = {{width:'100%'}}></img></div>
                            <div style = {{width:'100%',position:'relative',top:'50px'}}><img src = {require('./img/6.jpg')} style = {{width:'100%'}}></img></div>
                        </div>
                        <div style = {{width:'100%',position:'relative',top: '50px',backgroundColor:'white',padding:'10px',height:'130px',textAlign:'center',lineHeight:'70px'}}>
                            <Button type = 'primary' onClick = {()=>{
                                //let collect = new FormData()
                                //let access = "9541acf2-5098-4ea5-8fc2-f67903b4efe4"
                                // let access = {'accesstoken':"9541acf2-5098-4ea5-8fc2-f67903b4efe4"}
                                // collect.append('accesstoken',access)
                                
                                // axios.post('api/v1/accesstoken',access)
                                // .then(res=>{
                                //     console.log(res)
                                // })
                                //collect.append('topic_id',this.state.id)
                                // axios.post('api/v1/topic_collect/collect',collect)
                                // .then(res=>{ 
                                //     console.log(res)
                                // })
                                if(this.state.collectOrNot === '收藏帖子')
                                {
                                    let data = {'id':this.state.id,'title':this.state.title,'avatar':this.state.avatar}
                                    axios.post('/user/collect',data)
                                    .then(res=>{
                                        if(res.data.code === 0){
                                            message.success('收藏成功');
                                            this.setState({collectOrNot:'取消收藏'})
                                            axios.post('/user/mycollect')
                                                .then(res=>{
                                                this.setState({collectList:res.data.collect})
                                            })
                                        }
                                        else if(res.data.code === 2){
                                            message.error('请先登录');
                                        }
                                    })
                                }
                                else if(this.state.collectOrNot === '取消收藏'){
                                    let data = {'id':this.state.id,'title':this.state.title,'avatar':this.state.avatar}
                                    axios.post('/user/removecollect',data)
                                    .then(res=>{
                                        if(res.data.code === 0){
                                            message.info('已移除收藏');
                                            this.setState({collectOrNot:'收藏帖子'})
                                            axios.post('/user/mycollect')
                                                .then(res=>{
                                                this.setState({collectList:res.data.collect})
                                            })
                                        }
                                    })
                                }
                            }}>{this.state.collectOrNot}</Button>
                            <br></br>
                            <Button style = {{top:'-30px',position:'relative'}} onClick = {
                                ()=>{
                                    if(this.state.info === '未登录'){
                                        message.error('请先登录');
                                    }
                                    else{
                                        this.showModal()
                                    }
                                }
                                
                                }>我的收藏</Button>
                            <Modal
                                title="我收藏的帖子"
                                visible={this.state.visible}
                                onOk={this.handleOk}
                                onCancel={this.handleCancel}
                                >
                                <List itemLayout="horizontal" dataSource={this.state.collectList}
                            renderItem={item => (
                                <List.Item>
                                  <List.Item.Meta
                                    avatar={<Avatar src={item.avatar} />}
                                    title={<a href={"http://localhost:3000/post?id="+item.id}>{item.title}</a>}
                                    //description={replyDom()}
                                  />
                                </List.Item>
                              )}
                        />
                            </Modal>
                            {/* <Button onClick = {()=>{
                                axios.post('/user/mycollect')
                                .then(res=>{
                                    this.setState({collectList:res.data.collect})
                                })
                            }}>测试</Button> */}
                        </div>
                    </div>
                    <div className = 'body'>
                        {bodyDom()}
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <Search
      placeholder="文体两开花，评论文明靠大家"
      enterButton="发布评论"
      size="large"
      onSearch={value => {console.log(value)
        if(this.state.info === '未登录'){
            message.error("请先登录")
        }
        else{
            let comment = {
                "accesstoken":" 9541acf2-5098-4ea5-8fc2-f67903b4efe4",
                "content":value
            }
            axios.post('/api/v1/topic/'+this.state.id+'/replies',comment)
            .then(res=>{
                if(res.data.success === true){
                    message.success('评论成功')
                    window.location.href = window.location.href
                }
            })
        }
        
    }}
    />
    <br></br>
    <br></br>
    <br></br>
                        <List itemLayout="horizontal" dataSource={this.state.reply}
                            renderItem={item => (
                                <List.Item>
                                  <List.Item.Meta
                                    avatar={<Avatar src={item.author.avatar_url} />}
                                    title={<a href="https://ant.design">{item.author.loginname}</a>}
                                    description={replyDom()}
                                  />
                                </List.Item>
                              )}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
export default Post