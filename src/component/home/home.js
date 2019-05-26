import React from 'react'
import 'antd/dist/antd.css';
import axios from 'axios'
import { Carousel } from 'antd';
import './home.css'
import browserCookies from 'browser-cookies'//对cookie进行操作
import { List, Avatar } from 'antd';
import { Pagination } from 'antd';
import { Breadcrumb } from 'antd';
class Home extends React.Component{
    componentDidMount(){
        this.screenChange();
        axios.get('/api/v1/topics?page=1&&limit=30')
            .then(res=>{
                console.log(res.data.data)
                this.setState({contentlist:res.data.data})
            })
        setTimeout(()=>{
            axios.get('/user/info')
        .then(res=>{
            if(res.data.code === 0){
                this.setState({info:res.data.nickname})
                this.setState({url:'http://localhost:3000/person?nickname='+res.data.nickname})
                this.setState({logout:'退出登录'})
            }
            else{
                this.setState({info:'未登录'})
            }
        })
        },0)
        if(window.innerWidth<1790){
        this.setState({navdis:'none'})
        this.setState({linkop:'0'})
        this.setState({navtransition:'all 0.5s'})
        this.setState({navtrans:'translateX(-252px)'})
        this.setState({navtrans1:'translateX(-252px)'})
        }
        else{
            this.setState({linkop:'0'})
            this.setState({navtransition:'all 0s'})
            this.setState({navtrans1:'translateX(0px)'})
        }
    }
    constructor(props){
        super(props)
        this.state = {
            current: 'mail',
            info:'未登录',
            logout:'',
            url:'http://localhost:3000/loginandregister',
            navdis:'block',
            navtrans:'translateX(-252px)',
            navtrans1:'translateX(-252px)',
            linkop:'0',
            navtransition:'all 0',
            rotate1:'rotate(0deg) translateY(0px)',
            rotate2:'rotate(0deg) translateY(0px)',
            closeop:'1',
            contentlist:[],
            page:'1',
            tab:'',
            nickname:''
        }
        this.saveRef = ref => {this.refDom = ref}
        this.getWidth = () => {
            var w = window.innerWidth
            if(w<1790)
            this.setState({navdis:'none'})
        }
        this.resize = this.resize.bind(this)
    }
    screenChange() {
        window.addEventListener('resize', this.resize);
    }
    resize(e){
        //const {clientWidth, clientHeight} = this.refDom
       //alert(window.innerWidth)
       //console.log(window.innerWidth)
       if(window.innerWidth > 1790){
        this.setState({navdis:'block'})
        this.setState({linkop:'0'})
        this.setState({navtransition:'all 0s'})
        this.setState({navtrans1:'translateX(0px)'})
       }
       else if(window.innerWidth < 1790){
        this.setState({navdis:'none'})
        this.setState({linkop:'0'})
        this.setState({navtransition:'all 0.5s'})
        if(this.state.navtrans === 'translateX(-252px)')
        this.setState({navtrans1:'translateX(-252px)'})
        else if(this.state.navtrans === 'translateX(0px)')
        this.setState({navtrans1:'translateX(0px)'})
       }
    }
    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
          current: e.key,
        });
      }
    render(){
        return (
            <div>
                <Carousel autoplay>
                    <div style = {{height:'700px'}}><img alt = '' src = {require('./img/1.jpg')} style = {{height:'700px',width:'100%'}}></img></div>
                    <div style = {{height:'700px'}}><img alt = '' src = {require('./img/2.jpg')} style = {{height:'700px',width:'100%'}}></img></div>
                    <div style = {{height:'700px'}}><img alt = '' src = {require('./img/3.jpg')} style = {{height:'700px',width:'100%'}}></img></div>
                    <div style = {{height:'700px'}}><img alt = '' src = {require('./img/4.jpg')} style = {{height:'700px',width:'100%'}}></img></div>
                    <div style = {{height:'700px'}}><img alt = '' src = {require('./img/5.jpg')} style = {{height:'700px',width:'100%'}}></img></div>
                </Carousel>
                <div className = 'nav'>
                    <div style = {{position:'relative',height:'50px',width:'50px',marginLeft:'100px'}}>
                        <div className = 'logo1' onClick = {()=>{
                            this.setState({navdis:this.state.navdis === 'none'?'block':'none'})
                            this.setState({navtrans:this.state.navtrans === 'translateX(-252px)'?'translateX(0px)':'translateX(-252px)'})
                            //if(window.innerWidth<1790)
                            this.setState({navtrans1:this.state.navtrans1 === 'translateX(-252px)'?'translateX(0px)':'translateX(-252px)'})
                            if(this.state.navtrans1 === 'translateX(-252px)')
                            {
                                this.setState({rotate1:'rotate(49deg) translateY(19px)'})
                                this.setState({rotate2:'rotate(-49deg) translateY(-19px)'})
                                this.setState({closeop:'0'})
                            }
                            else if(this.state.navtrans1 === 'translateX(0px)'){
                                this.setState({rotate1:'rotate(0deg) translateY(0px)'})
                                this.setState({rotate2:'rotate(0deg) translateY(0px)'})
                                this.setState({closeop:'1'})
                            }
                        }}>
                            <div style = {{position:'relative',width:'40px',height:'4px',backgroundColor:'white',top:'10px',marginLeft:'6px',borderRadius:'25px',transform:this.state.rotate1,transition:'all 0.5s'}}></div>
                            <div style = {{position:'relative',width:'40px',height:'4px',backgroundColor:'white',top:'18px',marginLeft:'6px',borderRadius:'25px',opacity:this.state.closeop,transition:'all 0.5s'}}></div>
                            <div style = {{position:'relative',width:'40px',height:'4px',backgroundColor:'white',top:'26px',marginLeft:'6px',borderRadius:'25px',transform:this.state.rotate2,transition:'all 0.5s'}}></div>
                        </div>
                        <div className = 'logo2'>
                            <span style = {{fontSize:'30px',fontStyle:'Helvetica'}}>HelloWorld</span>
                        </div>
                    </div>
                    <div className = 'nav1' style = {{display:'block',transform:this.state.navtrans}}>
                    <div className = 'navitem1'><a className = 'navitemtext' onMouseOver = {()=>{
                        if(window.innerWidth < 1790){
                            this.setState({navtrans1:'translateX(0px)'})
                            this.setState({linkop:'0'})
                        }
                        else if(window.innerWidth > 1790)
                        {
                            this.setState({linkop:'0'})
                            this.setState({navtransition:'opacity 0'})
                        }
                    }}>论坛首页</a></div>
                    <div className = 'navitem'><a href = 'https://cnodejs.org/api' className = 'navitemtext' onMouseOver = {()=>{
                        if(window.innerWidth < 1790){
                            this.setState({navtrans1:'translateX(0px)'})
                            this.setState({linkop:'0'})
                        }
                        else if(window.innerWidth > 1790)
                        {
                            this.setState({linkop:'0'})
                            this.setState({navtransition:'opacity 0'})
                        }
                    }}>后台API</a></div>
                    <div className = 'navitem'>
                    <a className = 'navitemtext'  onMouseOver = {()=>{
                        if(window.innerWidth < 1790){
                            this.setState({navtrans1:'translateX(252px)'})
                            this.setState({linkop:'1'})
                        }
                        else if(window.innerWidth > 1790){
                            this.setState({linkop:'1'})
                            this.setState({navtransition:'opacity 0.5s'})
                            //this.setState({navtrans1:'translateX(0px)'})
                        }
                    }}>友情链接</a></div>
                    <div className = 'navitem'><a  className = 'navitemtext' onClick = {()=>{
                    window.location.href = this.state.url
                    }} onMouseOver = {()=>{
                        if(window.innerWidth < 1790){
                            this.setState({navtrans1:'translateX(0px)'})
                            this.setState({linkop:'0'})
                        }
                        else if(window.innerWidth > 1790)
                        {
                            this.setState({linkop:'0'})
                            this.setState({navtransition:'opacity 0'})
                        }
                    }}>{this.state.info}</a></div>
                    <div className = 'navitem'><a className = 'navitemtext' onClick = {()=>{
                    alert("退出登录")
                    browserCookies.erase('userid')
                    window.location.href = window.location.href
                }} onMouseOver = {()=>{
                    if(window.innerWidth < 1790){
                        this.setState({navtrans1:'translateX(0px)'})
                        this.setState({linkop:'0'})
                    }
                        else if(window.innerWidth > 1790)
                        {
                            this.setState({linkop:'0'})
                            this.setState({navtransition:'opacity 0'})
                        }
                    }} onMouseLeave = {()=>{
                        if(window.innerWidth < 1790)
                        this.setState({navtrans1:'translateX(0px)'})
                        else if(window.innerWidth > 1790)
                        {
                            this.setState({linkop:'0'})
                            this.setState({navtransition:'opacity 0'})
                        }
                    }}>{this.state.logout}</a></div>
                    </div>
                    <div className = 'nav2' style = {{display:'block',transform:this.state.navtrans1,opacity:this.state.linkop,transition:this.state.navtransition,backgroundColor:"rgba(28,35,39,0.6)"}} onMouseLeave = {()=>{
                        if(window.innerWidth < 1790){
                            this.setState({navtrans1:'translateX(0px)'})
                            this.setState({linkop:'0'})
                        }
                        else if(window.innerWidth > 1790)
                        {
                            this.setState({linkop:'0'})
                            this.setState({navtransition:'opacity 0'})
                        }
                    }}>
                        <div className = 'navitem2'><a className = 'navitemtext'>React</a></div>
                        <div className = 'navitem3'><a className = 'navitemtext'>Node.js</a></div>
                        <div className = 'navitem3'><a className = 'navitemtext'>vue</a></div>
                        <div className = 'navitem3'><a className = 'navitemtext'>angular</a></div>
                        <div className = 'navitem3'><a className = 'navitemtext'>WUSTOJ</a></div>
                    </div>
                </div>
                <div style = {{position:'absolute',left:'25%',top:'700px',minWidth:'50%',backgroundColor:'white',padding:'15px'}}>
                <Breadcrumb>
                    <Breadcrumb.Item onClick = {()=>{
                        axios.get('/api/v1/topics?page='+this.state.page+'&&limit=30')
                        .then(res=>{
                            console.log(res.data.data)
                            this.setState({contentlist:res.data.data})
                            this.setState({tab:''})
                            //data = res.data.data
                        })
                        //alert("全部版块")
                    }}><a>全部</a></Breadcrumb.Item>
                    <Breadcrumb.Item onClick = {()=>{
                        axios.get('/api/v1/topics?page='+this.state.page+'&&limit=30&&tab=good')
                        .then(res=>{
                            console.log(res.data.data)
                            this.setState({contentlist:res.data.data})
                            this.setState({tab:'good'})
                            //let data = res.data.data
                        })
                        //alert("精华")
                    }}><a>精华</a></Breadcrumb.Item>
                    <Breadcrumb.Item onClick = {()=>{
                        axios.get('/api/v1/topics?page='+this.state.page+'&&limit=30&&tab=ask')
                        .then(res=>{
                            console.log(res.data.data)
                            this.setState({contentlist:res.data.data})
                            this.setState({tab:'ask'})
                            //data = res.data.data
                        })
                        //alert("问答")
                    }}><a>问答</a></Breadcrumb.Item>
                    <Breadcrumb.Item onClick = {()=>{
                        axios.get('/api/v1/topics?page='+this.state.page+'&&limit=30&&tab=job')
                        .then(res=>{
                            console.log(res.data.data)
                            this.setState({contentlist:res.data.data})
                            this.setState({tab:'job'})
                            //data = res.data.data
                        })
                        //alert("招聘")
                    }}><a>招聘</a></Breadcrumb.Item>
                    <Breadcrumb.Item onClick = {()=>{
                        axios.get('/api/v1/topics?page='+this.state.page+'&&limit=30&&tab=share')
                        .then(res=>{
                            console.log(res.data.data)
                            this.setState({contentlist:res.data.data})
                            this.setState({tab:'share'})
                            //data = res.data.data
                        })
                        //alert("分享")
                    }}><a>分享</a></Breadcrumb.Item>
                </Breadcrumb>
                {/* <br></br> */}
                <br></br>
                <Pagination defaultCurrent={1} total={100} onChange = {(page,pages)=>{
                    //alert(page);
                    this.setState({page:page})
                    axios.get('/api/v1/topics?page='+page+'&&limit=30&&tab='+this.state.tab)
                        .then(res=>{
                            console.log(res.data.data)
                            this.setState({contentlist:res.data.data})
                            this.setState({tab:'share'})
                            //data = res.data.data
                        })
                }}/>
                </div>
                <div style = {{width:"50%",position:'absolute',left:'25%',top:'800px',backgroundColor:"white",padding:'15px'}}>
                <List
                    size = 'large'
                    itemLayout="horizontal"
                    dataSource={this.state.contentlist}
                    renderItem={item => (
                <List.Item >
                    <List.Item.Meta
                    avatar={<Avatar src={item.author.avatar_url} />}
                    title={<a href={"http://localhost:3000/post?id="+item.id}>{item.title}</a>}
                    description={<span>创建时间：{item.create_at}   浏览人数：{item.visit_count}    回复数量：{item.reply_count}</span>}
                    />
                </List.Item>
                    )}
                    /></div>
            </div>
        )
    }
}
export default Home