
export class Square {
    private number: string;
    private width: number;
    private height: number;

    constructor(number: string, width: number, height: number) {
        this.number = number;
        this.width = width;
        this.height = height;
    }

    getId() { return this.number; }

    getWidth() { return this.width; }
    
    getHeight() { return this.height }

}
