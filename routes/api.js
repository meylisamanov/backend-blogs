const express = require ('express');
const router = express.Router();
const Blog = require ('../models/Blog');

// This will return all blogs
router.get('/', (req, res, next) => {
    Blog.find()
        .then(data => res.json(data))
        .catch(next)
}); 

// This will return all datas of one fixed blog
router.get('/:id', (req, res, next) => {
    Blog.findOne({_id: req.params.id})
        .then(data => res.json(data))
        .catch(next)
});

// This will save the comment in Blog model and return its all comments
router.post('/:id/create/comment', async (req, res, next) => {
    var blog = await Blog.findOne({ _id: req.params.id })
    blog.comment.push({ body: req.body.comment, date: new Date() });
    await blog.save();
    return res.json(blog);
});

// handle data when you create a blog 
router.post('/create/blog',  async (req, res, next) => {
    const data = req.body;
    var blog = await Blog.findOne({title: data.title}).exec();
    if(blog) return res.json({ error: "Blog already exists!" });
    blog = await Blog.create({ title: data.title, content: data.content });
    return res.json(blog);
});

module.exports = router;