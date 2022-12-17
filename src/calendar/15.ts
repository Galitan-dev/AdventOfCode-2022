import SolutionPart from "..";

export class Part1 extends SolutionPart {
    
    private nearestBeaconsFromSensors = new Map<string, number[]>();
    private scanRow!: number;
    private minX!: number;
    private maxX!: number;

    private dist(x1: number, y1: number, x2: number, y2: number): number {
        // Actually the exercice is wrong
        // return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2); 
        const distX = Math.abs(x1 - x2);
        const distY = Math.abs(y1 - y2);
        const dist = distX + distY;
        return dist;
    }

    protected onLine(line: string): void {
        if (!this.scanRow) {
            this.scanRow = +line;
            return;
        }

        const [sensorX, sensorY, beaconX, beaconY] = line.match(/[-\d]+/g)!.map(Number);

        this.nearestBeaconsFromSensors.set([sensorX, sensorY].toString(), [beaconX, beaconY]);

        const minX = sensorX - this.dist(sensorX, sensorY, beaconX, beaconY) - 1;
        this.minX = Math.min(this.minX ?? minX, minX);

        const maxX = sensorX + this.dist(sensorX, sensorY, beaconX, beaconY) + 1;
        this.maxX = Math.max(this.maxX ?? maxX, maxX);
    }

    protected end(): void {
        const positionsX = new Set<number>();

        console.log(this.minX, this.maxX);

        for (let x = this.minX; x <= this.maxX; x++) {
            if (positionsX.has(x)) continue;

            for (const [sensor, beacon] of this.nearestBeaconsFromSensors.entries()) {
                const [sensorX, sensorY] = sensor.split(',').map(Number);
                const [beaconX, beaconY] = beacon;

                if (x === beaconX && this.scanRow   === beaconY) continue;
                if (this.dist(sensorX, sensorY, x, this.scanRow) > this.dist(sensorX, sensorY, beaconX, beaconY)) continue;
                positionsX.add(x);
            }
        }

        console.log(positionsX.size);
    }

}


export class Part2 extends SolutionPart {
    
    private rows: [number, number][][] = Array.from({ length: 4e6 }, () => []);
    private scanRow!: number;

    private dist(x1: number, y1: number, x2: number, y2: number): number {
        // Actually the exercice is wrong
        // return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2); 
        const distX = Math.abs(x1 - x2);
        const distY = Math.abs(y1 - y2);
        const dist = distX + distY;
        return dist;
    }

    protected onLine(line: string): void {
        if (!this.scanRow) {
            this.scanRow = +line;
            return;
        }

        const [sensorX, sensorY, beaconX, beaconY] = line.match(/[-\d]+/g)!.map(Number);
        const dist = this.dist(sensorX, sensorY, beaconX, beaconY);

        console.log(sensorX, sensorY, dist * 2);

        for (let y = Math.max(0, sensorY - dist); y < Math.min(this.rows.length, sensorY + dist); y++) {
            const distY = Math.abs(sensorY - y);

            this.rows[y].push([ sensorX - dist + distY, sensorX + dist - distY ]);
        }
    }

    protected end(): void {
        for (const [y, row] of this.rows.entries()) {
            const segments = row
                .sort((a, b) => a[0] - b[0] || a[1] - b[1])
                .filter((seg, i, segs) => i === 0 || seg[1] > segs[i - 1][1]);

            for (let i = 0, j = 1; j < segments.length; i++, j++) {
                if (segments[i][1] + 1 < segments[j][0]) {
                    console.log((segments[i][1] + 1) * 4e6 + y);
                }
            }
        }
    }

}