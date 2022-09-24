interface IDictionary<V> {
    [Key: number]: V;
}

export class Dictionary<V> {
    values: IDictionary<V> = {};
}

export function toDictionary<V>(array: Array<{ key: number, value: V }>): Dictionary<V> {
    let dictionary = new Dictionary<V>();

    array.forEach(item => {
        dictionary.values[item.key] = item.value;
    })

    return dictionary;
}

export function deepCopy<V>(dictionary: Dictionary<V>): Dictionary<V> {
    let newDictionary = new Dictionary<V>();

    for (let key in dictionary.values) {
        newDictionary.values[key] = dictionary.values[key];
    }
    return newDictionary;
}