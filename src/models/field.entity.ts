import { Field, ID, ObjectType, Int } from 'type-graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

// 文章领域
@ObjectType()
@Entity({ name: "article" })
export class FieldEntity {
  @Field(type => Int, { description: 'id' })
  @PrimaryGeneratedColumn({ type: 'bigint', comment: '主键id' })
  id: number;

  @Field(type => String, { description: "领域", nullable: false })
  @Column({ comment: "领域", nullable: false })
  field: string;
}