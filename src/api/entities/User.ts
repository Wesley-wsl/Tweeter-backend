/* eslint-disable no-use-before-define */
import { Exclude } from "class-transformer";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    Generated,
    JoinColumn,
    JoinTable,
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

    @ManyToMany(() => User, user => user.followers)
    following!: User[];

    @ManyToMany(() => User, user => user.following)
    @JoinTable()
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
