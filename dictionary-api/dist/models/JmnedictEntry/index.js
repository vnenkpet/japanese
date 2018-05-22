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
const Kana_1 = require("./Kana");
const Kanji_1 = require("./Kanji");
const Translation_1 = require("./Translation");
/*
This is a representation of the JMNEDICT entry in a json format
 */
class JmnedictEntry extends typegoose_1.Typegoose {
    static findByKey(key, limit = null) {
        return __awaiter(this, void 0, void 0, function* () {
            // turn the key into the appropriate regex
            const searchRegex = new RegExp(`^${key.toLocaleLowerCase().trim()}`);
            return this.find({
                $or: [
                    { "translation.translation.searchKey": searchRegex },
                    { "kana.text": searchRegex },
                    { "kana.romaji": searchRegex },
                    { "kanji.text": searchRegex } // OR chinese characters
                ]
            }).limit(limit); // common first
        });
    }
}
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], JmnedictEntry.prototype, "jmnedictId", void 0);
__decorate([
    typegoose_1.arrayProp({ items: Kanji_1.default }),
    __metadata("design:type", Array)
], JmnedictEntry.prototype, "kanji", void 0);
__decorate([
    typegoose_1.arrayProp({ items: Kana_1.default }),
    __metadata("design:type", Array)
], JmnedictEntry.prototype, "kana", void 0);
__decorate([
    typegoose_1.arrayProp({ items: Translation_1.default }),
    __metadata("design:type", Array)
], JmnedictEntry.prototype, "translation", void 0);
__decorate([
    typegoose_1.staticMethod,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], JmnedictEntry, "findByKey", null);
const JmnedictEntryModel = new JmnedictEntry().getModelForClass(JmnedictEntry, { schemaOptions: { collection: 'jmnedict' } });
exports.default = JmnedictEntryModel;
//# sourceMappingURL=index.js.map