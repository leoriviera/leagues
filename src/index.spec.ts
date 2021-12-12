import { getResults } from ".";

describe("successful league cases", () => {
    const givenDivision = [
        {
            name: "Rockets",
            points: 64,
        },
        {
            name: "Cardinals",
            points: 77,
        },
        {
            name: "Bruisers",
            points: 51,
        },
        {
            name: "Penguins",
            points: 52,
        },
        {
            name: "Renegades",
            points: 37,
        },
        {
            name: "Porpoises",
            points: 52,
        },
    ];

    test("returns one team to promote and one team to relegate", () => {
        const resultString = `Promote:
Cardinals

Relegate:
Renegades`;

        expect(getResults(givenDivision, 1)).toBe(resultString);
    });

    test("returns two teams to promote and two teams to relegate", () => {
        const resultString = `Promote:
Cardinals
Rockets

Relegate:
Bruisers
Renegades`;

        expect(getResults(givenDivision, 2)).toBe(resultString);
    });

    test("when two leagues have the same score, they are sorted alphabetically", () => {
        const resultString = `Promote:
Cardinals
Rockets
Penguins

Relegate:
Porpoises
Bruisers
Renegades`;
        expect(getResults(givenDivision, 3)).toBe(resultString);
    });
});

describe("failing league cases", () => {
    test("an invalid division throws an error", () => {
        const invalidDivision = [
            {
                name: "Rockets",
                points: 64,
            },
        ];

        expect(() => getResults(invalidDivision, 1)).toThrow(
            "The division submitted is invalid."
        );
    });

    test("a division with an invalid league throws an error", () => {
        const divisionWithInvalidLeague = [
            {
                name: "Rockets",
                points: 64,
            },
            {
                name: "Cardinals",
                points: 77,
            },
            {
                name: "Bruisers",
                points: -50,
            },
        ];

        expect(() => getResults(divisionWithInvalidLeague, 1)).toThrow(
            "The league Bruisers is invalid."
        );
    });

    test("a league overlap between promotion and relegation throws and eror", () => {
        const givenDivision = [
            {
                name: "Rockets",
                points: 64,
            },
            {
                name: "Cardinals",
                points: 77,
            },
            {
                name: "Bruisers",
                points: 40,
            },
        ];

        expect(() => getResults(givenDivision, 2)).toThrow(
            "A league is in both the top 2 and bottom 2 of this division. The promotion and relegation process will not work."
        );
    });
});
