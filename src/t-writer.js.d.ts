declare module 't-writer.js' {
  export default class Typewriter {
    constructor(element: ElementRef, options: any);
    type(text: string): Typewriter;
    remove(n: number): Typewriter;
    clear(): Typewriter;
    rest(n: number): Typewriter;
    changeTypeColor(color: string): Typewriter;
    removeCursor(): Typewriter;
    start(): void;
    then(callback: () => void): Typewriter;
  }
}
