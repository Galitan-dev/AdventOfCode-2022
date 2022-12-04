import SolutionPart from "..";

export class Part1 extends SolutionPart {

    wrongPairs = 0;

    protected onLine(line: string): void {
        const ranges = line.split(',').map((r: string) => r.split('-').map(Number)) as [number, number][];

        if ((ranges[0][0] <= ranges[1][0] && ranges[0][1] >= ranges[1][1])
            ||(ranges[1][0] <= ranges[0][0] && ranges[1][1] >= ranges[0][1])) {            
                this.wrongPairs++;
            }
    }

    protected end(): void {
        console.log(this.wrongPairs)
    }

}

export class Part2 extends SolutionPart {

    wrongPairs = 0;

    protected onLine(line: string): void {
        const ranges = line.split(',').map((r: string) => r.split('-').map(Number)) as [number, number][];

        if (ranges[0].some((s) => ranges[1][0] <= s && s <= ranges[1][1]) 
            || ranges[1].some((s) => ranges[0][0] <= s && s <= ranges[0][1] )) {            
                this.wrongPairs++;
            }
    }

    protected end(): void {
        console.log(this.wrongPairs)
    }

}