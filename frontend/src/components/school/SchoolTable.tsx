import { School } from "@/types/school";
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";

interface SchoolTableProps {
    schools: School[];
    onEdit: (school: School) => void;
    onDelete: (school: School) => void;
};

export default function SchoolTable({ schools, onEdit, onDelete }: SchoolTableProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectSchool, setSelectSchool] = useState<School | null>(null);
    const handleMenuOpen = () => {
        const open = Boolean(anchorEl); // if null closed else open
    }
    const handleMenuClose = () => { }

    // selectSchool = menu operating on
    // anchorEl = where should the menu open
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Logo</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Slug</TableCell>
                        <TableCell><IconButton><MoreVertIcon>Edit Delete</MoreVertIcon></IconButton></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {schools.map((school) => (
                        <TableRow key={school.id}>
                            <TableCell>{school.logo ? ("Logo") : ("🏫")}</TableCell>
                            <TableCell>{school.name}</TableCell>
                            <TableCell>{school.slug}</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}