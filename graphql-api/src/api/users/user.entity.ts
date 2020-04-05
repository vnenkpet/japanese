import { ObjectIdColumn, Column, Entity, CreateDateColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @ObjectIdColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createDate: Date;

  @Column({ default: false })
  verified: boolean;
}
