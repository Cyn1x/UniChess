
export class Square {
    private pos: string;
    private x: number;
    private y: number
    private w: number;
    private h: number;
    private piece: string;
    private colour!: string;
    private enPassant!: string;

    constructor(pos: string, x: number, y: number, w: number, h: number, piece?: any) {
        this.pos = pos;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.piece = piece;
    }

    setPiece(piece: string) { this.piece = piece; }

    setColour(colour: string) { this.colour = colour; }

    setEnPassant(enPassant: string) { this.enPassant = enPassant }

    getPiece() { return this.piece; }

    getPosition() { return this.pos; }

    getX() { return this.x; }

    getY() { return this.y; }

    getWidth() { return this.w; }
    
    getHeight() { return this.h }

    getColour() { return this.colour; }

    getEnPassant() { return this.enPassant; }

}
