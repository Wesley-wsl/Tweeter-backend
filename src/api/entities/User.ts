/* eslint-disable no-use-before-define */
import { Exclude } from "class-transformer";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    Generated,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

import { Comment } from "./Comment";
import { Tweet } from "./Tweet";

@Entity("users")
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    readonly id!: string;

    @Column()
    name!: string;

    @Column({
        unique: true,
    })
    email!: string;

    @Exclude()
    @Column()
    password?: string;

    @Column({
        nullable: true,
    })
    avatar!: string;

    @Column({
        nullable: true,
    })
    background!: string;

    @Column({
        type: "uuid",
        nullable: true,
    })
    following_id!: string[];

    @Column({
        type: "uuid",
        nullable: true,
    })
    followers_id!: string[];

    @ManyToMany(() => User)
    @JoinColumn()
    following!: User[];

    @ManyToMany(() => User)
    @JoinColumn()
    followers!: User[];

    @Column({
        default: "",
    })
    about_me!: string;

    @Column({
        type: "uuid",
        nullable: true,
    })
    tweets_id!: string[];

    @OneToMany(() => Tweet, tweet => tweet.author)
    @JoinColumn()
    tweets!: Tweet[];

    @Column({
        type: "uuid",
        nullable: true,
    })
    liked_tweets_id!: string[];

    @ManyToMany(() => Tweet)
    @JoinColumn()
    liked_tweets!: Tweet[];

    @Column({
        type: "uuid",
        nullable: true,
    })
    comments_id!: string[];

    @OneToMany(() => Comment, comment => comment.comment)
    @JoinColumn()
    comments!: Comment[];

    @Column({
        type: "uuid",
        nullable: true,
    })
    liked_comments_id!: string[];

    @ManyToMany(() => Comment)
    @JoinColumn()
    liked_comments!: Comment[];

    @Column({
        type: "uuid",
        nullable: true,
    })
    retweets_id!: string[];

    @ManyToMany(() => Tweet)
    @JoinColumn({ name: "retweets_id" })
    retweet!: Tweet[];

    @Column({
        type: "uuid",
        nullable: true,
    })
    bookmarks_id!: string[];

    @ManyToMany(() => Tweet)
    @JoinColumn({
        name: "bookmarks_id",
    })
    bookmarks!: Tweet[];

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}
