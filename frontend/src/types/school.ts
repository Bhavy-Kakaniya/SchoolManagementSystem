export interface CreateSchoolDto {
    name: string;
    slug: string;
    logo?: string;
};

export interface UpdateSchoolDto {
    name?: string;
    slug?: string;
    logo?: string;
};

export interface School {
    id: number;
    name: string;
    slug: string;
    logo?: string;
};

export interface SchoolFormValues {
    name: string;
    slug: string;
    logo: string;
};

export interface CreateSchoolAdminValues {
    name: string;
    email: string;
};

export interface SchoolAdmin {
    id: string;
    name: string;
    email: string;
    createdAt: string;
};