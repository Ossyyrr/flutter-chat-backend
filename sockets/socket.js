const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');
const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/sockets')

// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    // Verificar autenticación
    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);
    if (!valido) {
        return client.disconnect();
    }

    console.log('cliente autenticado');
    usuarioConectado(uid)

    // Ingresar al usuario a una sala específica

    // unir a un usuario a una sala con el nombre del uid:
    client.join(uid);

    // Escuchar del cliente el 'mensaje-personal'
    client.on('mensaje-personal', async (payload) => {
        console.log(payload);
        await grabarMensaje(payload);

        // Mando el mensaje al canal con el id de la persona a la que va dirigido:
        // Emito el 'mensaje-personal' y mando de regreso el payload
        io.to(payload.para).emit('mensaje-personal', payload);
    })


    client.on('disconnect', () => {
        console.log('Cliente desconectado');
        usuarioDesconectado(uid);
    });

    /*  client.on('mensaje', ( payload ) => {
          console.log('Mensaje', payload);
          io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );
      });*/


});
