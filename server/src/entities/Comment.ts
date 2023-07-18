import { Field, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity, OneToMany, ManyToOne } from "typeorm";
import { User } from "./User";
import { Post } from "./Post";

@ObjectType()
@Entity()
export class Comment extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    message: string;

    @Field()
    @Column()
    userId: number;

    @Field()
    @Column()
    postId: number;

    @Field()
    @Column({ default: false })
    isDeleted: boolean;

    @Field({ nullable: true })
    @Column({ nullable: true })
    parentId: number;

    @Field(() => User)
    @ManyToOne(() => User, user => user.comments, { onDelete: 'CASCADE' })
    user: User;

    @Field(() => Post)
    @ManyToOne(() => Post, post => post.comments, { onDelete: 'CASCADE' })
    post: Post;

    @Field(() => Comment, { nullable: true })
    @ManyToOne(() => Comment, comment => comment.children, { onDelete: 'CASCADE' })
    parent: Comment;

    @Field(() => [Comment], { nullable: true })
    @OneToMany(() => Comment, comment => comment.parent)
    children: Comment[];

    @Field(() => String)
    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;

}
