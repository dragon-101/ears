{js:{ignore:
(async () => {
  try {
    let result = "";
    const checkIcon = "✅"
    const crossIcon = "❌"
    const arg = message.content.replaceAll("-t q-country ", "")
    const res = await fetch("https://gist.githubusercontent.com/bastigamedc/c282786ba79e79c1e23d214301a3f9ae/raw");
    const data = await res.json();
    const questData = data[arg];
    if (!questData) {
        return "❌ No data found for questID " + arg + ". Ask <@1018150165489668227>";
    }
    // Separate countries by availability
    const availableCountries = [];
    const unavailableCountries = [];
    
    for (const [countryCode, config] of Object.entries(questData)) {
        const hasAnyDevice = config.desktop || config.android || config.ios;
        if (hasAnyDevice) {
            availableCountries.push([countryCode, config]);
        } else {
            unavailableCountries.push([countryCode, config]);
        }
    }

    const totalAvailable = availableCountries.length;
    const totalCountries = Object.keys(questData).length;

    result += "\n═══════════════════════════════════════════════════════";
    result += "\nQuest ID: `" + arg + "`";
    result += "\nTotal Countries: " + totalAvailable + "/" + totalCountries;
    result += "\n═══════════════════════════════════════════════════════\n";

    // Show available countries first
    for (const [countryCode, config] of availableCountries) {
        const availableDevices = Object.entries(config)
            .filter(([_, enabled]) => enabled)
            .map(([device]) => device)
            .join(', ');

        result += `\n${checkIcon} Country: ${countryCode}`;
        result += `\n   └─ Desktop: ${config.desktop ? checkIcon : crossIcon} | Android: ${config.android ? checkIcon : crossIcon} | iOS: ${config.ios ? checkIcon : crossIcon}`;
        result += "\n";
    }

    // Show unavailable countries at the end
    for (const [countryCode, config] of unavailableCountries) {
        result += `\n${crossIcon} Country: ${countryCode}`;
        result += `\n   └─ Desktop: ${crossIcon} | Android: ${crossIcon} | iOS: ${crossIcon}`;
        result += "\n";
    }
    return result;
    
  } catch (e) {
    return "❌ Error fetching or processing quests. " + e;
  }
})()
}}
