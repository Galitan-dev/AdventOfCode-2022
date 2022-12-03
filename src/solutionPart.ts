import { createReadStream } from "fs";
import { join as joinPath } from "path";
import { createInterface } from "readline";

const assets = joinPath(__dirname, '../assets');

export abstract class SolutionPart {

    public constructor(day: number, useExample: boolean) {
        const inputFile = joinPath(assets, day + (useExample ? '.ex' : '.in'));
        const readStream = createReadStream(inputFile);
        const rl = createInterface(readStream);

        rl.on('line', (line) => this.onLine(line));
        rl.on('close', () => this.end());
    }

    protected abstract onLine(line: string): void;
    protected abstract end(): void;

}