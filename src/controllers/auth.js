import bcrypt from 'bcryptjs';

import { User } from '../database/models';
import { encode } from '../utils/jwt_functions';

class AuthController {
    async create(req, res) {
        const { name, username, email, password } = req.body;

        const checkUserByEmail = await User.findOne({ where: { email }});

        if(checkUserByEmail){
            return res.status(400).json({
                  error: 'Email already exists'
            });
        }

        const checkUserByUsername = await User.findOne({ where:{ username }});

        if (checkUserByUsername) {
            return res.status(400).json({
                error: 'Username already exists'
          });
        }

        const newUser = {
            name,
            username,
            email,
            password,
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        newUser.password = hash;

        const token = encode(newUser);

        await User.create(newUser);

        res.status(200).json({
            message: 'Registered successfully',
            token,
            user: {
                name: newUser.name,
                username: newUser.username,
                email: newUser.email,
            },
            
        });
    }

    async login(req,res){
        const { email , password , username } = req.body;

        let checkUser;

        if (email && !username) {
            checkUser = await User.findOne({ where:{ email }});
        }
        
        if (username && !email) {
            checkUser = await User.findOne({ where: { username }});
        }

        if (!checkUser) {
            return res.status(400).json({
                error:'Invalid credentials',
            })
        }

        const checkPassword = bcrypt.compareSync(password, checkUser.password);

        if (!checkPassword) {
          return res.status(400).json({
            error: res.__('Invalid credentials'),
          });
        }

        const user = {
            name: checkUser.name,
            username: checkUser.username,
            email: checkUser.email,
          };
      
        const token = encode(user);

        res.status(200).json({
            message:'Logged In successfully',
            token,
            user,
        });
    }
}

export default AuthController;