// 引入router模块
const gerRouter = require('router');


// 获取路由对象
const router = gerRouter();
// 学生信息集合
const Student = require('../model/user');
// 引入模板引擎
const template = require('art-template');
// 引入，用于接受到post请求将字符串转换成对象
const querystring = require('querystring');

// 学生呈递学生档案页面
router.get('/add', (req, res) => {
    let html = template('index.art', {});
    res.end(html);
})

// 学生信息列表页面
router.get('/list', async(req, res) => {
    // 查询学生信息
    let students = await Student.find();
    console.log(students);
    let html = template('list.art', {
        students: students
    })
    res.end(html)
})

// 实现学生信息添加功能路由
router.post('/add', (req, res) => {
    //  接受post请求参数
    let formDate = '';
    req.on('data', param => {
        formDate += param;
    });
    req.on('end', async() => {
        await Student.create(querystring.parse(formDate))
        res.writeHead(301, {
            Location: '/list'
        });
        res.end()
    })
});

module.exports = router;