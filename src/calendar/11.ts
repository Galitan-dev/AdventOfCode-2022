import SolutionPart from "..";

interface Monkey {
    id: number
    items: number[]
    divisor: number,
    operation(old: number): number,
    test(worryLevel: number): number
    inspections: number
}

export class Part1 extends SolutionPart {

    private monkeys: Monkey[] = [];
    private currentMonkey: string[] = [];

    private makeOperation(opt: string): (old: number) => number {
        const [leftOperand, middle, rightOperand] = opt.split(' = ')[1].split(' ')
        return function (old: number) {   
            const left = leftOperand === 'old' ? old : +leftOperand;
            const right = rightOperand === 'old' ? old: +rightOperand;

            switch (middle) {
                case '+': return left + right;
                case '-': return left - right;
                case '*': return left * right;
                case '/': return left / right;
                default: throw new Error('Unknown middleOperator: ' + middle);
            }
        };
    }

    private makeTest(test: string[]): (worryLevel: number) => number {
        const [divisor, monkeyIfTrue, monkeyIfFalse] = test.map(l => +l.split(': ')[1].match(/\d+/)![0]);

        return (worryLevel: number) => worryLevel % divisor === 0 ? monkeyIfTrue : monkeyIfFalse;
    }

    protected onLine(line: string): void {

        if (line) {
            this.currentMonkey.push(line.trim());
            return
        }

        const monkey: Monkey = {
            id: +this.currentMonkey[0].match(/\d+/)![0],
            items: this.currentMonkey[1].split(': ')[1].split(', ').map(Number),
            operation: this.makeOperation(this.currentMonkey[2].split(': ')[1]),
            divisor: +this.currentMonkey[3].split(': ')[1].match(/d+/)![0],
            test: this.makeTest(this.currentMonkey.slice(3)),
            inspections: 0
        }

        this.monkeys.push(monkey as Monkey);

        this.currentMonkey = [];
    }

    // run a monkey turn
    private thinkAs(monkey: Monkey) {
        for (const item of monkey.items.splice(0)) {
            const worryLevel = Math.floor(monkey.operation(item) / 3);
            const receiverId = monkey.test(worryLevel);
            this.monkeys[receiverId].items.push(worryLevel);
            monkey.inspections++;
        }
    }

    protected end(): void {
        this.onLine('');

        for (let i = 0; i < 20; i++) {
            for (const monkey of this.monkeys) {
                this.thinkAs(monkey);
            }
        }
        
        const [firstMonkey, secondMonkey] = this.monkeys.sort((a, b) => b.inspections - a.inspections).slice(0, 2);
        const monkeyBusiness = firstMonkey.inspections * secondMonkey.inspections;

        console.log(monkeyBusiness);
    }

}

export class Part2 extends SolutionPart {

    private monkeys: Monkey[] = [];
    private currentMonkey: string[] = [];
    private worryLevelRegulator = 0;

    private makeOperation(opt: string): (old: number) => number {
        const [leftOperand, middle, rightOperand] = opt.split(' = ')[1].split(' ')
        return function (old: number) {   
            const left = leftOperand === 'old' ? old : +leftOperand;
            const right = rightOperand === 'old' ? old: +rightOperand;

            switch (middle) {
                case '+': return left + right;
                case '-': return left - right;
                case '*': return left * right;
                case '/': return left / right;
                default: throw new Error('Unknown middleOperator: ' + middle);
            }
        };
    }

    private makeTest(test: string[]): (worryLevel: number) => number {
        const [divisor, monkeyIfTrue, monkeyIfFalse] = test.map(l => +l.split(': ')[1].match(/\d+/)![0]);

        return (worryLevel: number) => worryLevel % divisor === 0 ? monkeyIfTrue : monkeyIfFalse;
    }

    protected onLine(line: string): void {

        if (line) {
            this.currentMonkey.push(line.trim());
            return
        }

        const monkey: Monkey = {
            id: +this.currentMonkey[0].match(/\d+/)![0],
            items: this.currentMonkey[1].split(': ')[1].split(', ').map(Number),
            divisor: +this.currentMonkey[3].split(': ')[1].match(/\d+/)![0],
            operation: this.makeOperation(this.currentMonkey[2].split(': ')[1]),
            test: this.makeTest(this.currentMonkey.slice(3)),
            inspections: 0
        }

        this.monkeys.push(monkey as Monkey);

        this.currentMonkey = [];
    }

    // run a monkey turn
    private thinkAs(monkey: Monkey) {
        for (const item of monkey.items.splice(0)) {
            const worryLevel = monkey.operation(item) % this.worryLevelRegulator;
            const receiverId = monkey.test(worryLevel);
            this.monkeys[receiverId].items.push(worryLevel);
            monkey.inspections++;
        }
    }

    protected end(): void {
        this.onLine('');

        this.worryLevelRegulator = this.smallestCommonMultiple(this.monkeys.map(monkey => monkey.divisor));

        for (let i = 1; i <= 10000; i++) {
            for (const monkey of this.monkeys) {
                this.thinkAs(monkey);
            }
        }
        
        const [firstMonkey, secondMonkey] = this.monkeys.sort((a, b) => b.inspections - a.inspections).slice(0, 2);
        const monkeyBusiness = firstMonkey.inspections * secondMonkey.inspections;

        console.log(monkeyBusiness);
    }

    private smallestCommonMultiple(arr: number[]) {
        let min = Math.min(...arr);

        while (arr.some(x => min % x !== 0)) min++;
        
        return min;
   }

}