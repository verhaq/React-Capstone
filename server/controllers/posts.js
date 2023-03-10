const { Post } = require('../models/post')
const { User } = require('../models/user')

module.exports = {
  addPost: async (req, res) => {

    try {
      const { userId } = req.params;
      console.log(	"userId", userId);
      const { title, content, notes, notes2 } = req.body;
      const post = await Post.create({ title, content, notes, notes2, userId });
      return res.status(200).json(post);
    } catch (error) {
      console.log("ERROR IN addPost");
      console.log(error)
      return res.sendStatus(400)
    }

  },
  getPosts: async (req, res) => {
    try {
      const { userId } = req.params;
      const posts = await Post.findAll({
        where: { userId: userId },
      });
      // const post = await Post.findAll();
      // console.log("DB Fetch Posts", post);
      // res.status(200).send(posts);
      return res.status(200).json(posts);
    } catch (error) {
      console.log("ERROR IN getPosts");
      console.log(error);
      return res.sendStatus(400);
    }
  },

}
    