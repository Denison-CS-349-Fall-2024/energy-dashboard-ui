const apiUrl = ""

export async function getBuildings(params = {}) {
    /**
     * input: null
     * return [{id: int, solarEdgeId: int, portfolioStarId: int, buildingName: str}, ...]
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

export async function getQuickInsights(params = {}) {
    /**
     * input: params = {id: int} - id of building
     * return {id: int, solarEdgeId: int, portfolioStarId: int, buildingName: str, installedOn: date, energyThisMonth: int, lifetimeEnergy: int, energyUnit: str}
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
