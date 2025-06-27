const numericHelper = require("@helper/numeric-helper");

it("Testa o numericService()", async () => {
	expect(numericHelper.round(19.9, 2)).toBe(19.9);
	expect(numericHelper.round(19.99, 2)).toBe(19.99);
	expect(numericHelper.round(19.95, 2)).toBe(19.95);
	expect(numericHelper.round(19.995, 2)).toBe(20);
	expect(numericHelper.round(19.994, 2)).toBe(19.99);
	expect(numericHelper.round(19.991, 2)).toBe(19.99);
	expect(numericHelper.round(19.999, 2)).toBe(20);
	expect(numericHelper.round(20.001, 2)).toBe(20);
	expect(numericHelper.round(19.99999996, 2)).toBe(20);
});
