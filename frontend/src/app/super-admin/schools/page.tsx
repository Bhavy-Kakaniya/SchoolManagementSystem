"use client"

import { getSchools } from "@/services/school.service";
import { School } from "@/types/school";
import { useEffect, useState } from "react";

// 1. call getSchools
// 2. store schools in states
// 3. loading or error state
// 4. pass data to school table
// SchoolTable.tsx will display schools, render columns render action buttons

export default function SchoolPage() {
    const [schools, setSchools] = useState<School[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSchools = async () => {
        try {
            const response = await getSchools();
            setSchools(response.data);
        } catch (err) {
            console.error(err);
            if (err instanceof Error)
                setError(err.message);
            else
                setError("Something went wrong.")

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSchools();
    }, []);

    if (loading) {
        return <p>Loading schools ...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }
    return (
        <>
            <div>
                <h1>Schools</h1>
                {schools.length === 0 ?
                    (<p>No schools found.</p>)
                    : (
                        <ul>
                            {schools.map((school) => (
                                <li key={school.id}>
                                    {school.name}
                                </li>
                            ))}
                        </ul>
                    )}
            </div>
        </>
    );
}