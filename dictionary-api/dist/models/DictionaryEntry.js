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
/*
This is a representation of the JMDICT entry in a json format
 */
class IKanji extends typegoose_1.Typegoose {
}
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], IKanji.prototype, "common", void 0);
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], IKanji.prototype, "text", void 0);
class IKana extends typegoose_1.Typegoose {
}
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], IKana.prototype, "common", void 0);
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], IKana.prototype, "text", void 0);
class IPartOfSpeech extends typegoose_1.Typegoose {
}
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], IPartOfSpeech.prototype, "type", void 0);
class IGloss extends typegoose_1.Typegoose {
}
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], IGloss.prototype, "lang", void 0);
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], IGloss.prototype, "text", void 0);
class ISense extends typegoose_1.Typegoose {
}
__decorate([
    typegoose_1.arrayProp({ items: IPartOfSpeech }),
    __metadata("design:type", Array)
], ISense.prototype, "partOfSpeech", void 0);
__decorate([
    typegoose_1.arrayProp({ items: IGloss }),
    __metadata("design:type", Array)
], ISense.prototype, "gloss", void 0);
class DictionaryEntry extends typegoose_1.Typegoose {
    static findByKey(key, limit = null) {
        return __awaiter(this, void 0, void 0, function* () {
            // turn the key into the appropriate regex
            const searchRegex = new RegExp(`^${key.toLocaleLowerCase().trim()}`);
            return yield this.find({
                $or: [
                    { "sense.gloss.text": searchRegex },
                    { "kana.text": searchRegex },
                    { "kana.romaji": searchRegex },
                    { "kanji.text": searchRegex } // OR chinese characters
                ]
            }).sort([["kanji.common", -1]]).limit(limit); // common first
        });
    }
}
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], DictionaryEntry.prototype, "jmdictId", void 0);
__decorate([
    typegoose_1.arrayProp({ items: IKanji }),
    __metadata("design:type", Array)
], DictionaryEntry.prototype, "kanji", void 0);
__decorate([
    typegoose_1.arrayProp({ items: IKana }),
    __metadata("design:type", Array)
], DictionaryEntry.prototype, "kana", void 0);
__decorate([
    typegoose_1.arrayProp({ items: ISense }),
    __metadata("design:type", Array)
], DictionaryEntry.prototype, "sense", void 0);
__decorate([
    typegoose_1.staticMethod,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], DictionaryEntry, "findByKey", null);
const DictionaryEntryModel = new DictionaryEntry().getModelForClass(DictionaryEntry, { schemaOptions: { collection: 'jmdict' } });
exports.default = DictionaryEntryModel;
//# sourceMappingURL=DictionaryEntry.js.map