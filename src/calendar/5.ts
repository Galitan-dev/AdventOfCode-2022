import SolutionPart from "..";

export class Part1 extends SolutionPart {
    
    readingStacks = true;
    stacks: string[][] = []

    protected onLine(line: string): void {
        line = line + ' ';

        if (this.readingStacks) {
            for (let i = 0; i < line.length / 4; i++) {
                const crate = line[i * 4 + 1];

                if (crate === ' ') continue;

                if (isNaN(+crate)) {
                    if (!this.stacks[i]) this.stacks[i] = [];
                    this.stacks[i].unshift(crate);
                } else {
                    this.readingStacks = false;
                }
            }
            return;
        }

        if (line.trim().length == 0) return;

        const [ amount, from, to ] = line.match(/\d+/g)?.map(Number) as [number, number, number];

        for (let i = 0; i < amount; i++) {
            this.stacks[to - 1].push(this.stacks[from - 1].pop() || '')
        } 
    }

    protected end(): void {
        console.log(this.stacks.map(s => s.at(-1)).join(''))
    }

}

export class Part2 extends SolutionPart {
    
    readingStacks = true;
    stacks: string[][] = []

    protected onLine(line: string): void {
        line = line + ' ';

        if (this.readingStacks) {
            for (let i = 0; i < line.length / 4; i++) {
                const crate = line[i * 4 + 1];

                if (crate === ' ') continue;

                if (isNaN(+crate)) {
                    if (!this.stacks[i]) this.stacks[i] = [];
                    this.stacks[i].unshift(crate);
                } else {
                    this.readingStacks = false;
                }
            }
            return;
        }

        if (line.trim().length == 0) return;

        const [ amount, from, to ] = line.match(/\d+/g)?.map(Number) as [number, number, number];

        const fromStack = this.stacks[from - 1];
        this.stacks[to - 1].push(...fromStack.splice(fromStack.length - amount, amount))
    }

    protected end(): void {
        console.log(this.stacks.map(s => s.at(-1)).join(''))
    }

}