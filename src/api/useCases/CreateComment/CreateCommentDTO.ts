export interface ICreateCommentDTO {
    author_id: string;
    tweet_id: string;
    comment: string;
    image: string | undefined;
}
