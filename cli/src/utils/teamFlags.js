const flags = {
  Argentina: "🇦🇷",
  Algeria: "🇩🇿",
  Austria: "🇦🇹",
  Jordan: "🇯🇴",
  Portugal: "🇵🇹",
  "Congo DR": "🇨🇩",
  England: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  Croatia: "🇭🇷",
  Ghana: "🇬🇭",
  Panama: "🇵🇦",
  Brazil: "🇧🇷",
  Germany: "🇩🇪",
  France: "🇫🇷",
  Italy: "🇮🇹",
  Spain: "🇪🇸",
  Netherlands: "🇳🇱",
  Belgium: "🇧🇪",
  Denmark: "🇩🇰",
  Norway: "🇳🇴",
  Sweden: "🇸🇪",
  Switzerland: "🇨🇭",
  Turkey: "🇹🇷",
  Ukraine: "🇺🇦",
  Wales: "🏴󠁧󠁢󠁷󠁬󠁳󠁿",
  Scotland: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
  "Republic of Ireland": "🇮🇪",
  "Northern Ireland": "🇬🇧",
  Iceland: "🇮🇸",
  Hungary: "🇭🇺",
  Poland: "🇵🇱",
  Romania: "🇷🇴",
  Russia: "🇷🇺",
  Serbia: "🇷🇸",
  Slovakia: "🇸🇰",
  Slovenia: "🇸🇮",
};

const getFlag = (teamName) => {
  return flags[teamName] || "⚽";
};

module.exports = {
  getFlag,
};
