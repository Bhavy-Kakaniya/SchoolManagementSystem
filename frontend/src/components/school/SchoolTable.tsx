import { School } from "@/types/school";
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, IconButton, Menu, MenuItem, Button } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface SchoolTableProps {
    schools: School[];
    onEdit: (school: School) => void;
    onDelete: (school: School) => void;
};

export default function SchoolTable({ schools, onEdit, onDelete }: SchoolTableProps) {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // where sould menu appear
    const [selectedSchool, setSelectedSchool] = useState<School | null>(null); // which school does action apply to

    const router = useRouter();
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, school: School) => {
        setAnchorEl(event.currentTarget);
        setSelectedSchool(school);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedSchool(null);
    };

    const handleEdit = () => {
        if (!selectedSchool) return;
        onEdit(selectedSchool);
        handleMenuClose();
    }

    const handleDelete = () => {
        if (!selectedSchool) return;
        onDelete(selectedSchool);
        handleMenuClose();
    }

    // selectSchool = school the menu is operating on
    // anchorEl = element where should the menu open
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Logo</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Slug</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {schools.map((school) => (
                        <TableRow key={school.id}>
                            <TableCell>{school.logo ? ("Logo") : ("🏫")}</TableCell>
                            <TableCell>
                                <Button onClick={() => router.push(`/super-admin/schools/${school.id}`)}>
                                    {school.name}
                                </Button>
                            </TableCell>
                            <TableCell>{school.slug}</TableCell>
                            <TableCell>
                                <IconButton onClick={(event) => handleMenuOpen(event, school)}>
                                    <MoreVertIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Menu open={open} anchorEl={anchorEl} onClose={handleMenuClose}>
                <MenuItem onClick={handleEdit}>Edit</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Menu>
        </TableContainer>
    )
}   