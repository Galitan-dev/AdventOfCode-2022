"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Part2 = exports.Part1 = void 0;
const __1 = __importDefault(require(".."));
const priorities = ' abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
class Part1 extends __1.default {
    constructor() {
        super(...arguments);
        this.sum = 0;
    }
    onLine(line) {
        const ruckstack = line.split('');
        const compartment1 = ruckstack.slice(0, Math.floor(ruckstack.length / 2));
        const compartment2 = ruckstack.slice(Math.floor(ruckstack.length / 2));
        const duplicates = compartment1
            .filter((item) => compartment2.includes(item))
            .filter((item, index, duplicates) => duplicates.indexOf(item) === index);
        this.sum += duplicates.reduce((a, b) => a + priorities.indexOf(b), 0);
    }
    end() {
        console.log(this.sum);
    }
}
exports.Part1 = Part1;
class Part2 extends __1.default {
    constructor() {
        super(...arguments);
        this.sum = 0;
        this.currentGroup = [];
    }
    onLine(line) {
        this.currentGroup.push(line.split(''));
        if (this.currentGroup.length < 3)
            return;
        const duplicate = this.currentGroup[0]
            .find((item) => this.currentGroup[1].includes(item) && this.currentGroup[2].includes(item));
        this.sum += priorities.indexOf(duplicate);
        this.currentGroup = [];
    }
    end() {
        console.log(this.sum);
    }
}
exports.Part2 = Part2;
