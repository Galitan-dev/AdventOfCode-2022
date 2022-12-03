"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Part2 = exports.Part1 = void 0;
const __1 = __importDefault(require(".."));
const opponentMoves = 'ABC';
const myMoves = 'XYZ';
const winningMoves = [1, 2, 0];
const losingMoves = [2, 0, 1];
class Part1 extends __1.default {
    constructor() {
        super(...arguments);
        this.score = 0;
    }
    onLine(line) {
        const turn = line.split(/\s/);
        const opponentMove = opponentMoves.indexOf(turn[0]);
        const myMove = myMoves.indexOf(turn[1]);
        this.score += myMove + 1;
        if (myMove === opponentMove)
            this.score += 3;
        else if (winningMoves[opponentMove] === myMove)
            this.score += 6;
    }
    end() {
        console.log(this.score);
    }
}
exports.Part1 = Part1;
class Part2 extends __1.default {
    constructor() {
        super(...arguments);
        this.score = 0;
    }
    onLine(line) {
        const turn = line.split(/\s/);
        const opponentMove = opponentMoves.indexOf(turn[0]);
        const goal = turn[1];
        if (goal === 'X')
            this.score += losingMoves[opponentMove] + 1;
        else if (goal === 'Y')
            this.score += opponentMove + 4;
        else if (goal == 'Z')
            this.score += winningMoves[opponentMove] + 7;
    }
    end() {
        console.log(this.score);
    }
}
exports.Part2 = Part2;
