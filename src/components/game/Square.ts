
export class Square {
    private position: string;
    private width: number;
    private height: number;
    private piece: any;

    constructor(position: string, width: number, height: number, piece?: any) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.piece = piece;
    }

    getPosition() { return this.position; }

    getWidth() { return this.width; }
    
    getHeight() { return this.height }

    getPiece() { return this.piece }

    setPiece(piece: any) { this.piece = piece }

}
