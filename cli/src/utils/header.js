const { divider, brand } = require("./theme");

// Premium, reusable screen header used by every match listing.
// ═══════════════════════════════════════════
// 🏆 FIFA WORLD CUP 2026
// ⚽ Today's Matches (5)
// ═══════════════════════════════════════════
const printHeader = (title, count) => {
  const line = brand.muted(divider("═"));

  console.log("");
  console.log(line);
  console.log(brand.title("🏆 FIFA WORLD CUP 2026"));
  console.log(brand.heading(`⚽ ${title} (${count})`));
  console.log(line);
  console.log("");
};

module.exports = {
  printHeader,
};
