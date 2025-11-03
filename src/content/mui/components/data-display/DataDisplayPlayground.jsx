import * as React from "react";
import {
    Box,
    Stack,
    Paper,
    Table, TableHead, TableBody, TableRow, TableCell, TableContainer,
    List, ListItemButton, ListItemText, ListItemIcon,
    Chip, Avatar,
    Tooltip, Badge, IconButton,
    Card, CardHeader, CardContent, CardActions, Button, Typography
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import NotificationsIcon from "@mui/icons-material/Notifications";

export default function DataDisplayPlayground() {
    const [tabOrder, setTabOrder] = React.useState({ by: "name", dir: "asc" });
    const rows = React.useMemo(() => ([
        { id: 1, name: "Notebook", price: 1299, stock: 12 },
        { id: 2, name: "Mouse", price: 29, stock: 120 },
        { id: 3, name: "Keyboard", price: 79, stock: 48 }
    ]), []);

    const sorted = React.useMemo(() => {
        const arr = [...rows];
        const { by, dir } = tabOrder;
        arr.sort((a, b) => (a[by] < b[by] ? -1 : a[by] > b[by] ? 1 : 0) * (dir === "asc" ? 1 : -1));
        return arr;
    }, [rows, tabOrder]);

    const code = `// Minimal data display patterns: table, list, chips, card`;

    return (
        <Stack spacing={2}>
            <Paper sx={{ p: 2 }}>
                <Typography variant="overline">Table</Typography>
                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    onClick={() => setTabOrder(o => ({ by: "name", dir: o.dir === "asc" ? "desc" : "asc" }))}
                                    sx={{ cursor: "pointer" }}
                                >
                                    Name
                                </TableCell>
                                <TableCell align="right"
                                           onClick={() => setTabOrder(o => ({ by: "price", dir: o.dir === "asc" ? "desc" : "asc" }))}
                                           sx={{ cursor: "pointer" }}
                                >
                                    Price
                                </TableCell>
                                <TableCell align="right">Stock</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sorted.map(r => (
                                <TableRow key={r.id} hover>
                                    <TableCell>{r.name}</TableCell>
                                    <TableCell align="right">€ {r.price}</TableCell>
                                    <TableCell align="right">{r.stock}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            <Paper sx={{ p: 2 }}>
                <Typography variant="overline">List</Typography>
                <List dense>
                    {["Documents", "Pictures", "Archive"].map((t) => (
                        <ListItemButton key={t}>
                            <ListItemIcon><FolderIcon /></ListItemIcon>
                            <ListItemText primary={t} secondary="Open folder" />
                        </ListItemButton>
                    ))}
                </List>
            </Paper>

            <Paper sx={{ p: 2 }}>
                <Typography variant="overline">Chips and avatars</Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    <Chip label="New" color="success" size="small" />
                    <Chip label="Beta" color="warning" variant="outlined" size="small" />
                    <Chip avatar={<Avatar alt="AC" src="https://i.pravatar.cc/24?img=3" />} label="Alice" />
                    <Chip avatar={<Avatar>JD</Avatar>} label="John" variant="outlined" />
                </Stack>
            </Paper>

            <Paper sx={{ p: 2 }}>
                <Typography variant="overline">Tooltip and badge</Typography>
                <Tooltip title="Notifications">
                    <IconButton aria-label="notifications">
                        <Badge badgeContent={5} color="error">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                </Tooltip>
            </Paper>

            <Paper sx={{ p: 2 }}>
                <Typography variant="overline">Card</Typography>
                <Card sx={{ maxWidth: 360 }}>
                    <CardHeader
                        avatar={<Avatar aria-hidden>NB</Avatar>}
                        title="Notebook 14”"
                        subheader="SKU NB-14-2025"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            Lightweight laptop with 16GB RAM and 512GB SSD.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Details</Button>
                        <Button size="small" variant="contained">Buy</Button>
                    </CardActions>
                </Card>
            </Paper>

            <Paper sx={{ p: 2, bgcolor: "grey.50" }}>
                <Typography variant="overline">Code</Typography>
                <pre style={{ margin: 0, overflowX: "auto" }}>
          <code>{code}</code>
        </pre>
            </Paper>
        </Stack>
    );
}