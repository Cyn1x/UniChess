import { IPieces } from "../PiecesFactory";
import Pieces from "../Pieces";

interface IKing extends IPieces {
    colour: string;
    image: string;
    position: string;
    moves: number;
    moveDirections: Map<string, number>;
}

export class King implements IKing {
    colour: string;
    image: string;
    position!: string;
    moves!: number;
    moveDirections!: Map<string, number>;
    private inCheck!: boolean;

    constructor(colour: string, image: string) {
        this.colour = colour;
        this.image = image;

        this.initialise();
    }

    initialise() {
        this.moves = 0;
        this.inCheck = false;
        const pieces = new Pieces();

        this.setMoveDirections(pieces.kingMoves());
    }

    incrementMoveNumber(move: number) { this.moves += move; }

    getColour() { return this.colour; }

    getImage() { return this.image; }

    getMoveDirections() { return this.moveDirections; }

    getPosition() { return this.position; }

    getMoveNumber() { return this.moves; }

    setImage(image: string) { this.image = image; }

    setMoveDirections(directions: Map<string, number>) { this.moveDirections = directions; }

    setPosition(pos: string) { this.position = pos; }

    setCheck(check: boolean) { this.inCheck = check; }

}
