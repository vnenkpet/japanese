"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typegoose_1 = require("typegoose");
class KanjidicEntry extends typegoose_1.Typegoose {
    static findByKey(key, limit = null) {
        return __awaiter(this, void 0, void 0, function* () {
            // turn the key into the appropriate regex
            const searchRegex = new RegExp(`^${key.toLocaleLowerCase().trim()}`);
            return this.find({
                $or: [
                    { "gloss": searchRegex },
                    { "kana": searchRegex },
                    { "romaji": searchRegex },
                    { "kanji": searchRegex } // OR chinese characters
                ]
            }).limit(limit); // common first
        });
    }
}
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], KanjidicEntry.prototype, "kanjidicId", void 0);
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], KanjidicEntry.prototype, "kanji", void 0);
__decorate([
    typegoose_1.arrayProp({ items: String }),
    __metadata("design:type", Array)
], KanjidicEntry.prototype, "kana", void 0);
__decorate([
    typegoose_1.arrayProp({ items: String }),
    __metadata("design:type", Array)
], KanjidicEntry.prototype, "romaji", void 0);
__decorate([
    typegoose_1.arrayProp({ items: String }),
    __metadata("design:type", Array)
], KanjidicEntry.prototype, "gloss", void 0);
__decorate([
    typegoose_1.staticMethod,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], KanjidicEntry, "findByKey", null);
exports.KanjidicEntry = KanjidicEntry;
const KanjidicEntryModel = new KanjidicEntry().getModelForClass(KanjidicEntry, { schemaOptions: { collection: 'kanjidic' } });
exports.default = KanjidicEntryModel;
//# sourceMappingURL=index.js.map