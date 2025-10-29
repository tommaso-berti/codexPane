import React, { useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { configureStore, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Card, CardContent, Stack, TextField, Button, Chip, Typography, Alert } from "@mui/material";

/** --- Custom logger middleware (prev/next state) --- */
const logger = storeAPI => next => action => {
  const prev = storeAPI.getState();
  // Group logs per action type for readability
  // (Console output is visible when you open DevTools)
  console.groupCollapsed(`[middleware] ${action.type}`);
  console.log("prev state:", prev);
  const result = next(action);
  console.log("next state:", storeAPI.getState());
  console.groupEnd();
  return result;
};

/** --- Fake API helper --- */
const fakeFetchUser = async (userId) => {
  // Simulate variable latency and occasional failure
  await new Promise(r => setTimeout(r, 600 + Math.random() * 800));
  if (String(userId).toLowerCase() === "error") {
    const err = new Error("User not found");
    err.status = 404;
    throw err;
  }
  return { id: userId, name: `User ${userId}` };
};

/** --- Thunk: users/fetchUserById --- */
const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (userId, thunkAPI) => {
    const user = await fakeFetchUser(userId);
    return user;
  }
);

/** --- Slice consuming thunk lifecycle via extraReducers --- */
const usersSlice = createSlice({
  name: "users",
  initialState: { users: [], isLoading: false, hasError: false, errorMessage: "" },
  reducers: {
    addUser(state, action) { state.users.push(action.payload); }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
        state.errorMessage = "";
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.users.push(action.payload);
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
        state.errorMessage = action.error?.message || "Request failed";
      });
  }
});

/** --- Store with default middleware (includes thunk) + custom logger --- */
const store = configureStore({
  reducer: { users: usersSlice.reducer },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger)
});

function UI() {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState("");
  const { users, isLoading, hasError, errorMessage } = useSelector(s => s.users);

  const code = `// Thunk
export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (userId) => {
    const res = await fakeFetchUser(userId)
    return res
  }
)

// Store
const store = configureStore({
  reducer: { users: usersSlice.reducer },
  middleware: gdm => gdm().concat(logger) // adds custom logger
})`;

  return (
    <Card variant="outlined" sx={{ p: 2 }}>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h6">Middleware pipeline playground</Typography>
          <Typography variant="body2">
            Type an id (e.g. <code>7</code>) and click <b>Fetch user</b>. Try <code>error</code> to see a rejected thunk.
          </Typography>

          <Stack direction="row" spacing={1}>
            <TextField
              size="small"
              label="User id"
              value={userId}
              onChange={e => setUserId(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter" && userId.trim()) {
                  dispatch(fetchUserById(userId.trim()));
                  setUserId("");
                }
              }}
            />
            <Button
              variant="contained"
              disabled={isLoading || !userId.trim()}
              onClick={() => {
                dispatch(fetchUserById(userId.trim()));
                setUserId("");
              }}
            >
              {isLoading ? "Loading..." : "Fetch user"}
            </Button>
          </Stack>

          {hasError && <Alert severity="error">{errorMessage}</Alert>}

          <Stack direction="row" spacing={1} flexWrap="wrap">
            {users.map(u => (
              <Chip key={u.id} label={`${u.name} (#${u.id})`} color="primary" sx={{ mb: 1 }} />
            ))}
          </Stack>

          <Typography variant="subtitle2">Code preview</Typography>
          <pre style={{ margin: 0, padding: 12, borderRadius: 8, overflowX: "auto" }}>
{code}
          </pre>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function MiddlewarePlayground() {
  return (
    <Provider store={store}>
      <UI />
    </Provider>
  );
}