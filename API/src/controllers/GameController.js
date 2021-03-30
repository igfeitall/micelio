const {sign}  = require('jsonwebtoken');
const idGenerator = require('../utils/generators/idGenerator');
const knex = require('../database/connection');

class GameController{
    
	async create(request, response){

        const {name, version} = request.body;
        
        if(!name || !version){
            return response.status(400).json({error: "Missing name or version"});
        }

        const gameId = await idGenerator('game');
        const token = sign({}, process.env.JWT_SECRET, {subject: gameId});
        
        try{

            const data = {
                game_id: gameId,
                token,
                name,
                version
            }

            const game = await knex('game').insert(data);

            if(game){
                return response.status(201).json({ok: true});
            }
            else{
                return response.status(400).json({error: game});
            }
        }
        catch(err){
            return response.status(400).json({error: err});
        }
        
    }

}

module.exports = GameController;
