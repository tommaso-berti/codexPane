import * as React from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Drawer,
    List,
    ListItemButton,
    ListItemText,
    Box,
    Tabs,
    Tab,
    Button,
    Paper
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function NavPlayground() {
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [tab, setTab] = React.useState(0);

    const code = `import * as React from "react";
import {
  AppBar, Toolbar, IconButton, Typography, Drawer,
  List, ListItemButton, ListItemText, Box, Tabs, Tab, Button
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function Example() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [tab, setTab] = React.useState(0);

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="open menu" onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
          <Typography sx={{ flexGrow: 1 }} variant="h6">Project</Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <List sx={{ width: 240 }}>
          {["Home","Reports","Settings"].map((t) => (
            <ListItemButton key={t} onClick={() => setDrawerOpen(false)}>
              <ListItemText primary={t} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <Box sx={{ p: 2 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} aria-label="sections">
          <Tab label="Overview" />
          <Tab label="Analytics" />
          <Tab label="Settings" />
        </Tabs>
        <Box sx={{ p: 2, bgcolor: "background.paper", borderRadius: 1, mt: 1 }}>
          {["Overview content","Analytics content","Settings content"][tab]}
        </Box>
      </Box>
    </Box>
  );
}`;

    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="open menu" onClick={() => setDrawerOpen(true)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography sx={{ flexGrow: 1 }} variant="h6">Project</Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <List sx={{ width: 240 }}>
                    {["Home","Reports","Settings"].map((t) => (
                        <ListItemButton key={t} onClick={() => setDrawerOpen(false)}>
                            <ListItemText primary={t} />
                        </ListItemButton>
                    ))}
                </List>
            </Drawer>

            <Box sx={{ p: 2 }}>
                <Tabs value={tab} onChange={(_, v) => setTab(v)} aria-label="sections">
                    <Tab label="Overview" />
                    <Tab label="Analytics" />
                    <Tab label="Settings" />
                </Tabs>
                <Box sx={{ p: 2, bgcolor: "background.paper", borderRadius: 1, mt: 1 }}>
                    {["Overview content","Analytics content","Settings content"][tab]}
                </Box>
            </Box>

            <Paper sx={{ p: 2, bgcolor: "grey.50" }}>
                <Typography variant="overline">Code</Typography>
                <pre style={{ margin: 0, overflowX: "auto" }}>
          <code>{code}</code>
        </pre>
            </Paper>
        </Box>
    );
}