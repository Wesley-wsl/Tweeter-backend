/* eslint-disable no-plusplus */
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

        const trendsSort = trendsReduced.slice(0, 5);
        let swap;
        const last = trendsSort.length - 1;

        do {
            swap = false;
            for (let i = 0; i < last; ) {
                if (
                    trendsSort[i].tweetsQuantity <
                    trendsSort[i + 1].tweetsQuantity
                ) {
                    [trendsSort[i], trendsSort[i + 1]] = [
                        trendsSort[i + 1],
                        trendsSort[i],
                    ];
                    swap = true;
                }

                i += 1;
            }
        } while (swap);

        return trendsSort;
    }
}
