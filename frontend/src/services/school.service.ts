import { api } from "@/lib/api";
import { CreateSchoolAdminValues, CreateSchoolDto, UpdateSchoolDto } from "@/types/school";

export const getSchoolsService = async () => {
    const response = await api("/super-admin/schools");
    return response.data;
};

export const getSchoolByIdService = async(schoolId: string) => {
    const response = await api(`/super-admin/schools/${schoolId}`);
    return response.data;
};

export const createSchoolService = async (data: CreateSchoolDto) => {
    return await api("/super-admin/schools", {
        method: "POST",
        body: JSON.stringify(data)
    });
};

export const updateSchoolService = async(schoolId: string, data: UpdateSchoolDto) => {
    return await api(`/super-admin/schools/${schoolId}`, {
        method: "PUT",
        body: JSON.stringify(data)
    });
};

export const deleteSchoolService = async(schoolId: string) => {
    return await api(`/super-admin/schools/${schoolId}`, {
        method : "PATCH",
    });
};

export const restoreSchoolService = async(schoolId:string) => {
    return await api(`/super-admin/schools/${schoolId}/restore`, {
        method: "PATCH"
    });
};

export const createSchoolAdminService = async (schoolId: string, data: CreateSchoolAdminValues) => {
    return await api(`/super-admin/schools/${schoolId}/admin`, {
        method: "POST",
        body: JSON.stringify(data)
    });
};

export const getSchoolAdminsService = async (schoolId: string) => {
    return await api(`/super-admin/schools/${schoolId}/admin`);
};