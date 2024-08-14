export function LongText(value) {
    const arr = value
        .trim() // Quita los espacios de sobra al inicio y final
        .replace(/[\n;,.!?\-(){}[\]'"`]/g, '') // Quita los saltos de línea y símbolos específicos
        .replace(/\s{1,}/g, '')
        
    return arr.length;
}
export function SplitText(value) {
    const arr = value
        .toLowerCase()
        .trim()
        .replace(/[\n;,:=._!?\-(){}[\]'"`]/g, ' ')
        .replace(/\s{2,}/g, ' ')
        .split(' ')
        .filter(word => word.length > 0);
    const uniqueWords = [...new Set(arr)];
    return uniqueWords;
}