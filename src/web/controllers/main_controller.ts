import { Controller } from "@hotwired/stimulus";

import * as amscd from "../../../vendor/fletcher/amscd";
import * as quiver from "../../../vendor/fletcher/quiver";

export default class extends Controller {
  static targets = ["sourceLang", "sourceCode", "targetLang", "targetCode"];
  declare readonly sourceLangTarget: HTMLSelectElement;
  declare readonly targetLangTarget: HTMLSelectElement;
  declare readonly sourceCodeTarget: HTMLTextAreaElement;
  declare readonly targetCodeTarget: HTMLTextAreaElement;

  connect() {
    this.sourceCodeTarget.value = `\\begin{CD}
A       @>f>x>  B       \\\\
@AiAtA          @VyVgV  \\\\
C       @<z<h<  D
\\end{CD}`;
  }

  transform() {
    const sourceLang = this.sourceLangTarget.options[this.sourceLangTarget.selectedIndex].value;
    const targetLang = this.targetLangTarget.options[this.targetLangTarget.selectedIndex].value;
    const sourceCode = this.sourceCodeTarget.value;

    let middleCode;
    switch (sourceLang) {
      case "amscd": middleCode = amscd.read(sourceCode); break;
      case "quiver": middleCode = quiver.read(sourceCode); break;
      case "quiver_url":
        const q = new URL(sourceCode).hash.slice(3);
        console.log(q)
        const c = decodeURIComponent(escape(atob(q)));
        middleCode = quiver.read(c);
        console.log(middleCode)
        break;
      case "fletcher": middleCode = JSON.parse(sourceCode); break;
    }
    console.log(middleCode)

    let targetCode;
    switch (targetLang) {
      case "amscd": targetCode = amscd.write(middleCode); break;
      case "quiver": targetCode = quiver.write(middleCode); break;
      case "quiver_url":
        const c = quiver.write(middleCode);
        targetCode = `https://q.uiver.app/#q=${btoa(unescape(encodeURIComponent(c)))}`;
        break;
      case "fletcher": targetCode = JSON.stringify(middleCode, null, 2); break;
    }

    this.targetCodeTarget.value = targetCode;
  }
}
