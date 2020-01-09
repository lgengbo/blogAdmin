import React, { useState, useEffect } from 'react'
import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd'
import 'antd/dist/antd.css'
import marked from 'marked'
import '../static/css/AddArticle.css'
import axios from 'axios'
import servicePath from '../config/apiUrl'

const { Option } = Select;
const { TextArea } = Input;
function AddArticle(props) {
    const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle, setArticleTitle] = useState('')   //文章标题
    const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [introducemd, setIntroducemd] = useState()            //简介的markdown内容
    const [introducehtml, setIntroducehtml] = useState('等待编辑') //简介的html内容
    const [showDate, setShowDate] = useState()   //发布日期
    // const [updateDate, setUpdateDate] = useState() //修改日志的日期
    const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
    const [selectedType, setSelectType] = useState(1) //选择的文章类别
    const [loadingFlag, setloadingFlag] = useState(false) //选择的文章类别
    useEffect(() => {
        getTypeInfo(); // 获取文章类型
		// 获取文章ID
		const temId = props.match.params.id;
		if(temId){
			setArticleId(temId);
			getArticleById(temId);
		}
    }, [])
    // 初始化marked
    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
    });
    // 文章内容改变
    const changeContent = (e) => {
        setArticleContent(e.target.value); // 设置文章内容
        let html = marked(e.target.value); // marked转html
        setMarkdownContent(html); // 赋值预览内容
    }
    // 文章简介改变
    const changeIntroduce = (e) => {
        setIntroducemd(e.target.value); // 设置文章内容
        let html = marked(e.target.value); // marked转html
        setIntroducehtml(html); // 赋值预览内容
    }
    // 获取文章列表接口
    const getTypeInfo = () => {
        axios({
            method: 'get',
            url: servicePath.getTypeInfo,
            withCredentials: true // 跨域检查cookie
        }).then(res => {
            if (res.data.data === '没有登录') {
                localStorage.removeItem('openId');
                props.history.push('/');
            } else {
                setTypeInfo(res.data.data);
            }
        })
    }
    // 类型选择
    const selectTypeHandler = (value) => {
        setSelectType(value);
    }
    // 保存文章
    const saveArticle = () => {
        if (!selectedType) {
            message.error('请选择文章类型');
            return false
        } else if (!articleTitle) {
            message.error('文章标题不能为空');
            return false
        } else if (!articleContent) {
            message.error('文章内容不能为空');
            return false
        } else if (!introducemd) {
            message.error('文章简介不能为空');
            return false
        } else if (!showDate) {
            message.error('文章日期不能为空');
            return false
        }
		setloadingFlag(true);
        let reqData = {}
        let reqUrl = '';
        reqData.type_id = selectedType; // type_id与数据库一致
        reqData.title = articleTitle;
        reqData.article_content = articleContent;
        reqData.introduce = introducemd;
        let dateText = showDate.replace('-', '/');
        reqData.addTime = (new Date(dateText).getTime()) / 1000;
        if (articleId === 0) { // 新增
            reqData.view_count = 0;
            reqUrl = servicePath.addArticle;
        } else { // 修改
            reqData.id = articleId;
            reqUrl = servicePath.updateArticle;
        }
        axios({
            method: 'post',
            url: reqUrl,
            data: reqData,
            withCredentials: true
        }).then(res => {
            if (articleId === 0) {
                setArticleId(res.data.insertId);
            }
            if (res.data.isSuccess) {
                message.success('保存文章成功');
				setloadingFlag(false);
            } else {
                message.error('保存文章失败');
            }
        })
    }
	// 根据ID修改文章
	const getArticleById = (id) => {
		axios(servicePath.getArticleById + id,{
		    withCredentials: true ,// 跨域检查cookie
			header:{ 'Access-Control-Allow-Origin':'*' }
		}).then(res => {
		   const articleInfo = res.data.data[0];
		   setArticleTitle(articleInfo.title); // 标题
		   setArticleContent(articleInfo.article_content); // 设置文章内容
		   const contentHtml = marked(articleInfo.article_content); // marked转html
		   setMarkdownContent(contentHtml); // 赋值预览内容
		   setIntroducemd(articleInfo.introduce); // 设置文章简介
		   const introduceHtml = marked(articleInfo.introduce); // marked转html
		   setIntroducehtml(introduceHtml); // 赋值预览文章简介
		   setShowDate(articleInfo.addTime); // 时间
		   setSelectType(articleInfo.typeId); // 类型ID
		})
	}
    return (
        <div>
            {/* gutter间距 */}
            <Row gutter={5}>
                <Col span={18}>
                    <Row gutter={10}>
                        <Col span={20}>
                            <Input
                                value={articleTitle}
                                onChange={(e) => { setArticleTitle(e.target.value) }}
                                placeholder="博客标题"
                                size="large"
                            />
                        </Col>
                        <Col span={4}>
                            {/* defaultValue ：默认显示值 */}
                            &nbsp;
                            <Select defaultValue={selectedType} size="large" onChange={selectTypeHandler} value={selectedType}>
                                {
                                    typeInfo.map((item, index) => {
                                        return (<Option value={item.id} key={index}>{item.typeName}</Option>)
                                    })
                                }
                            </Select>
                        </Col>
                    </Row>
                    <br />
                    <Row gutter={10}>
                        <Col span={12}>
                            <TextArea
                                className="markdown-content"
                                rows={35}
                                placeholder={"文章内容"}
								value={articleContent} // 注意value值，不然修改文章时不会显示
                                onChange={changeContent}
                            />
                        </Col>
                        <Col span={12}>
                            {/* 浏览文章内容 */}
                            <div className="show-html"
                                dangerouslySetInnerHTML={{ __html: markdownContent }}
                            ></div>
                        </Col>
                    </Row>
                </Col>
                <Col span={6}>
                    <Row>
                        <Col span={24}>
                            <Button size="large" type="primary" onClick={saveArticle} loading={loadingFlag}>发布文章</Button>
                            <br />
                        </Col>
                        <Col span={24}>
                            <br />
                            <TextArea
                                value={introducemd}
                                rows={4}
                                placeholder="文章简介"
                                onChange={changeIntroduce}
                            />
                            <br /><br />
                            {/* 浏览文章简介 */}
                            <div className="introduce-html"
                                dangerouslySetInnerHTML={{ __html: introducehtml }}
                            ></div>
                        </Col>
                        <Col span={12}>
                            <div className="date-select">
                                <DatePicker
                                    onChange={(date, dateString) => { setShowDate(dateString) }}
                                    placeholder="发布日期"
                                    size="large"
                                />
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default AddArticle;
