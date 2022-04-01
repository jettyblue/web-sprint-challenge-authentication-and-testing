const Users = require('../auth/users-model');
const { findBy } = require('../auth/users-model');

async function checkUsernameExists(req, res, next) {
    const user = await findBy({ username: req.body.username });
    if(user) {
        res.status(401).json({ message: 'username taken' });
        return;
    } else {
        next();
    }
}

function validatePost(req, res, next) {
    if(!req.body.username || !req.body.password) {
        res.status(401).json({ message: 'username and password required' });
        return;
    } else {
        next();
    }
}

module.exports = {
    checkUsernameExists,
    validatePost
}