"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_64_1 = require("base-64");
function getGraphQLConnectionFromMongoCursor(mongoCursor, // return value of .find() in mongodb
first, // how many to fetch
after // base64 encoded string
) {
    return __awaiter(this, void 0, void 0, function* () {
        // decode cursor:
        let offset = 0;
        if (after) {
            offset = +base_64_1.decode(after);
        }
        // get totalCount and entries for nodes
        const [totalCount, entries] = yield Promise.all([
            mongoCursor.count(),
            mongoCursor
                .skip(offset)
                .limit(first)
                .toArray()
        ]);
        // get startCursor and endCursor
        const startCursor = base_64_1.encode(`${offset}`);
        const endCursor = base_64_1.encode(`${offset + entries.length}`);
        // return graphql connection response
        return {
            edges: entries.map((entry, index) => {
                return {
                    cursor: base_64_1.encode(`${offset + index + 1}`),
                    node: entry
                };
            }),
            pageInfo: {
                endCursor,
                hasNextPage: offset + first <= totalCount - 1,
                startCursor
            },
            totalCount
        };
    });
}
exports.getGraphQLConnectionFromMongoCursor = getGraphQLConnectionFromMongoCursor;
//# sourceMappingURL=Paging.js.map