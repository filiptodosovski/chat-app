import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as console from 'node:console';
import * as process from 'node:process';

const wsPort = parseInt(process.env.WS_PORT ?? '3200', 10);

@WebSocketGateway(wsPort, {
  namespace: 'chat',
  cors: {
    origin: '*',
  },
  transports: ['websocket', 'polling'],
})
export class MessageGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private readonly logger = console;

  afterInit(server: Server) {
    this.logger.log('Initialized');
  }

  handleConnection(client: Socket) {
    this.logger.log('Client connected');
  }

  handleDisconnect(client: Socket) {
    this.logger.log('Client disconnected');
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, message: string) {
    this.logger.log(`Client: ${client.id})`);
    this.server.emit('message', message);
  }
}
