const BASE_URL = "http://localhost:5000/api/v1";

export const api = async (endpoint: string, options?: RequestInit) => {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(
        `${BASE_URL}${endpoint}`,
        {
            ...options,
            headers: {
                "Content-Type": "application/json",
                Authorization: token ? `Bearer ${token}` : "",
                ...options?.headers // for custom header
            }
        }
    );

    const contentType = response.headers.get("content-type");
    
    if(!contentType?.includes("application/json")) {
        const text = await response.text();
        console.error("Non-JSON response: ", {
            status: response.status,
            url: response.url,
            body: text
        });
        throw new Error(`Server rerturned ${response.status} instead of JSON`);
    }
    const data = await response.json();
    if(!response.ok) throw new Error(data.message || "Request failed")
    return data;
}