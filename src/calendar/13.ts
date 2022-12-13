import assert from "assert";
import SolutionPart from "..";

type Value = number | Value[]
type Pair = [Value, Value];

export class Part1 extends SolutionPart {

    private pairs: Pair[] = [];
    private currentPair = [] as unknown as Pair;

    protected onLine(line: string): void {
        if (!line) return;

        this.currentPair.push(JSON.parse(line));

        if (this.currentPair.length === 2) {
            this.pairs.push(this.currentPair);
            this.currentPair = [] as unknown as Pair;
        }
    }

    protected end(): void {
        let sum = 0;

        for (const [i, pair] of this.pairs.entries()) {
            const comparison = this.compare(pair[0], pair[1]);

            if (comparison === 1) sum += i + 1;
        }

        console.log(sum);
    }

    private compare(left: Value, right: Value): (-1)|0|1 {
        if (Array.isArray(left) && !Array.isArray(right)) right = [right];
        if (Array.isArray(right) && !Array.isArray(left)) left = [left];

        if (Array.isArray(left)) {
            assert(Array.isArray(right))

            for (let i = 0, length = Math.min(left.length, right.length); i < length; i++) {
                const comparison = this.compare(left[i], right[i]);

                if (comparison === 1) return 1;
                if (comparison === -1) return -1;
            }

            if (left.length < right.length) return 1;
            else if (left.length > right.length) return -1;
        } else {
            if (left < right) return 1;
            if (left > right) return -1;
        }

        return 0;
    }

}

export class Part2 extends SolutionPart {

    private packets: Value[] = [[[2]], [[6]]];

    protected onLine(line: string): void {
        if (!line) return;

        this.packets.push(JSON.parse(line));
    }

    protected end(): void {
        const packets = this.packets.sort((a, b) => this.compare(b, a));

        const firstDivider = 1 + packets.findIndex(p => 
            Array.isArray(p) && p[0] && Array.isArray(p[0]) && p[0][0] == 2 && !p[0][1] && !p[1]);

        const secondDivider = 1 + packets.findIndex(p => 
            Array.isArray(p) && p[0] && Array.isArray(p[0]) && p[0][0] == 6 && !p[0][1] && !p[1]);

        console.log(firstDivider * secondDivider)
    }

    private compare(left: Value, right: Value): (-1)|0|1 {
        if (Array.isArray(left) && !Array.isArray(right)) right = [right];
        if (Array.isArray(right) && !Array.isArray(left)) left = [left];

        if (Array.isArray(left)) {
            assert(Array.isArray(right))

            for (let i = 0, length = Math.min(left.length, right.length); i < length; i++) {
                const comparison = this.compare(left[i], right[i]);

                if (comparison === 1) return 1;
                if (comparison === -1) return -1;
            }

            if (left.length < right.length) return 1;
            else if (left.length > right.length) return -1;
        } else {
            if (left < right) return 1;
            if (left > right) return -1;
        }

        return 0;
    }

}