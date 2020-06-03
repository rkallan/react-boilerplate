import getType from "./index";

describe("(SBA) Helpers getType", () => {
    test("Testing helpers/getType.js - getType() => getType off variable = {} must be object", async () => {
        const data = {
            key1: "value1",
            key2: "value2",
            key3: "value3",
        };

        const result = await getType(data);
        const expectedResult = "object";

        expect(result).toStrictEqual(expectedResult);
    });
    test('Testing helpers/getType.js - getType() => getType off variable = "" must be string', async () => {
        const data = "";
        const result = await getType(data);
        const expectedResult = "string";

        expect(result).toStrictEqual(expectedResult);
    });
});
