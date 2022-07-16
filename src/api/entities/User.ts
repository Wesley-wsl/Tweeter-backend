/* eslint-disable no-use-before-define */
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

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
        default: 0,
    })
    followingCount!: number;

    @Column({
        default: 0,
    })
    followersCount!: number;

    @Column({
        type: "uuid",
        array: true,
        default: [],
    })
    following_id!: string[];

    @Column({
        type: "uuid",
        array: true,
        default: [],
    })
    followers_id!: string[];

    @ManyToMany(() => User, user => user.followers)
    following!: User[];

    @ManyToMany(() => User, user => user.following)
    @JoinTable()
    followers?: User[];

    @Column({
        default: "Nothing about me. :/",
    })
    about_me!: string;

    @OneToMany(() => Tweet, tweet => tweet.author)
    @JoinColumn()
    tweets!: Tweet[];

    @Column({
        type: "uuid",
        default: [],
        array: true,
    })
    liked_tweets_id!: string[];

    @OneToMany(() => Tweet, tweet => tweet.liked_users_id)
    @JoinColumn({ name: "liked_tweets_id" })
    liked_tweets!: Tweet[];

    @Column({
        type: "uuid",
        array: true,
        default: [],
    })
    liked_comments_id!: string[];

    @Column({
        type: "uuid",
        default: [],
        array: true,
    })
    bookmarks_id: string[];

    @ManyToMany(() => Tweet, tweet => tweet.users_saved_id)
    @JoinTable({ name: "bookmarks_id" })
    bookmarks!: Tweet[];

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}
