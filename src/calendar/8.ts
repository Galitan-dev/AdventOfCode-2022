import SolutionPart from "..";

export class Part1 extends SolutionPart {

    map: number[][] = [];

    protected onLine(line: string): void {
        this.map.push(line.split('').map(Number));
    }

    protected end(): void {

        let visibleTrees = 0;

        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map[y].length; x++) {
                if (this.isTreeVisible(x, y)) visibleTrees ++;
            }
        }

        console.log(visibleTrees);

    }

    private isTreeVisible(x: number, y: number): boolean {
        const treeHeight = this.map[y][x];
        let visibleFaces = 0x1111;

        for (let ny = 0; ny < this.map.length; ny++) {
            for (let nx = 0; nx < this.map[ny].length; nx++) {
                if (nx !== x && ny !== y) continue;
                if (this.map[ny][nx] < treeHeight) continue;
                if (ny < y) visibleFaces &= 0x0111;
                if (ny > y) visibleFaces &= 0x1011;
                if (nx < x) visibleFaces &= 0x1101;
                if (nx > x) visibleFaces &= 0x1110;
            }
        }

        return visibleFaces > 0;
    }

}


export class Part2 extends SolutionPart {

    map: number[][] = [];

    protected onLine(line: string): void {
        this.map.push(line.split('').map(Number));
    }

    protected end(): void {

        let bestScore = 0;

        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map[y].length; x++) {
                const score = this.getScenicScore(x, y);
                if (score > bestScore) bestScore = score;
            }
        }

        console.log(bestScore);
    }

    private getScenicScore(x: number, y: number): number {
        const treeHeight = this.map[y][x];
        const visibleTrees = [0, 0, 0, 0];

        for (let ny = y + 1; ny < this.map.length; ny++) {
            visibleTrees[0]++;
            if (this.map[ny][x] >= treeHeight) break;
        }

        for (let ny = y - 1; ny >= 0; ny--) {
            visibleTrees[1]++;
            if (this.map[ny][x] >= treeHeight) break;
        }

        for (let nx = x + 1; nx < this.map[y].length; nx++) {
            visibleTrees[2]++;
            if (this.map[y][nx] >= treeHeight) break;
        }

        for (let nx = x - 1; nx >= 0; nx--) {
            visibleTrees[3]++;
            if (this.map[y][nx] >= treeHeight) break;
        }

        return visibleTrees.reduce((a, b) => a * b, 1);
    }

}