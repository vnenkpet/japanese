import { FieldResolver, Resolver, Root } from "type-graphql";
import Kanji from "../../entries/schema/Kanji";
import KanjiDicEntry from "../schema/KanjiDicEntry";
import { Service, Inject } from "typedi";
import { KanjiDicEntrySearch } from "../services/KanjiDicEntrySearch";

@Service()
@Resolver(of => Kanji)
export default class KanjiResolver {
    @Inject() private readonly kanjiDicSearch: KanjiDicEntrySearch;

    @FieldResolver(returns => [KanjiDicEntry])
    public kanjidic(@Root() kanji: Kanji) {
        return this.kanjiDicSearch.getKanji(kanji);
    }
}
