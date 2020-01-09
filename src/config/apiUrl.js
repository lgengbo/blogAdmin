const ip = 'http://127.0.0.1:7001/admin/'

const servicePath = {
    checkLogin : ip + 'checkLogin', // 登录
    getTypeInfo : ip + 'getTypeInfo', // 文章类型
    addArticle : ip + 'addArticle', // 添加文章
    updateArticle : ip + 'updateArticle', // 更新文章
    delArticle : ip + 'delArticle/', // 删除文章
    getArticleList : ip + 'getArticleList', // 获取文章列表
    getArticleById : ip + 'getArticleById/', // 修改文章
}

export default servicePath;