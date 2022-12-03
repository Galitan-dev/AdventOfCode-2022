import SolutionPart from "..";

const opponentMoves = 'ABC';
const myMoves = 'XYZ';

const winningMoves = [1, 2, 0];
const losingMoves = [2, 0, 1];

export class Part1 extends SolutionPart {

    score = 0;

    onLine(line: string) {
        const turn = line.split(/\s/);
        const opponentMove = opponentMoves.indexOf(turn[0]);
        const myMove = myMoves.indexOf(turn[1]);
    
        this.score += myMove + 1;

        if (myMove === opponentMove) this.score += 3;
        else if (winningMoves[opponentMove] === myMove) this.score += 6;
    }

    end() {
        console.log(this.score);
    }

}

export class Part2 extends SolutionPart {

    score = 0;

    onLine(line: string) {
        const turn = line.split(/\s/);
        const opponentMove = opponentMoves.indexOf(turn[0]);
        const goal = turn[1];

        if (goal === 'X') this.score += losingMoves[opponentMove] + 1;
        else if (goal === 'Y') this.score += opponentMove + 4;
        else if (goal == 'Z') this.score += winningMoves[opponentMove] + 7;
    }

    end() {
        console.log(this.score);
    }

}