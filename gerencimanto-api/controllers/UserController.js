var User = require('../models/User')
var PasswordToken = require('../models/PasswordToken')
var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt')

const secret = 'fadsfçjhd@@fsad4145464dfafasd@@fas'

class UserController {

    async index(req, res) {
        var users = await User.findlAll()
        res.json(users)
        res.status(200)
    }

    async findUser(req, res) {
        var id = req.params.id
        var user = await User.findById(id)

        if(user == undefined) {
            res.status(404)
            res.json({err: 'Usuario não encontrado'})
        } else {
            res.status(200)
            res.json({user: user})
        }
    }


    async create(req, res) {
        
        var {name, email, password} = req.body 

        if(email == undefined || email == '') {
            res.status(400)
            res.json({err: 'O e-mail eh invalido'})
            return 
        }

        var emailExists = await User.findEmail(email)

        if(emailExists) {
            res.status(406)
            res.json({err: 'O email já está cadastrado'})
            return
        }

        await User.new(email, password, name)

        res.status(200)
        res.send('tudo ok')

    }

    async edit(req, res) {
        var {name, role, email} = req.body

        var id = req.params.id

        var result = await User.update(id, email, name, role)

        if(result != undefined) {
            if(result.status) {
                res.status(200)
                res.send('Tudo ok')
            } else {
                res.status(406)
                res.json(result)
            }
        } else {
            res.status(406)
            res.send('Ocorreu um erro no servidor')
        }
    } 

    async remove(req, res) {
        var id = req.params.id

        var result = await User.delete(id)

        if(result.status) {
            res.status(200)
            res.send('Usuario deletado com sucesso')
        } else {
            res.status(406)
            res.send(result.err)
        }
    }

    async recoverPassword (req, res) {

        var email = req.body.email

       var result =  await PasswordToken.create(email)

        if(result.status) {

            res.status(200)
            res.send(''+result.token)

        } else {
            res.status(406)
            res.send(result.err)
        }

    }

    async changePassword(req, res) {
        var token = req.body.token 
        var password = req.body.password

        var isTokenValid = await PasswordToken.validate(token)

        if(isTokenValid.status) {

            await User.changePassword(password, isTokenValid.token.user_id, token, isTokenValid.token.token)

            res.status(200)
            res.send('Senha alterada')

        } else {
            res.status(406)
            res.send("Token invalido")
        }
    }

    async login(req, res) {

        var {email, password} = req.body

        var user = await User.findByEmail(email)

        console.log(user)

        if(user != undefined) {

            var result = await bcrypt.compare(password, user.password)

            if(result) {

                var token = jwt.sign({email: user.email, role: user.role}, secret)

                res.status(200)
                res.json({token: token})

            }else {
                res.status(406)
                res.send('Senha incorreta')
            }

        } else {
            res.json({status: false, error: 'erro'})
        }
    }

}

module.exports = new UserController()