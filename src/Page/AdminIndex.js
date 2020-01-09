import React, { useState } from 'react'
import { Layout, Menu, Breadcrumb, Icon ,Row, Col,Dropdown} from 'antd';
// import React,{useState,useEffect} from 'react';
import { Route } from "react-router-dom";
import '../static/css/AdminIndex.css'
import AddArticle from './AddArticle'
import ArticleList from './ArticleList'

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminIndex(props) {
    const [collapsed, setCollapsed] = useState(false)

    const onCollapse = collapsed => {
        setCollapsed(collapsed);
    };
	// 文章管理列表跳转
	const handleClickArticle = (e) =>{
		if(e.key === 'AddArticle'){
			props.history.push('/index/add');
		} else if (e.key === 'ArticleList'){
			props.history.push('/index/list');
		}
	}
	// 退出登录
	const logout = () => {
		props.history.push('/');
		localStorage.removeItem('openId');
	}
	const menu = (
	  <Menu>
	    <Menu.Item onClick={logout}>
	        退出登录
	    </Menu.Item>
	  </Menu>
	);
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <SubMenu
                        key="article"
						onClick={handleClickArticle}
                        title={
                            <span>
                                <Icon type="user" />
                                <span>文章管理</span>
                            </span>
                        }
                    >
                        <Menu.Item key="AddArticle">添加文章</Menu.Item>
                        <Menu.Item key="ArticleList">文章列表</Menu.Item>
                    </SubMenu>
					<SubMenu
					    key="system"
						onClick={handleClickArticle}
					    title={
					        <span>
					            <Icon type="user" />
					            <span>系统管理</span>
					        </span>
					    }
					>
					    <Menu.Item key="AddArticle">用户角色</Menu.Item>
					    <Menu.Item key="ArticleList">用户管理</Menu.Item>
					</SubMenu>
                    <Menu.Item key="9">
                        <Icon type="file" />
                        <span>留言管理</span>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                {/* <Header style={{ background: '#fff', padding: 0 }} /> */}
                <Content style={{ margin: '0 16px' }}>,
				    <Row>
					<Col span={14}>
						<Breadcrumb style={{ margin: '16px 0' }}>
							<Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
							<Breadcrumb.Item>工作台</Breadcrumb.Item>
						</Breadcrumb>
					</Col>
					<Col span={10} style={{textAlign: 'right',margin: '16px 0px'}}>
						<Dropdown overlay={menu}>
						    <a className="ant-dropdown-link" href="#">
						      admin <Icon type="down" />
						    </a>
						  </Dropdown>
						<label onClick={logout}></label>
					</Col>
					</Row>
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>,
                        <div>
						    {/* 注意exact*/}
							<Route exact path="/index/" component={ArticleList} />
							<Route exact path="/index/add" component={AddArticle} />
							<Route exact path="/index/add/:id" component={AddArticle} />
							<Route exact path="/index/list" component={ArticleList} />
                        </div>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>ynlykl.com</Footer>
            </Layout>
        </Layout>
    );
}

export default AdminIndex