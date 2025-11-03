import * as React from "react";
import {
    Stack,
    Button,
    Snackbar,
    Alert,
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
    LinearProgress, CircularProgress,
    Backdrop,
    Paper,
    Typography
} from "@mui/material";

export default function FeedbackPlayground() {
    const [snack, setSnack] = React.useState(false);
    const [dialog, setDialog] = React.useState(false);
    const [busy, setBusy] = React.useState(false);

    const simulate = () => {
        setBusy(true);
        setTimeout(() => setBusy(false), 1200);
    };

    const code = `// snackbar + alert
<Snackbar open={snack} autoHideDuration={2500} onClose={()=>setSnack(false)}>
  <Alert onClose={()=>setSnack(false)} severity="success" variant="filled">Saved</Alert>
</Snackbar>

// dialog confirm
<Dialog open={dialog} onClose={()=>setDialog(false)}>
  <DialogTitle>Delete item?</DialogTitle>
  <DialogContent><DialogContentText>This cannot be undone.</DialogContentText></DialogContent>
  <DialogActions><Button onClick={()=>setDialog(false)}>Cancel</Button><Button color="error" variant="contained">Delete</Button></DialogActions>
</Dialog>

// backdrop + progress
<Backdrop open={busy}><CircularProgress color="inherit" /></Backdrop>`;

    return (
        <Stack spacing={2}>
            <Typography variant="h6">Feedback controls</Typography>

            <Stack direction="row" spacing={1}>
                <Button variant="contained" onClick={() => setSnack(true)}>Show snackbar</Button>
                <Button variant="outlined" onClick={() => setDialog(true)}>Open dialog</Button>
                <Button variant="contained" onClick={simulate}>Run task</Button>
            </Stack>

            <Paper sx={{ p: 2 }}>
                <Typography variant="overline">Inline progress</Typography>
                <LinearProgress sx={{ maxWidth: 320 }} />
            </Paper>

            <Snackbar open={snack} autoHideDuration={2500} onClose={() => setSnack(false)}>
                <Alert onClose={() => setSnack(false)} severity="success" variant="filled" sx={{ width: "100%" }}>
                    Saved
                </Alert>
            </Snackbar>

            <Dialog open={dialog} onClose={() => setDialog(false)}>
                <DialogTitle>Delete item?</DialogTitle>
                <DialogContent>
                    <DialogContentText>This action cannot be undone.</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialog(false)}>Cancel</Button>
                    <Button color="error" variant="contained" onClick={() => setDialog(false)}>Delete</Button>
                </DialogActions>
            </Dialog>

            <Backdrop open={busy} sx={{ color: "#fff", zIndex: (t) => t.zIndex.modal + 1 }}>
                <CircularProgress color="inherit" />
            </Backdrop>

            <Paper sx={{ p: 2, bgcolor: "grey.50" }}>
                <Typography variant="overline">Code</Typography>
                <pre style={{ margin: 0, overflowX: "auto" }}>
          <code>{code}</code>
        </pre>
            </Paper>
        </Stack>
    );
}