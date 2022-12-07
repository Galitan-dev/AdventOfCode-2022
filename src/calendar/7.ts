import SolutionPart from "..";

export class Part1 extends SolutionPart {

    cwd = ''
    fs: Map<string, Map<string, number>> = new Map([ ['/', new Map() ] ]);

    private cd(path: string): string {
        if (path === '/') return '/'; 
            
        const result = this.cwd.slice(1).split('/');
        if (path === '..') result.pop();
        else result.push(path);
            
        const dirname = result.join('/');
        if (!dirname.startsWith('/')) return '/' + dirname;
        
        return dirname;
    }

    protected onLine(line: string): void {
        const words = line.split(/\s+/g);

        if (words[0] === '$') {
            if (words[1] !== 'cd') return;

            this.cwd = this.cd(words[2]);
            return;
        }

        if (words[0] === 'dir') this.fs.set(this.cd(words[1]), new Map())
        else this.fs.get(this.cwd)?.set(words[1], +words[0]);
    }
    
    protected end(): void {
        let sum = 0;

        for (const dirname of this.fs.keys()) {
            let size = 0;

            for (const [subDirname, subFiles] of this.fs) {
                if (!subDirname.startsWith(dirname)) continue;

                size += [...subFiles.values()].reduce((a, b) => a + b, 0);
            }

            if (size <= 10e4) sum += size; 
        }

        console.log(sum);
    }

}

export class Part2 extends SolutionPart {

    cwd = ''
    fs: Map<string, Map<string, number>> = new Map([ ['/', new Map() ] ]);

    private cd(path: string): string {
        if (path === '/') return '/'; 
            
        const result = this.cwd.slice(1).split('/');
        if (path === '..') result.pop();
        else result.push(path);
            
        const dirname = result.join('/');
        if (!dirname.startsWith('/')) return '/' + dirname;
        
        return dirname;
    }

    protected onLine(line: string): void {
        const words = line.split(/\s+/g);

        if (words[0] === '$') {
            if (words[1] !== 'cd') return;

            this.cwd = this.cd(words[2]);
            return;
        }

        if (words[0] === 'dir') this.fs.set(this.cd(words[1]), new Map())
        else this.fs.get(this.cwd)?.set(words[1], +words[0]);
    }
    
    protected end(): void {
        let totalSize = 0;

        for (const files of this.fs.values()) {
            for (const fileSize of files.values()) {
                totalSize += fileSize;
            }
        }

        const spaceNeeded = totalSize - 4e7;
        let smallestRightDirSize;

        for (const dirname of this.fs.keys()) {
            let size = 0;

            for (const [subDirname, subFiles] of this.fs) {
                if (!subDirname.startsWith(dirname)) continue;

                size += [...subFiles.values()].reduce((a, b) => a + b, 0);
            }

            if (size < spaceNeeded) continue;
            if (smallestRightDirSize && smallestRightDirSize < size) continue;
            smallestRightDirSize = size;
        }

        console.log(smallestRightDirSize);
    }

}