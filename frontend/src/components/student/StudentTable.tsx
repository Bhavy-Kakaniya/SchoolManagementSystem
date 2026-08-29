"use client"

import { Student } from "@/types/student";
import { MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useState } from "react";

interface StudentTableProps {
    students: Student[];
    onView: (student: Student) => void;
}

export default function StudentTable({ students, onView }: StudentTableProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, student: Student) => {
        setAnchorEl(event.currentTarget);
        setSelectedStudent(student);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedStudent(null);
    };

    const handleView = () => {
        if (!selectedStudent) return;
        onView(selectedStudent);
        handleMenuClose();
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Admission No</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Gender</TableCell>
                        <TableCell>Date Of Birth</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {students.map((student) => (
                        <TableRow key={student.id}>
                            <TableCell>{student.firstName} {student.lastName}</TableCell>
                            <TableCell>{student.admissionNo}</TableCell>
                            <TableCell>{student.user.email}</TableCell>
                            <TableCell>{student.gender}</TableCell>
                            <TableCell>{student.dateOfBirth}</TableCell>
                            <TableCell>
                                <IconButton onClick={(event) => handleMenuOpen(event, student)}><MoreVert /></IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Menu open={open} anchorEl={anchorEl} onClose={handleMenuClose}>
                <MenuItem onClick={handleView}>View</MenuItem>
            </Menu>
        </TableContainer >
    );
};