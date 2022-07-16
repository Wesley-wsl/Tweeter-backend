/* eslint-disable no-use-before-define */
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
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
        nullable: true,
    })
    image?: string;

    @Column()
    content!: string;

    @Column({
        type: "uuid",
        array: true,
        default: [],
    })
    comments_id!: string[];

    @OneToMany(() => Comment, comment => comment.tweet)
    @JoinColumn({
        name: "comments_id",
    })
    comments!: Comment[];

    @Column({
        default: "true",
    })
    isPublic!: string;

    @Column({
        type: "uuid",
        default: [],
        array: true,
    })
    users_saved_id!: string[];

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}
