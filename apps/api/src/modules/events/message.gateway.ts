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
import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Server, Socket } from 'socket.io';
import * as process from 'node:process';
import { MessageService } from '../message/message.service';
import { UserJwtPayload } from '../auth/types';

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
  private readonly logger = new Logger(MessageGateway.name);

  constructor(
    private jwtService: JwtService,
    private messageService: MessageService,
  ) {}

  afterInit(server: Server) {
    this.logger.log(`Initialized ${server} server`);
  }

  handleConnection(client: Socket) {
    const token = client.handshake.auth?.token;
    if (!token) {
      client.disconnect();
      return;
    }

    try {
      const payload = this.jwtService.verify<UserJwtPayload>(token);
      client.data.userId = payload.userId;
      this.logger.log(`Client with ${payload.userId} connected`);
    } catch {
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    const userId = client.data.userId;
    this.logger.log(`Client with ${userId} disconnected`);
  }

  @SubscribeMessage('message')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { content: string },
  ) {
    const content = payload?.content;
    if (!content) {
      return;
    }

    const userId = client.data.userId;
    const message = await this.messageService.create(content, userId);
    this.server.emit('message', message);
  }
}
