export function groupBy(arr, keyExtractor) {
    var obj = {};
    for (const el of arr) {
        const key = keyExtractor(el);
        if (key in obj) {
            obj[key].push(el);
        } else {
            obj[key] = [el];
        }
    }

    return obj;
}

export function toMap(arr, keyExtractor) {
    var obj = {};
    for (const el of arr) {
        const key = keyExtractor(el);
        if (key in obj) {
            throw new Error(`Duplicate key: ${key}`);
        }

        obj[key] = el;
    }

    return obj;
}