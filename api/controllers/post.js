const jwt = require('jsonwebtoken');
const Post = require('../models/Post');

const getAllPosts = (async (req, res) => {
  res.json(
    await Post.find()
      .populate('author', ['username'])
      .sort({createdAt: -1})
      .limit(20)
    ); // in Post model we have added a reference to the User model, we can populate the entire document (though here we have only asked for the username) of the user based on the id stored in the author property of a Post  
})

const getPost = (async (req, res) => {
  const postDoc = await Post.findById(req.params.postId).populate('author', ['username']);
  res.json(postDoc);
})

const createPost = (async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split('.');
  const extension = parts[parts.length - 1];
  const newPath = path+'.'+extension
  fs.renameSync(path, newPath); // to rename a file, we need to use fs library
  
  const { access_token } = req.cookies;
  jwt.verify(access_token, process.env.JWT_SECRET, {}, async (err, userInfo) => {
    if (err) throw err;
    
    const { title, content } = req.body;
    const postDoc = await Post.create({
      title,
      content,
      image: newPath,
      author: userInfo.id
    })
    res.json(postDoc);
  })
})

const editPost = (async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const extension = parts[parts.length - 1];
    newPath = path+'.'+extension
    fs.renameSync(path, newPath);
  }

  const {access_token} = req.cookies;
  jwt.verify(access_token, process.env.JWT_SECRET, {}, async (err, info) => {
    if (err) throw err;
    const { postId, title, content } = req.body;
    const postDoc = await Post.findById(postId);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json('You are not the author.');
    }
    await postDoc.updateOne({
      title, 
      content,
      image: newPath ? newPath : postDoc.image
    })
    res.json(postDoc);
  })
})

const deletePost = (async (req, res) => {
  const {access_token} = req.cookies;
  jwt.verify(access_token, process.env.JWT_SECRET, {}, async (err, info) => {
    if (err) throw err;
    const postId = req.params.postId;
    const postDoc = await Post.findById(postId);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json('You are not the author.');
    }
    await postDoc.deleteOne({"_id": postId});
    res.status(200).json("Post deleted successfully.");
  })
})

module.exports = {
  getAllPosts,
  getPost,
  createPost,
  editPost,
  deletePost
}