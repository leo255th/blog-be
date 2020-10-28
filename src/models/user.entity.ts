import { Field, ID, ObjectType, Int } from '@nestjs/graphql';

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
@Entity({ name: "user" })
export class UserEntity {
  @Field(type => Int, { description: '用户的id' })
  @PrimaryGeneratedColumn({ type: 'bigint', comment: '主键，用户的id' })
  id: number;

  @Field(type => String, { description: '用户名' })
  @Column({ nullable: false, comment: '用户名' })
  userName: string;

  // @Field(type => String, { nullable: false, description: "MD5散列密码" })
  @Column({ nullable: false, comment: '密码' })
  passWord: string;

  @CreateDateColumn({ comment: '创建时间' })
  @Field({ description: "创建时间" })
  createdAt?: Date;

  @UpdateDateColumn({ comment: '最后修改时间' })
  @Field({ description: "最后修改时间" })
  updatedAt?: Date;

  @Column({ comment: '是否删除', default: 0 })
  @Field(type => Boolean, { description: "是否删除" })
  isDeleted?: boolean;

}
