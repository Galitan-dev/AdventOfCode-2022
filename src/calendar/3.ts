import SolutionPart from "..";

const priorities = ' abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export class Part1 extends SolutionPart {

    sum = 0;

    onLine(line: string) {
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

export class Part2 extends SolutionPart {

    sum = 0;
    currentGroup: string[][] = []

    onLine(line: string) {
       this.currentGroup.push(line.split(''))
       if (this.currentGroup.length < 3) return;

       const duplicate = this.currentGroup[0]
           .find((item) => this.currentGroup[1].includes(item) && this.currentGroup[2].includes(item));

       this.sum += priorities.indexOf(duplicate as string);

       this.currentGroup = [];
    }

    end() {
        console.log(this.sum);
    }

}