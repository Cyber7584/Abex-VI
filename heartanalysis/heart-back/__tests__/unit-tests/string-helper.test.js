const stringHelper = require("@helper/string-helper").default;

it("Testa o removeAccentuation()", async () => {
	expect(stringHelper.removeAccentuation("teste aaaaaa")).toBe(
		"teste aaaaaa",
	);
	expect(stringHelper.removeAccentuation("teste aáàéíâ")).toBe(
		"teste aaaeia",
	);
	expect(stringHelper.removeAccentuation("!@#$%&*")).toBe("!@#$%&*");
	expect(stringHelper.removeAccentuation("çÇ")).toBe("cC");
});
