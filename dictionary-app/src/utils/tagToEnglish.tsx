export default (tag: string) => {
  switch (tag) {
    case "MA":
      return "martial arts term";
    case "X":
      return "rude or X-rated term (not displayed in educational software)";
    case "abbr":
      return "abbreviation";
    case "adj-i":
      return "adjective (keiyoushi)";
    case "adj-ix":
      return "adjective (keiyoushi) - yoi/ii class";
    case "adj-na":
      return "adjectival nouns or quasi-adjectives (keiyodoshi)";
    case "adj-no":
      return "nouns which may take the genitive case particle `no'";
    case "adj-pn":
      return "pre-noun adjectival (rentaishi)";
    case "adj-t":
      return "`taru' adjective";
    case "adj-f":
      return "noun or verb acting prenominally";
    case "adv":
      return "adverb (fukushi)";
    case "adv-to":
      return "adverb taking the `to' particle";
    case "arch":
      return "archaism";
    case "ateji":
      return "ateji (phonetic) reading";
    case "aux":
      return "auxiliary";
    case "aux-v":
      return "auxiliary verb";
    case "aux-adj":
      return "auxiliary adjective";
    case "Buddh":
      return "Buddhist term";
    case "chem":
      return "chemistry term";
    case "chn":
      return "children's language";
    case "col":
      return "colloquialism";
    case "comp":
      return "computer terminology";
    case "conj":
      return "conjunction";
    case "cop-da":
      return "copula";
    case "ctr":
      return "counter";
    case "derog":
      return "derogatory";
    case "eK":
      return "exclusively kanji";
    case "ek":
      return "exclusively kana";
    case "exp":
      return "expressions (phrases, clauses, etc.)";
    case "fam":
      return "familiar language";
    case "fem":
      return "female term or language";
    case "food":
      return "food term";
    case "geom":
      return "geometry term";
    case "gikun":
      return "gikun (meaning as reading) or jukujikun (special kanji reading)";
    case "hon":
      return "honorific or respectful (sonkeigo) language";
    case "hum":
      return "humble (kenjougo) language";
    case "iK":
      return "word containing irregular kanji usage";
    case "id":
      return "idiomatic expression";
    case "ik":
      return "word containing irregular kana usage";
    case "int":
      return "interjection (kandoushi)";
    case "io":
      return "irregular okurigana usage";
    case "iv":
      return "irregular verb";
    case "ling":
      return "linguistics terminology";
    case "m-sl":
      return "manga slang";
    case "male":
      return "male term or language";
    case "male-sl":
      return "male slang";
    case "math":
      return "mathematics";
    case "mil":
      return "military";
    case "n":
      return "noun (common) (futsuumeishi)";
    case "n-adv":
      return "adverbial noun (fukushitekimeishi)";
    case "n-suf":
      return "noun, used as a suffix";
    case "n-pref":
      return "noun, used as a prefix";
    case "n-t":
      return "noun (temporal) (jisoumeishi)";
    case "num":
      return "numeric";
    case "oK":
      return "word containing out-dated kanji";
    case "obs":
      return "obsolete term";
    case "obsc":
      return "obscure term";
    case "ok":
      return "out-dated or obsolete kana usage";
    case "oik":
      return "old or irregular kana form";
    case "on-mim":
      return "onomatopoeic or mimetic word";
    case "pn":
      return "pronoun";
    case "poet":
      return "poetical term";
    case "pol":
      return "polite (teineigo) language";
    case "pref":
      return "prefix";
    case "proverb":
      return "proverb";
    case "prt":
      return "particle";
    case "physics":
      return "physics terminology";
    case "rare":
      return "rare";
    case "sens":
      return "sensitive";
    case "sl":
      return "slang";
    case "suf":
      return "suffix";
    case "uK":
      return "word usually written using kanji alone";
    case "uk":
      return "word usually written using kana alone";
    case "unc":
      return "unclassified";
    case "yoji":
      return "yojijukugo";
    case "v1":
      return "Ichidan verb";
    case "v1-s":
      return "Ichidan verb - kureru special class";
    case "v2a-s":
      return "Nidan verb with 'u' ending (archaic)";
    case "v4h":
      return "Yodan verb with `hu/fu' ending (archaic)";
    case "v4r":
      return "Yodan verb with `ru' ending (archaic)";
    case "v5aru":
      return "Godan verb - -aru special class";
    case "v5b":
      return "Godan verb with `bu' ending";
    case "v5g":
      return "Godan verb with `gu' ending";
    case "v5k":
      return "Godan verb with `ku' ending";
    case "v5k-s":
      return "Godan verb - Iku/Yuku special class";
    case "v5m":
      return "Godan verb with `mu' ending";
    case "v5n":
      return "Godan verb with `nu' ending";
    case "v5r":
      return "Godan verb with `ru' ending";
    case "v5r-i":
      return "Godan verb with `ru' ending (irregular verb)";
    case "v5s":
      return "Godan verb with `su' ending";
    case "v5t":
      return "Godan verb with `tsu' ending";
    case "v5u":
      return "Godan verb with `u' ending";
    case "v5u-s":
      return "Godan verb with `u' ending (special class)";
    case "v5uru":
      return "Godan verb - Uru old class verb (old form of Eru)";
    case "vz":
      return "Ichidan verb - zuru verb (alternative form of -jiru verbs)";
    case "vi":
      return "intransitive verb";
    case "vk":
      return "Kuru verb - special class";
    case "vn":
      return "irregular nu verb";
    case "vr":
      return "irregular ru verb, plain form ends with -ri";
    case "vs":
      return "noun or participle which takes the aux. verb suru";
    case "vs-c":
      return "su verb - precursor to the modern suru";
    case "vs-s":
      return "suru verb - special class";
    case "vs-i":
      return "suru verb - irregular";
    case "kyb":
      return "Kyoto-ben";
    case "osb":
      return "Osaka-ben";
    case "ksb":
      return "Kansai-ben";
    case "ktb":
      return "Kantou-ben";
    case "tsb":
      return "Tosa-ben";
    case "thb":
      return "Touhoku-ben";
    case "tsug":
      return "Tsugaru-ben";
    case "kyu":
      return "Kyuushuu-ben";
    case "rkb":
      return "Ryuukyuu-ben";
    case "nab":
      return "Nagano-ben";
    case "hob":
      return "Hokkaido-ben";
    case "vt":
      return "transitive verb";
    case "vulg":
      return "vulgar expression or word";
    case "adj-kari":
      return "`kari' adjective (archaic)";
    case "adj-ku":
      return "`ku' adjective (archaic)";
    case "adj-shiku":
      return "`shiku' adjective (archaic)";
    case "adj-nari":
      return "archaic/formal form of na-adjective";
    case "n-pr":
      return "proper noun";
    case "v-unspec":
      return "verb unspecified";
    case "v4k":
      return "Yodan verb with `ku' ending (archaic)";
    case "v4g":
      return "Yodan verb with `gu' ending (archaic)";
    case "v4s":
      return "Yodan verb with `su' ending (archaic)";
    case "v4t":
      return "Yodan verb with `tsu' ending (archaic)";
    case "v4n":
      return "Yodan verb with `nu' ending (archaic)";
    case "v4b":
      return "Yodan verb with `bu' ending (archaic)";
    case "v4m":
      return "Yodan verb with `mu' ending (archaic)";
    case "v2k-k":
      return "Nidan verb (upper class) with `ku' ending (archaic)";
    case "v2g-k":
      return "Nidan verb (upper class) with `gu' ending (archaic)";
    case "v2t-k":
      return "Nidan verb (upper class) with `tsu' ending (archaic)";
    case "v2d-k":
      return "Nidan verb (upper class) with `dzu' ending (archaic)";
    case "v2h-k":
      return "Nidan verb (upper class) with `hu/fu' ending (archaic)";
    case "v2b-k":
      return "Nidan verb (upper class) with `bu' ending (archaic)";
    case "v2m-k":
      return "Nidan verb (upper class) with `mu' ending (archaic)";
    case "v2y-k":
      return "Nidan verb (upper class) with `yu' ending (archaic)";
    case "v2r-k":
      return "Nidan verb (upper class) with `ru' ending (archaic)";
    case "v2k-s":
      return "Nidan verb (lower class) with `ku' ending (archaic)";
    case "v2g-s":
      return "Nidan verb (lower class) with `gu' ending (archaic)";
    case "v2s-s":
      return "Nidan verb (lower class) with `su' ending (archaic)";
    case "v2z-s":
      return "Nidan verb (lower class) with `zu' ending (archaic)";
    case "v2t-s":
      return "Nidan verb (lower class) with `tsu' ending (archaic)";
    case "v2d-s":
      return "Nidan verb (lower class) with `dzu' ending (archaic)";
    case "v2n-s":
      return "Nidan verb (lower class) with `nu' ending (archaic)";
    case "v2h-s":
      return "Nidan verb (lower class) with `hu/fu' ending (archaic)";
    case "v2b-s":
      return "Nidan verb (lower class) with `bu' ending (archaic)";
    case "v2m-s":
      return "Nidan verb (lower class) with `mu' ending (archaic)";
    case "v2y-s":
      return "Nidan verb (lower class) with `yu' ending (archaic)";
    case "v2r-s":
      return "Nidan verb (lower class) with `ru' ending (archaic)";
    case "v2w-s":
      return "Nidan verb (lower class) with `u' ending and `we' conjugation (archaic)";
    case "archit":
      return "architecture term";
    case "astron":
      return "astronomy, etc. term";
    case "baseb":
      return "baseball term";
    case "biol":
      return "biology term";
    case "bot":
      return "botany term";
    case "bus":
      return "business term";
    case "econ":
      return "economics term";
    case "engr":
      return "engineering term";
    case "finc":
      return "finance term";
    case "geol":
      return "geology, etc. term";
    case "law":
      return "law, etc. term";
    case "mahj":
      return "mahjong term";
    case "med":
      return "medicine, etc. term";
    case "music":
      return "music term";
    case "Shinto":
      return "Shinto term";
    case "shogi":
      return "shogi term";
    case "sports":
      return "sports term";
    case "sumo":
      return "sumo term";
    case "zool":
      return "zoology term";
    case "joc":
      return "jocular, humorous term";
    case "anat":
      return "anatomical term";
    default:
      return "";
  }
};
