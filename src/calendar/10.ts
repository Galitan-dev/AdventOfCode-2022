import SolutionPart from ".."

export class Part1 extends SolutionPart {

    private currentTick = 0;
    private x = 1;
    private sum = 0;
    
    protected onLine(line: string): void {
        const args = line.split(/\s+/g);
        const instruction = args.shift();
        const neededTicks = instruction === 'noop' ? 1 : 2;

        for (let i = 0; i < neededTicks; i++) {
            this.currentTick += 1;

            if ([20, 60, 100, 140, 180, 220].includes(this.currentTick)) this.sum += this.x * this.currentTick;
        }

        if (instruction === 'addx') this.x += +args[0];

    }

    protected end(): void {
        console.log(this.sum);
    }

}

export class Part2 extends SolutionPart {

    private currentTick = 0;
    private x = 1;
    private screen = Array.from({ length: 6 }, () => '');
    
    protected onLine(line: string): void {
        const args = line.split(/\s+/g);
        const instruction = args.shift();
        const neededTicks = instruction === 'noop' ? 1 : 2;

        for (let i = 0; i < neededTicks; i++) {
            this.currentTick += 1;

            const dist = Math.abs((this.currentTick - 1) % 40 - this.x);
            this.screen[Math.ceil(this.currentTick / 40) - 1] += dist < 2 ? '#' : '.'
        }

        if (instruction === 'addx') this.x += +args[0];
    }

    protected end(): void {
        console.log(this.screen.join('\n'));
    }

}