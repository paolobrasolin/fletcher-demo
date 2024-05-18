import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["sourceLang", "sourceCode", "targetLang", "targetCode"];
  declare readonly sourceLangTarget: HTMLSelectElement;
  declare readonly targetLangTarget: HTMLSelectElement;
  declare readonly sourceCodeTarget: HTMLTextAreaElement;
  declare readonly targetCodeTarget: HTMLTextAreaElement;

  transform() {
    const sourceLang = this.sourceLangTarget.options[this.sourceLangTarget.selectedIndex].value;
    const targetLang = this.targetLangTarget.options[this.targetLangTarget.selectedIndex].value;
    const sourceCode = this.sourceCodeTarget.value;
    const targetCode = this.dothething(sourceCode, sourceLang, targetLang);
    this.targetCodeTarget.value = targetCode;
  }

  dothething(sourceCode: string, sourceLang: string, targetLang: string) {
    return `Transformed from ${sourceLang} to ${targetLang}:\n\n${sourceCode}`;
  }

}
