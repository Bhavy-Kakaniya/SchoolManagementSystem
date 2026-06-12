const BASE_URL = "http://localhost:5000/api/v1";

export const api = async (enpoint: string, options?: RequestInit) => {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(
        `${BASE_URL}${enpoint}`,
        {
            ...options,
            headers: {
                "Content-Type": "application/json",
                Authorization: token ? `Bearer ${token}` : "",
                ...options?.headers // for custom header
            }
        }
    )
    const data = await response.json();
    if(!response.ok) 
        throw new Error(data.message || "Request Failed");

    return data;
}