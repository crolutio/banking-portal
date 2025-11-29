module.exports = [
"[project]/AI Agents/Future_Banking/v0-bank-of-the-future/lib/format.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Utility functions for formatting
__turbopack_context__.s([
    "formatAccountNumber",
    ()=>formatAccountNumber,
    "formatCardNumber",
    ()=>formatCardNumber,
    "formatCurrency",
    ()=>formatCurrency,
    "formatDate",
    ()=>formatDate,
    "formatDateTime",
    ()=>formatDateTime,
    "formatNumber",
    ()=>formatNumber,
    "formatPercentage",
    ()=>formatPercentage,
    "formatRelativeTime",
    ()=>formatRelativeTime,
    "getCategoryColor",
    ()=>getCategoryColor,
    "getSeverityColor",
    ()=>getSeverityColor,
    "getStatusColor",
    ()=>getStatusColor,
    "maskPII",
    ()=>maskPII
]);
function formatCurrency(amount, currency = "AED") {
    return new Intl.NumberFormat("en-AE", {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}
function formatNumber(num) {
    return new Intl.NumberFormat("en-AE").format(num);
}
function formatDate(date) {
    return new Intl.DateTimeFormat("en-AE", {
        year: "numeric",
        month: "short",
        day: "numeric"
    }).format(new Date(date));
}
function formatDateTime(date) {
    return new Intl.DateTimeFormat("en-AE", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    }).format(new Date(date));
}
function formatRelativeTime(date) {
    const now = new Date();
    const then = new Date(date);
    const diffMs = now.getTime() - then.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return formatDate(date);
}
function formatAccountNumber(accountNumber, masked = true) {
    if (masked) {
        return "••••" + accountNumber.slice(-4);
    }
    return accountNumber;
}
function formatCardNumber(lastFour) {
    return `•••• •••• •••• ${lastFour}`;
}
function formatPercentage(value) {
    return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
}
function maskPII(text, type) {
    switch(type){
        case "email":
            const [local, domain] = text.split("@");
            return `${local.slice(0, 2)}***@${domain}`;
        case "phone":
            return `***-***-${text.slice(-4)}`;
        case "name":
            const parts = text.split(" ");
            return parts.map((p, i)=>i === 0 ? p : p[0] + "***").join(" ");
        case "account":
            return `****${text.slice(-4)}`;
        default:
            return text;
    }
}
function getCategoryColor(category) {
    const colors = {
        groceries: "bg-emerald-500/20 text-emerald-400",
        restaurants: "bg-orange-500/20 text-orange-400",
        shopping: "bg-pink-500/20 text-pink-400",
        entertainment: "bg-purple-500/20 text-purple-400",
        utilities: "bg-blue-500/20 text-blue-400",
        transport: "bg-yellow-500/20 text-yellow-400",
        healthcare: "bg-red-500/20 text-red-400",
        travel: "bg-cyan-500/20 text-cyan-400",
        transfer: "bg-indigo-500/20 text-indigo-400",
        salary: "bg-green-500/20 text-green-400",
        investment: "bg-teal-500/20 text-teal-400",
        fees: "bg-gray-500/20 text-gray-400",
        other: "bg-gray-500/20 text-gray-400"
    };
    return colors[category] || colors.other;
}
function getSeverityColor(severity) {
    const colors = {
        low: "bg-blue-500/20 text-blue-400 border-blue-500/30",
        medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
        high: "bg-orange-500/20 text-orange-400 border-orange-500/30",
        critical: "bg-red-500/20 text-red-400 border-red-500/30"
    };
    return colors[severity] || colors.low;
}
function getStatusColor(status) {
    const colors = {
        active: "bg-emerald-500/20 text-emerald-400",
        open: "bg-yellow-500/20 text-yellow-400",
        investigating: "bg-blue-500/20 text-blue-400",
        resolved: "bg-emerald-500/20 text-emerald-400",
        escalated: "bg-red-500/20 text-red-400",
        closed: "bg-gray-500/20 text-gray-400",
        pending: "bg-yellow-500/20 text-yellow-400",
        completed: "bg-emerald-500/20 text-emerald-400",
        failed: "bg-red-500/20 text-red-400",
        frozen: "bg-blue-500/20 text-blue-400"
    };
    return colors[status] || colors.pending;
}
}),
"[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/page-header.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PageHeader",
    ()=>PageHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/lib/utils.ts [app-ssr] (ecmascript)");
;
;
function PageHeader({ title, description, children, className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6", className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl md:text-3xl font-bold tracking-tight text-foreground text-balance",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/page-header.tsx",
                        lineNumber: 15,
                        columnNumber: 9
                    }, this),
                    description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted-foreground mt-1 text-pretty",
                        children: description
                    }, void 0, false, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/page-header.tsx",
                        lineNumber: 16,
                        columnNumber: 25
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/page-header.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, this),
            children && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: children
            }, void 0, false, {
                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/page-header.tsx",
                lineNumber: 18,
                columnNumber: 20
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/page-header.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
}),
"[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/card.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card,
    "CardAction",
    ()=>CardAction,
    "CardContent",
    ()=>CardContent,
    "CardDescription",
    ()=>CardDescription,
    "CardFooter",
    ()=>CardFooter,
    "CardHeader",
    ()=>CardHeader,
    "CardTitle",
    ()=>CardTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/lib/utils.ts [app-ssr] (ecmascript)");
;
;
function Card({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/card.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
function CardHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/card.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
function CardTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('leading-none font-semibold', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/card.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
function CardDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('text-muted-foreground text-sm', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/card.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
function CardAction({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-action",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/card.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
function CardContent({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-content",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('px-6', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/card.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
function CardFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex items-center px-6 [.border-t]:pt-6', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/card.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/input.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/lib/utils.ts [app-ssr] (ecmascript)");
;
;
function Input({ className, type, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: type,
        "data-slot": "input",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm', 'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]', 'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/input.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/label.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Label",
    ()=>Label
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/@radix-ui/react-label/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
function Label({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "label",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/label.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/select.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Select",
    ()=>Select,
    "SelectContent",
    ()=>SelectContent,
    "SelectGroup",
    ()=>SelectGroup,
    "SelectItem",
    ()=>SelectItem,
    "SelectLabel",
    ()=>SelectLabel,
    "SelectScrollDownButton",
    ()=>SelectScrollDownButton,
    "SelectScrollUpButton",
    ()=>SelectScrollUpButton,
    "SelectSeparator",
    ()=>SelectSeparator,
    "SelectTrigger",
    ()=>SelectTrigger,
    "SelectValue",
    ()=>SelectValue
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/@radix-ui/react-select/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript) <export default as CheckIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDownIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUpIcon$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-ssr] (ecmascript) <export default as ChevronUpIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function Select({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "select",
        ...props
    }, void 0, false, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/select.tsx",
        lineNumber: 12,
        columnNumber: 10
    }, this);
}
function SelectGroup({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group"], {
        "data-slot": "select-group",
        ...props
    }, void 0, false, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/select.tsx",
        lineNumber: 18,
        columnNumber: 10
    }, this);
}
function SelectValue({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Value"], {
        "data-slot": "select-value",
        ...props
    }, void 0, false, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/select.tsx",
        lineNumber: 24,
        columnNumber: 10
    }, this);
}
function SelectTrigger({ className, size = 'default', children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "select-trigger",
        "data-size": size,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
        ...props,
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                asChild: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__["ChevronDownIcon"], {
                    className: "size-4 opacity-50"
                }, void 0, false, {
                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/select.tsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/select.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/select.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
function SelectContent({ className, children, position = 'popper', ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Portal"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Content"], {
            "data-slot": "select-content",
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md', position === 'popper' && 'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1', className),
            position: position,
            ...props,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectScrollUpButton, {}, void 0, false, {
                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/select.tsx",
                    lineNumber: 72,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Viewport"], {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('p-1', position === 'popper' && 'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1'),
                    children: children
                }, void 0, false, {
                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/select.tsx",
                    lineNumber: 73,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectScrollDownButton, {}, void 0, false, {
                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/select.tsx",
                    lineNumber: 82,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/select.tsx",
            lineNumber: 61,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/select.tsx",
        lineNumber: 60,
        columnNumber: 5
    }, this);
}
function SelectLabel({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
        "data-slot": "select-label",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('text-muted-foreground px-2 py-1.5 text-xs', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/select.tsx",
        lineNumber: 93,
        columnNumber: 5
    }, this);
}
function SelectItem({ className, children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Item"], {
        "data-slot": "select-item",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2", className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute right-2 flex size-3.5 items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ItemIndicator"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__["CheckIcon"], {
                        className: "size-4"
                    }, void 0, false, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/select.tsx",
                        lineNumber: 117,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/select.tsx",
                    lineNumber: 116,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/select.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ItemText"], {
                children: children
            }, void 0, false, {
                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/select.tsx",
                lineNumber: 120,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/select.tsx",
        lineNumber: 107,
        columnNumber: 5
    }, this);
}
function SelectSeparator({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Separator"], {
        "data-slot": "select-separator",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('bg-border pointer-events-none -mx-1 my-1 h-px', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/select.tsx",
        lineNumber: 130,
        columnNumber: 5
    }, this);
}
function SelectScrollUpButton({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollUpButton"], {
        "data-slot": "select-scroll-up-button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex cursor-default items-center justify-center py-1', className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUpIcon$3e$__["ChevronUpIcon"], {
            className: "size-4"
        }, void 0, false, {
            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/select.tsx",
            lineNumber: 151,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/select.tsx",
        lineNumber: 143,
        columnNumber: 5
    }, this);
}
function SelectScrollDownButton({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollDownButton"], {
        "data-slot": "select-scroll-down-button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex cursor-default items-center justify-center py-1', className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__["ChevronDownIcon"], {
            className: "size-4"
        }, void 0, false, {
            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/select.tsx",
            lineNumber: 169,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/select.tsx",
        lineNumber: 161,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/tabs.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Tabs",
    ()=>Tabs,
    "TabsContent",
    ()=>TabsContent,
    "TabsList",
    ()=>TabsList,
    "TabsTrigger",
    ()=>TabsTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/@radix-ui/react-tabs/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
function Tabs({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "tabs",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex flex-col gap-2', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/tabs.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
function TabsList({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["List"], {
        "data-slot": "tabs-list",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/tabs.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
function TabsTrigger({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "tabs-trigger",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/tabs.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
function TabsContent({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Content"], {
        "data-slot": "tabs-content",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex-1 outline-none', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/tabs.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/badge.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Badge",
    ()=>Badge,
    "badgeVariants",
    ()=>badgeVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/@radix-ui/react-slot/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/class-variance-authority/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
;
const badgeVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cva"])('inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden', {
    variants: {
        variant: {
            default: 'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
            secondary: 'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
            destructive: 'border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
            outline: 'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground'
        }
    },
    defaultVariants: {
        variant: 'default'
    }
});
function Badge({ className, variant, asChild = false, ...props }) {
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Slot"] : 'span';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "badge",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(badgeVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/badge.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/dialog.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Dialog",
    ()=>Dialog,
    "DialogClose",
    ()=>DialogClose,
    "DialogContent",
    ()=>DialogContent,
    "DialogDescription",
    ()=>DialogDescription,
    "DialogFooter",
    ()=>DialogFooter,
    "DialogHeader",
    ()=>DialogHeader,
    "DialogOverlay",
    ()=>DialogOverlay,
    "DialogPortal",
    ()=>DialogPortal,
    "DialogTitle",
    ()=>DialogTitle,
    "DialogTrigger",
    ()=>DialogTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/@radix-ui/react-dialog/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as XIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function Dialog({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "dialog",
        ...props
    }, void 0, false, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/dialog.tsx",
        lineNumber: 12,
        columnNumber: 10
    }, this);
}
function DialogTrigger({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "dialog-trigger",
        ...props
    }, void 0, false, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/dialog.tsx",
        lineNumber: 18,
        columnNumber: 10
    }, this);
}
function DialogPortal({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Portal"], {
        "data-slot": "dialog-portal",
        ...props
    }, void 0, false, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/dialog.tsx",
        lineNumber: 24,
        columnNumber: 10
    }, this);
}
function DialogClose({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Close"], {
        "data-slot": "dialog-close",
        ...props
    }, void 0, false, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/dialog.tsx",
        lineNumber: 30,
        columnNumber: 10
    }, this);
}
function DialogOverlay({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Overlay"], {
        "data-slot": "dialog-overlay",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/dialog.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
function DialogContent({ className, children, showCloseButton = true, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogPortal, {
        "data-slot": "dialog-portal",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogOverlay, {}, void 0, false, {
                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/dialog.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Content"], {
                "data-slot": "dialog-content",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg', className),
                ...props,
                children: [
                    children,
                    showCloseButton && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Close"], {
                        "data-slot": "dialog-close",
                        className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__["XIcon"], {}, void 0, false, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/dialog.tsx",
                                lineNumber: 74,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "sr-only",
                                children: "Close"
                            }, void 0, false, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/dialog.tsx",
                                lineNumber: 75,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/dialog.tsx",
                        lineNumber: 70,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/dialog.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/dialog.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
function DialogHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "dialog-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex flex-col gap-2 text-center sm:text-left', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/dialog.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, this);
}
function DialogFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "dialog-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/dialog.tsx",
        lineNumber: 95,
        columnNumber: 5
    }, this);
}
function DialogTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Title"], {
        "data-slot": "dialog-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('text-lg leading-none font-semibold', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/dialog.tsx",
        lineNumber: 111,
        columnNumber: 5
    }, this);
}
function DialogDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Description"], {
        "data-slot": "dialog-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('text-muted-foreground text-sm', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/dialog.tsx",
        lineNumber: 124,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/textarea.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Textarea",
    ()=>Textarea
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/lib/utils.ts [app-ssr] (ecmascript)");
;
;
function Textarea({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
        "data-slot": "textarea",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/textarea.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/tooltip.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Tooltip",
    ()=>Tooltip,
    "TooltipContent",
    ()=>TooltipContent,
    "TooltipProvider",
    ()=>TooltipProvider,
    "TooltipTrigger",
    ()=>TooltipTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/@radix-ui/react-tooltip/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
function TooltipProvider({ delayDuration = 0, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Provider"], {
        "data-slot": "tooltip-provider",
        delayDuration: delayDuration,
        ...props
    }, void 0, false, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/tooltip.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
function Tooltip({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TooltipProvider, {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"], {
            "data-slot": "tooltip",
            ...props
        }, void 0, false, {
            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/tooltip.tsx",
            lineNumber: 26,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/tooltip.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
function TooltipTrigger({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "tooltip-trigger",
        ...props
    }, void 0, false, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/tooltip.tsx",
        lineNumber: 34,
        columnNumber: 10
    }, this);
}
function TooltipContent({ className, sideOffset = 0, children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Portal"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Content"], {
            "data-slot": "tooltip-content",
            sideOffset: sideOffset,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('bg-foreground text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance', className),
            ...props,
            children: [
                children,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Arrow"], {
                    className: "bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]"
                }, void 0, false, {
                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/tooltip.tsx",
                    lineNumber: 55,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/tooltip.tsx",
            lineNumber: 45,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/tooltip.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ai/citation-badge.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CitationBadge",
    ()=>CitationBadge,
    "ConfidenceIndicator",
    ()=>ConfidenceIndicator,
    "DataUsedBadges",
    ()=>DataUsedBadges
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/badge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/tooltip.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/file-text.js [app-ssr] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$database$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Database$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/database.js [app-ssr] (ecmascript) <export default as Database>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/book-open.js [app-ssr] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scroll$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ScrollText$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/scroll-text.js [app-ssr] (ecmascript) <export default as ScrollText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/users.js [app-ssr] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-ssr] (ecmascript) <export default as ShieldCheck>");
;
;
;
;
;
const citationIcons = {
    account_ledger: __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$database$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Database$3e$__["Database"],
    policy: __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"],
    product_terms: __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"],
    transaction_history: __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scroll$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ScrollText$3e$__["ScrollText"],
    crm_notes: __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
    risk_rules: __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"]
};
const citationLabels = {
    account_ledger: "Account Ledger",
    policy: "Policy",
    product_terms: "Product Terms",
    transaction_history: "Transactions",
    crm_notes: "CRM Notes",
    risk_rules: "Risk Rules"
};
function CitationBadge({ citation, source, type, excerpt, className }) {
    // Support both usage patterns: citation object or individual props
    const resolvedType = citation?.type ?? type ?? "policy";
    const resolvedSource = citation?.source ?? source ?? "Source";
    const resolvedExcerpt = citation?.excerpt ?? excerpt;
    const Icon = citationIcons[resolvedType];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TooltipProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                    asChild: true,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                        variant: "outline",
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("gap-1.5 py-1 px-2 text-xs font-normal cursor-help", "bg-primary/5 border-primary/20 text-primary hover:bg-primary/10", className),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                className: "h-3 w-3"
                            }, void 0, false, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ai/citation-badge.tsx",
                                lineNumber: 54,
                                columnNumber: 13
                            }, this),
                            resolvedSource
                        ]
                    }, void 0, true, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ai/citation-badge.tsx",
                        lineNumber: 46,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ai/citation-badge.tsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TooltipContent"], {
                    side: "top",
                    className: "max-w-xs",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-medium",
                                children: citationLabels[resolvedType]
                            }, void 0, false, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ai/citation-badge.tsx",
                                lineNumber: 60,
                                columnNumber: 13
                            }, this),
                            resolvedExcerpt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-muted-foreground",
                                children: [
                                    "“",
                                    resolvedExcerpt,
                                    "”"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ai/citation-badge.tsx",
                                lineNumber: 61,
                                columnNumber: 33
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ai/citation-badge.tsx",
                        lineNumber: 59,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ai/citation-badge.tsx",
                    lineNumber: 58,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ai/citation-badge.tsx",
            lineNumber: 44,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ai/citation-badge.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
function DataUsedBadges({ dataUsed, className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex flex-wrap gap-1.5", className),
        children: dataUsed.map((data, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                variant: "secondary",
                className: "text-xs font-normal py-0.5 px-2 bg-muted/50",
                children: data
            }, index, false, {
                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ai/citation-badge.tsx",
                lineNumber: 78,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ai/citation-badge.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
function ConfidenceIndicator({ confidence, className }) {
    const colors = {
        high: "bg-emerald-500",
        medium: "bg-yellow-500",
        low: "bg-orange-500"
    };
    const labels = {
        high: "High Confidence",
        medium: "Medium Confidence",
        low: "Low Confidence"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-2 text-xs text-muted-foreground", className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-0.5",
                children: [
                    0,
                    1,
                    2
                ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("w-1.5 h-3 rounded-sm", i <= (confidence === "high" ? 2 : confidence === "medium" ? 1 : 0) ? colors[confidence] : "bg-muted")
                    }, i, false, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ai/citation-badge.tsx",
                        lineNumber: 108,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ai/citation-badge.tsx",
                lineNumber: 106,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: labels[confidence]
            }, void 0, false, {
                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ai/citation-badge.tsx",
                lineNumber: 117,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ai/citation-badge.tsx",
        lineNumber: 105,
        columnNumber: 5
    }, this);
}
}),
"[project]/AI Agents/Future_Banking/v0-bank-of-the-future/lib/supabase/client.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/@supabase/ssr/dist/module/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/@supabase/ssr/dist/module/createBrowserClient.js [app-ssr] (ecmascript)");
;
let client = null;
function createClient() {
    if (client) return client;
    client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createBrowserClient"])(("TURBOPACK compile-time value", "https://anltobzjhkgwyachuuqw.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFubHRvYnpqaGtnd3lhY2h1dXF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0MTY0OTEsImV4cCI6MjA3OTk5MjQ5MX0.Q4daNGeftXumNxbuwtclqnr4CIwQTtvxWm_Qr4DgS2k"));
    return client;
}
}),
"[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PaymentsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$role$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/lib/role-context.tsx [app-ssr] (ecmascript)");
// removed getAccountsByUserId import
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/lib/format.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$page$2d$header$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/page-header.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/input.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/label.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/select.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/tabs.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/badge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/dialog.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/textarea.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ai$2f$citation$2d$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ai/citation-badge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-ssr] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/send.js [app-ssr] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/globe.js [app-ssr] (ecmascript) <export default as Globe>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Building$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/building.js [app-ssr] (ecmascript) <export default as Building>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/plus.js [app-ssr] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-ssr] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/bot.js [app-ssr] (ecmascript) <export default as Bot>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-ssr] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-ssr] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-ssr] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/lib/supabase/client.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const mockBeneficiaries = [
    {
        id: "ben_1",
        name: "Sarah Johnson Savings",
        bankName: "Bank of the Future",
        accountNumber: "1234567891",
        type: "internal"
    },
    {
        id: "ben_2",
        name: "Ahmed Al-Rashid",
        bankName: "Emirates NBD",
        accountNumber: "2345678901",
        type: "domestic"
    },
    {
        id: "ben_3",
        name: "TechStart Solutions",
        bankName: "Bank of the Future",
        accountNumber: "3456789012",
        type: "internal"
    },
    {
        id: "ben_4",
        name: "John Smith",
        bankName: "HSBC UK",
        accountNumber: "GB82WEST12345698765432",
        type: "international",
        country: "United Kingdom"
    }
];
function TransferForm() {
    const { currentUser } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$role$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRole"])();
    const [accounts, setAccounts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        async function fetchAccounts() {
            if (!currentUser?.id) return;
            const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
            const { data } = await supabase.from('accounts').select('*').eq('user_id', currentUser.id);
            if (data) {
                setAccounts(data.map((a)=>({
                        id: a.id,
                        userId: a.user_id,
                        name: a.name,
                        type: a.type,
                        currency: a.currency,
                        balance: Number(a.balance),
                        availableBalance: Number(a.available_balance),
                        accountNumber: a.account_number,
                        iban: a.iban,
                        status: a.status
                    })));
            }
        }
        fetchAccounts();
    }, [
        currentUser
    ]);
    const [transferType, setTransferType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("internal");
    const [fromAccount, setFromAccount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [toBeneficiary, setToBeneficiary] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [amount, setAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [reference, setReference] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [showConfirm, setShowConfirm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isProcessing, setIsProcessing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showSuccess, setShowSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const filteredBeneficiaries = mockBeneficiaries.filter((b)=>b.type === transferType);
    const selectedBeneficiary = mockBeneficiaries.find((b)=>b.id === toBeneficiary);
    const selectedFromAccount = accounts.find((a)=>a.id === fromAccount);
    const getFees = ()=>{
        if (transferType === "internal") return 0;
        if (transferType === "domestic") return 15;
        return Math.min(500, Math.max(25, Number.parseFloat(amount || "0") * 0.005));
    };
    const getETA = ()=>{
        if (transferType === "internal") return "Instant";
        if (transferType === "domestic") return "1-2 business days";
        return "3-5 business days";
    };
    const handleTransfer = async ()=>{
        setIsProcessing(true);
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
        const numericAmount = Number(amount);
        try {
            // 1. Create debit transaction
            const { error: txError } = await supabase.from('transactions').insert({
                account_id: fromAccount,
                amount: numericAmount,
                type: 'debit',
                category: 'transfer',
                description: `Transfer to ${selectedBeneficiary?.name}`,
                merchant: selectedBeneficiary?.name,
                status: 'completed',
                balance_after: (selectedFromAccount?.balance || 0) - numericAmount,
                date: new Date().toISOString()
            });
            if (txError) throw txError;
            // 2. Update account balance
            if (selectedFromAccount) {
                await supabase.from('accounts').update({
                    balance: selectedFromAccount.balance - numericAmount,
                    available_balance: selectedFromAccount.availableBalance - numericAmount
                }).eq('id', fromAccount);
            }
            setShowConfirm(false);
            setShowSuccess(true);
        // Ideally refresh accounts here
        } catch (error) {
            console.error("Transfer failed", error);
        } finally{
            setIsProcessing(false);
        }
    };
    const aiExplanation = {
        message: `Transfer of ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(Number.parseFloat(amount || "0"))} to ${selectedBeneficiary?.name || "beneficiary"}. ` + `Fee: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(getFees())}. Expected arrival: ${getETA()}.`,
        citations: [
            {
                id: "cite_1",
                source: "Fees Policy v2.1",
                type: "policy"
            },
            {
                id: "cite_2",
                source: "Transfer Terms",
                type: "product_terms"
            }
        ],
        dataUsed: [
            "Account Balance",
            "Fees Schedule",
            "Transfer Limits"
        ]
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tabs"], {
                value: transferType,
                onValueChange: (v)=>setTransferType(v),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsList"], {
                    className: "grid w-full grid-cols-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsTrigger"], {
                            value: "internal",
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Building$3e$__["Building"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                    lineNumber: 185,
                                    columnNumber: 13
                                }, this),
                                "Internal"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                            lineNumber: 184,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsTrigger"], {
                            value: "domestic",
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                    lineNumber: 189,
                                    columnNumber: 13
                                }, this),
                                "Domestic"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                            lineNumber: 188,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsTrigger"], {
                            value: "international",
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                    lineNumber: 193,
                                    columnNumber: 13
                                }, this),
                                "International"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                            lineNumber: 192,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                    lineNumber: 183,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                lineNumber: 182,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-6 lg:grid-cols-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-2 space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                        htmlFor: "fromAccount",
                                        children: "From Account"
                                    }, void 0, false, {
                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                        lineNumber: 202,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                        value: fromAccount,
                                        onValueChange: setFromAccount,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                id: "fromAccount",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                    placeholder: "Select account"
                                                }, void 0, false, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                                    lineNumber: 205,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                                lineNumber: 204,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                children: accounts.map((acc)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                        value: acc.id,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-between w-full",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: acc.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                                                    lineNumber: 211,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-muted-foreground ml-4",
                                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(acc.availableBalance, acc.currency)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                                                    lineNumber: 212,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                                            lineNumber: 210,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, acc.id, false, {
                                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                                        lineNumber: 209,
                                                        columnNumber: 19
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                                lineNumber: 207,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                        lineNumber: 203,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                lineNumber: 201,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                        htmlFor: "toBeneficiary",
                                        children: "To Beneficiary"
                                    }, void 0, false, {
                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                        lineNumber: 223,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                        value: toBeneficiary,
                                        onValueChange: setToBeneficiary,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                id: "toBeneficiary",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                    placeholder: "Select beneficiary"
                                                }, void 0, false, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                                    lineNumber: 226,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                                lineNumber: 225,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                children: filteredBeneficiaries.map((ben)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                        value: ben.id,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: ben.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                                                    lineNumber: 232,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-muted-foreground text-xs ml-2",
                                                                    children: ben.bankName
                                                                }, void 0, false, {
                                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                                                    lineNumber: 233,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                                            lineNumber: 231,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, ben.id, false, {
                                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                                        lineNumber: 230,
                                                        columnNumber: 19
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                                lineNumber: 228,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                        lineNumber: 224,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                lineNumber: 222,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                        htmlFor: "amount",
                                        children: "Amount (AED)"
                                    }, void 0, false, {
                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                        lineNumber: 242,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                        id: "amount",
                                        type: "number",
                                        placeholder: "0.00",
                                        value: amount,
                                        onChange: (e)=>setAmount(e.target.value),
                                        className: "text-2xl h-14"
                                    }, void 0, false, {
                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                        lineNumber: 243,
                                        columnNumber: 13
                                    }, this),
                                    selectedFromAccount && Number.parseFloat(amount) > selectedFromAccount.availableBalance && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-destructive flex items-center gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                className: "h-3 w-3"
                                            }, void 0, false, {
                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                                lineNumber: 253,
                                                columnNumber: 17
                                            }, this),
                                            "Insufficient balance"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                        lineNumber: 252,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                lineNumber: 241,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                        htmlFor: "reference",
                                        children: "Reference (Optional)"
                                    }, void 0, false, {
                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                        lineNumber: 260,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Textarea"], {
                                        id: "reference",
                                        placeholder: "Add a note for this transfer...",
                                        value: reference,
                                        onChange: (e)=>setReference(e.target.value),
                                        className: "resize-none",
                                        rows: 2
                                    }, void 0, false, {
                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                        lineNumber: 261,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                lineNumber: 259,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                className: "w-full",
                                size: "lg",
                                disabled: !fromAccount || !toBeneficiary || !amount || Number.parseFloat(amount) <= 0,
                                onClick: ()=>setShowConfirm(true),
                                children: [
                                    "Review Transfer",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                        className: "ml-2 h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                        lineNumber: 278,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                lineNumber: 271,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                        lineNumber: 200,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                        className: "bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__["Bot"], {
                                            className: "h-4 w-4 text-primary"
                                        }, void 0, false, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                            lineNumber: 286,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                                            className: "text-sm",
                                            children: "Transfer Assistant"
                                        }, void 0, false, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                            lineNumber: 287,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                    lineNumber: 285,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                lineNumber: 284,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                                className: "space-y-4",
                                children: amount && Number.parseFloat(amount) > 0 && selectedBeneficiary ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-muted-foreground",
                                            children: aiExplanation.message
                                        }, void 0, false, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                            lineNumber: 293,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-muted-foreground",
                                                    children: "Sources:"
                                                }, void 0, false, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                                    lineNumber: 295,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap gap-1",
                                                    children: aiExplanation.citations.map((cite)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ai$2f$citation$2d$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CitationBadge"], {
                                                            citation: cite
                                                        }, cite.id, false, {
                                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                                            lineNumber: 298,
                                                            columnNumber: 23
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                                    lineNumber: 296,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                            lineNumber: 294,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-muted-foreground",
                                                    children: "Data used:"
                                                }, void 0, false, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                                    lineNumber: 303,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ai$2f$citation$2d$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DataUsedBadges"], {
                                                    dataUsed: aiExplanation.dataUsed
                                                }, void 0, false, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                                    lineNumber: 304,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                            lineNumber: 302,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ai$2f$citation$2d$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConfidenceIndicator"], {
                                            confidence: "high"
                                        }, void 0, false, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                            lineNumber: 306,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-muted-foreground",
                                    children: "Enter transfer details and I'll explain fees, estimated arrival time, and any applicable limits."
                                }, void 0, false, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                    lineNumber: 309,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                lineNumber: 290,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                        lineNumber: 283,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                lineNumber: 199,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Dialog"], {
                open: showConfirm,
                onOpenChange: setShowConfirm,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogContent"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogHeader"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                    children: "Confirm Transfer"
                                }, void 0, false, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                    lineNumber: 321,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogDescription"], {
                                    children: "Please review the transfer details before confirming."
                                }, void 0, false, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                    lineNumber: 322,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                            lineNumber: 320,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4 py-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 rounded-lg bg-muted/30 space-y-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-muted-foreground",
                                                    children: "From"
                                                }, void 0, false, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                                    lineNumber: 328,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-medium",
                                                    children: selectedFromAccount?.name
                                                }, void 0, false, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                                    lineNumber: 329,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                            lineNumber: 327,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-muted-foreground",
                                                    children: "To"
                                                }, void 0, false, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                                    lineNumber: 332,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-medium",
                                                    children: selectedBeneficiary?.name
                                                }, void 0, false, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                                    lineNumber: 333,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                            lineNumber: 331,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-muted-foreground",
                                                    children: "Amount"
                                                }, void 0, false, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                                    lineNumber: 336,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-medium",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(Number.parseFloat(amount || "0"))
                                                }, void 0, false, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                                    lineNumber: 337,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                            lineNumber: 335,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-muted-foreground",
                                                    children: "Fee"
                                                }, void 0, false, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                                    lineNumber: 340,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-medium",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(getFees())
                                                }, void 0, false, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                                    lineNumber: 341,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                            lineNumber: 339,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "border-t pt-2 flex justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-muted-foreground",
                                                    children: "Total"
                                                }, void 0, false, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                                    lineNumber: 344,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-bold",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(Number.parseFloat(amount || "0") + getFees())
                                                }, void 0, false, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                                    lineNumber: 345,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                            lineNumber: 343,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                    lineNumber: 326,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-medium flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                                    className: "h-4 w-4 text-primary"
                                                }, void 0, false, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                                    lineNumber: 352,
                                                    columnNumber: 17
                                                }, this),
                                                "Compliance Checks"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                            lineNumber: 351,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2 text-sm text-muted-foreground",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                            className: "h-4 w-4 text-emerald-500"
                                                        }, void 0, false, {
                                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                                            lineNumber: 357,
                                                            columnNumber: 19
                                                        }, this),
                                                        "Sanctions screening: Passed"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                                    lineNumber: 356,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2 text-sm text-muted-foreground",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                            className: "h-4 w-4 text-emerald-500"
                                                        }, void 0, false, {
                                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                                            lineNumber: 361,
                                                            columnNumber: 19
                                                        }, this),
                                                        "Daily limit check: Passed"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                                    lineNumber: 360,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2 text-sm text-muted-foreground",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                            className: "h-4 w-4 text-emerald-500"
                                                        }, void 0, false, {
                                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                                            lineNumber: 365,
                                                            columnNumber: 19
                                                        }, this),
                                                        "Account verification: Verified"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                                    lineNumber: 364,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                            lineNumber: 355,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                    lineNumber: 350,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                            lineNumber: 325,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogFooter"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "outline",
                                    onClick: ()=>setShowConfirm(false),
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                    lineNumber: 373,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    onClick: handleTransfer,
                                    disabled: isProcessing,
                                    children: isProcessing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                className: "mr-2 h-4 w-4 animate-spin"
                                            }, void 0, false, {
                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                                lineNumber: 379,
                                                columnNumber: 19
                                            }, this),
                                            "Processing..."
                                        ]
                                    }, void 0, true) : "Confirm Transfer"
                                }, void 0, false, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                    lineNumber: 376,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                            lineNumber: 372,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                    lineNumber: 319,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                lineNumber: 318,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Dialog"], {
                open: showSuccess,
                onOpenChange: setShowSuccess,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogContent"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center py-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 mx-auto mb-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                        className: "h-8 w-8 text-emerald-500"
                                    }, void 0, false, {
                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                        lineNumber: 395,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                    lineNumber: 394,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-semibold mb-2",
                                    children: "Transfer Initiated"
                                }, void 0, false, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                    lineNumber: 397,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-muted-foreground",
                                    children: [
                                        "Your transfer of ",
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(Number.parseFloat(amount || "0")),
                                        " to ",
                                        selectedBeneficiary?.name,
                                        " has been initiated."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                    lineNumber: 398,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-muted-foreground mt-2",
                                    children: [
                                        "Expected arrival: ",
                                        getETA()
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                    lineNumber: 402,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                            lineNumber: 393,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogFooter"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                className: "w-full",
                                onClick: ()=>{
                                    setShowSuccess(false);
                                    setAmount("");
                                    setReference("");
                                    setToBeneficiary("");
                                },
                                children: "Done"
                            }, void 0, false, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                lineNumber: 405,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                            lineNumber: 404,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                    lineNumber: 392,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                lineNumber: 391,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
        lineNumber: 181,
        columnNumber: 5
    }, this);
}
function BeneficiariesList() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-medium",
                        children: "Saved Beneficiaries"
                    }, void 0, false, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                        lineNumber: 427,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        size: "sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                className: "h-4 w-4 mr-1"
                            }, void 0, false, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                lineNumber: 429,
                                columnNumber: 11
                            }, this),
                            "Add New"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                        lineNumber: 428,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                lineNumber: 426,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3",
                children: mockBeneficiaries.map((ben)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                            className: "p-4 flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `flex items-center justify-center w-10 h-10 rounded-full ${ben.type === "internal" ? "bg-primary/20" : ben.type === "domestic" ? "bg-blue-500/20" : "bg-purple-500/20"}`,
                                            children: ben.type === "internal" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Building$3e$__["Building"], {
                                                className: "h-5 w-5 text-primary"
                                            }, void 0, false, {
                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                                lineNumber: 449,
                                                columnNumber: 21
                                            }, this) : ben.type === "domestic" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                                className: "h-5 w-5 text-blue-500"
                                            }, void 0, false, {
                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                                lineNumber: 451,
                                                columnNumber: 21
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"], {
                                                className: "h-5 w-5 text-purple-500"
                                            }, void 0, false, {
                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                                lineNumber: 453,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                            lineNumber: 439,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-medium",
                                                    children: ben.name
                                                }, void 0, false, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                                    lineNumber: 457,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-muted-foreground",
                                                    children: [
                                                        ben.bankName,
                                                        " • ",
                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatAccountNumber"])(ben.accountNumber)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                                    lineNumber: 458,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                            lineNumber: 456,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                    lineNumber: 438,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                            variant: "secondary",
                                            className: "capitalize",
                                            children: ben.type
                                        }, void 0, false, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                            lineNumber: 464,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "ghost",
                                            size: "icon",
                                            className: "h-8 w-8 text-muted-foreground hover:text-destructive",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                className: "h-4 w-4"
                                            }, void 0, false, {
                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                                lineNumber: 468,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                            lineNumber: 467,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                    lineNumber: 463,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                            lineNumber: 437,
                            columnNumber: 13
                        }, this)
                    }, ben.id, false, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                        lineNumber: 436,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                lineNumber: 434,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
        lineNumber: 425,
        columnNumber: 5
    }, this);
}
function PaymentsPage() {
    const aiQuestions = [
        "What are the transfer fees?",
        "How long do international transfers take?",
        "What's my daily transfer limit?",
        "How do I add a new beneficiary?"
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$page$2d$header$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PageHeader"], {
                title: "Payments & Transfers",
                description: "Send money and manage your beneficiaries"
            }, void 0, false, {
                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                lineNumber: 489,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tabs"], {
                defaultValue: "transfer",
                className: "space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsList"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsTrigger"], {
                                value: "transfer",
                                children: "New Transfer"
                            }, void 0, false, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                lineNumber: 493,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsTrigger"], {
                                value: "beneficiaries",
                                children: "Beneficiaries"
                            }, void 0, false, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                                lineNumber: 494,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                        lineNumber: 492,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsContent"], {
                        value: "transfer",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TransferForm, {}, void 0, false, {
                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                            lineNumber: 498,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                        lineNumber: 497,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabsContent"], {
                        value: "beneficiaries",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BeneficiariesList, {}, void 0, false, {
                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                            lineNumber: 502,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                        lineNumber: 501,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
                lineNumber: 491,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/payments/page.tsx",
        lineNumber: 488,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=AI%20Agents_Future_Banking_v0-bank-of-the-future_7cf49aa1._.js.map