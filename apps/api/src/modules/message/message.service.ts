import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Message } from '../../entity/message.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
  ) {}

  async create(content: string, userId: number) {
    const message = this.messageRepository.create({
      content,
      user: { id: userId },
    });
    return this.messageRepository.save(message);
  }

  async findAll() {
    return await this.messageRepository.find({
      relations: ['user'],
      select: {
        user: { id: true },
      },
    });
  }
}
