import SolutionPart from "..";

export class Part1 extends SolutionPart {

    line!: string;

    protected onLine(line: string): void {
        this.line = line;
    }

    protected end(): void {
        const last = this.line.slice(0, 3).split('');
        
        for (let i = 3; i < this.line.length; i++) {
            last.push(this.line[i]);
            if (new Set(last).size === 4) return console.log(i + 1);
            last.shift();
        }
    }

}

export class Part2 extends SolutionPart {

    line!: string;

    protected onLine(line: string): void {
        this.line = line;
    }

    protected end(): void {
        const last = this.line.slice(0, 13).split('');
        
        for (let i = 13; i < this.line.length; i++) {
            last.push(this.line[i]);
            if (new Set(last).size === 14) return console.log(i + 1);
            last.shift();
        }
    }

}