import { Field, ObjectType } from "type-graphql";
import { Column, Entity, BaseEntity, PrimaryColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { Community } from "./Community";


@ObjectType()
@Entity()
export class UserCommunity extends BaseEntity {

    @PrimaryColumn()
    userId!: number

    @PrimaryColumn()
    communityId!: number

    @Field()
    @Column({ default: false })
    isModerator: boolean;

    @ManyToOne(() => User, (user) => user.userCommunities)
    user!: User

    @ManyToOne(() => Community, (community) => community.userCommunities, { cascade: true })
    community!: Community
}