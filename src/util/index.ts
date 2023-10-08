export function firstToLower(str: string) {
    const s = String(str);
    if (s.length === 0) {
        return "";
    }
    return s[0].toLowerCase() + s.slice(1);
}
