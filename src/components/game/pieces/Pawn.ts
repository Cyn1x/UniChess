import { IPieces } from "../PiecesFactory";
import Pieces from "../Pieces";

interface IPawn extends IPieces {
    colour: string;
    image: string;
    position: string;
    moves: number;
    moveDirections: Map<string, number>;
}

export class Pawn implements IPawn {
    colour: string;
    image: string;
    position!: string;
    moves!: number;
    moveDirections!: Map<string, number>;
    private hasUpgraded!: boolean;

    constructor(colour: string, image: string) {
        this.colour = colour;
        this.image = image;

        this.initialise();
    }

    initialise() {
        this.hasUpgraded = false;
        this.moves = 0;
        const pieces = new Pieces();

        this.setMoveDirections(pieces.pawnMoves());
    }

    incrementMoveNumber(move: number) { this.moves += move; }

    getColour() { return this.colour; }

    getImage() { return this.image; }

    getMoveDirections() { return this.moveDirections; }

    getMoveNumber() { return this.moves; }

    getHasUpgraded() { return this.hasUpgraded; }

    setImage(image: string) { this.image = image; }

    setMoveDirections(directions: Map<string, number>) { this.moveDirections = directions; }

    setHasUpgraded(upgraded: boolean) { this.hasUpgraded = upgraded; }

}
