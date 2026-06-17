const { printHeader } = require("./header");
const { buildMatchCard } = require("./matchCard");

// Renders a full match screen: premium header + broadcast-style cards.
const printMatches = (title, matches) => {
  printHeader(title, matches.length);

  matches.forEach((match) => {
    console.log(buildMatchCard(match));
  });
};

module.exports = {
  printMatches,
};
