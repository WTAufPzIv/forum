import React from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios'
import browserCookies from 'browser-cookies'
import {
    Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Icon,Alert
  } from 'antd';
//import Axios from '../../../node_modules/axios';
  
  const { Option } = Select;
  
  class DrawerForm extends React.Component {
      constructor(props){
          super(props)
        this.state = { 
            visible: false,
            nickname:props.nickname,
            title:props.title,
            email:props.email ,
            setname:'',
            setemail:'',
            settitle:'',
            setpwd:'',
            repwd:'',
            tip:'',
            tiptype:'',
            tipdis:'none'
        };
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
  
    render() {
      const setinfo = ({setname,setemail,settitle,setpwd,repwd})=>{
        console.log(this.state)
        let flag = 0;
        if(setname === '' && setemail === '' && settitle === '' && setpwd === ''){
          flag++
          this.setState({tip:'你没有输入任何信息',tiptype:'error',tipdis:'inline'})
        }
        else{
          if(setname !== '' ){
            axios.post('/user/setnickname',{setname})
            .then((res)=>{
              console.log(res)
              if(res.status === 200){
                if(res.data.code === 1){
                  flag++
                  this.setState({tip:'用户名重复',tiptype:'info',tipdis:'inline'})
                }
              }
            })
            .catch(err=>{
              console.log(err)
              this.setState({tip:'网络错误',tiptype:'error',tipdis:'inline'})
              flag++;
            })
          }
          if(setemail !== '' ){
            axios.post('/user/setemail',{setemail})
            .then(res=>{
              if(res.status === 200){
                if(res.data.code === 1){
                  flag++
                  this.setState({tip:'该邮箱已被注册',tiptype:'error',tipdis:'inline'})
                }
              }
            })
            .catch(err=>{
              console.log(err)
              this.setState({tip:'网络错误',tiptype:'error',tipdis:'inline'})
              flag++;
            })
          }
          if(settitle !== '' ){
            
            axios.post('/user/settitle',{settitle})
            .then(res=>{
             
            })
            .catch(err=>{
              console.log(err)
              this.setState({tip:'网络错误',tiptype:'error',tipdis:'inline'})
              flag++;
            })
          }
          if(setpwd !== ''){
            if(repwd !== setpwd){
              this.setState({tip:'两次密码不一致',tiptype:'info',tipdis:'inline'})
              flag++
            }
            else{
              axios.post('/user/setpwd',{setpwd})
              .catch(err=>{
                console.log(err)
                this.setState({tip:'网络错误',tiptype:'error',tipdis:'inline'})
                flag++;
              })
            }
          }
        }
        
        setTimeout(()=>{
          if(flag === 0){
            this.setState({tip:'修改成功',tiptype:'success',tipdis:'inline'})
            browserCookies.erase('userid')
            window.location.href = 'http://localhost:3000/loginandregister'
          }
        },1000)
        // if(flag === 0){
        //   this.setState({tip:'修改成功',tiptype:'success',tipdis:'inline'})
        //   browserCookies.erase('userid')
        // }
      }
      //const { getFieldDecorator } = this.props.form;
      return (
        <div>
          <Button type="primary" onClick={this.showDrawer} style = {{position:'relative',top:'10px',display:'inline'}}>
             修改信息(按需修改)
          </Button>
          <Drawer
            title="修改信息"
            width={300}
            onClose={this.onClose}
            visible={this.state.visible}
            style={{
              overflow: 'auto',
              height: 'calc(100% - 108px)',
              paddingBottom: '108px',
            }}
          >
            <Form layout="horizontal" hideRequiredMark>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="NickName">
                    <Input  onChange = {(e)=>{this.setState({setname:e.target.value})}}/>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="title">
                  <Input    onChange = {(e)=>{this.setState({settitle:e.target.value})}}/>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="emial">
                  <Input    onChange = {(e)=>{this.setState({setemail:e.target.value})}}/>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item label="密码">
                  <Input    onChange = {(e)=>{this.setState({setpwd:e.target.value})}} type = 'password'/>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="确认密码">
                  <Input    onChange = {(e)=>{this.setState({repwd:e.target.value})}} type = 'password'/>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
            <div
              style={{
                position: 'absolute',
                left: 0,
                bottom: 0,
                width: '100%',
                borderTop: '1px solid #e9e9e9',
                padding: '10px 16px',
                background: '#fff',
                textAlign: 'right',
              }}
            >
            <div style = {{textAlign:'center'}}><Alert message={this.state.tip} type={this.state.tiptype} showIcon style = {{position:'relative',display:this.state.tipdis,top:'-600px'}}/></div>
              <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                取消
              </Button>
              <Button onClick={()=>{setinfo(this.state)}} type="primary">
                提交
              </Button>
            </div>
          </Drawer>
        </div>
      );
    }
  }
  
  const Doawer = Form.create()(DrawerForm);
  export default Doawer
  //ReactDOM.render(<Doawer />);