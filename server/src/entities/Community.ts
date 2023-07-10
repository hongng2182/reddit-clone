import { Field, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, BaseEntity, OneToMany } from "typeorm";
import { UserCommunity } from "./UserCommunity";
import { PrivacyType } from "../types";


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
    @Column({ nullable: true, default: '' })
    description!: string;

    @Field()
    @Column()
    creatorId!: number;

    @Field()
    @Column({ type: 'int', default: 1 })
    numMembers!: number;

    @Field()
    @Column({ type: 'enum', enum: PrivacyType, default: PrivacyType.public })
    privacyType!: PrivacyType;

    @Field()
    @Column({ nullable: true, default: '' })
    communityIconUrl!: string;

    @OneToMany(() => UserCommunity, (userCommunity) => userCommunity.community)
    userCommunities: UserCommunity[]

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;
}