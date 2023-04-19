import { OnModuleInit } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import {Server} from 'socket.io'

@WebSocketGateway({cors: {origin: '*'}}) //habilitamos los cors
export class MyGateway implements OnModuleInit{
    @WebSocketServer()
    server: Server

    onModuleInit() { //listener en la conexion
        this.server.on('connection', (socket) => {
            console.log(socket.id);
            console.log('Connected');
        })
    }

    @SubscribeMessage('newMessage') //Envio de mensaje
    onNewMessage(@MessageBody() body: any){
        console.log(body);
        this.server.emit('onMessage', {
            message: 'new message',
            content: body,
        })
    }
}