"use client"

import { Student } from "@/types/student";
import { useState } from "react";

interface StudentTableProps {
    students: Student[];
    onView: (student: Student) => void;
}

export default function StudentTable({students, onView}: StudentTableProps){
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const open = Boolean();
}