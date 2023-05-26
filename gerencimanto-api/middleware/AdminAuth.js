var jwt = require('jsonwebtoken')
const secret = 'fadsfçjhd@@fsad4145464dfafasd@@fas'

module.exports = function(req, res, next) {

        const authToken = req.headers['authorization']
        
        if(authToken != undefined) {

            const bearer = authToken.split(' ')
            var token = bearer[1]

            try {

                var decoded = jwt.verify(token, secret)

                if(decoded.role == 1) {
                    next()
                }else {
                    res.status(403)
                    res.send('Voce não tem permissão para isso')
                }
                
            } catch (error) {
                res.status(403)
                res.send('Voce não está autenticado')
            }

        } else {
            res.status(403)
            res.send('Voce não está autenticado')
            return
        }
}