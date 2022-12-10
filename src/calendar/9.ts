import SolutionPart from "..";

export class Part1 extends SolutionPart {

    private visitedPositions: Set<string> = new Set();
    private head = [0, 0];
    private tail = [0, 0];

    protected onLine(line: string): void {
        const [dir, count] = line.split(/\s+/g);

        for (let i = 0; i < +count; i++) {
            if (dir === 'R') this.head[0]++;
            if (dir === 'L') this.head[0]--; 
            if (dir === 'D') this.head[1]++; 
            if (dir === 'U') this.head[1]--;

            const distX = this.head[0] - this.tail[0];
            const distY = this.head[1] - this.tail[1];
            const absDistX = Math.abs(distX);
            const absDistY = Math.abs(distY);
            if (absDistX > 1 || absDistY > 1) {
                if (distX > 0) this.tail[0]++;
                if (distX < 0) this.tail[0]--;
                if (distY > 0) this.tail[1]++;
                if (distY < 0) this.tail[1]--;
            }
 
            this.visitedPositions.add(this.tail.join(';'));
        }
    }

    protected end(): void {
        console.log(this.visitedPositions.size)
    }

}

export class Part2 extends SolutionPart {

    private knots: [number, number][] = Array.from({ length: 10 }).map(() => [0, 0]); 
    private visitedPositions: Set<string> = new Set();
    private movements = {
        U: [0, -1],
        D: [0, 1],
        L: [-1, 0],
        R: [1, 0],
    };

    get head(): [number, number] {
        return this.knots[0];
    }

    set head(head: [number, number]) {
        this.knots[0] = head;
    }

    get tail(): [number, number] {
        return this.knots[this.knots.length - 1];
    }

    protected onLine(line: string): void {

        const [dir, count] = line.split(/\s+/g) as [Direction, string];

        for (let i = 0; i < +count; i++) {
            const movement = this.movements[dir];
            this.head = this.head.map((x, i) => x + movement[i]) as [number, number];

            for (let j = 0, k = 1; k < this.knots.length; j = k, k++) {
                const distX = this.knots[j][0] - this.knots[k][0];
                const distY = this.knots[j][1] - this.knots[k][1];
                const absDistX = Math.abs(distX);
                const absDistY = Math.abs(distY);

                if (absDistX > 1 || absDistY > 1) {
                    if (distX > 0) this.knots[k][0]++;
                    if (distX < 0) this.knots[k][0]--;
                    if (distY > 0) this.knots[k][1]++;
                    if (distY < 0) this.knots[k][1]--;
                }
            }

            this.visitedPositions.add(this.tail.join(';'));
        }
    }

    protected end(): void {


        // console.log(Array.from({ length: 21 }).map((_, y) => Array.from({ length: 26 }).map((_, x) => {
        //     const knotIndex = this.knots.findIndex((knot) => x === knot[0] + 12 && y === knot[1] + 15);
        //     if (knotIndex === 0) return 'H';
        //     if (knotIndex !== -1) return knotIndex;
        //     if (this.visitedPositions.has([x - 12, y - 15].join(';'))) return '#'
        //     return '.';
        // }).join('')).join('\n') + '\n\n')

        console.log(this.visitedPositions.size);
    }

}

type Direction = 'U' | 'R' | 'L' | 'D';