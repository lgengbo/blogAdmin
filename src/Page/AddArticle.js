import React, { useState } from 'react'
import { Row, Col, Input, Select, Button, DatePicker } from 'antd'
import 'antd/dist/antd.css'
import marked from 'marked'
import '../static/css/AddArticle.css'

const { Option } = Select;
const { TextArea } = Input;
function AddArticle() {
    const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle, setArticleTitle] = useState('')   //文章标题
    const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [introducemd, setIntroducemd] = useState()            //简介的markdown内容
    const [introducehtml, setIntroducehtml] = useState('等待编辑') //简介的html内容
    const [showDate, setShowDate] = useState()   //发布日期
    const [updateDate, setUpdateDate] = useState() //修改日志的日期
    const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
    const [selectedType, setSelectType] = useState(1) //选择的文章类别
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
    return (
        <div>
            {/* gutter间距 */}
            <Row gutter={5}>
                <Col span={18}>
                    <Row gutter={10}>
                        <Col span={20}>
                            <Input
                                placeholder="博客标题"
                                size="large"
                            />
                        </Col>
                        <Col span={4}>
                            {/* defaultValue ：默认显示值 */}
                            &nbsp;
                            <Select defaultValue="Sign Up" size="large">
                                <Option value="Sign Up">视频教程</Option>
                            </Select>
                        </Col>
                    </Row>
                    <br />
                    <Row gutter={10}>
                        <Col span={12}>
                            <TextArea
                                value={articleContent}
                                className="markdown-content"
                                rows={35}
                                placeholder={"文章内容"}
                                onChange={changeContent}
                            />
                        </Col>
                        <Col span={12}>
                            {/* 浏览文章内容 */}
                            <div className="show-html"
                                dangerouslySetInnerHTML = {{__html:markdownContent}}
                            ></div>
                        </Col>
                    </Row>
                </Col>
                <Col span={6}>
                    <Row>
                        <Col span={24}>
                            <Button size="large">暂存文章</Button>&nbsp;
                            <Button size="large" type="primary">发布文章</Button>
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
                                 dangerouslySetInnerHTML = {{__html:introducehtml}}
                            ></div>
                        </Col>
                        <Col span={12}>
                            <div className="date-select">
                                <DatePicker
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
