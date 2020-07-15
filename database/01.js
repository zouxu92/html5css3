//一、 引入mongoose 第三方模块  用来操作数据库
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('数据库连接成功'))
    .catch(err => console.log(err, '数据库连接失败'));

// 创建集合规则
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    isPublished: Boolean
});


// 二、使用规则创建集合
// 1. 集合名称
// 2.集合规则
const Course = mongoose.model('Course', courseSchema) // courses

// 创建文档
const course = new Course({
    name: 'java基础',
    author: 'lalal',
    isPublished: true
});
// 将文档插入数据库中
course.save();


// 三、另一种插入的方法
Course.create({ name: 'jaff', author: '李四', isPublished: false }, (err, result) => {
    // 错误对象
    console.log(err)
        // 当前插入的文档
    console.log(result)
})