import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    BaseEntity,
} from "typeorm";

import { Tweet } from "./Tweet";
import { User } from "./User";

@Entity("comments")
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    readonly id!: string;

    @Column({
        type: "uuid",
    })
    author_id!: string;

    @ManyToOne(() => User)
    @JoinColumn({
        name: "author_id",
    })
    author!: User;

    @Column({
        type: "uuid",
    })
    tweet_id!: string;

    @ManyToOne(() => Tweet, tweet => tweet.comments)
    @JoinColumn({
        name: "tweet_id",
    })
    tweet!: Tweet;

    @Column()
    comment!: string;

    @Column({
        default: 0,
    })
    likes!: number;

    @Column({
        type: "uuid",
        default: [],
        array: true,
    })
    liked_users_id!: string[];

    @Column({
        type: "varchar",
        nullable: true,
    })
    image!: string;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}
