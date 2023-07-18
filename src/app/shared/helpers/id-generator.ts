export class ID_GENERATOR {
    static generateNumericId(length: number) {
        let ID = '';
        for (let i = 0; i < length; i++) {
            ID += Math.floor(Math.random() * 10);
        }
        return +ID;
    }
}
