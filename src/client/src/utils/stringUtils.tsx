export const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

function splitLines(text: string): string[] {
    return text.split(/\r\n|\r|\n/);
}

interface IDictionary<T> {
    [Key: string]: T;
}

export class Dictionary<T> {
    values: IDictionary<T> = {};
}

export function toDictionary(text: string): Dictionary<string[]> {
    let textLines = splitLines(text);
    textLines.pop();

    let dictionary = new Dictionary<string[]>();

    textLines.forEach(line => {
        let label = line.slice(0, line.indexOf(':'));
        label = label.toLowerCase();
        const value = line.slice(line.indexOf(':') + 2);

        if (dictionary.values[label] === undefined) {
            dictionary.values[label] = [];
        }

        dictionary.values[label].push(value);
    })

    return dictionary;
}