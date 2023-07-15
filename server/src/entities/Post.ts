import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { Vote } from "./Vote";
import { Comment } from "./Comment";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    title!: string;


    @Field({ nullable: true })
    @Column({ nullable: true })
    text!: string;

    @Field()
    @Column({ type: 'int', default: 1 })
    points!: number;

    @Field()
    @Column()
    ownerId!: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    urlLink!: string;

    @Field()
    @Column()
    communityId!: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    imageUrl!: string;

    @Field()
    voteStatus!: number;

    @ManyToOne(() => User, (user) => user.posts)
    owner: User

    @OneToMany(() => Vote, (upvote) => upvote.post)
    upvotes: Vote[]

    @OneToMany(() => Comment, (comment) => comment.post, { cascade: true })
    comments: Comment[]

    @Field(() => String)
    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;

}