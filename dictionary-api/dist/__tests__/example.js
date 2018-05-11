// example test suite
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
test("Example", () => {
    expect(1).not.toEqual(2);
});
test("Asynchronous example", (done) => {
    expect.assertions(1);
    setTimeout(() => {
        expect(1).not.toEqual(2);
        done();
    });
});
test("Async/await example", () => __awaiter(this, void 0, void 0, function* () {
    expect.assertions(1);
    expect(1).not.toEqual(2);
}));
//# sourceMappingURL=example.js.map