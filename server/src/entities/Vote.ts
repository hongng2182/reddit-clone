import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Post } from "./Post";
import { User } from "./User";

@Entity()
export class Vote extends BaseEntity {
    @PrimaryColumn()
    userId!: number

    @PrimaryColumn()
    postId!: number

    @Column({ type: 'int' })
    value!: number

    @ManyToOne(() => Post, (post) => post.upvotes, { cascade: true })
    post!: Post

    @ManyToOne(() => User, (user) => user.upvotes)
    user!: User
}