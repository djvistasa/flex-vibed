// Helper function to parse house rules
export const parseHouseRules = (houseRules: string) => {
  const rules = [];

  if (houseRules.toLowerCase().includes("smoking")) {
    rules.push({ icon: "🚭", text: "No smoking" });
  }
  if (houseRules.toLowerCase().includes("pet")) {
    rules.push({ icon: "🐾", text: "No pets" });
  }
  if (
    houseRules.toLowerCase().includes("party") ||
    houseRules.toLowerCase().includes("event")
  ) {
    rules.push({ icon: "🎉", text: "No parties or events" });
  }
  if (
    houseRules.toLowerCase().includes("deposit") ||
    houseRules.toLowerCase().includes("security")
  ) {
    rules.push({ icon: "🛡️", text: "Security deposit required" });
  }

  // If no specific rules found, show generic ones
  if (rules.length === 0) {
    rules.push(
      { icon: "🚭", text: "No smoking" },
      { icon: "🐾", text: "No pets" },
      { icon: "🎉", text: "No parties or events" },
      { icon: "🛡️", text: "Security deposit required" }
    );
  }

  return rules;
};
