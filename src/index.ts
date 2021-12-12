interface ILeague {
    name: string;
    points: number;
}

/**
 * Checks whether a division is valid, with between 2 to 20 leagues
 *
 * @param division an array of leagues
 * @returns whether the division is valid
 */
const isDivisionValid = (division: ILeague[]): boolean =>
    division.length >= 2 && division.length <= 12;

/**
 * Checks whether a league is valid, with a string name and a positive number of points
 *
 * @param league the details of a single league
 * @returns whether the league is valid
 */
const isLeagueValid = (league: ILeague): boolean =>
    typeof league.name === "string" && league.points >= 0;

/**
 * Checks whether the promotions and relegations are valid by ensuring no common leagues
 *
 * @param promoted an array of promoted leagues
 * @param relegated an array of relegated leagues
 * @returns whether the league changes are valid
 */
const isChangeValid = (promoted: ILeague[], relegated: ILeague[]): boolean => {
    const commonLeagues = promoted.filter((a) =>
        relegated.some((b) => a.name === b.name)
    );

    return commonLeagues.length === 0;
};

/**
 * Generates a string showing the league results
 *
 * @param preface a header for the results string
 * @param leagues the list of leagues to display
 * @returns a string with the results
 */
const generateResults = (preface: string, leagues: ILeague[]): string =>
    `${preface}\n${leagues.map((l) => l.name).join("\n")}`;

/**
 *
 * @param division a list of leagues
 * @param n the number of leagues to promote or relegate
 * @returns the promotion and relegation results
 */
export const getResults = (division: ILeague[], n: number): string => {
    // If the division is invalid, throw an error
    if (!isDivisionValid(division)) {
        throw new Error("The division submitted is invalid.");
    }

    // For each league in the division...
    division.forEach((league) => {
        // If the league is invalid, throw an error
        if (!isLeagueValid(league)) {
            throw new Error(`The league ${league.name} is invalid.`);
        }
    });

    // Sort the divisions
    const sortedDivision = division.sort((a, b) => {
        // If the points of the two leagues are unequal...
        if (a.points != b.points) {
            // sort league in descending order of points
            return b.points - a.points;
        }
        // Otherwise, sort in alphabetical order
        return a.name > b.name ? 1 : -1;
    });

    // Get the first n leagues in the sorted division to promote
    const promotedLeagues = sortedDivision.slice(0, n);
    // Get the last n leagues to relegate
    const relegatedLeagues = sortedDivision.slice(-n);

    // If the league changes are not valid, throw an error
    if (!isChangeValid(promotedLeagues, relegatedLeagues)) {
        throw new Error(
            `A league is in both the top ${n} and bottom ${n} of this division. The promotion and relegation process will not work.`
        );
    }

    // Generate strings for promoted and relegated leagues
    const promotedResults = generateResults("Promote:", promotedLeagues);
    const relegatedResults = generateResults("Relegate:", relegatedLeagues);

    return promotedResults + "\n\n" + relegatedResults;
};
