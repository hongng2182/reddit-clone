import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { Vote } from "./Vote";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    title!: string;


    @Field()
    @Column()
    text!: string;

    @Field()
    @Column({ type: 'int', default: 0 })
    points!: number;

    @Field()
    voteStatus!: number;

    @Field()
    @Column()
    ownerId!: number;

    @ManyToOne(() => User, (user) => user.posts)
    owner: User

    @OneToMany(() => Vote, (upvote) => upvote.post)
    upvotes: Vote[]

    @Field(() => String)
    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;



}