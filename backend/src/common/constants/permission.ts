export enum Permission {
    STUDENT_READ = "STUDENT_READ",
    STUDENT_CREATE = "STUDENT_CREATE",
    STUDENT_UPDATE = "STUDENT_UPDATE",
    STUDENT_DELETE = "STUDENT_DELETE",
    ATTENDENCE_UPDATE = "ATTENDENCE_UPDATE",
    MARKS_UPDATE = "MARKS_UPDATE",
}

export const RolePermission = {
    ADMIN: ["*"],

    PRINCIPAL: [
        "STUDENT_READ",
        "STUDENT_UPDATE",
        "MARKS_UPDATE",
    ],

    TEACHER: [
        "STUDENT_READ",
        "MARKS_UPDATE",
        "ATTENDANCE_UPDATE"
    ],

    STUDENT: []
}