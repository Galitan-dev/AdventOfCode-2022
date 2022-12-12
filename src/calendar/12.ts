import { assert } from "console";
import SolutionPart from "..";

const abc = 'abcdefghijklmnopqrstuvwxyz';

interface Point {
    x: number
    y: number
    height: number
    distance: number
}

export class Part1 extends SolutionPart {

    protected points: Point[] = [];
    private startPoint: Point = { x: 0, y: 0, height: 0, distance: -1 };
    private endPoint: Point = { x: 0, y: 0, height: 25, distance: 0 };
    private y = 0;

    protected onLine(line: string): void {
        this.points.push(...line.split('').map((c, x) => {
            if (c === 'S') {
                this.startPoint.x = x;
                this.startPoint.y = this.y;
                return this.startPoint;
            }

            if (c === 'E') {
                this.endPoint.x = x;
                this.endPoint.y = this.y;
                return this.endPoint;
            }

            return { x, y: this.y, height: abc.indexOf(c), distance: -1 };
        }));
        this.y++;
    }

    protected end(): void {
        this.dijkstra();

        console.log(this.startPoint.distance);
    }

    protected dijkstra() {
        const P = new Set();

        while (P.size < this.points.length) {
            let minDist = -1;
            let a: Point = undefined!;

            for (const b of this.points) {
                if (!P.has(idOf(b)) && isDistanceAShorterThanB(b.distance, minDist)) {
                    a = b;
                    minDist = b.distance;
                }
            }

            if (!a) break;

            P.add(idOf(a));

            const neighbors = this.points
                .filter(b => !P.has(idOf(b)))
                .filter(b => (b.y === a.y && Math.abs(b.x - a.x) === 1) || (b.x === a.x && Math.abs(b.y - a.y) === 1))
                .filter(b => a.height <= b.height + 1);

            for (const b of neighbors) {
                if (isDistanceAShorterThanB(a.distance + 1, b.distance)) {
                    b.distance = a.distance + 1;
                }
            }
        }
    }

}

function isDistanceAShorterThanB(a: number, b: number) {
    if (a === -1) return false;
    if (b === -1) return true;
    return a < b;
}

assert(isDistanceAShorterThanB(0, -1), '0 < -1')
assert(!isDistanceAShorterThanB(-1, 0), '-1 > 0')
assert(isDistanceAShorterThanB(2, 10), '2 < 10')
assert(!isDistanceAShorterThanB(5, 3), '5 > 3')

function idOf(point: Point) {
    return point.x + ';' + point.y;
}

export class Part2 extends Part1 {
    
    protected end(): void {
        this.dijkstra();

        const bestStart = this.points
            .filter(p => p.height === 0)
            .filter(p => p.distance !== -1)
            .sort((a, b) => a.distance - b.distance)[0]

        console.log(bestStart.distance);
        
    }
}