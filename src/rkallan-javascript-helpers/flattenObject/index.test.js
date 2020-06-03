import { flattenArray } from "./index";

describe("Helpers flattenObject", () => {
    test("Testing flattenObject - flattenArray() => empty {} or empty [] or [{},{}] or {a:[], b:[]} must return []", async () => {
        const data = {};
        const data2 = [];
        const data3 = [{}, {}];
        const data4 = { a: [], b: [] };
        const data5 = { a: {}, b: {} };

        const expectedResult = [];

        const result = await flattenArray(data);
        const result2 = await flattenArray(data2);
        const result3 = await flattenArray(data3);
        const result4 = await flattenArray(data4);
        const result5 = await flattenArray(data5);

        expect(result).toStrictEqual(expectedResult);
        expect(result2).toStrictEqual(expectedResult);
        expect(result3).toStrictEqual(expectedResult);
        expect(result4).toStrictEqual(expectedResult);
        expect(result5).toStrictEqual(expectedResult);
    });
    test("Testing flattenObject - flattenArray() => {} must be converted to flatten array", async () => {
        const data = {
            a: "value1",
            b: "value2",
            c: "value3",
        };

        const result = await flattenArray(data);
        const expectedResult = ["value1", "value2", "value3"];

        expect(result).toStrictEqual(expectedResult);
    });
    test("Testing flattenObject - flattenArray() => {} must be converted to flatten array without empty {} and []", async () => {
        const data = {
            a: "value1",
            b: {},
            c: "value3",
            d: [],
        };

        const result = await flattenArray(data);
        const expectedResult = ["value1", "value3"];

        expect(result).toStrictEqual(expectedResult);
    });
    test("Testing flattenObject - flattenArray() => {} with multiple depts must be converted to flatten array", async () => {
        const data = {
            a: 1,
            b: {
                d: 3,
                e: 4,
                f: {
                    g: 6,
                },
            },
            c: 2,
        };

        const result = await flattenArray(data);
        const expectedResult = [1, 3, 4, 6, 2];

        expect(result).toStrictEqual(expectedResult);
    });
    test("Testing flattenObject - flattenArray() => {} with multiple depts must be converted to flatten array with a max dept of 0", async () => {
        const data = {
            a: 1,
            b: {
                d: 3,
                e: 4,
                f: {
                    g: 6,
                },
            },
            c: 2,
        };

        const result = await flattenArray(data, 0);
        const expectedResult = [1, { d: 3, e: 4, f: { g: 6 } }, 2];

        expect(result).toStrictEqual(expectedResult);
    });
    test("Testing flattenObject - flattenArray() => {} with multiple depts must be converted to flatten array with a max dept of 1", async () => {
        const data = {
            a: 1,
            b: {
                d: 3,
                e: 4,
                f: {
                    g: 6,
                },
            },
            c: 2,
        };

        const result = await flattenArray(data, 1);

        const expectedResult = [1, 3, 4, { g: 6 }, 2];

        expect(result).toStrictEqual(expectedResult);
    });

    test("Testing flattenObject - flattenArray() => [] must be converted to flatten array", async () => {
        const data = ["value1", "value2", "value3"];

        const result = await flattenArray(data);
        const expectedResult = ["value1", "value2", "value3"];

        expect(result).toStrictEqual(expectedResult);
    });
    test("Testing flattenObject - flattenArray() => [] with multiple depts must be converted to flatten array", async () => {
        const data = [
            1,
            {
                d: 3,
                e: 4,
                f: [6],
            },
            2,
        ];

        const result = await flattenArray(data);
        const expectedResult = [1, 3, 4, 6, 2];

        expect(result).toStrictEqual(expectedResult);
    });
    test("Testing flattenObject - flattenArray() => [] with multiple depts must be converted to flatten array with a max dept of 0", async () => {
        const data = [
            1,
            {
                d: 3,
                e: 4,
                f: [6],
            },
            2,
        ];

        const result = await flattenArray(data, 0);
        const expectedResult = [1, { d: 3, e: 4, f: [6] }, 2];

        expect(result).toStrictEqual(expectedResult);
    });
    test("Testing flattenObject - flattenArray() => [] with multiple depts must be converted to flatten array with a max dept of 1", async () => {
        const data = [
            1,
            {
                d: 3,
                e: 4,
                f: [6],
            },
            2,
        ];

        const result = await flattenArray(data, 1);

        const expectedResult = [1, 3, 4, [6], 2];

        expect(result).toStrictEqual(expectedResult);
    });
    test("Testing flattenObject - flattenArray() => calling without argument must be return undefined", async () => {
        const result = await flattenArray();

        expect(result).toBeUndefined();
    });
    test("Testing flattenObject - flattenArray() => string must be return undefined", async () => {
        const data = "Rotterdam Rijnmond";

        const result = await flattenArray(data);

        expect(result).toBeUndefined();
    });

    test("Testing flattenObject - flattenArray() => calling withh () must be return undefined", async () => {
        const result = await flattenArray(() => {});

        expect(result).toBeUndefined();
    });
});
