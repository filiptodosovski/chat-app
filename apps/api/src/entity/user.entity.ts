import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from './base.entity';
import { Message } from './message.entity';

@Entity()
export class User extends Base {
  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Message, (message) => message.user, { onDelete: 'CASCADE' })
  messages: Message[];
}
