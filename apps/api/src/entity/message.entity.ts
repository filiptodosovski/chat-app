import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from './base.entity';
import { User } from './user.entity';

@Entity()
export class Message extends Base {
  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.messages)
  user: User;
}
