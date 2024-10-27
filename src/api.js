const apiUrl = "";

export async function getSites(params = {}) {
  return [
    {
      id: "silvy_id",
      solarEdgeId: "silvy_id_solar",
      energyStarId: "silvy_id_eletric",
      siteName: "Silverstein Hall",
      label: "Silverstein Hall",
      imageUrl:
        "https://www.robertsonconstruction.net/wp-content/uploads/2022/02/SA502896-750x750.jpg",
    },
    {
      id: "curtis_id",
      solarEdgeId: "curtis_id_solar",
      energyStarId: "curtis_id_electric",
      siteName: "Curtis Hall",
      label: "Curtis Hall",
      imageUrl:
        "https://denison.edu/sites/default/files/buildings/photos/node/curtis-west-hall.jpg",
    },
    {
      id: "pratt_id",
      solarEdgeId: "pratt_id_solar",
      energyStarId: "pratt_id_electric",
      siteName: "Pratt Hall",
      label: "Pratt Hall",
      imageUrl:
        "https://denison.edu/sites/default/files/buildings/photos/node/myers-IMG_9474b.jpg",
    },
  ];
}

export async function getQuickInsights() {
  return {
    id: "silvy_id",
    solarEdgeId: "silvy_id_solar",
    energyStarId: "silvy_id_eletric",
    installedOn: "2024/10/20",
    lifetimeEnergy: Math.random(),
    recentMonthEnergy: Math.random(),
    energyUnit: "mWh",
  };
}

const randomInRange = (min, max) => Math.random() * (max - min) + min;

// Yearly data generator - reflects seasonal variation
const generateYearData = () => {
  return Array.from(
    { length: 12 },
    (_, i) => 50 + Math.cos((i / 12) * 2 * Math.PI) * 10 + randomInRange(-3, 3),
  );
};

// Monthly data generator - slight upward or downward trend with random variation
const generateMonthData = () => {
  let base = 50;
  return Array.from({ length: 30 }, (_, i) => {
    base += i % 10 === 0 ? randomInRange(-2, 2) : randomInRange(-1, 1);
    return base + randomInRange(-5, 5);
  });
};

// Daily data generator - simulates daily cycle with higher values in middle of the day
const generateDayData = () => {
  return Array.from({ length: 96 }, (_, i) => {
    const timeFactor = 20 + Math.max(0, 10 * Math.sin((i / 96) * 2 * Math.PI));
    return timeFactor + randomInRange(-2, 2);
  });
};

// All data generator - slight variation across a few generalized values
const generateAllData = () => {
  return Array.from({ length: 3 }, () => randomInRange(45, 55));
};

export const getSampleData = () => [
  {
    label: "natural gas",
    data: {
      All: generateAllData(),
      Y: generateYearData(),
      M: generateMonthData(),
      D: generateDayData(),
    },
  },
  {
    label: "solar",
    data: {
      All: generateAllData().map((val) => val - randomInRange(3, 7)),
      Y: generateYearData().map((val) => val + randomInRange(5, 10)),
      M: generateMonthData().map((val) => val + randomInRange(3, 6)),
      D: generateDayData().map((val) => val - randomInRange(5, 8)),
    },
  },
  {
    label: "electric - grid",
    data: {
      All: generateAllData().map((val) => val - randomInRange(2, 4)),
      Y: generateYearData().map((val) => val + randomInRange(3, 6)),
      M: generateMonthData().map((val) => val + randomInRange(5, 8)),
      D: generateDayData().map((val) => val - randomInRange(2, 5)),
    },
  },
];
