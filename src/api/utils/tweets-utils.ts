/* eslint-disable no-param-reassign */
import { Tweet } from "../entities/Tweet";

export function sortByLikes(items: Tweet[]) {
    let swap;
    const last = items.length - 1;

    do {
        swap = false;
        for (let i = 0; i < last; ) {
            if (items[i].likes < items[i + 1].likes) {
                [items[i], items[i + 1]] = [items[i + 1], items[i]];
                swap = true;
            }

            i += 1;
        }
    } while (swap);
    return items;
}
