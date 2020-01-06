import React, {useState} from 'react'
import { Card, Input, Icon,Button ,Spin, message } from 'antd';
import axios from 'axios'
import 'antd/dist/antd.css'
import '../static/css/Login.css'
import servicePath from '../config/apiUrl'

function Login (props) {
	// 定义数据
	const [userName,setUserName] = useState('');
	const [passWord,setPassWord] = useState('');
	const [isLoading,setIsLoading] = useState(false);

	// 检测登录
	const checkLogin = () => {
		if(!userName){
			message.error('用户名不能为空');
			return false;
		} else if (!passWord){
			message.error('密码不能为空');
			return false;
		}
		setIsLoading(true); // 设置loading效果
		let reqData = {};
		reqData.userName = userName;
		reqData.passWord = passWord;
		axios({
            method:'post',
            url:servicePath.checkLogin,
            data:reqData,
            withCredentials: true // 共享seeion
        }).then((res)=>{
			setIsLoading(false);
			if(res.data.data === '登录成功'){
				localStorage.setItem('openId', res.data.openId);
				props.history.push('/index'); // 页面跳转
			} else {
				message.error('用户名或密码错误');
			}
		}).catch((error)=>{
			setIsLoading(false);
		})
	}
	return (
		<div className="login-div">
			<Spin tip="Loading..." spinning={isLoading}>
				<Card title="小白博客系统" bordered={true} style={{width: 400}}>
					<Input
						id="userName"
						size="large"
						placeholder="请输入用户名"
						prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
						onChange={(e)=>{setUserName(e.target.value)}} // 设置值
					/>
					<br/><br/>
					<Input.Password
						id="passWord"
						size="large"
						placeholder="请输入密码"
						prefix={<Icon type="key" style={{color: 'rgba(0,0,0,.25)'}}/>}
						onChange={(e)=>{setPassWord(e.target.value)}} // 设置值
					/>
					<br/><br/>
					<Button type="primary" size="large" block onClick={checkLogin}>登录</Button>
				</Card>
			</Spin>
		</div>
	)
}
export default Login