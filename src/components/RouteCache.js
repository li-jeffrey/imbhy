const LOCALSTORAGE_PREFIX = "imbhy-routes-";
const CACHES = {};

function newCache(name) {
    const key = LOCALSTORAGE_PREFIX + name;
    const allItems = new Set();
    var head = null;
    var toArrayCache = null;

    const stored = localStorage.getItem(key);
    if (stored != null) {
        const values = JSON.parse(stored);
        var cursor = null;
        for (const item of values) {
            if (cursor == null) {
                head = {
                    value: item,
                    nextNode: null
                };

                cursor = head;
            } else {
                cursor.nextNode = {
                    value: item,
                    nextNode: null
                }
                cursor = cursor.nextNode;
            }
            allItems.add(item);
        }
        toArrayCache = values;
    }

    return { key, allItems, head, toArrayCache };
}

function saveCache(cache) {
    cache.toArrayCache = null;
    localStorage.setItem(cache.key, JSON.stringify(ToArray(cache)));
    return cache;
}

export function AddItem(cache, item) {
    if (cache.head == null) {
        cache.allItems.add(item);
        cache.head = {
            value: item,
            nextNode: null
        }
    } else {
        if (cache.allItems.has(item)) {
            if (cache.head.value === item) {
                return cache;
            }

            var prev = cache.head;
            var cursor = cache.head.nextNode;
            while (cursor != null) {
                if (cursor.value === item) {
                    prev.nextNode = cursor.nextNode;
                    break;
                }
                prev = cursor;
                cursor = cursor.nextNode;
            }
        }

        cache.allItems.add(item);
        cache.head = {
            value: item,
            nextNode: cache.head
        }
    }

    return saveCache(cache);
}

export function RemoveItem(cache, item) {
    if (cache.allItems.delete(item)) {
        if (cache.head.value === item) {
            cache.head = cache.head.nextNode;
        } else {
            var prev = cache.head;
            var cursor = cache.head.nextNode;
            while (cursor != null) {
                if (cursor.value === item) {
                    prev.nextNode = cursor.nextNode;
                    break;
                }
                prev = cursor;
                cursor = cursor.nextNode;
            }
        }

        return saveCache(cache);
    }

    return cache;
}

export function HasItem(cache, item) {
    if (cache == null) {
        return false;
    }

    return cache.allItems.has(item);
}

export function ToArray(cache) {
    if (cache == null) {
        return [];
    }

    if (cache.toArrayCache == null) {
        const arr = [];
        var cursor = cache.head;
        while (cursor != null) {
            arr.push(cursor.value);
            cursor = cursor.nextNode;
        }
        cache.toArrayCache = arr;
    }    

    return cache.toArrayCache;
}

export function GetCache(name) {
    if (!(name in CACHES)) {
        CACHES[name] = newCache(name);
    }

    return CACHES[name];
}