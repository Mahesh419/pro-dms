export class Upload{

    key: string;
    file: File;
    name: string;
    url: string;

    constructor(file: File){
        this.file = file;
    }
}