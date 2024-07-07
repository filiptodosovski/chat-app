import {
  ConnectedSocket,
  MessageBody,
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
import { TokenService } from '../auth/token.service';
import { MessageService } from '../message/message.service';

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

  constructor(
    private tokenService: TokenService,
    private messageService: MessageService,
  ) {}

  afterInit(server: Server) {
    this.logger.log(`Initialized ${server}`);
  }
  // Move this to middleware
  handleConnection(client: Socket) {
    try {
      const authHeader = client.handshake.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        this.logger.log('Missing or invalid authorization header');
      }

      const token = authHeader.split(' ')[1];
      const userId = this.tokenService.getUserIdFromToken(token);
      client.data.userId = userId;
      console.log(`Client connected with user ID: ${userId}`);
    } catch (error) {
      console.error(`Authentication error: ${error}`);
      client.disconnect(true);
    }
  }

  handleDisconnect(client: Socket) {
    const userId = client.data.userId;
    this.logger.log(`Client with ${userId} disconnected`);
  }

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() content: string,
    @ConnectedSocket() client: Socket,
  ) {
    const userId = client.data.userId;
    const message = await this.messageService.create(content, userId);
    this.server.emit('message', message);
  }
}
