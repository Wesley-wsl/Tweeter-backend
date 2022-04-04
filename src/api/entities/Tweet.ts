/* eslint-disable no-use-before-define */
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

import { Comment } from "./Comment";
import { User } from "./User";

@Entity("tweets")
export class Tweet extends BaseEntity {
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

    @Column()
    likes!: number;

    @Column({
        type: "uuid",
        nullable: true,
    })
    liked_users_id!: string[];

    @ManyToMany(() => User)
    @JoinColumn({
        name: "liked_users_id",
    })
    liked_users!: User[];

    @Column({
        type: "uuid",
        nullable: true,
    })
    retweets_id!: string[];

    @ManyToMany(() => Tweet)
    @JoinColumn({
        name: "retweets_id",
    })
    retweet!: Tweet[];

    @Column()
    image!: string;

    @Column({
        type: "uuid",
        nullable: true,
    })
    comments_id!: string[];

    @OneToMany(() => Comment, comment => comment.tweet)
    @JoinColumn({
        name: "comments_id",
    })
    comments!: Comment[];

    @Column()
    public!: boolean;

    @Column({
        type: "uuid",
        nullable: true,
    })
    users_saved_id!: string[];

    @ManyToMany(() => User)
    @JoinColumn({
        name: "users_saved_id",
    })
    saved!: User[];

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}
