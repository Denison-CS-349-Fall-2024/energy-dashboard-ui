const apiUrl = ""

export async function getSites(params = {}) {
    return [
        {
            id: "id_123",
            solarEdgeId: "id_solar_1",
            energyStarId: "id_energy_1",
            siteName: "Silverstein Hall",
            label: "Silverstein Hall",
            imageUrl: "https://www.robertsonconstruction.net/wp-content/uploads/2022/02/SA502896-750x750.jpg"
        },
        {
            id: "id_456",
            solarEdgeId: "id_solar_2",
            energyStarId: "id_energy_2",
            siteName: "Curtis Hall",
            label: "Curtis Hall",
            imageUrl: "https://denison.edu/sites/default/files/buildings/photos/node/curtis-west-hall.jpg"
        }
    ]
}


export async function getQuickInsights() {
    return {
        id: "id_123",
        solarEdgeId: "id_solar_1",
        energyStarId: "id_energy_1",
        installedOn: "2024/10/20",
        lifetimeEnergy: Math.random(),
        recentMonthEnergy: Math.random(),
        energyUnit: "mWh"
    }
}

export async function getEnergyData(params = {}) {
    /**
     * input: params = {id: int, chartType: d/m/y/all, time: DateTimeFormat} - id of building
     * return {id: int, solarEdgeId: int, portfolioStarId: int, buildingName: str, data: [30 data points, 12 data points, and so on for each corresponding chartType]}
     */
    
    // Construct the query string from the parameters object
    const queryString = new URLSearchParams(params).toString();
    const url = `${apiUrl}?${queryString}`;

    try {
        const response = await fetch(url);

        // Check if the response is okay (status code in the range 200-299)
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        // Try to parse the response as JSON
        const data = await response.json();
        
        return {
            status: 'success',
            data
        };
    } catch (error) {
        // Handle network errors, invalid URLs, or other issues
        return {
            status: 'error',
            message: error.message
        };
    }
}
