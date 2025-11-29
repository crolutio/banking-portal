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
"[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ai/ask-ai-banker-widget.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AskAIBankerWidget",
    ()=>AskAIBankerWidget
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/bot.js [app-ssr] (ecmascript) <export default as Bot>");
"use client";
;
;
;
;
;
function AskAIBankerWidget({ questions, title = "Ask AI Banker", description = "Get instant answers about your finances" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
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
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ai/ask-ai-banker-widget.tsx",
                                lineNumber: 23,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                                className: "text-lg",
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ai/ask-ai-banker-widget.tsx",
                                lineNumber: 24,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ai/ask-ai-banker-widget.tsx",
                        lineNumber: 22,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardDescription"], {
                        children: description
                    }, void 0, false, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ai/ask-ai-banker-widget.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ai/ask-ai-banker-widget.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-wrap gap-2",
                    children: questions.map((question)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "secondary",
                            size: "sm",
                            className: "text-xs h-auto py-2 px-3 bg-background/50 hover:bg-background",
                            asChild: true,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: `/ai-banker?q=${encodeURIComponent(question)}`,
                                children: question
                            }, void 0, false, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ai/ask-ai-banker-widget.tsx",
                                lineNumber: 38,
                                columnNumber: 15
                            }, this)
                        }, question, false, {
                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ai/ask-ai-banker-widget.tsx",
                            lineNumber: 31,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ai/ask-ai-banker-widget.tsx",
                    lineNumber: 29,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ai/ask-ai-banker-widget.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ai/ask-ai-banker-widget.tsx",
        lineNumber: 20,
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
"[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AccountsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$role$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/lib/role-context.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/lib/format.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$page$2d$header$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/page-header.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/badge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/input.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/select.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/sheet.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/arrow-up-right.js [app-ssr] (ecmascript) <export default as ArrowUpRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDownRight$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/arrow-down-right.js [app-ssr] (ecmascript) <export default as ArrowDownRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-ssr] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/bot.js [app-ssr] (ecmascript) <export default as Bot>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/copy.js [app-ssr] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/eye.js [app-ssr] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/eye-off.js [app-ssr] (ecmascript) <export default as EyeOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-ssr] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ai$2f$ask$2d$ai$2d$banker$2d$widget$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ai/ask-ai-banker-widget.tsx [app-ssr] (ecmascript)");
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
function AccountCard({ account, onClick }) {
    const [showBalance, setShowBalance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const getAccountIcon = ()=>{
        switch(account.type){
            case "savings":
                return "💰";
            case "business":
                return "🏢";
            case "fx_wallet":
                return "💱";
            default:
                return "💳";
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
        className: "cursor-pointer hover:bg-muted/30 transition-colors",
        onClick: onClick,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
            className: "p-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-start justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-2xl",
                                    children: getAccountIcon()
                                }, void 0, false, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                    lineNumber: 40,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-medium",
                                            children: account.name
                                        }, void 0, false, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                            lineNumber: 44,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-muted-foreground",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatAccountNumber"])(account.accountNumber)
                                        }, void 0, false, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                            lineNumber: 45,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                    lineNumber: 43,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                            lineNumber: 39,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                            variant: "secondary",
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getStatusColor"])(account.status),
                            children: account.status
                        }, void 0, false, {
                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                            lineNumber: 48,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                    lineNumber: 38,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-4 flex items-end justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-muted-foreground mb-1",
                                    children: "Available Balance"
                                }, void 0, false, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                    lineNumber: 55,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-2xl font-bold",
                                    children: showBalance ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(account.availableBalance, account.currency) : "••••••"
                                }, void 0, false, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                    lineNumber: 56,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                            lineNumber: 54,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "ghost",
                            size: "icon",
                            className: "h-8 w-8",
                            onClick: (e)=>{
                                e.stopPropagation();
                                setShowBalance(!showBalance);
                            },
                            children: showBalance ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__["EyeOff"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                lineNumber: 69,
                                columnNumber: 28
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                lineNumber: 69,
                                columnNumber: 61
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                            lineNumber: 60,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                    lineNumber: 53,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
            lineNumber: 37,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
function TransactionsTable({ transactions, showFilters = true }) {
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [categoryFilter, setCategoryFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("all");
    const [typeFilter, setTypeFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("all");
    const filteredTransactions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return transactions.filter((txn)=>{
            const matchesSearch = txn.description.toLowerCase().includes(searchQuery.toLowerCase()) || txn.merchant?.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = categoryFilter === "all" || txn.category === categoryFilter;
            const matchesType = typeFilter === "all" || txn.type === typeFilter;
            return matchesSearch && matchesCategory && matchesType;
        });
    }, [
        transactions,
        searchQuery,
        categoryFilter,
        typeFilter
    ]);
    const categories = [
        ...new Set(transactions.map((t)=>t.category))
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            showFilters && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col sm:flex-row gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative flex-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                            }, void 0, false, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                lineNumber: 103,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                placeholder: "Search transactions...",
                                value: searchQuery,
                                onChange: (e)=>setSearchQuery(e.target.value),
                                className: "pl-9"
                            }, void 0, false, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                lineNumber: 104,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                        lineNumber: 102,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                        value: categoryFilter,
                        onValueChange: setCategoryFilter,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                className: "w-full sm:w-40",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectValue"], {
                                    placeholder: "Category"
                                }, void 0, false, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                    lineNumber: 113,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                lineNumber: 112,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                        value: "all",
                                        children: "All Categories"
                                    }, void 0, false, {
                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                        lineNumber: 116,
                                        columnNumber: 15
                                    }, this),
                                    categories.map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                            value: cat,
                                            className: "capitalize",
                                            children: cat
                                        }, cat, false, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                            lineNumber: 118,
                                            columnNumber: 17
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                lineNumber: 115,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                        lineNumber: 111,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                        value: typeFilter,
                        onValueChange: setTypeFilter,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                className: "w-full sm:w-32",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectValue"], {
                                    placeholder: "Type"
                                }, void 0, false, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                    lineNumber: 126,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                lineNumber: 125,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                        value: "all",
                                        children: "All Types"
                                    }, void 0, false, {
                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                        lineNumber: 129,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                        value: "credit",
                                        children: "Income"
                                    }, void 0, false, {
                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                        lineNumber: 130,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                        value: "debit",
                                        children: "Expense"
                                    }, void 0, false, {
                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                        lineNumber: 131,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                lineNumber: 128,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                        lineNumber: 124,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                lineNumber: 101,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border rounded-lg overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "overflow-x-auto",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                        className: "w-full",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: "border-b bg-muted/30",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "text-left text-xs font-medium text-muted-foreground px-4 py-3",
                                            children: "Date"
                                        }, void 0, false, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                            lineNumber: 142,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "text-left text-xs font-medium text-muted-foreground px-4 py-3",
                                            children: "Description"
                                        }, void 0, false, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                            lineNumber: 143,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "text-left text-xs font-medium text-muted-foreground px-4 py-3 hidden sm:table-cell",
                                            children: "Category"
                                        }, void 0, false, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                            lineNumber: 144,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "text-right text-xs font-medium text-muted-foreground px-4 py-3",
                                            children: "Amount"
                                        }, void 0, false, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                            lineNumber: 147,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "text-right text-xs font-medium text-muted-foreground px-4 py-3 hidden md:table-cell",
                                            children: "Balance"
                                        }, void 0, false, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                            lineNumber: 148,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                    lineNumber: 141,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                lineNumber: 140,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                children: filteredTransactions.map((txn)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: "border-b last:border-0 hover:bg-muted/20",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-4 py-3 text-sm",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDate"])(txn.date)
                                            }, void 0, false, {
                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                                lineNumber: 156,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-4 py-3",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: `flex items-center justify-center w-8 h-8 rounded-full shrink-0 ${txn.type === "credit" ? "bg-emerald-500/20" : "bg-muted"}`,
                                                            children: txn.type === "credit" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDownRight$3e$__["ArrowDownRight"], {
                                                                className: "h-4 w-4 text-emerald-500"
                                                            }, void 0, false, {
                                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                                                lineNumber: 165,
                                                                columnNumber: 27
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__["ArrowUpRight"], {
                                                                className: "h-4 w-4 text-muted-foreground"
                                                            }, void 0, false, {
                                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                                                lineNumber: 167,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                                            lineNumber: 159,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "min-w-0",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm font-medium truncate",
                                                                    children: txn.description
                                                                }, void 0, false, {
                                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                                                    lineNumber: 171,
                                                                    columnNumber: 25
                                                                }, this),
                                                                txn.merchant && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-muted-foreground truncate",
                                                                    children: txn.merchant
                                                                }, void 0, false, {
                                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                                                    lineNumber: 172,
                                                                    columnNumber: 42
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                                            lineNumber: 170,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                                    lineNumber: 158,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                                lineNumber: 157,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-4 py-3 hidden sm:table-cell",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                    variant: "secondary",
                                                    className: `text-xs ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCategoryColor"])(txn.category)}`,
                                                    children: txn.category
                                                }, void 0, false, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                                    lineNumber: 177,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                                lineNumber: 176,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: `px-4 py-3 text-sm font-medium text-right ${txn.type === "credit" ? "text-emerald-500" : "text-foreground"}`,
                                                children: [
                                                    txn.type === "credit" ? "+" : "-",
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(txn.amount)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                                lineNumber: 181,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-4 py-3 text-sm text-muted-foreground text-right hidden md:table-cell",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(txn.balance)
                                            }, void 0, false, {
                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                                lineNumber: 189,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, txn.id, true, {
                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                        lineNumber: 155,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                lineNumber: 153,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                        lineNumber: 139,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                    lineNumber: 138,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                lineNumber: 137,
                columnNumber: 7
            }, this),
            filteredTransactions.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center py-8 text-muted-foreground",
                children: "No transactions found matching your filters."
            }, void 0, false, {
                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                lineNumber: 200,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
        lineNumber: 99,
        columnNumber: 5
    }, this);
}
function AccountInsightsPanel({ account, transactions }) {
    // Use passed transactions instead of fetching them
    const thisMonthSpend = transactions.filter((t)=>t.type === "debit" && new Date(t.date).getMonth() === new Date().getMonth()).reduce((sum, t)=>sum + t.amount, 0);
    const recurringPayments = [
        {
            name: "DEWA",
            amount: 450,
            day: 5
        },
        {
            name: "Etisalat",
            amount: 299,
            day: 15
        },
        {
            name: "Netflix",
            amount: 55,
            day: 22
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                className: "bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                        className: "pb-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__["Bot"], {
                                    className: "h-4 w-4 text-primary"
                                }, void 0, false, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                    lineNumber: 223,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                                    className: "text-sm",
                                    children: "AI Insights"
                                }, void 0, false, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                    lineNumber: 224,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                            lineNumber: 222,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                        lineNumber: 221,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-muted-foreground mb-3",
                                children: [
                                    "Your spending this month is",
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-foreground font-medium",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(thisMonthSpend)
                                    }, void 0, false, {
                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                        lineNumber: 230,
                                        columnNumber: 13
                                    }, this),
                                    "."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                lineNumber: 228,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-2 mt-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                        variant: "outline",
                                        className: "text-xs bg-primary/5 border-primary/20 text-primary",
                                        children: "Account Ledger"
                                    }, void 0, false, {
                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                        lineNumber: 233,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                        variant: "outline",
                                        className: "text-xs bg-primary/5 border-primary/20 text-primary",
                                        children: "Transactions"
                                    }, void 0, false, {
                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                        lineNumber: 236,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                lineNumber: 232,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "link",
                                size: "sm",
                                className: "px-0 mt-2 text-primary",
                                asChild: true,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: `/ai-banker?scope=account:${account.id}`,
                                    children: "Ask more about this account"
                                }, void 0, false, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                    lineNumber: 241,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                lineNumber: 240,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                        lineNumber: 227,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                lineNumber: 220,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                        className: "pb-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                            className: "text-sm",
                            children: "Recurring Payments Detected"
                        }, void 0, false, {
                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                            lineNumber: 248,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                        lineNumber: 247,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3",
                            children: recurringPayments.map((payment, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                                    className: "h-4 w-4 text-muted-foreground"
                                                }, void 0, false, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                                    lineNumber: 255,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm",
                                                    children: payment.name
                                                }, void 0, false, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                                    lineNumber: 256,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                            lineNumber: 254,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-right",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm font-medium",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(payment.amount)
                                                }, void 0, false, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                                    lineNumber: 259,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-muted-foreground",
                                                    children: [
                                                        "Day ",
                                                        payment.day
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                                    lineNumber: 260,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                            lineNumber: 258,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, i, true, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                    lineNumber: 253,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                            lineNumber: 251,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                        lineNumber: 250,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                lineNumber: 246,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                        className: "pb-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                            className: "text-sm",
                            children: "Cashflow Forecast"
                        }, void 0, false, {
                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                            lineNumber: 270,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                        lineNumber: 269,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-32 flex items-center justify-center bg-muted/30 rounded-lg",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                        className: "h-8 w-8 text-primary mx-auto mb-2"
                                    }, void 0, false, {
                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                        lineNumber: 275,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-muted-foreground",
                                        children: "Projected balance in 30 days"
                                    }, void 0, false, {
                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                        lineNumber: 276,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xl font-bold text-foreground",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(account.balance + 8500)
                                    }, void 0, false, {
                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                        lineNumber: 277,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                lineNumber: 274,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                            lineNumber: 273,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                        lineNumber: 272,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                lineNumber: 268,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
        lineNumber: 219,
        columnNumber: 5
    }, this);
}
function AccountsPage() {
    const { currentUser } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$role$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRole"])();
    const [selectedAccount, setSelectedAccount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [accounts, setAccounts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [transactions, setTransactions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
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
            // Fetch Transactions
            if (mappedAccounts.length > 0) {
                const accountIds = mappedAccounts.map((a)=>a.id);
                const { data: txData, error: txError } = await supabase.from("transactions").select("*").in("account_id", accountIds).order("date", {
                    ascending: false
                });
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
            setIsLoading(false);
        }
        fetchData();
    }, [
        currentUser
    ]);
    const displayedTransactions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (selectedAccount) {
            return transactions.filter((t)=>t.accountId === selectedAccount.id);
        }
        return transactions;
    }, [
        transactions,
        selectedAccount
    ]);
    const totalBalance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>accounts.reduce((sum, acc)=>{
            const rate = acc.currency === "USD" ? 3.67 : 1;
            return sum + acc.balance * rate;
        }, 0), [
        accounts
    ]);
    const aiQuestions = [
        "What's my current account balance?",
        "Show my spending breakdown this month",
        "Which account has the highest interest rate?",
        "How can I reduce my monthly fees?"
    ];
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-screen items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                className: "h-8 w-8 animate-spin text-primary"
            }, void 0, false, {
                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                lineNumber: 379,
                columnNumber: 71
            }, this)
        }, void 0, false, {
            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
            lineNumber: 379,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$page$2d$header$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PageHeader"], {
                title: "Accounts",
                description: "Manage your accounts and view transactions"
            }, void 0, false, {
                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                lineNumber: 384,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                className: "bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border-primary/30",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                    className: "p-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-muted-foreground mb-1",
                            children: "Total Balance"
                        }, void 0, false, {
                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                            lineNumber: 389,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-4xl font-bold",
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(totalBalance)
                        }, void 0, false, {
                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                            lineNumber: 390,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-muted-foreground mt-2",
                            children: [
                                "Across ",
                                accounts.length,
                                " account",
                                accounts.length !== 1 ? "s" : ""
                            ]
                        }, void 0, true, {
                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                            lineNumber: 391,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                    lineNumber: 388,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                lineNumber: 387,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                            children: accounts.map((account)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Sheet"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SheetTrigger"], {
                                            asChild: true,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AccountCard, {
                                                    account: account,
                                                    onClick: ()=>setSelectedAccount(account)
                                                }, void 0, false, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                                    lineNumber: 406,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                                lineNumber: 405,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                            lineNumber: 404,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SheetContent"], {
                                            className: "w-full sm:max-w-lg overflow-y-auto",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SheetHeader"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SheetTitle"], {
                                                            children: account.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                                            lineNumber: 411,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SheetDescription"], {
                                                            children: "Account details and insights"
                                                        }, void 0, false, {
                                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                                            lineNumber: 412,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                                    lineNumber: 410,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-6 space-y-6",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "p-4 rounded-lg bg-muted/30",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "grid grid-cols-2 gap-4",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-xs text-muted-foreground",
                                                                                children: "Account Number"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                                                                lineNumber: 419,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex items-center gap-2",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                        className: "text-sm font-medium",
                                                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatAccountNumber"])(account.accountNumber, false)
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                                                                        lineNumber: 421,
                                                                                        columnNumber: 29
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                                                        variant: "ghost",
                                                                                        size: "icon",
                                                                                        className: "h-6 w-6",
                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                                                                            className: "h-3 w-3"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                                                                            lineNumber: 423,
                                                                                            columnNumber: 31
                                                                                        }, this)
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                                                                        lineNumber: 422,
                                                                                        columnNumber: 29
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                                                                lineNumber: 420,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                                                        lineNumber: 418,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-xs text-muted-foreground",
                                                                                children: "Currency"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                                                                lineNumber: 428,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-sm font-medium",
                                                                                children: account.currency
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                                                                lineNumber: 429,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                                                        lineNumber: 427,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    account.iban && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "col-span-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-xs text-muted-foreground",
                                                                                children: "IBAN"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                                                                lineNumber: 433,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex items-center gap-2",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                        className: "text-sm font-medium font-mono",
                                                                                        children: account.iban
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                                                                        lineNumber: 435,
                                                                                        columnNumber: 31
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                                                        variant: "ghost",
                                                                                        size: "icon",
                                                                                        className: "h-6 w-6",
                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                                                                            className: "h-3 w-3"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                                                                            lineNumber: 437,
                                                                                            columnNumber: 33
                                                                                        }, this)
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                                                                        lineNumber: 436,
                                                                                        columnNumber: 31
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                                                                lineNumber: 434,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                                                        lineNumber: 432,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                                                lineNumber: 417,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                                            lineNumber: 416,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AccountInsightsPanel, {
                                                            account: account,
                                                            transactions: transactions.filter((t)=>t.accountId === account.id)
                                                        }, void 0, false, {
                                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                                            lineNumber: 445,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                                    lineNumber: 415,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                            lineNumber: 409,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, account.id, true, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                    lineNumber: 403,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                            lineNumber: 401,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                        lineNumber: 400,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-1",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ai$2f$ask$2d$ai$2d$banker$2d$widget$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AskAIBankerWidget"], {
                            questions: aiQuestions,
                            description: "Get insights about your accounts"
                        }, void 0, false, {
                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                            lineNumber: 458,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                        lineNumber: 457,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                lineNumber: 398,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                        className: "flex flex-row items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                                        children: "Transactions"
                                    }, void 0, false, {
                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                        lineNumber: 466,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardDescription"], {
                                        children: selectedAccount ? `Showing transactions for ${selectedAccount.name}` : "All account transactions"
                                    }, void 0, false, {
                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                        lineNumber: 467,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                lineNumber: 465,
                                columnNumber: 11
                            }, this),
                            selectedAccount && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "ghost",
                                size: "sm",
                                onClick: ()=>setSelectedAccount(null),
                                children: "Show All"
                            }, void 0, false, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                                lineNumber: 472,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                        lineNumber: 464,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TransactionsTable, {
                            transactions: displayedTransactions
                        }, void 0, false, {
                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                            lineNumber: 478,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                        lineNumber: 477,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
                lineNumber: 463,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/accounts/page.tsx",
        lineNumber: 383,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=AI%20Agents_Future_Banking_v0-bank-of-the-future_386542fe._.js.map