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