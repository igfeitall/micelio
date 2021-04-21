const knex = require('../database/connection');
const idGenerator = require('../utils/generators/idGenerator');
const { generatePassword } = require('../utils/generators/passwordGenerator');

class UserController {

	async create(request, response) {
		let { username, password, confirmation_password, email } = request.body;

		if (!username) {
			return response.status(400).json({ error: "Invalid username" });
		}

		if (!password) {
			return response.status(400).json({ error: "Invalid password" });
		}
		
		if (!confirmation_password) {
			return response.status(400).json({ error: "Invalid password" });
		}
		else{
			if(confirmation_password != password) {
				return response.status(400).json({ error: "The passwords do not match" });
			}
		}

		if (!email) {
			return response.status(400).json({ error: "Invalid e-mail" });
		}

		const hashedPassword = generatePassword(password);

		try {

			username = username.toLowerCase();
			email = email.toLowerCase();

			const registeredUser = await knex('MicelioUser')
			.select('username', 'email')
			.where('username', username)
			.orWhere('email', email)
			.first();

			if(registeredUser){
				if(registeredUser.username === username) {
					return response.status(400).json({error: 'User already exists.'});
				}
				if(registeredUser.email === email) {
					return response.status(400).json({error: 'Email already in use.'});
				}
			}

			const user_id =  await idGenerator('MicelioUser', 'user');

			const data = {
				user_id,
				username,
				email,
				password: hashedPassword
			}

			const insertedUser = await knex('MicelioUser')
			.insert(data);

			if(insertedUser){
				return response.status(201).json({ok: 'true'});
			}
			else{
				return response.status(400).json({error: 'Cannot insert user, try again later'});
			}

		}
		catch(err){insertedUser
		    return response.status(400).json({error: 'Cannot connect to database, try again later'});
		}

	}

}

module.exports = UserController;
