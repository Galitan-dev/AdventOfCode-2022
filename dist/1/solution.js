"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Part2 = exports.Part1 = void 0;
const __1 = __importDefault(require(".."));
class Part1 extends __1.default {
    constructor() {
        super(...arguments);
        this.bestElf = 0;
        this.currElf = 0;
    }
    onLine(line) {
        if (line)
            return this.currElf += +line;
        if (this.currElf > this.bestElf)
            this.bestElf = this.currElf;
        this.currElf = 0;
    }
    end() {
        console.log(this.bestElf);
    }
}
exports.Part1 = Part1;
class Part2 extends __1.default {
    constructor() {
        super(...arguments);
        this.elves = [];
        this.currElf = 0;
    }
    onLine(line) {
        if (line)
            return this.currElf += +line;
        this.elves.push(this.currElf);
        this.currElf = 0;
    }
    end() {
        this.onLine('');
        console.log(this.elves
            .sort((a, b) => b - a)
            .slice(0, 3)
            .reduce((a, b) => a + b, 0));
    }
}
exports.Part2 = Part2;
