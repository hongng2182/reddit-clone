import { Field, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity, OneToMany, ManyToMany } from "typeorm";
import { Post } from "./Post";
import { Vote } from "./Vote";
import { Comment } from "./Comment";
import { UserCommunity } from "./UserCommunity";
import { Community } from "./Community";

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;


    @Field()
    @Column({ unique: true })
    username!: string;

    @Field()
    @Column({ unique: true })
    email!: string;

    @Field()
    @Column()
    password!: string;

    @Field({ nullable: true })
    @Column({ nullable: true, default: null })
    profileUrl!: string;

    @OneToMany(() => Community, (community) => community.creator)
    communities: Community[]

    @OneToMany(() => Post, (post) => post.owner)
    posts: Post[]

    @OneToMany(() => Vote, (upvote) => upvote.user)
    upvotes: Vote[]

    @OneToMany(() => Comment, (comment) => comment.user, { cascade: true })
    comments: Comment[]

    @ManyToMany(() => UserCommunity, (userCommunity) => userCommunity.user)
    userCommunities: UserCommunity[]

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;


}