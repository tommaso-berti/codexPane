import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'codexpane-ui-prefs.v1';

const DEFAULT_PREFS = {
    fontSize: 'medium',
    contentWidth: 'wide',
    lineSpacing: 'comfortable',
    codeBlockStyle: 'compact',
    accentPalette: 'blue',
    showCodeLineNumbers: false,
    showCopyCodeButton: true,
    autoExpandCodeExamples: true,
    snippetLanguagePreference: 'js',
    enableInteractiveExamples: true,
    advancedMode: 'default',
    showReadingTime: true,
};

function parseStoredPrefs() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== 'object') return null;
        return parsed;
    } catch {
        return null;
    }
}

function sanitizePrefs(input = {}) {
    const next = { ...DEFAULT_PREFS };

    if (['small', 'medium', 'large'].includes(input.fontSize)) next.fontSize = input.fontSize;
    if (['narrow', 'wide'].includes(input.contentWidth)) next.contentWidth = input.contentWidth;
    if (['compact', 'comfortable'].includes(input.lineSpacing)) next.lineSpacing = input.lineSpacing;
    if (['compact', 'spacious'].includes(input.codeBlockStyle)) next.codeBlockStyle = input.codeBlockStyle;
    if (['blue', 'teal', 'indigo', 'slate'].includes(input.accentPalette)) next.accentPalette = input.accentPalette;
    if (['js', 'ts', 'python'].includes(input.snippetLanguagePreference)) {
        next.snippetLanguagePreference = input.snippetLanguagePreference;
    }
    if (['default', 'focus', 'zen', 'presentation'].includes(input.advancedMode)) {
        next.advancedMode = input.advancedMode;
    }

    for (const key of [
        'showCodeLineNumbers',
        'showCopyCodeButton',
        'autoExpandCodeExamples',
        'enableInteractiveExamples',
        'showReadingTime',
    ]) {
        if (typeof input[key] === 'boolean') next[key] = input[key];
    }

    return next;
}

function persistPrefs(state) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
        // Ignore storage write errors.
    }
}

const initialState = sanitizePrefs(parseStoredPrefs() || {});

const uiPrefsSlice = createSlice({
    name: 'uiPrefs',
    initialState,
    reducers: {
        setUiPref(state, action) {
            const { key, value } = action.payload || {};
            const sanitized = sanitizePrefs({ ...state, [key]: value });
            Object.assign(state, sanitized);
            persistPrefs(state);
        },
        resetUiPrefs() {
            const next = { ...DEFAULT_PREFS };
            persistPrefs(next);
            return next;
        },
    },
});

export const { setUiPref, resetUiPrefs } = uiPrefsSlice.actions;
export default uiPrefsSlice.reducer;
