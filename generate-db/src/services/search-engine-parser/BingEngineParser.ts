import cheerio from 'cheerio';
import got from 'got';
import parseNum from 'parse-num';

import { injectable } from 'inversify';

import { ISearchEngineParser } from './ISearchEngineParser';
import { IJmdictEntry } from '../interfaces/IJmdictEntry';
import { IJmnedictEntry } from '../interfaces/IJmnedictEntry';

import Debug from 'Debug';
const debug = Debug('command:bing-engine-parser');

/**
 * Bing search engine has the loosest protection against scraping so we use that to get usage frequency data for each word
 * Do not run this unnecessarily! Only meant to be run once in a long period of time
 */
@injectable()
export class BingEngineParser implements ISearchEngineParser {
  public async getResultsCountForJmdictEntry(entry: IJmdictEntry) {
    const isUsuallyKana = entry.sense[0].misc.indexOf('uk') === -1;

    // get the most useful search key for this word
    const key =
      entry.kanji.length && isUsuallyKana
        ? entry.kanji[0].text
        : entry.kana[0].text;

    debug(`(JMDICT) getting search results count for ${key}`);
    return this.parseJapanesePhraseResultsCount(key);
  }

  public async getResultsCountForJmnedictEntry(entry: IJmnedictEntry) {
    const key = entry.kanji.length ? entry.kanji[0].text : entry.kana[0].text;

    debug(`(JMNEDICT) getting search results count for ${key}`);
    return this.parseJapanesePhraseResultsCount(key);
  }

  private async parseJapanesePhraseResultsCount(japanasePhrase: string) {
    const res = await got(
      `https://www.bing.com/search?q=${encodeURIComponent(
        `"${japanasePhrase}" language:ja`,
      )}`,
    );
    const $ = cheerio.load(res.body);
    const count = parseNum($('.sb_count').html());
    return count ? count : 0;
  }
}
