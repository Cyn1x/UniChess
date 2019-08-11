
export class Square {
    public width: number;
    public height: number;
    public piece: any;

    constructor(width: number, height: number, piece?: any) {
        this.width = width;
        this.height = height;
        this.piece = piece;
    }
}
