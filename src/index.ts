import { existsSync } from 'fs';
import { join as joinPath } from 'path';
import yargs from 'yargs';

const calendar = joinPath(__dirname, 'calendar');

const args = yargs(process.argv.slice(2))
    .usage("Usage: $0 -d [num] -p [num] [-e]")
    .options({
        day: { type: 'number', alias: 'd', default: new Date().getDate(), description: "The day of the calendar" },
        part: { type: 'number', alias: 'p', default: 1, description: "The part of the solution" },
        useExample: { type: 'boolean', alias: 'e', default: false, description: "Whether or not try example" }
    }).parseSync();

if (isNaN(args.day)) {
    console.error('Invalid day');
    process.exit(1);
} else if (isNaN(args.part)) {
    console.error('Invalid part');
    process.exit(1);
}

const solutionFile = joinPath(calendar, args.day + '.' + __filename.split('.').at(-1));

if (!existsSync(solutionFile)) {
    console.log('Solution does not exist for day %d', args.day);
    process.exit(1);
}

import(solutionFile)
    .then((solution) => {
        const Part = Object.values(solution).at(args.part - 1) as undefined | CustomElementConstructor;

        if (!Part) {
            console.log('Solution does not exist for day %d and part %d', args.day, args.part);
            process.exit(1);
        }

        new Part(args.day, args.useExample);
    })
    .catch((err) => {
        console.log(err);
    })

export { SolutionPart as default } from './solutionPart';