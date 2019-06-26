var jwt = require('jsonwebtoken');
module.exports = (app, userModel) => {
    app.post('/generate/token', function (req, res) {
        console.log('generando token')
        //Paso 1.-verificar que el usuario exista en la tabla de cuentas
        userModel.findOne({
            where: {
                user: req.body.user,
                password: req.body.password
            }
        }).then((resp) => {
            console.log(resp)
            if (!resp) {
                res.send({ message: "usuario o contraseña incorrectos" })
            } else {
                claimUser = {
                    nombre: resp.nombre,
                    email: resp.email,
                    role: resp.role,
                    ubicacion: resp.ubicacion
                }
                const token = jwt.sign(claimUser, 'secretKey', { expiresIn: '1h' });
                console.log(token);
                res.send(token);
            }
        });
        //Paso 2.- Si el usario existe:
        // 2.1 consultar tabla de usuarios para obtener su información y agregarla al token
        //2.2 Generar el token: Claims: Info de usuario, Caducidad de 30 minutos

        //si el usuario no existe, retorna Bad request
    })

    app.post('/user', function (req, res) {
        //Autorization: 
        const authHeader = req.headers['authorization'];
        token = authHeader.replace('Bearer ', '')

        jwt.verify(token, 'secretKey', function (err, token) {
            if (err) {
                console.log('invalid token');
                res.status(401);
                res.send({message: 'Unauthorized'});
            } else {
                console.log('valid token');
                if (token.role === 'administrador') {
                    console.log('user is admin');
                    console.log(req.body);
                    userModel.create(req.body).then((resp) =>{
                        //res.status(200);
                        res.send(resp);
                    });
                }else {
                    res.send({menssage: 'se requieren permisos de administrador'})
                }
            }
        })
    });
}