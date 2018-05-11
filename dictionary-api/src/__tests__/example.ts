// example test suite

test("Example", () => {
    expect(1).not.toEqual(2);
});

test("Asynchronous example", (done: () => void) => {
    expect.assertions(1);
    setTimeout(() => {
        expect(1).not.toEqual(2);
        done();
    });
});

test("Async/await example", async () => {
    expect.assertions(1);
    expect(1).not.toEqual(2);
});


