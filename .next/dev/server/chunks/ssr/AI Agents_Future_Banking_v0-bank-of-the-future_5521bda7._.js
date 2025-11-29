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
"[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/stat-card.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StatCard",
    ()=>StatCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-ssr] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingDown$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/trending-down.js [app-ssr] (ecmascript) <export default as TrendingDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/minus.js [app-ssr] (ecmascript) <export default as Minus>");
;
;
;
;
function StatCard({ title, value, change, changeLabel, description, trend, icon: Icon, className }) {
    const effectiveChange = trend?.value ?? change;
    const getTrendIcon = ()=>{
        if (effectiveChange === undefined) return null;
        if (effectiveChange > 0) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
            className: "h-3 w-3 text-emerald-500"
        }, void 0, false, {
            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/stat-card.tsx",
            lineNumber: 31,
            columnNumber: 37
        }, this);
        if (effectiveChange < 0) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingDown$3e$__["TrendingDown"], {
            className: "h-3 w-3 text-red-500"
        }, void 0, false, {
            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/stat-card.tsx",
            lineNumber: 32,
            columnNumber: 37
        }, this);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
            className: "h-3 w-3 text-muted-foreground"
        }, void 0, false, {
            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/stat-card.tsx",
            lineNumber: 33,
            columnNumber: 12
        }, this);
    };
    const getTrendColor = ()=>{
        if (effectiveChange === undefined) return "";
        if (effectiveChange > 0) return "text-emerald-500";
        if (effectiveChange < 0) return "text-red-500";
        return "text-muted-foreground";
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("bg-card", className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                className: "flex flex-row items-center justify-between pb-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                        className: "text-sm font-medium text-muted-foreground",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/stat-card.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this),
                    Icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                        className: "h-4 w-4 text-muted-foreground"
                    }, void 0, false, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/stat-card.tsx",
                        lineNumber: 47,
                        columnNumber: 18
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/stat-card.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-2xl font-bold text-foreground",
                        children: value
                    }, void 0, false, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/stat-card.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this),
                    description && !effectiveChange && !changeLabel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-muted-foreground mt-1",
                        children: description
                    }, void 0, false, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/stat-card.tsx",
                        lineNumber: 52,
                        columnNumber: 11
                    }, this),
                    (effectiveChange !== undefined || changeLabel) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1 mt-1",
                        children: [
                            getTrendIcon(),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-xs", getTrendColor()),
                                children: [
                                    effectiveChange !== undefined && `${effectiveChange >= 0 ? "+" : ""}${effectiveChange}%`,
                                    changeLabel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted-foreground ml-1",
                                        children: changeLabel
                                    }, void 0, false, {
                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/stat-card.tsx",
                                        lineNumber: 59,
                                        columnNumber: 31
                                    }, this),
                                    description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted-foreground ml-1",
                                        children: description
                                    }, void 0, false, {
                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/stat-card.tsx",
                                        lineNumber: 60,
                                        columnNumber: 31
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/stat-card.tsx",
                                lineNumber: 57,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/stat-card.tsx",
                        lineNumber: 55,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/stat-card.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/stat-card.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
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
"[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CustomerDashboard",
    ()=>CustomerDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$role$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/lib/role-context.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/lib/format.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$page$2d$header$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/page-header.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$stat$2d$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/stat-card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/badge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/wallet.js [app-ssr] (ecmascript) <export default as Wallet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/arrow-up-right.js [app-ssr] (ecmascript) <export default as ArrowUpRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDownRight$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/arrow-down-right.js [app-ssr] (ecmascript) <export default as ArrowDownRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/send.js [app-ssr] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/credit-card.js [app-ssr] (ecmascript) <export default as CreditCard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-ssr] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$question$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileQuestion$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/file-question.js [app-ssr] (ecmascript) <export default as FileQuestion>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$landmark$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Landmark$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/landmark.js [app-ssr] (ecmascript) <export default as Landmark>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/bot.js [app-ssr] (ecmascript) <export default as Bot>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/calendar.js [app-ssr] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-ssr] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingDown$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/trending-down.js [app-ssr] (ecmascript) <export default as TrendingDown>");
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
function CustomerDashboard() {
    const { currentUser } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$role$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRole"])();
    const [accounts, setAccounts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [transactions, setTransactions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [cards, setCards] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loans, setLoans] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        async function fetchData() {
            if (!currentUser?.id) return;
            setIsLoading(true);
            const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
            // Fetch Accounts
            const { data: accountsData, error: accountsError } = await supabase.from("accounts").select("*").eq("user_id", currentUser.id);
            if (accountsError) console.error("Error fetching accounts:", accountsError);
            const mappedAccounts = (accountsData || []).map((a)=>({
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
                }));
            setAccounts(mappedAccounts);
            // Fetch Transactions (for all accounts)
            if (mappedAccounts.length > 0) {
                const accountIds = mappedAccounts.map((a)=>a.id);
                const { data: txData, error: txError } = await supabase.from("transactions").select("*").in("account_id", accountIds).order("date", {
                    ascending: false
                }).limit(5);
                if (txError) console.error("Error fetching transactions:", txError);
                const mappedTransactions = (txData || []).map((t)=>({
                        id: t.id,
                        accountId: t.account_id,
                        date: t.date,
                        description: t.description,
                        merchant: t.merchant,
                        category: t.category,
                        amount: Number(t.amount),
                        balance: Number(t.balance_after),
                        type: t.type,
                        status: t.status,
                        reference: t.reference
                    }));
                setTransactions(mappedTransactions);
            } else {
                setTransactions([]);
            }
            // Fetch Cards
            const { data: cardsData, error: cardsError } = await supabase.from("cards").select("*").eq("user_id", currentUser.id);
            if (cardsError) console.error("Error fetching cards:", cardsError);
            const mappedCards = (cardsData || []).map((c)=>({
                    id: c.id,
                    userId: c.user_id,
                    accountId: c.account_id,
                    type: c.type,
                    brand: c.brand,
                    lastFour: c.last_four,
                    expiryDate: c.expiry_date,
                    status: c.status,
                    limit: c.credit_limit ? Number(c.credit_limit) : undefined,
                    spent: c.spent_amount ? Number(c.spent_amount) : undefined,
                    cardholderName: c.cardholder_name
                }));
            setCards(mappedCards);
            // Fetch Loans
            const { data: loansData, error: loansError } = await supabase.from("loans").select("*").eq("user_id", currentUser.id);
            if (loansError) console.error("Error fetching loans:", loansError);
            const mappedLoans = (loansData || []).map((l)=>({
                    id: l.id,
                    userId: l.user_id,
                    type: l.type,
                    amount: Number(l.principal_amount),
                    remainingBalance: Number(l.remaining_balance),
                    interestRate: Number(l.interest_rate),
                    term: l.term_months,
                    monthlyPayment: Number(l.monthly_payment),
                    nextPaymentDate: l.next_payment_date,
                    status: l.status
                }));
            setLoans(mappedLoans);
            setIsLoading(false);
        }
        fetchData();
    }, [
        currentUser
    ]);
    const totalBalance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>accounts.reduce((sum, acc)=>{
            const rate = acc.currency === "USD" ? 3.67 : 1;
            return sum + acc.balance * rate;
        }, 0), [
        accounts
    ]);
    const thisMonthSpending = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>transactions.filter((t)=>t.type === "debit" && new Date(t.date).getMonth() === new Date().getMonth()).reduce((sum, t)=>sum + t.amount, 0), [
        transactions
    ]);
    const upcomingPayments = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>loans.reduce((sum, l)=>sum + l.monthlyPayment, 0), [
        loans
    ]);
    const quickActions = [
        {
            label: "Send Money",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"],
            href: "/payments"
        },
        {
            label: "Freeze Card",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"],
            href: "/cards"
        },
        {
            label: "Dispute Transaction",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$question$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileQuestion$3e$__["FileQuestion"],
            href: "/support"
        },
        {
            label: "Apply for Loan",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$landmark$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Landmark$3e$__["Landmark"],
            href: "/loans"
        }
    ];
    const aiChips = [
        "How much did I spend on restaurants this month?",
        "Why was I charged this fee?",
        "Can I afford a 3,000 AED monthly payment?",
        "Explain my credit card benefits"
    ];
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center min-h-[50vh]",
            children: "Loading dashboard..."
        }, void 0, false, {
            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
            lineNumber: 176,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$page$2d$header$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PageHeader"], {
                title: `Welcome back, ${currentUser.name.split(" ")[0]}`,
                description: "Here's an overview of your finances"
            }, void 0, false, {
                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                lineNumber: 181,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$stat$2d$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatCard"], {
                        title: "Total Balance",
                        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(totalBalance),
                        change: 3.2,
                        changeLabel: "vs last month",
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"]
                    }, void 0, false, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                        lineNumber: 188,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$stat$2d$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatCard"], {
                        title: "This Month Spending",
                        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(thisMonthSpending),
                        change: -8.5,
                        changeLabel: "vs last month",
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDownRight$3e$__["ArrowDownRight"]
                    }, void 0, false, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                        lineNumber: 195,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$stat$2d$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatCard"], {
                        title: "Upcoming Bills",
                        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(upcomingPayments),
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"]
                    }, void 0, false, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                        lineNumber: 202,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$stat$2d$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatCard"], {
                        title: "Active Cards",
                        value: cards.filter((c)=>c.status === "active").length,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"]
                    }, void 0, false, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                        lineNumber: 203,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                lineNumber: 187,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                        className: "lg:col-span-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                                className: "flex flex-row items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                className: "text-lg",
                                                children: "Recent Transactions"
                                            }, void 0, false, {
                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                                lineNumber: 211,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardDescription"], {
                                                children: "Your latest activity"
                                            }, void 0, false, {
                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                                lineNumber: 212,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                        lineNumber: 210,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "ghost",
                                        size: "sm",
                                        asChild: true,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/accounts",
                                            children: "View All"
                                        }, void 0, false, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                            lineNumber: 215,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                        lineNumber: 214,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                lineNumber: 209,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3",
                                    children: transactions.length > 0 ? transactions.map((txn)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between py-2 border-b border-border last:border-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: `flex items-center justify-center w-10 h-10 rounded-full ${txn.type === "credit" ? "bg-emerald-500/20" : "bg-muted"}`,
                                                            children: txn.type === "credit" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDownRight$3e$__["ArrowDownRight"], {
                                                                className: "h-5 w-5 text-emerald-500"
                                                            }, void 0, false, {
                                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                                                lineNumber: 233,
                                                                columnNumber: 27
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__["ArrowUpRight"], {
                                                                className: "h-5 w-5 text-muted-foreground"
                                                            }, void 0, false, {
                                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                                                lineNumber: 235,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                                            lineNumber: 227,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm font-medium",
                                                                    children: txn.description
                                                                }, void 0, false, {
                                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                                                    lineNumber: 239,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-xs text-muted-foreground",
                                                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDate"])(txn.date)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                                                            lineNumber: 241,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                                            variant: "secondary",
                                                                            className: `text-[10px] py-0 ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCategoryColor"])(txn.category)}`,
                                                                            children: txn.category
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                                                            lineNumber: 242,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                                                    lineNumber: 240,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                                            lineNumber: 238,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                                    lineNumber: 226,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `text-sm font-medium ${txn.type === "credit" ? "text-emerald-500" : "text-foreground"}`,
                                                    children: [
                                                        txn.type === "credit" ? "+" : "-",
                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(txn.amount)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                                    lineNumber: 248,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, txn.id, true, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                            lineNumber: 222,
                                            columnNumber: 19
                                        }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center py-4 text-muted-foreground",
                                        children: "No recent transactions"
                                    }, void 0, false, {
                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                        lineNumber: 257,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                    lineNumber: 219,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                lineNumber: 218,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                        lineNumber: 208,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                                            className: "text-lg",
                                            children: "Quick Actions"
                                        }, void 0, false, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                            lineNumber: 267,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                        lineNumber: 266,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-2 gap-2",
                                            children: quickActions.map((action)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                    variant: "outline",
                                                    className: "h-auto py-3 flex flex-col items-center gap-2 bg-transparent",
                                                    asChild: true,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        href: action.href,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(action.icon, {
                                                                className: "h-5 w-5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                                                lineNumber: 279,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs",
                                                                children: action.label
                                                            }, void 0, false, {
                                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                                                lineNumber: 280,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                                        lineNumber: 278,
                                                        columnNumber: 21
                                                    }, this)
                                                }, action.label, false, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                                    lineNumber: 272,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                            lineNumber: 270,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                        lineNumber: 269,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                lineNumber: 265,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                                className: "border-yellow-500/30 bg-yellow-500/5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                                        className: "pb-2",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                    className: "h-4 w-4 text-yellow-500"
                                                }, void 0, false, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                                    lineNumber: 291,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                    className: "text-sm text-yellow-500",
                                                    children: "Alert"
                                                }, void 0, false, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                                    lineNumber: 292,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                            lineNumber: 290,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                        lineNumber: 289,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-muted-foreground",
                                                children: "Unusual spending detected in your account. Higher than average spending on entertainment this month."
                                            }, void 0, false, {
                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                                lineNumber: 296,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "link",
                                                size: "sm",
                                                className: "px-0 mt-2 text-primary",
                                                children: "Review Details"
                                            }, void 0, false, {
                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                                lineNumber: 299,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                        lineNumber: 295,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                lineNumber: 288,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                        lineNumber: 264,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                lineNumber: 206,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                className: "bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__["Bot"], {
                                        className: "h-5 w-5 text-primary"
                                    }, void 0, false, {
                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                        lineNumber: 311,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                                        className: "text-lg",
                                        children: "Ask AI Banker"
                                    }, void 0, false, {
                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                        lineNumber: 312,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                lineNumber: 310,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardDescription"], {
                                children: "Get instant answers about your finances"
                            }, void 0, false, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                lineNumber: 314,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                        lineNumber: 309,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap gap-2",
                            children: aiChips.map((chip)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "secondary",
                                    size: "sm",
                                    className: "text-xs h-auto py-2 px-3 bg-background/50 hover:bg-background",
                                    asChild: true,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: `/ai-banker?q=${encodeURIComponent(chip)}`,
                                        children: chip
                                    }, void 0, false, {
                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                        lineNumber: 326,
                                        columnNumber: 17
                                    }, this)
                                }, chip, false, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                    lineNumber: 319,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                            lineNumber: 317,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                        lineNumber: 316,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                lineNumber: 308,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                                className: "text-lg",
                                children: "Spending Insights"
                            }, void 0, false, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                lineNumber: 336,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardDescription"], {
                                children: "AI-powered analysis of your spending patterns"
                            }, void 0, false, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                lineNumber: 337,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                        lineNumber: 335,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-3 gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 rounded-lg bg-muted/30",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 mb-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                                    className: "h-4 w-4 text-emerald-500"
                                                }, void 0, false, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                                    lineNumber: 343,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm font-medium",
                                                    children: "Top Category"
                                                }, void 0, false, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                                    lineNumber: 344,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                            lineNumber: 342,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-2xl font-bold",
                                            children: "Shopping"
                                        }, void 0, false, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                            lineNumber: 346,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-muted-foreground",
                                            children: "32% of total spending"
                                        }, void 0, false, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                            lineNumber: 347,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                    lineNumber: 341,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 rounded-lg bg-muted/30",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 mb-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingDown$3e$__["TrendingDown"], {
                                                    className: "h-4 w-4 text-blue-500"
                                                }, void 0, false, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                                    lineNumber: 351,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm font-medium",
                                                    children: "Savings Potential"
                                                }, void 0, false, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                                    lineNumber: 352,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                            lineNumber: 350,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-2xl font-bold",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(1250)
                                        }, void 0, false, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                            lineNumber: 354,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-muted-foreground",
                                            children: "Based on subscription analysis"
                                        }, void 0, false, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                            lineNumber: 355,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                    lineNumber: 349,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 rounded-lg bg-muted/30",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 mb-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                    className: "h-4 w-4 text-yellow-500"
                                                }, void 0, false, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                                    lineNumber: 359,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm font-medium",
                                                    children: "Next Bill"
                                                }, void 0, false, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                                    lineNumber: 360,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                            lineNumber: 358,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-2xl font-bold",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(1521.25)
                                        }, void 0, false, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                            lineNumber: 362,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-muted-foreground",
                                            children: "Loan payment on Jan 15"
                                        }, void 0, false, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                            lineNumber: 363,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                                    lineNumber: 357,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                            lineNumber: 340,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                        lineNumber: 339,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
                lineNumber: 334,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx",
        lineNumber: 180,
        columnNumber: 5
    }, this);
}
}),
"[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RMDashboard",
    ()=>RMDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$role$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/lib/role-context.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/lib/format.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$page$2d$header$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/page-header.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$stat$2d$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/stat-card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/badge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/avatar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/users.js [app-ssr] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-ssr] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-ssr] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/calendar.js [app-ssr] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-ssr] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/star.js [app-ssr] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/clock.js [app-ssr] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/target.js [app-ssr] (ecmascript) <export default as Target>");
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
function RMDashboard() {
    const { currentUser } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$role$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRole"])();
    const [clients, setClients] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [clientsLoading, setClientsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [nbaList, setNbaList] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]) // Using mock NBA for now as table doesn't exist
    ;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        async function fetchData() {
            if (!currentUser?.id) return;
            setClientsLoading(true);
            const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
            // Fetch Clients assigned to this RM
            const { data: profiles, error: profilesError } = await supabase.from("profiles").select("*").eq("assigned_rm_id", currentUser.id);
            if (profilesError) {
                console.error("Error fetching clients:", profilesError);
                setClientsLoading(false);
                return;
            }
            // Fetch Accounts for all these clients to calculate AUM
            const clientIds = (profiles || []).map((p)=>p.id);
            const { data: accounts, error: accountsError } = await supabase.from("accounts").select("user_id, balance, currency").in("user_id", clientIds);
            if (accountsError) console.error("Error fetching client accounts:", accountsError);
            // Map clients with their calculated balance
            const mappedClients = (profiles || []).map((p)=>{
                const clientAccounts = accounts?.filter((a)=>a.user_id === p.id) || [];
                const totalBalance = clientAccounts.reduce((sum, acc)=>{
                    const rate = acc.currency === "USD" ? 3.67 : 1;
                    return sum + Number(acc.balance) * rate;
                }, 0);
                return {
                    id: p.id,
                    name: p.full_name,
                    email: p.email,
                    avatar: p.avatar_url,
                    segment: p.segment || "Standard",
                    totalBalance
                };
            });
            setClients(mappedClients);
            // Mock NBAs for now (fetching from 'crm_interactions' or similar would be better if table existed)
            const mockNBAs = mappedClients.slice(0, 4).map((client, i)=>({
                    id: `nba-${i}`,
                    clientId: client.id,
                    clientName: client.name,
                    action: i % 2 === 0 ? "Portfolio Review" : "Upsell Premium Card",
                    reason: i % 2 === 0 ? "Quarterly check-in due" : "High spending detected",
                    priority: i === 0 ? "high" : "medium"
                }));
            setNbaList(mockNBAs);
            setClientsLoading(false);
        }
        fetchData();
    }, [
        currentUser
    ]);
    const portfolioValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return clients.reduce((total, client)=>total + client.totalBalance, 0);
    }, [
        clients
    ]);
    const vipClients = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>clients.filter((c)=>c.segment === "VIP"), [
        clients
    ]);
    const atRiskClients = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>clients.filter((c)=>c.segment === "At Risk"), [
        clients
    ]);
    const upcomingRenewals = 3 // mock
    ;
    if (clientsLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-screen items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                className: "h-8 w-8 animate-spin text-primary"
            }, void 0, false, {
                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                lineNumber: 98,
                columnNumber: 71
            }, this)
        }, void 0, false, {
            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
            lineNumber: 98,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$page$2d$header$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PageHeader"], {
                title: "RM Workspace",
                description: "Manage your client portfolio and opportunities",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                    asChild: true,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/rm-workspace",
                        children: [
                            "View Full Workspace",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                className: "ml-2 h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                                lineNumber: 107,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                        lineNumber: 105,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                    lineNumber: 104,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                lineNumber: 103,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$stat$2d$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatCard"], {
                        title: "Portfolio Clients",
                        value: clients.length,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"]
                    }, void 0, false, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                        lineNumber: 114,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$stat$2d$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatCard"], {
                        title: "Total AUM",
                        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(portfolioValue),
                        change: 5.2,
                        changeLabel: "MTD",
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"]
                    }, void 0, false, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                        lineNumber: 115,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$stat$2d$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatCard"], {
                        title: "VIP Clients",
                        value: vipClients.length,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"]
                    }, void 0, false, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                        lineNumber: 122,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$stat$2d$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatCard"], {
                        title: "Upcoming Renewals",
                        value: upcomingRenewals,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"]
                    }, void 0, false, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                        lineNumber: 123,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                lineNumber: 113,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                        className: "lg:col-span-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                                className: "flex flex-row items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                className: "text-lg",
                                                children: "Client Portfolio"
                                            }, void 0, false, {
                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                                                lineNumber: 131,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardDescription"], {
                                                children: "Your assigned clients"
                                            }, void 0, false, {
                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                                                lineNumber: 132,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                                        lineNumber: 130,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "ghost",
                                        size: "sm",
                                        asChild: true,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/rm-workspace",
                                            children: "View All"
                                        }, void 0, false, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                                            lineNumber: 135,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                                        lineNumber: 134,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                                lineNumber: 129,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-4",
                                    children: [
                                        clients.map((client)=>{
                                            // Mock last interaction date for now
                                            const lastInteractionDate = new Date(Date.now() - Math.random() * 1000000000).toISOString();
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Avatar"], {
                                                                className: "h-10 w-10",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AvatarImage"], {
                                                                        src: client.avatar || "/placeholder.svg",
                                                                        alt: client.name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                                                                        lineNumber: 151,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AvatarFallback"], {
                                                                        className: "bg-primary/20 text-primary text-xs",
                                                                        children: client.name.split(" ").map((n)=>n[0]).join("")
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                                                                        lineNumber: 152,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                                                                lineNumber: 150,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-sm font-medium",
                                                                                children: client.name
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                                                                                lineNumber: 161,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                                                variant: "secondary",
                                                                                className: `text-[10px] ${client.segment === "VIP" ? "bg-yellow-500/20 text-yellow-500" : client.segment === "At Risk" ? "bg-red-500/20 text-red-500" : "bg-muted"}`,
                                                                                children: client.segment
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                                                                                lineNumber: 162,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                                                                        lineNumber: 160,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs text-muted-foreground",
                                                                        children: [
                                                                            "Last contact: ",
                                                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatRelativeTime"])(lastInteractionDate)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                                                                        lineNumber: 175,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                                                                lineNumber: 159,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                                                        lineNumber: 149,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-right",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm font-medium",
                                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(client.totalBalance)
                                                            }, void 0, false, {
                                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                                                                lineNumber: 181,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-muted-foreground",
                                                                children: "Total Balance"
                                                            }, void 0, false, {
                                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                                                                lineNumber: 182,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                                                        lineNumber: 180,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, client.id, true, {
                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                                                lineNumber: 145,
                                                columnNumber: 19
                                            }, this);
                                        }),
                                        clients.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-center py-4 text-muted-foreground",
                                            children: "No clients assigned yet."
                                        }, void 0, false, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                                            lineNumber: 188,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                                    lineNumber: 139,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                                lineNumber: 138,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                        lineNumber: 128,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__["Target"], {
                                                    className: "h-4 w-4 text-primary"
                                                }, void 0, false, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                                                    lineNumber: 201,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                    className: "text-lg",
                                                    children: "Next Best Actions"
                                                }, void 0, false, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                                                    lineNumber: 202,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                                            lineNumber: 200,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                                        lineNumber: 199,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-3",
                                            children: [
                                                nbaList.map((nba)=>{
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "p-3 rounded-lg bg-muted/30 border border-border",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center justify-between mb-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs text-muted-foreground",
                                                                        children: nba.clientName
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                                                                        lineNumber: 211,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                                        variant: "outline",
                                                                        className: `text-[10px] ${nba.priority === "high" ? "border-red-500/50 text-red-500" : nba.priority === "medium" ? "border-yellow-500/50 text-yellow-500" : "border-muted"}`,
                                                                        children: nba.priority
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                                                                        lineNumber: 212,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                                                                lineNumber: 210,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm font-medium",
                                                                children: nba.action
                                                            }, void 0, false, {
                                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                                                                lineNumber: 225,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-muted-foreground mt-1",
                                                                children: nba.reason
                                                            }, void 0, false, {
                                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                                                                lineNumber: 226,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, nba.id, true, {
                                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                                                        lineNumber: 209,
                                                        columnNumber: 21
                                                    }, this);
                                                }),
                                                nbaList.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-center py-2 text-sm text-muted-foreground",
                                                    children: "No pending actions"
                                                }, void 0, false, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                                                    lineNumber: 231,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                                            lineNumber: 206,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                                        lineNumber: 205,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                                lineNumber: 198,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                                className: "border-yellow-500/30 bg-yellow-500/5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                                        className: "pb-2",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                                    className: "h-4 w-4 text-yellow-500"
                                                }, void 0, false, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                                                    lineNumber: 240,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                    className: "text-sm text-yellow-500",
                                                    children: "Attention Required"
                                                }, void 0, false, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                                                    lineNumber: 241,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                                            lineNumber: 239,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                                        lineNumber: 238,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-muted-foreground",
                                                children: atRiskClients.length > 0 ? `${atRiskClients.length} client(s) flagged as at-risk. Review their accounts.` : "No at-risk clients in your portfolio."
                                            }, void 0, false, {
                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                                                lineNumber: 245,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "link",
                                                size: "sm",
                                                className: "px-0 mt-2 text-primary",
                                                children: "Review Now"
                                            }, void 0, false, {
                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                                                lineNumber: 250,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                                        lineNumber: 244,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                                lineNumber: 237,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                                        className: "pb-2",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                    className: "h-4 w-4 text-muted-foreground"
                                                }, void 0, false, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                                                    lineNumber: 259,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                    className: "text-sm",
                                                    children: "Today's Schedule"
                                                }, void 0, false, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                                                    lineNumber: 260,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                                            lineNumber: 258,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                                        lineNumber: 257,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2 text-sm",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-2 h-2 rounded-full bg-primary"
                                                        }, void 0, false, {
                                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                                                            lineNumber: 266,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "10:00 AM - Portfolio review with Michael Chen"
                                                        }, void 0, false, {
                                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                                                            lineNumber: 267,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                                                    lineNumber: 265,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2 text-sm",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-2 h-2 rounded-full bg-muted-foreground"
                                                        }, void 0, false, {
                                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                                                            lineNumber: 270,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "2:00 PM - Credit line discussion"
                                                        }, void 0, false, {
                                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                                                            lineNumber: 271,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                                                    lineNumber: 269,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                                            lineNumber: 264,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                                        lineNumber: 263,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                                lineNumber: 256,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                        lineNumber: 197,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
                lineNumber: 126,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx",
        lineNumber: 102,
        columnNumber: 5
    }, this);
}
}),
"[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RiskDashboard",
    ()=>RiskDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/lib/format.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$page$2d$header$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/page-header.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$stat$2d$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/stat-card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/badge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/shield-alert.js [app-ssr] (ecmascript) <export default as ShieldAlert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-ssr] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-ssr] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/clock.js [app-ssr] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-ssr] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$warning$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileWarning$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/file-warning.js [app-ssr] (ecmascript) <export default as FileWarning>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/activity.js [app-ssr] (ecmascript) <export default as Activity>");
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
function RiskDashboard() {
    const [alerts, setAlerts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [auditLogs, setAuditLogs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        async function fetchData() {
            setIsLoading(true);
            const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
            // Fetch Risk Alerts
            const { data: alertsData, error: alertsError } = await supabase.from("risk_alerts").select("*").order("created_at", {
                ascending: false
            }).limit(20);
            if (alertsError) console.error("Error fetching risk alerts:", alertsError);
            if (alertsData) {
                setAlerts(alertsData.map((a)=>({
                        id: a.id,
                        userId: a.user_id,
                        type: a.type,
                        severity: a.severity,
                        title: a.title,
                        description: a.description,
                        status: a.status,
                        createdAt: a.created_at,
                        assignedTo: a.assigned_to_id
                    })));
            }
            // Fetch Audit Logs
            const { data: logsData, error: logsError } = await supabase.from("audit_logs").select("*").order("timestamp", {
                ascending: false
            }).limit(5);
            if (logsError) console.error("Error fetching audit logs:", logsError);
            if (logsData) {
                setAuditLogs(logsData.map((l)=>({
                        id: l.id,
                        userId: l.user_id,
                        userRole: l.user_role,
                        action: l.action,
                        actionType: l.action_type,
                        timestamp: l.timestamp,
                        details: l.details,
                        sourcesAccessed: l.sources_accessed || [],
                        redactions: l.redactions || [],
                        riskFlags: l.risk_flags || []
                    })));
            }
            setIsLoading(false);
        }
        fetchData();
    }, []);
    const openAlerts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>alerts.filter((a)=>a.status === "open"), [
        alerts
    ]);
    const investigatingAlerts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>alerts.filter((a)=>a.status === "investigating"), [
        alerts
    ]);
    const criticalAlerts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>alerts.filter((a)=>a.severity === "critical"), [
        alerts
    ]);
    const resolvedToday = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const today = new Date().toISOString().split("T")[0];
        return alerts.filter((a)=>a.status === "resolved" && a.createdAt.startsWith(today)).length;
    }, [
        alerts
    ]);
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-screen items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                className: "h-8 w-8 animate-spin text-primary"
            }, void 0, false, {
                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
                lineNumber: 87,
                columnNumber: 71
            }, this)
        }, void 0, false, {
            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
            lineNumber: 87,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$page$2d$header$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PageHeader"], {
                title: "Risk & Compliance Dashboard",
                description: "Monitor alerts, cases, and policy compliance",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                    asChild: true,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/risk",
                        children: [
                            "View All Alerts",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                className: "ml-2 h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
                                lineNumber: 96,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
                        lineNumber: 94,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
                    lineNumber: 93,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
                lineNumber: 92,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$stat$2d$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatCard"], {
                        title: "Open Alerts",
                        value: openAlerts.length,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"]
                    }, void 0, false, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
                        lineNumber: 103,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$stat$2d$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatCard"], {
                        title: "Under Investigation",
                        value: investigatingAlerts.length,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"]
                    }, void 0, false, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
                        lineNumber: 104,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$stat$2d$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatCard"], {
                        title: "Critical Alerts",
                        value: criticalAlerts.length,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__["ShieldAlert"]
                    }, void 0, false, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
                        lineNumber: 105,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$stat$2d$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatCard"], {
                        title: "Resolved Today",
                        value: resolvedToday,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"]
                    }, void 0, false, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
                        lineNumber: 106,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
                lineNumber: 102,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                        className: "lg:col-span-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                                className: "flex flex-row items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                className: "text-lg",
                                                children: "Alerts Queue"
                                            }, void 0, false, {
                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
                                                lineNumber: 114,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardDescription"], {
                                                children: "Recent risk and compliance alerts"
                                            }, void 0, false, {
                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
                                                lineNumber: 115,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
                                        lineNumber: 113,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "ghost",
                                        size: "sm",
                                        asChild: true,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/risk",
                                            children: "View All"
                                        }, void 0, false, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
                                            lineNumber: 118,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
                                        lineNumber: 117,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
                                lineNumber: 112,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3",
                                    children: [
                                        alerts.slice(0, 6).map((alert)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start justify-between p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-start gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: `flex items-center justify-center w-8 h-8 rounded-full ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSeverityColor"])(alert.severity)}`,
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$warning$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileWarning$3e$__["FileWarning"], {
                                                                    className: "h-4 w-4"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
                                                                    lineNumber: 132,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
                                                                lineNumber: 129,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-sm font-medium",
                                                                                children: alert.title
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
                                                                                lineNumber: 136,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                                                variant: "outline",
                                                                                className: `text-[10px] ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSeverityColor"])(alert.severity)}`,
                                                                                children: alert.severity
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
                                                                                lineNumber: 137,
                                                                                columnNumber: 25
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
                                                                        lineNumber: 135,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs text-muted-foreground mt-1",
                                                                        children: alert.description
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
                                                                        lineNumber: 141,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs text-muted-foreground mt-1",
                                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatRelativeTime"])(alert.createdAt)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
                                                                        lineNumber: 142,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
                                                                lineNumber: 134,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
                                                        lineNumber: 128,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                        variant: "secondary",
                                                        className: `text-[10px] ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getStatusColor"])(alert.status)}`,
                                                        children: alert.status
                                                    }, void 0, false, {
                                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
                                                        lineNumber: 145,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, alert.id, true, {
                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
                                                lineNumber: 124,
                                                columnNumber: 17
                                            }, this)),
                                        alerts.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-center py-4 text-muted-foreground",
                                            children: "No alerts found."
                                        }, void 0, false, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
                                            lineNumber: 151,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
                                    lineNumber: 122,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
                                lineNumber: 121,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
                        lineNumber: 111,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                                                    className: "h-4 w-4 text-primary"
                                                }, void 0, false, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
                                                    lineNumber: 162,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                    className: "text-lg",
                                                    children: "Recent Activity"
                                                }, void 0, false, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
                                                    lineNumber: 163,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
                                            lineNumber: 161,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
                                        lineNumber: 160,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-3",
                                                children: [
                                                    auditLogs.map((event)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-2 h-2 rounded-full bg-primary mt-2"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
                                                                    lineNumber: 173,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-sm",
                                                                            children: event.action
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
                                                                            lineNumber: 175,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-xs text-muted-foreground",
                                                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatRelativeTime"])(event.timestamp)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
                                                                            lineNumber: 176,
                                                                            columnNumber: 23
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
                                                                    lineNumber: 174,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, event.id, true, {
                                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
                                                            lineNumber: 169,
                                                            columnNumber: 19
                                                        }, this)),
                                                    auditLogs.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-center py-4 text-sm text-muted-foreground",
                                                        children: "No recent activity."
                                                    }, void 0, false, {
                                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
                                                        lineNumber: 181,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
                                                lineNumber: 167,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "link",
                                                size: "sm",
                                                className: "px-0 mt-3",
                                                asChild: true,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/audit",
                                                    children: "View Full Audit Log"
                                                }, void 0, false, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
                                                    lineNumber: 185,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
                                                lineNumber: 184,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
                                        lineNumber: 166,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
                                lineNumber: 159,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                                className: "border-red-500/30 bg-red-500/5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                                        className: "pb-2",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__["ShieldAlert"], {
                                                    className: "h-4 w-4 text-red-500"
                                                }, void 0, false, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
                                                    lineNumber: 193,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                    className: "text-sm text-red-500",
                                                    children: "Critical Alert"
                                                }, void 0, false, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
                                                    lineNumber: 194,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
                                            lineNumber: 192,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
                                        lineNumber: 191,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                                        children: criticalAlerts[0] ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm font-medium",
                                                    children: criticalAlerts[0].title
                                                }, void 0, false, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
                                                    lineNumber: 200,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-muted-foreground mt-1",
                                                    children: criticalAlerts[0].description
                                                }, void 0, false, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
                                                    lineNumber: 201,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                    variant: "destructive",
                                                    size: "sm",
                                                    className: "mt-3",
                                                    children: "Investigate Now"
                                                }, void 0, false, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
                                                    lineNumber: 202,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-muted-foreground",
                                            children: "No critical alerts at this time."
                                        }, void 0, false, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
                                            lineNumber: 207,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
                                        lineNumber: 197,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
                                lineNumber: 190,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
                        lineNumber: 158,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
                lineNumber: 109,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx",
        lineNumber: 91,
        columnNumber: 5
    }, this);
}
}),
"[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/home/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$role$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/lib/role-context.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$dashboards$2f$customer$2d$dashboard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/customer-dashboard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$dashboards$2f$rm$2d$dashboard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/rm-dashboard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$dashboards$2f$risk$2d$dashboard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/dashboards/risk-dashboard.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function HomePage() {
    const { currentRole } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$role$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRole"])();
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$role$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isCustomer"])(currentRole)) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$dashboards$2f$customer$2d$dashboard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CustomerDashboard"], {}, void 0, false, {
            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/home/page.tsx",
            lineNumber: 12,
            columnNumber: 12
        }, this);
    }
    if (currentRole === "relationship_manager") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$dashboards$2f$rm$2d$dashboard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RMDashboard"], {}, void 0, false, {
            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/home/page.tsx",
            lineNumber: 16,
            columnNumber: 12
        }, this);
    }
    if (currentRole === "risk_compliance" || currentRole === "admin") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$dashboards$2f$risk$2d$dashboard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RiskDashboard"], {}, void 0, false, {
            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/home/page.tsx",
            lineNumber: 20,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$dashboards$2f$customer$2d$dashboard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CustomerDashboard"], {}, void 0, false, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/home/page.tsx",
        lineNumber: 23,
        columnNumber: 10
    }, this);
}
}),
];

//# sourceMappingURL=AI%20Agents_Future_Banking_v0-bank-of-the-future_5521bda7._.js.map