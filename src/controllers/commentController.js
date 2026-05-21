const { Comment, Post, User } = require('../../models');

module.exports = {
    async create(req, res) {
        try {
            const { postId, content } = req.body;

            if (!postId || !content) {
                return res.status(400).json({ error: 'Post ID and content are required.' });
            }

            const post = await Post.findByPk(postId);
            if (!post) {
                return res.status(404).json({ error: 'Post not found.' });
            }

            const comment = await Comment.create ({
                content,
                postId,
                userId: req.userId
            });

            return res.status(200).json(comment);
        }
        catch (error) {
            console.error('Error creating comment:', error);
            return res.status(500).json({ error: 'Internal server error.' });
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            const comment = await Comment.findByPk(id);

            if (!comment) {
                return res.status(404).json({ error: 'Comment not found.' });
            }

            if (comment.userId !== req.userId) {
                return res.status(403).json({ error: 'Unauthorized. You can only delete your own comments.' });
            }

            await comment.destroy();
            return res.json({ message: 'Comment deleted successfully.' });
        }
        catch (error) {
            console.error('Error deleting comment.', error);
            return res.status(500).json({ error: 'Internal server error.' });
        }
    }
};