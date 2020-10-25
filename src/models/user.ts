import { Field, ID, ObjectType, Int } from 'type-graphql';

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @Field(type => Int, { description: '用户的id' })
  @PrimaryGeneratedColumn({ type: 'bigint', comment: '主键，用户的id' })
  id: number;

  @Field(type => String, { description: '用户昵称' })
  @Column({ nullable: false, comment: '用户昵称' })
  nickName: string;

}
