import { Arg, FieldResolver, Int, Query, Resolver, Root } from "type-graphql";
import EntryConnection from "../../entries/schema/EntryConnection";
import KanjiDicEntry from "../schema/KanjiDicEntry";
import KanjiDicEntryConnection from "../schema/KanjiDicEntryConnection";
import { Service, Inject } from "typedi";
import { KanjiDicEntrySearch } from "../services/KanjiDicEntrySearch";

@Service()
@Resolver(of => KanjiDicEntry)
export default class KanjiDicEntryResolver {
    @Inject() private readonly kanjiDicSearch: KanjiDicEntrySearch;

    @Query(returns => KanjiDicEntry)
    public getKanjiDicInformation(@Arg("kanji") kanji: string) {
        return this.kanjiDicSearch.getKanjiDicInformation(kanji);
    }

    @Query(returns => KanjiDicEntryConnection)
    public searchKanjiDicEntries(
        @Arg("key") key: string,
        @Arg("first") first: number = 10,
        @Arg("after") after: string = null,
    ): Promise<KanjiDicEntryConnection> {
        return this.kanjiDicSearch.search(key, first, after);
    }

    @FieldResolver(returns => EntryConnection)
    public wordsContainingThis(
        @Root() root: KanjiDicEntry,
        @Arg("first", type => Int, { nullable: true })
        first: number = 10,
        @Arg("after", type => Int, { nullable: true })
        after: string = null,
    ) {
        return this.kanjiDicSearch.getWordsContaining(root, first, after);
    }
}
