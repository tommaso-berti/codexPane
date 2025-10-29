import React, { useMemo, useState } from "react";
import { TextField, Card, CardContent, Button } from "@mui/material";

/**
 * RoutingPlayground (SIMULATED)
 * No react-router used. It emulates:
 * - path matching (/, /about, /about/secret, /articles/:title, /list)
 * - "navigate" and history (back/forward)
 * - query string for /list?order=ASC|DESC
 * - NavLink-style active UI
 */

function useFakeHistory(initialPath = "/") {
    const [stack, setStack] = useState([initialPath]);
    const [index, setIndex] = useState(0);

    const current = stack[index];

    const push = (to) => {
        const next = stack.slice(0, index + 1).concat(to);
        setStack(next);
        setIndex(next.length - 1);
    };

    const replace = (to) => {
        const next = stack.slice();
        next[index] = to;
        setStack(next);
    };

    const go = (delta) => {
        setIndex((i) => {
            const ni = Math.min(Math.max(0, i + delta), stack.length - 1);
            return ni;
        });
    };

    return { current, push, replace, go, index, stack };
}

function parseUrl(url) {
    const [pathname, search = ""] = url.split("?");
    const params = new URLSearchParams(search);
    return { pathname: pathname || "/", search, params };
}

function joinUrl(pathname, params) {
    const qs = params.toString();
    return qs ? `${pathname}?${qs}` : pathname;
}

function useMatchParam(pathname, pattern) {
    // supports "/articles/:title"
    const pSegs = pattern.split("/").filter(Boolean);
    const uSegs = pathname.split("/").filter(Boolean);

    if (pSegs.length !== uSegs.length) return { match: false, params: {} };

    const params = {};
    for (let i = 0; i < pSegs.length; i++) {
        const p = pSegs[i];
        const u = uSegs[i];
        if (p.startsWith(":")) {
            params[p.slice(1)] = decodeURIComponent(u);
        } else if (p !== u) {
            return { match: false, params: {} };
        }
    }
    return { match: true, params };
}

function Nav({ to, label, currentPath }) {
    const isActive =
        currentPath === to ||
        (to !== "/" && currentPath.startsWith(to + "/"));
    return (
        <button
            onClick={label.onClick ?? label.onClick}
            className={`underline-offset-4 ${
                isActive ? "font-semibold underline" : "hover:underline"
            }`}
            onMouseDown={(e) => e.preventDefault()}
        >
            {/* label can be string or node; to keep simple pass string */}
            {label}
        </button>
    );
}

export default function RoutingPlayground() {
    const history = useFakeHistory("/");
    const { pathname, params } = parseUrl(history.current);
    const [articleSlug, setArticleSlug] = useState("objects");

    // helpers
    const navigate = (to, { replace = false } = {}) =>
        replace ? history.replace(to) : history.push(to);
    const back = () => history.go(-1);
    const forward = () => history.go(1);

    // building URLs safely
    const toArticles = `/articles/${encodeURIComponent(articleSlug)}`;

    // list sorting via query string
    const listParams = useMemo(() => parseUrl(history.current).params, [history.current]);
    const order = listParams.get("order") || "natural";

    const setOrder = (val) => {
        const { params } = parseUrl(history.current);
        const next = new URLSearchParams(params);
        if (val) next.set("order", val);
        else next.delete("order");
        navigate(joinUrl("/list", next));
    };

    // "routes"
    const isRoot = pathname === "/";
    const isAbout = pathname === "/about" || pathname.startsWith("/about/");
    const isAboutSecret = pathname === "/about/secret";
    const { match: isArticle, params: articleParams } = useMatchParam(pathname, "/articles/:title");
    const isList = pathname.startsWith("/list");

    const snippet = `<SimRouter>
  <Nav to="/" />
  <Nav to="/about" />
  <Nav to="/about/secret" />
  <Nav to="/articles/:title" />
  <Nav to="/list?order=ASC|DESC" />
  <Outlet />  // simulated by conditional rendering
</SimRouter>`;

    // UI
    return (
        <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-4 grid gap-4">
                <div className="grid gap-2">
                    <div className="text-sm text-muted-foreground">demo controls (no router imported)</div>
                    <div className="flex items-center gap-3 flex-wrap">
                        <button
                            className="text-blue-600 underline"
                            onClick={() => navigate("/")}
                        >
                            home
                        </button>
                        <span>·</span>
                        <button
                            className="text-blue-600 underline"
                            onClick={() => navigate("/about")}
                        >
                            about
                        </button>
                        <button
                            className="text-blue-600 underline"
                            onClick={() => navigate("/about/secret")}
                        >
                            secret
                        </button>
                        <span>·</span>
                        <TextField
                            size="small"
                            label="article slug"
                            value={articleSlug}
                            onChange={(e) => setArticleSlug(e.target.value)}
                        />
                        <button
                            className="text-blue-600 underline"
                            onClick={() => navigate(toArticles)}
                        >
                            go to {toArticles}
                        </button>
                        <span>·</span>
                        <button
                            className="text-blue-600 underline"
                            onClick={() => navigate("/list")}
                        >
                            list
                        </button>
                        <button
                            className="text-blue-600 underline"
                            onClick={() => navigate("/list?order=ASC")}
                        >
                            list?order=ASC
                        </button>
                        <button
                            className="text-blue-600 underline"
                            onClick={() => navigate("/list?order=DESC")}
                        >
                            list?order=DESC
                        </button>
                    </div>

                    <div className="flex gap-2">
                        <Button className="rounded-2xl" onClick={() => navigate("/about")}>go to about</Button>
                        <Button variant="outline" className="rounded-2xl" onClick={back}>back</Button>
                        <Button variant="outline" className="rounded-2xl" onClick={forward}>forward</Button>
                    </div>

                    <div className="text-xs text-muted-foreground">
                        current url:&nbsp;
                        <code>{history.current}</code>
                    </div>
                </div>

                {/* "Layout" + "Outlet" */}
                <div className="border rounded-2xl p-3 grid gap-3">
                    {/* root index */}
                    {isRoot && (
                        <div className="grid gap-2">
                            <h2 className="text-lg">home</h2>
                            <p>Welcome to the simulated router demo.</p>
                        </div>
                    )}

                    {/* about + nested secret */}
                    {isAbout && (
                        <div className="grid gap-2">
                            <h2 className="text-lg">about</h2>
                            <p>This section renders for <code>/about</code> and stays visible for nested paths.</p>
                            {/* nested outlet */}
                            {isAboutSecret && (
                                <div className="rounded-xl bg-emerald-50 p-3">
                                    🤫 secret content rendered via nested path
                                </div>
                            )}
                        </div>
                    )}

                    {/* dynamic article */}
                    {isArticle && (
                        <article className="grid gap-1">
                            <h2 className="text-lg">article</h2>
                            <div>title param: <strong>{articleParams.title}</strong></div>
                        </article>
                    )}

                    {/* list with query param sorting */}
                    {isList && (
                        <div className="grid gap-2">
                            <h2 className="text-lg">list</h2>
                            <div className="flex gap-2">
                                <Button className="rounded-2xl" onClick={() => setOrder("ASC")}>asc</Button>
                                <Button className="rounded-2xl" onClick={() => setOrder("DESC")}>desc</Button>
                                <Button variant="outline" className="rounded-2xl" onClick={() => setOrder(null)}>natural</Button>
                            </div>
                            <ListView order={order} />
                        </div>
                    )}

                    {/* not found */}
                    {!isRoot && !isAbout && !isArticle && !isList && (
                        <div>not found</div>
                    )}
                </div>

                <div className="text-xs text-muted-foreground mt-2">JSX being executed (simulation)</div>
                <pre className="text-xs overflow-auto p-3 rounded-xl bg-neutral-900 text-neutral-50">
{snippet}
        </pre>
            </CardContent>
        </Card>
    );
}

function ListView({ order }) {
    const numbers = [5, 2, 9, 1, 7];
    const sorted = useMemo(() => {
        if (order === "ASC") return [...numbers].sort((a, b) => a - b);
        if (order === "DESC") return [...numbers].sort((a, b) => b - a);
        return numbers;
    }, [order]);

    return (
        <div>
            <div>order: <code>{order}</code></div>
            <div className="flex gap-2 mt-1">
                {sorted.map((n) => (
                    <span key={n} className="px-2 py-1 border rounded">{n}</span>
                ))}
            </div>
        </div>
    );
}