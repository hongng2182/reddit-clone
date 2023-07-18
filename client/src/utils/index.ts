import { FieldError } from "@/generated/graphql";

function toErrorMap(errors: FieldError[]) {
    const errorMap: Record<string, string> = {};
    errors.forEach(({ field, message }) => {
        errorMap[field] = message
    })
    return errorMap
}

function getTimeAgo(time: number): string {
    const timeDifference = Math.floor(Date.now() / 1000) - time / 1000;

    if (timeDifference < 1) {
        return 'just now';
    }

    const condition = [
        { str: 'year', secs: 12 * 30 * 24 * 60 * 60 },
        { str: 'month', secs: 30 * 24 * 60 * 60 },
        { str: 'day', secs: 24 * 60 * 60 },
        { str: 'hour', secs: 60 * 60 },
        { str: 'minute', secs: 60 },
        { str: 'second', secs: 1 },
    ];

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < condition.length; i++) {
        const { str, secs } = condition[i];
        const d = timeDifference / secs;

        if (d >= 1) {
            const t = Math.round(d);
            return `${t} ${str}${t > 1 ? 's' : ''} ago`;
        }
    }

    return '';
}

export { toErrorMap, getTimeAgo }