export {}

declare global {
    interface String {
        hasLink(this: string): boolean
        }
}

String.prototype.hasLink = function (this) {
    return this.includes('http')
}


