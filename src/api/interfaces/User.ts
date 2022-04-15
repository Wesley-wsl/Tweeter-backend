import { Tweet } from "../entities/Tweet";
import { User } from "../entities/User";

export interface IUser extends User {
    following: User[];
    followers: User[];
    bookmarks: Tweet[];
    tweets: Tweet[];
}
