import React from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
@withRouter
class AuthRouter extends React.Component{
    componentDidMount(){
      axios.get('/user/info')
      .then(res=>{
          if(res.status === 200){
              if(res.data.code === 0){
                  //有登录信息
              }
              else{
                  this.props.history.push('/')
              }
          }
      })
    }
    render(){
        return (
            null
        )
    }
}
export default AuthRouter