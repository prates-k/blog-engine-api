const { Post, User } = require('../../models')

module.exports = {
    async create(req, res) {
        try {
            const { title, content } = req.body;

            if (!title || !content) {
                return res.status(400).json({ error: 'Title and content are required. '});
            }

            const post = await Post.create({
                title,
                content,
                userId: req.userId
            });
            return res.status(201).json(post);
        }
        catch (error) {
            console.error('Error creating post:', error);
            return res.status(500).json({ error: 'Internal server error. '});
        }
    },

    async findAll(req, res) {
        try {
            const posts = await Post.findAll({
                include: [{ model: User, as: 'author', attributes: ['id', 'name', 'username']}],
                order: [['createdAt', 'DESC']]
            });

            return res.json(posts);
        }
        catch (error) {
            console.error('Error fetching all posts:', error);
            return res.status(500).json({ error: 'Internal server error. '});
        }
    },

    async findOne(req, res) {
        try {
            const { id } = req.params;
            const post = await Post.findByPk(id, {
                include: [{ model: User, as: 'author', attributes: ['id', 'name', 'username']}]
            });

            if (!post) {
                return res.status(404).json({ error: 'Post not found. '});
            }

            return res.status(post);
        }
        catch (error) {
            console.error(`Error fetching post with ID ${id}:`, error);
            return res.status(500).json({ error: 'Internal server error. '})
        }
    },

    async update(req, res){
        try {
            const { id } = req.params
            const { title, content } = req.body;

            const post = await Post.findByPk(id);

            if(!post) {
                return res.status(404).json({ error: 'Post not found. '});
            }

            if (post.userId !== req.userId ) {
                return res.status(403).json({ error: 'Unauthorized. You can only update your own posts.' });
            }

            await post.update({ title, content });
            return res.json({ message: 'Post updated successfully.', post });
        }
        catch (error) {
            console.error(`Error updating post with ID ${id}:`, error);
            return res.status(500).json({ error: 'Internal server error.' });
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            const post = await Post.findByPk(id);

            if (!post) {
                return res.status(404).json({ error: 'Post not found.' });
            }

            if (post.userId !== req.userId) {
                return res.status(403).json({ error: 'Unauthorized. You can only delete your own posts.' });
            }

            await post.destroy();
            return res.json({ message: 'Post deleted succesfully. ' })
        }
        catch (error) {
            console.error(`Error deleting post with ID ${id}:`, error);
            return res.status(500).json({ error: 'Internal server error.' })
        }
    }
};