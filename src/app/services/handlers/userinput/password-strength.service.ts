import { Injectable } from '@angular/core';
import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core';
import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common';
import * as zxcvbnEnPackage from '@zxcvbn-ts/language-en';

@Injectable({
  providedIn: 'root',
})
export class PasswordStrengthService {
  constructor() {
    const options = {
      translations: zxcvbnEnPackage.translations,
      graphs: zxcvbnCommonPackage.adjacencyGraphs,
      dictionary: {
        ...zxcvbnCommonPackage.dictionary,
        ...zxcvbnEnPackage.dictionary,
      },
    };
    zxcvbnOptions.setOptions(options);
  }

  calculatePasswordStregnth(password: string) {
    const result = zxcvbn(password);
    return result.score;
  }
}
