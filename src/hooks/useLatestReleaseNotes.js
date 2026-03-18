import { useEffect, useState } from "react";
import { APP_VERSION } from "../lib/version.js";

const STATIC_RELEASE_NOTES_URL = "/data/release-notes.json";

async function fetchJson(url, signal) {
    const response = await fetch(url, {
        signal,
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    return response.json();
}

async function fetchLatestReleaseNotes(signal, nonce) {
    const cacheBuster = encodeURIComponent(`${APP_VERSION}`);
    const payload = await fetchJson(
        `${STATIC_RELEASE_NOTES_URL}?v=${cacheBuster}&t=${encodeURIComponent(`${nonce}`)}`,
        signal
    );
    const entries = Array.isArray(payload?.entries) ? payload.entries : [];
    const history = Array.isArray(payload?.history) ? payload.history : [];
    const tag = `${payload?.latestTag ?? ""}`;

    if (!tag) {
        return {
            tag: "",
            version: "",
            previousTag: null,
            releaseType: "patch",
            entries: [],
            bodyMarkdown: "",
            releaseUrl: "",
            publishedAt: "",
            history: [],
            source: "none",
            error: "NO_TAGS",
        };
    }

    return {
        tag,
        version: `${payload?.latestVersion ?? tag.replace(/^v/, "")}`,
        previousTag: payload?.previousTag ?? null,
        releaseType: payload?.releaseType ?? "patch",
        entries,
        bodyMarkdown: `${payload?.bodyMarkdown ?? ""}`,
        releaseUrl: `${payload?.releaseUrl ?? ""}`,
        publishedAt: `${payload?.publishedAt ?? ""}`,
        history,
        source: "static",
        error: null,
    };
}

export function useLatestReleaseNotes(enabled = true) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        if (!enabled) return;

        const controller = new AbortController();
        let active = true;

        setIsLoading(true);
        setError(null);

        fetchLatestReleaseNotes(controller.signal, Date.now())
            .then((payload) => {
                if (!active) return;
                setData(payload);
                setIsLoading(false);
            })
            .catch((err) => {
                if (!active || err?.name === "AbortError") return;
                setError(err);
                setIsLoading(false);
            });

        return () => {
            active = false;
            controller.abort();
        };
    }, [enabled, refreshKey]);

    const refetch = () => setRefreshKey((value) => value + 1);

    return { data, isLoading, error, refetch };
}
