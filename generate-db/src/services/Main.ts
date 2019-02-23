import { TYPES } from '../types';
import { IExtractService } from './IExtractService';
import { inject, injectable } from 'inversify';
import { IMain } from './IMain';
import * as got from 'got';

@injectable()
export class Main implements IMain {
  @inject(TYPES.ExtractService)
  private readonly extractService: IExtractService;

  public async run(url: string) {
    const errors = [];
    const succesfullCount = 0;
    await this.extractService.extractJsonFromStream(
      got.stream.get(url),
      'words.*',
      (data: any) => {
        if (data.id) {
          console.log(
            `${data.id} \t ${
              data.kanji[0] ? data.kanji[0].text : data.kana[0].text
            } \t ${data.sense[0].gloss[0].text}`,
          );
          data.sourceFile = url;
          data.modifiedAt = new Date().toISOString();
          // todo - insert into data storage, add info (JLPT tags, example sentences, search engine results count, common, conjugations)
        }
      },
    );

    console.log(
      `Successful count: ${succesfullCount}, errors: ${errors.length}`,
    );
  }
}
