const {Post} = require('../models/post')
const {User} = require('../models/user')

module.exports = {
    addPost: async (req, res) => {
        try {
            const { title, content, notes, notes2 } = req.body;
            await Post.create({title, content, notes, notes2});
            res.sendStatus(200);
        } catch (error) {
            console.log("ERROR IN addPost");
            console.log(error)
            res.sendStatus(400)
        }

    },
    getPosts: async (req, res) => {
        try {
          const { userId } = req.params;
          const posts = await Post.findAll({
            where: { userId: userId },
          });
          res.status(200).send(badges);
        } catch (error) {
          console.log("ERROR IN getCurrentUserBadges");
          console.log(error);
          res.sendStatus(400);
        }
      },
}