export class PaperForm {
    name: string;
    chineseTitle: string;
    englishTitle: string;
    type: number;

    constructor(dto: any) {
        this.name = dto.name;
        this.chineseTitle = dto.chineseTitle;
        this.englishTitle = dto.englishTitle;
        this.type = dto.type;
    }

    toServerDto(): any {
        return {
            name: this.name,
            chineseTitle: this.chineseTitle,
            englishTitle: this.englishTitle,
            type: this.type,
        };
    }
}
