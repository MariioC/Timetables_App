const pool = require('../database');
const jwt = require('jsonwebtoken');
const keys = require('../keys');


class AppController {  
    async createUser(req, res) {
        try {
            const { username } = req.body;
            const user = await pool.query('SELECT * FROM users WHERE LOWER(username) = LOWER($1)', [ username ]);
            if(user.rowCount > 0) {
                const id_user = user.rows[0]['id_user'];
                const token = jwt.sign({ id_user: id_user, username: username}, keys.privateKey);
                res.json({ token, id_user });
            } else {
                const result = await pool.query('INSERT INTO users(username) VALUES ($1) RETURNING id_user', [ username ]);
                const id_user = result.rows[0]['id_user'];
                if(result.rowCount > 0) {
                    const token = jwt.sign({ id_user: id_user, username: username}, keys.privateKey);
                    res.json({ token, id_user });
                } else {
                    res.status(400).json({'message': 'Error registering user'});
                }
            }
        } catch( error ) {
            console.log(error);
            res.status(400).json({'error': "Error registering user"});
        }
    }
    
    async getHours(req, res) {
        try {
            const result = await pool.query('SELECT * FROM hours');
            res.json(result.rows);
        } catch( error ) {
            console.log(error);
            res.status(400).json({'error': "Can't get the hours available"});
        }
    }

    async getTurns(req, res) {
        try {
            const result = await pool.query('SELECT id_hour, id_user FROM turns');
            res.json(result.rows);
        } catch( error ) {
            console.log(error);
            res.status(400).json({'error': "Can't get the turns have been taken"});
        }
    }

    async takeTurn(req, res) {
        try {
            const { id_hour, token } = req.body;
            jwt.verify(token, keys.privateKey, async (error, authData) => {
                if(!error) {
                    const { id_user } = authData
                    const result = await pool.query('INSERT INTO turns(id_hour, id_user) VALUES($1, $2)', [ id_hour, id_user]);
                    if(result.rowCount > 0) {
                        res.json({'message': "The turn has been taken"});
                        io.turnTake({ id_user, id_hour });
                    } else {
                        res.status(400).json({'error': "Can't take the turn"});
                    }
                } else {
                    return res.status(400).json({'error': 'Invalid signature'});
                }
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({'error': 'Error when taking the turn'});
        }
    }
    
    async deleteTurn(req, res) {
        try {
            const { id_hour, token } = req.body
            jwt.verify(token, keys.privateKey, async (error, authData) => {
                if(!error) {
                    const { id_user } = authData
                    const result = await pool.query('DELETE FROM turns WHERE id_hour = $1 AND id_user = $2', [ id_hour, id_user]);
                    if(result.rowCount > 0) {
                        res.json({'message': "The turn has been delete"});
                        io.turnDelete({ id_user, id_hour });
                    } else {
                        res.status(400).json({'error': "Can't delete the turn"});
                    }
                } else {
                    return res.status(400).json({'error': 'Invalid signature'});
                }
            });
        } catch( error ) {
            console.log(error);
            res.status(400).json({'error': 'Error when deleting the turn'});
        }
    }

    verifyToken(req, res, next) {
        const bearerHeader = req.headers['authorization'];
        if(typeof bearerHeader != 'undefined') {
            req.body.token = bearerHeader.split(' ')[1];
            next();
        } else {
            res.status(400).json({'error': 'Invalid token'});
        }
    }
}

const appController = new AppController();
module.exports = appController;