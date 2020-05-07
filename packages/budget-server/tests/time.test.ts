
describe("time test", () => {
    it("should", () => {
        const now = Date.now();
        const utc = new Date().toUTCString();
        expect(utc).toBeDefined();
        expect(now).toBeDefined();
    })
});