export function dict(obj) {
    Object.setPrototypeOf(obj, null);
    return obj;
}

export function isObject (obj) {
    return obj !== 'undefined' && typeof obj == 'object';
}

export function isPlainObject (obj) {
    return isObject(obj) && Object.getPrototypeOf(obj) == Object.prototype;
}

export function copyArrayLike (arr) {
    return Array.prototype.slice.call(arr, 0);
}

export function maxIndex (arr, isLarger) {
    var index = 0;

    for (var i = 0; i < arr.length; i++) {
        if (isLarger(arr[i], index)) {
            index = i;
        }
    }

    return index;
}

export function max (arr, predicate) {
    var i = maxIndex(arr, predicate);
    return arr[i];
}

export function setOption (obj, opt) {
    return function option (field, defaultValue) {
        if (isPlainObject(opt) && opt.hasOwnProperty(field)) {
            obj[field] = opt[field];
        } else {
            obj[field] = defaultValue;
        }
    }
}
