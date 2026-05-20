const { User } = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    async register (req, res) {
        try {
            const { name, username, password } = req.body;

            if (!name || !username || !password) {
                return res.status(400).json({ error: 'Name, username, and password are required' });
        }

        const userExists = await User.findOne ({ where: { username } });
        if (userExists) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = await User.create({
            name,
            username,
            password: hashedPassword
        });

        return res.status(201).json({
            id: newUser.id,
            name: newUser.name,
            username: newUser.username
        });

    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
},
    async login (req, res) {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json({ error: 'Username and password are required' });
            }

            const user = await User.findOne({ where: { username } });
            if (!user) {
                return res.status(401).json({ error: 'Invalid username or password' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if(!isPasswordValid) {
                return res.status(401).json({ error: 'Invalid username or password' });
            }

            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {expiresIn: '1h'});
            
            return res.json({
                message: 'Login successful',
                token
            });
        } catch (error) {
            console.error('Error logging in:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
};