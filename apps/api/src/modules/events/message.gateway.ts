import {
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
    console.log('client connected', client);
  }

  handleDisconnect(client: Socket) {
    const userId = client.data.userId;
    this.logger.log(`Client with ${userId} disconnected`);
  }

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() payload: any) {
    console.log('message', payload);
    const { userId, content } = payload;
    const message = await this.messageService.create(content, userId);
    this.server.emit('message', message);
  }
}
