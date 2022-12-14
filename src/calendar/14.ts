import SolutionPart from "..";
import logUpdate from 'log-update';

export class Part1 extends SolutionPart {

    private rocks = new Set<string>();
    protected sand = new Set<string>();
    protected sandSource = [500, 0];
    protected currentSand = [...this.sandSource];
    private minX = 500;
    private maxX = 500;
    private minY = 0;
    protected maxY = 0;

    protected onLine(line: string): void {
        const points = line.split(' -> ').map(p => p.split(',').map(Number));

        for (let [i, current] of points.slice(0, -1).entries()) {
            const end = points[i + 1];
            const dx = Math.sign(end[0] - current[0]);
            const dy = Math.sign(end[1] - current[1]); 

            this.rocks.add(current.toString())
            
            while (current.toString() !== end.toString()) {
                current[0] += dx;
                current[1] += dy;
                this.rocks.add(current.toString());
            }
        }
    }

    protected end(): void {
        for (const rockId of this.rocks) {
            const rock: number[] = rockId.split(',').map(Number);
            if (this.minX === -1 || rock[0] < this.minX) this.minX = rock[0];
            if (this.maxX === -1 || rock[0] > this.maxX) this.maxX = rock[0];
            if (this.minY === -1 || rock[1] < this.minY) this.minY = rock[1];
            if (this.maxY === -1 || rock[1] > this.maxY) this.maxY = rock[1];
        }

        this.minX -= 5;
        this.maxX += 5;
        this.maxY += 2;

        this.update();
    }

    protected update(): void {
        if (!this.isObstructed([this.currentSand[0], this.currentSand[1] + 1])) {
            this.currentSand[1]++;
        } else if (!this.isObstructed([this.currentSand[0] - 1, this.currentSand[1] + 1])) {
            this.currentSand[1]++;
            this.currentSand[0]--;
        } else if (!this.isObstructed([this.currentSand[0] + 1, this.currentSand[1] + 1])) {
            this.currentSand[0]++;
            this.currentSand[1]++;
        } else this.rest();


        if (this.currentSand[1] > this.maxY) {
            this.endSimulation();
        } else {
            setImmediate(() => this.update());
        }
    }

    protected rest() {
        this.sand.add(this.currentSand.toString());
        this.currentSand = [...this.sandSource];
        if (this.sand.size % 10 === 0) this.printMap();
    }

    protected isObstructed(point: number[]): boolean {
        return this.rocks.has(point.toString()) || this.sand.has(point.toString());
    }

    protected printMap(): void {
        let map = '';

        for (let y = this.minY; y <= this.maxY; y++) {
            for (let x = this.minX; x <= this.maxX; x++) {
                if (this.rocks.has([x, y].toString()) || y === this.maxY) map += '#';
                else if (this.sand.has([x, y].toString())) map += '.';
                else if ([x, y].toString() === this.currentSand.toString()) map += '.';
                else if ([x, y].toString() === this.sandSource.toString()) map += '+';
                else map += ' ';
            }
            map += '\n';
        }

        logUpdate(map);
    }

    protected endSimulation(): void {
        console.log(this.sand.size + ' units of sand');
    }

}

export class Part2 extends Part1 {

    protected update(): void {
        if (!this.isObstructed([this.currentSand[0], this.currentSand[1] + 1])) {
            this.currentSand[1]++;
        } else if (!this.isObstructed([this.currentSand[0] - 1, this.currentSand[1] + 1])) {
            this.currentSand[1]++;
            this.currentSand[0]--;
        } else if (!this.isObstructed([this.currentSand[0] + 1, this.currentSand[1] + 1])) {
            this.currentSand[0]++;
            this.currentSand[1]++;
        } else this.rest();

        if (this.currentSand[1] > this.maxY - 2) {
            this.rest();
        }

        if (this.isObstructed(this.sandSource)) {
            this.endSimulation();
        } else {
            setImmediate(() => this.update());
            // setTimeout(() => this.update(), 10);
        }
    }

}