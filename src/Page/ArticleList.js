import React,{useState,useEffect} from 'react';
import '../static/css/ArticleList.css'
import { Modal ,message ,Table,Divider,Spin} from 'antd';
import axios from 'axios'
import  servicePath  from '../config/apiUrl'
const { confirm } = Modal;


function ArticleList(props) {
	const [dataSource,setDataSource] = useState([]);
	const [loading,setloading] = useState(false);
	// 表头
	const columns = [
	  {
	    title: '标题',
	    dataIndex: 'title',
		align: 'center',
	    key: 'title',
		ellipsis: true,
	  },
	  {
	    title: '类别',
	    dataIndex: 'typeName',
		align: 'center',
	    key: 'typeName',
	  },
	  {
	    title: '发布时间',
	    dataIndex: 'addTime',
		align: 'center',
	    key: 'addTime',
	  },
	  {
	    title: '浏览量',
	    dataIndex: 'view_count',
		align: 'center',
	    key: 'view_count',
	  },
	  {
	      title: '操作',
	      key: 'action',
		  align: 'center',
	      render: (text, record) => (
	        <span>
	          <a onClick={()=>{updateArticle(text.id)}}>修改</a>
	          <Divider type="vertical" />
	          <a onClick={()=>{delArticle(text.id)}}>删除</a>
	        </span>
	      ),
	    },
	];
	const [list,setList] = useState([]);
	useEffect(()=>{
		console.log(document.cookie)
		getList();
	},[])
	// 获取文章列表
	const getList = () => {
		setloading(true);
		axios({
		    method: 'get',
		    url: servicePath.getArticleList,
		    withCredentials: true // 跨域检查cookie
		}).then(res => {
		    setList(res.data.data)
		    setDataSource(res.data.data)
			setloading(false);
		})
	}
	// 删除文件
	const delArticle = (id) => {
		confirm({
			title: '确认要删除这篇文章吗？',
			content: '如果你点击OK按钮，文章将永远删除，无法恢复',
			onOk(){
				axios(servicePath.delArticle + id,{
				    withCredentials: true // 跨域检查cookie
				}).then(res => {
				    message.success('删除文章成功');
					getList();
				})
			},
			onCancel(){
				
			}
		})
	}
	// 编辑文章
	const updateArticle = (id) =>{
		props.history.push('/index/add/' + id)
	}
    return (
		<div>
			{/**<List
				header={
					<Row className="list-dev">
						<Col span={8}><b>标题</b></Col>
						<Col span={4}><b>类别</b></Col>
						<Col span={4}><b>发布时间</b></Col>
						<Col span={4}><b>浏览量</b></Col>
						<Col span={4}><b>操作</b></Col>
					</Row>
				}
				bordered
				dataSource={list}
				renderItem={item =>(
					<List-Item>
						<Row className="list-dev">
							<Col span={8}>{item.title}</Col>
							<Col span={4}>{item.typeName}</Col>
							<Col span={4}>{item.addTime}</Col>
							<Col span={4}>{item.view_count}</Col>
							<Col span={4}>
							<Button type="primary" onClick={()=>{updateArticle(item.id)}}>修改</Button>&nbsp;
							<Button onClick={()=>{delArticle(item.id)}}>删除</Button>
							</Col>
						</Row>
					</List-Item>
				)}			
			/>**/}
			<Spin spinning={loading}>
				<Table dataSource={dataSource} columns={columns} rowKey={(record, index) => index}/>
			</Spin>
		</div>
	)
}

export default ArticleList