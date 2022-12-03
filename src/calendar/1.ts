import SolutionPart from "..";

export class Part1 extends SolutionPart {

    bestElf = 0;
    currElf = 0;

    onLine(line: string) {
        if (line) return this.currElf += +line;

        if (this.currElf > this.bestElf) this.bestElf = this.currElf;
        this.currElf = 0;
    }

    end() {
        console.log(this.bestElf);
    }

}

export class Part2 extends SolutionPart {

    elves: number[] = []
    currElf = 0;

    onLine(line: string) {
        if (line) return this.currElf += +line;

        this.elves.push(this.currElf);
        this.currElf = 0;
    }

    end() {
        this.onLine('');
        console.log(this.elves
            .sort((a, b) => b - a)
            .slice(0, 3)
            .reduce((a, b) => a + b, 0)
        );
    }

}

