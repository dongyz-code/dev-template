import 'reflect-metadata';
import { Entity, Column, PrimaryColumn, BaseEntity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn({
    comment: 'User ID',
    type: 'int',
  })
  user_id: number;

  @Column({
    comment: 'User Name',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  username: string;

  @Column({
    comment: 'User Password',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  password: string;

  @Column({
    comment: 'User Email',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  email: string;

  @Column({
    comment: 'User Phone',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  phone: string;

  @Column({
    comment: 'User Status',
    type: 'varchar',
    enum: ['active', 'inactive', 'deleted'],
    nullable: false,
    default: 'active',
  })
  status: string;

  @Column({
    comment: 'User Avatar',
    type: 'text',
    nullable: true,
  })
  avatar: string;

  @Column({
    comment: 'User Address',
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  address: string;

  @Column({
    comment: 'User Created At',
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column({
    comment: 'User Updated At',
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @Column({
    comment: 'Latest Login At',
    type: 'timestamp',
    nullable: true,
  })
  latest_login_at: Date;
}
