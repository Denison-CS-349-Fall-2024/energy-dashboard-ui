function createFullUrl(baseUrl, endpoint, params) {
  // Create a new URL object
  const url = new URL(endpoint, baseUrl)

  // Append query parameters
  Object.keys(params).forEach((key) => {
    url.searchParams.append(key, params[key])
  })

  return url.toString()
}

export async function makeApiCall(endpoint, params = {}) {
  const baseUrl = "http://localhost:8000"

  const response = await fetch(createFullUrl(baseUrl, endpoint, params))
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(`Error ${response.status}: ${errorData.detail}`)
  }

  return await response.json()
}
