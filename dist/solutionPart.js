"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolutionPart = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const readline_1 = require("readline");
const assets = (0, path_1.join)(__dirname, '../assets');
class SolutionPart {
    constructor(day, useExample) {
        const inputFile = (0, path_1.join)(assets, day + (useExample ? '.ex' : '.in'));
        const readStream = (0, fs_1.createReadStream)(inputFile);
        const rl = (0, readline_1.createInterface)(readStream);
        rl.on('line', (line) => this.onLine(line));
        rl.on('close', () => this.end());
    }
}
exports.SolutionPart = SolutionPart;
