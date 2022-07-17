import { PostgresTweetsRepository } from "../../repositories/implementations/PostgresTweetsRepository";

interface IObjectTrends {
    trend: string;
    tweetsQuantity: number;
}

export class ShowTrendsUseCase {
    constructor(private tweetsRepository: PostgresTweetsRepository) {}

    async execute() {
        const allTweets = await this.tweetsRepository.findAllTweets("");
        const trends: string[] = [];
        const objectTrends: IObjectTrends[] = [];

        allTweets.forEach(tweet => {
            const matched = String(tweet.content.match(/#[a-zA-Z]+/gim));
            if (matched === "null") return;
            trends.push(...matched.split(","));
        });

        for (let i = 0; i < trends.length; i++) {
            const trend = trends[i];
            const count = allTweets.filter(current =>
                current.content.match(trend),
            );

            objectTrends.push({
                trend,
                tweetsQuantity: count.length,
            });
        }

        const trendsReduced: IObjectTrends[] = [];

        objectTrends.forEach(item => {
            const duplicated =
                trendsReduced.findIndex((trend: { trend: string }) => {
                    return item.trend === trend.trend;
                }) > -1;

            if (!duplicated) {
                trendsReduced.push(item);
            }
        });

        let trendsSort = trendsReduced.slice(0, 5);

        trendsSort = trendsSort.sort((a, b) => {
            if (a.tweetsQuantity > b.tweetsQuantity) return -1;
            if (a.tweetsQuantity < b.tweetsQuantity) return 1;
            return 0;
        });

        return trendsSort;
    }
}
