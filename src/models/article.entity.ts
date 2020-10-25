import { Field, ID, ObjectType, Int } from 'type-graphql';

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';



@ObjectType()
@Entity({ name: "article" })
export class ArticleEntity {
  @Field(type => Int, { description: '文章的id' })
  @PrimaryGeneratedColumn({ type: 'bigint', comment: '主键，文章的id' })
  id: number;

  @Field(type => String, { description: "文章的标题", nullable: false })
  @Column({ comment: '文章的标题', nullable: false })
  title: string;

  @Field(type => String, { description: '文章的内容（富文本）', nullable: false })
  @Column({ comment: "文章的内容", nullable: false, type: 'text' })
  content: string;

  @Field(type => String, { description: '文章的领域', nullable: false })
  @Column({ comment: "文章的领域", nullable: false })
  field: string;

  @Field(type => Int, { description: "文章点赞数", defaultValue: 0 })
  @Column({ comment: '文章点赞数', default: 0 })
  likeNum: number;

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
