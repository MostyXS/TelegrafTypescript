export {}

declare global {
    interface Array<T> {
        toTags(this: string[]): string
    }
}


Array.prototype.toTags = function(this) {
    return this.map(element => `#${element}`).toString().replace(',', ' ').toUpperCase()
}
