import { Field, ID, ObjectType, Int, registerEnumType } from 'type-graphql';

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';



@ObjectType()
@Entity({ name: "tag" })
export class TagEntity {
  @Field(type => Int, { description: '标签的id' })
  @PrimaryGeneratedColumn({ type: 'bigint', comment: '主键，标签的id' })
  id: number;

  @Column({ nullable: true, comment: '文章的id', type: 'bigint' })
  @Field(type => Int, { nullable: true, description: "文章的id" })
  articleId: number;

  @Field(type => String, { description: "标签内容", nullable: false })
  @Column({ comment: "标签内容", nullable: false })
  content: string;

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
