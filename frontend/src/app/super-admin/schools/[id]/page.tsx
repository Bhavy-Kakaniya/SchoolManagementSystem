"use client";

import { getSchoolByIdService, getSchoolAdminsService } from "@/services/school.service";
import { School, SchoolAdmin } from "@/types/school";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";

export default function SchoolInfoPage() {
    const [school, setSchool] = useState<School | null>(null);
    const [admins, setAdmins] = useState<SchoolAdmin[]>([]);

    const [loading, setLoading] = useState(true);
    const [adminLoading, setAdminLoading] = useState(true);

    const [error, setError] = useState<string | null>(null);

    const { id } = useParams();
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!id) return;
                const schoolId = id.toString();
                const [schoolResult, adminResult] = await Promise.all([
                    getSchoolByIdService(schoolId),
                    getSchoolAdminsService(schoolId)
                ]);

                setSchool(schoolResult);
                setAdmins(adminResult.data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Something went wrong");
                }
            } finally {
                setLoading(false);
                setAdminLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading) {
        return <p>Loading school...</p>;
    }
    if (error) {
        return <p>{error}</p>;
    }
    if (!school) {
        return <p>School not found</p>;
    }
    return (
        <div>
            <p>School ID: {school.id}</p>
            <p>Name: {school.name}</p>
            <p>Slug: {school.slug}</p>
            <p>Logo: {school.logo ? school.logo : "No logo"}</p>

            <Button variant="contained" onClick={() => router.push(`/super-admin/schools/${id}/edit`)}>Edit school</Button>
            <Button variant="contained" onClick={() => router.push(`/super-admin/schools/${id}/admin/create`)}>Create School Admin</Button>

            <h2>School Admins</h2>

            {adminLoading ? (
                <p>Loading admins...</p>
            ) : !admins || admins.length === 0 ? (
                <p>No School Admin found</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>

                    <tbody>
                        {admins.map((admin) => (
                            <tr key={admin.id}>
                                <td>{admin.name}</td>
                                <td>{admin.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}