import { IPieces } from "../PiecesFactory";
import Pieces from "../Pieces";

interface IBishop extends IPieces {
    colour: string;
    image: string;
    position: string;
    moves: number;
    moveDirections: Map<string, number>;
}

export class Bishop implements IBishop {
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

        this.setMoveDirections(pieces.bishopMoves());
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

}
