"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const yargs_1 = __importDefault(require("yargs"));
const calendar = (0, path_1.join)(__dirname, 'calendar');
const args = (0, yargs_1.default)(process.argv.slice(2))
    .usage("Usage: $0 -d [num] -p [num] [-e]")
    .options({
    day: { type: 'number', alias: 'd', default: new Date().getDate(), description: "The day of the calendar" },
    part: { type: 'number', alias: 'p', default: 1, description: "The part of the solution" },
    useExample: { type: 'boolean', alias: 'e', default: false, description: "Whether or not try example" }
}).parseSync();
if (isNaN(args.day)) {
    console.error('Invalid day');
    process.exit(1);
}
else if (isNaN(args.part)) {
    console.error('Invalid part');
    process.exit(1);
}
const solutionFile = (0, path_1.join)(calendar, args.day + '.' + __filename.split('.').at(-1));
if (!(0, fs_1.existsSync)(solutionFile)) {
    console.log('Solution does not exist for day %d', args.day);
    process.exit(1);
}
(_a = solutionFile, Promise.resolve().then(() => __importStar(require(_a)))).then((solution) => {
    const Part = Object.values(solution).at(args.part - 1);
    if (!Part) {
        console.log('Solution does not exist for day %d and part %d', args.day, args.part);
        process.exit(1);
    }
    new Part(args.day, args.useExample);
})
    .catch((err) => {
    console.log(err);
});
var solutionPart_1 = require("./solutionPart");
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return solutionPart_1.SolutionPart; } });
