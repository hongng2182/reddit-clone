import { Field, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, BaseEntity, OneToMany, ManyToOne } from "typeorm";
import { UserCommunity } from "./UserCommunity";
import { PrivacyType } from "../types";
import { Post } from "./Post";
import { User } from "./User";


@ObjectType()
@Entity()
export class Community extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    hasJoined!: boolean;

    @Field()
    @Column({ unique: true })
    name!: string;

    @Field()
    @Column()
    displayName!: string;

    @Field({ nullable: true })
    @Column({ nullable: true, default: null })
    description!: string;

    @Field()
    @Column()
    creatorId!: number;

    @ManyToOne(() => User, (user) => user.communities)
    creator: User

    @Field()
    @Column({ type: 'enum', enum: PrivacyType, default: PrivacyType.public })
    privacyType!: PrivacyType;

    @Field({ nullable: true })
    @Column({ nullable: true, default: null })
    communityIconUrl!: string;

    @OneToMany(() => UserCommunity, (userCommunity) => userCommunity.community)
    userCommunities: UserCommunity[]

    @OneToMany(() => Post, (post) => post.community)
    posts: Post[]

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;
}