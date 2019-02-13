import { Arg, Int, Query, Resolver } from "type-graphql";
import EntryConnection from "../schema-types/EntryConnection";
import JLPT_NUMBER from "../schema-types/enums/JlptType";
import { DictionaryEntrySearch } from "../services/DictionaryEntrySearch";
import { Inject, Service } from "typedi";
import Entry from "../schema-types/Entry";

@Service()
@Resolver(of => EntryConnection)
export default class EntryResolver {
  @Inject() private readonly dictionaryEntrySearch: DictionaryEntrySearch;

  @Query(returns => [Entry])
  public async jlptEntries(
    @Arg("jlpt", type => JLPT_NUMBER)
    jlpt: JLPT_NUMBER,
  ) {
    return this.dictionaryEntrySearch.getEntriesByJlpt(jlpt);
  }

  @Query(returns => EntryConnection)
  public async searchEntriesConnection(
    @Arg("key") key: string,
    @Arg("first", type => Int, { nullable: true })
    first: number = 10,
    @Arg("after", { nullable: true })
    after?: string,
  ): Promise<EntryConnection> {
    return this.dictionaryEntrySearch.search(key, first, after);
  }
}
