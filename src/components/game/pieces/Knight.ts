import { IPieces } from "../PiecesFactory";
import Pieces from "../Pieces";

interface IKnight extends IPieces {
    colour: string;
    image: string;
    position: string;
    moves: number;
    moveDirections: Map<string, number>;
}

export class Knight implements IKnight {
    colour: string;
    image: string;
    position!: string;
    moves!: number;
    moveDirections!: Map<string, number>;

    constructor(colour: string, image: string) {
        this.colour = colour;
        this.image = image;

        this.initialise();
    }

    initialise() {
        this.moves = 0;
        const pieces = new Pieces();

        this.setMoveDirections(pieces.knightMoves());
    }

    incrementMoveNumber(move: number) { this.moves += move; }

    getColour() { return this.colour; }

    getImage() { return this.image; }

    getMoveDirections() { return this.moveDirections; }

    getMoveNumber() { return this.moves; }

    setImage(image: string) { this.image = image; }

    setMoveDirections(directions: Map<string, number>) { this.moveDirections = directions; }

}
