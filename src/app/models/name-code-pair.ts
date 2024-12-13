export class NameCodePair {
  id: number;
  code: string;
  name: string;

  constructor(id: number, code: string, name: string) {
    this.id = id;
    this.code = code;
    this.name = name;
  }

  toString() {
    return this.name;
  }
}
