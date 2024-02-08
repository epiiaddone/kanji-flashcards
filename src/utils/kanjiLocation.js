export class KanjiLocation {

  static WK = new KanjiLocation("WK")
  static WK_MISSING = new KanjiLocation("WK_MISSING")
  static INCOMPLETE = new KanjiLocation("INCOMPLETE")

  constructor(name) {
    this.name = name
  }
}