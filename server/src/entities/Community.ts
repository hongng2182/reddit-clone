import { Field, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, BaseEntity, OneToMany } from "typeorm";
import { UserCommunity } from "./UserCommunity";


@ObjectType()
@Entity()
export class Community extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;


    @Field()
    @Column({ unique: true })
    name!: string;

    @Field()
    @Column()
    description!: string;

    @Field()
    @Column()
    creatorId!: number;

    @Field()
    @Column({ type: 'int', default: 1 })
    numMembers!: number;

    @Field()
    @Column()
    privacyType!: string;

    @Field()
    @Column({ nullable: true, default: null })
    communityIconUrl!: string;

    @OneToMany(() => UserCommunity, (userCommunity) => userCommunity.community)
    userCommunities: UserCommunity[]

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;
}