import { Field, ID, ObjectType, Int, registerEnumType } from '@nestjs/graphql';

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum CommentTypeSet {
  USER = 0,   // 评论用户
  ARTICLE = 1, // 评论文章
  COMMENT = 2,    // 评论评论
}
registerEnumType(CommentTypeSet, {
  name: "CommentType",
  description: '评论的类型'
})


@ObjectType()
@Entity({ name: "comment" })
export class CommentEntity {
  @Field(type => Int, { description: '评论的id' })
  @PrimaryGeneratedColumn({ type: 'bigint', comment: '主键，评论的id' })
  id: number;

  @Column({ default: 1, comment: "评论类型" })
  @Field(type => CommentTypeSet, { defaultValue: 1, description: "评论类型" })
  commentType: CommentTypeSet;

  @Column({ nullable: true, comment: '被评论的用户的id', type: 'bigint' })
  @Field(type => Int, { nullable: true, description: "被评论的用户的id" })
  commentedUserId: number;

  @Column({ nullable: true, comment: '被评论的评论的id', type: 'bigint' })
  @Field(type => Int, { nullable: true, description: "被评论的评论的id" })
  commentedCommentId: number;

  @Column({ nullable: true, comment: '被评论的文章的id', type: 'bigint' })
  @Field(type => Int, { nullable: true, description: "被评论的文章的id" })
  commentedArticleId: number;

  @Column({ comment: "评论人用户名" })
  @Field(type => String, { nullable: false, description: "评论人用户名" })
  userName: string;

  @Column({ comment: "评论人用户ID", type: 'bigint' })
  @Field(type => Int, { nullable: false, description: "评论人用户ID" })
  userId: number;

  @Field(type => String, { description: "文章的标题", nullable: false })
  @Column({ comment: '文章的标题', nullable: false })
  title: string;

  @Field(type => String, { description: "评论内容", nullable: false })
  @Column({ comment: "评论内容", nullable: false })
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
