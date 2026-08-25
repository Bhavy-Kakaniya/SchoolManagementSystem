import { api } from "@/lib/api";
import { CreateSchoolAdminValues, CreateSchoolDto, UpdateSchoolDto } from "@/types/school";

export const getSchools = async () => {
    const response = await api("/super-admin/schools");
    return response.data;
};

export const getSchoolById = async(schoolId: string) => {
    const response = await api(`/super-admin/schools/${schoolId}`);
    return response.data;
};

export const createSchool = async (data: CreateSchoolDto) => {
    return await api("/super-admin/schools", {
        method: "POST",
        body: JSON.stringify(data)
    });
};

export const updateSchool = async(schoolId: string, data: UpdateSchoolDto) => {
    return await api(`/super-admin/schools/${schoolId}`, {
        method: "PUT",
        body: JSON.stringify(data)
    });
};

export const deleteSchool = async(schoolId: string) => {
    return await api(`/super-admin/schools/${schoolId}`, {
        method : "PATCH",
    });
};

export const restoreSchool = async(schoolId:string) => {
    return await api(`/super-admin/schools/${schoolId}/restore`, {
        method: "PATCH"
    });
};

export const createSchoolAdmin = async (schoolId: string, data: CreateSchoolAdminValues) => {
    return await api(`/super-admin/schools/${schoolId}/admin`, {
        method: "POST",
        body: JSON.stringify(data)
    });
};

export const getSchoolAdmins = async (schoolId: string) => {
    return await api(`/super-admin/schools/${schoolId}/admin`);
};