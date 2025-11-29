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
"[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/progress.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Progress",
    ()=>Progress
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$progress$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/@radix-ui/react-progress/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
function Progress({ className, value, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$progress$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "progress",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('bg-primary/20 relative h-2 w-full overflow-hidden rounded-full', className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$progress$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Indicator"], {
            "data-slot": "progress-indicator",
            className: "bg-primary h-full w-full flex-1 transition-all",
            style: {
                transform: `translateX(-${100 - (value || 0)}%)`
            }
        }, void 0, false, {
            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/progress.tsx",
            lineNumber: 22,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/progress.tsx",
        lineNumber: 14,
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
"[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/slider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Slider",
    ()=>Slider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slider$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/@radix-ui/react-slider/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function Slider({ className, defaultValue, value, min = 0, max = 100, ...props }) {
    const _values = __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [
            min,
            max
        ], [
        value,
        defaultValue,
        min,
        max
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slider$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "slider",
        defaultValue: defaultValue,
        value: value,
        min: min,
        max: max,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col', className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slider$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Track"], {
                "data-slot": "slider-track",
                className: 'bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5',
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slider$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Range"], {
                    "data-slot": "slider-range",
                    className: 'bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full'
                }, void 0, false, {
                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/slider.tsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/slider.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            Array.from({
                length: _values.length
            }, (_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slider$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Thumb"], {
                    "data-slot": "slider-thumb",
                    className: "border-primary ring-ring/50 block size-4 shrink-0 rounded-full border bg-white shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
                }, index, false, {
                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/slider.tsx",
                    lineNumber: 53,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/slider.tsx",
        lineNumber: 27,
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
"[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CardsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$role$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/lib/role-context.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/lib/format.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$page$2d$header$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/page-header.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/badge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$progress$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/progress.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/dialog.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$slider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/slider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/label.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ui/sheet.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ai$2f$citation$2d$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/components/ai/citation-badge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/credit-card.js [app-ssr] (ecmascript) <export default as CreditCard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$snowflake$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Snowflake$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/snowflake.js [app-ssr] (ecmascript) <export default as Snowflake>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/sun.js [app-ssr] (ecmascript) <export default as Sun>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings2$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/settings-2.js [app-ssr] (ecmascript) <export default as Settings2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-ssr] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-ssr] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/bot.js [app-ssr] (ecmascript) <export default as Bot>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/AI Agents/Future_Banking/v0-bank-of-the-future/node_modules/lucide-react/dist/esm/icons/copy.js [app-ssr] (ecmascript) <export default as Copy>");
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
;
;
function CreditCardVisual({ card, showDetails = false }) {
    const [flipped, setFlipped] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const getCardGradient = ()=>{
        if (card.type === "credit") return "from-slate-800 via-slate-700 to-slate-900";
        if (card.type === "virtual") return "from-indigo-600 via-indigo-500 to-indigo-700";
        return "from-emerald-600 via-emerald-500 to-emerald-700";
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-full aspect-[1.586/1] perspective-1000 cursor-pointer",
        onClick: ()=>setFlipped(!flipped),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${flipped ? "rotate-y-180" : ""}`,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `absolute inset-0 backface-hidden rounded-2xl p-6 flex flex-col justify-between bg-gradient-to-br ${getCardGradient()}`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-10 h-7 bg-amber-400 rounded-md"
                                        }, void 0, false, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                            lineNumber: 51,
                                            columnNumber: 15
                                        }, this),
                                        card.type === "virtual" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                            variant: "outline",
                                            className: "bg-white/10 border-white/20 text-white text-[10px]",
                                            children: "VIRTUAL"
                                        }, void 0, false, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                            lineNumber: 53,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                    lineNumber: 50,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-white/80 text-sm font-medium",
                                    children: card.brand
                                }, void 0, false, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                    lineNumber: 58,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                            lineNumber: 49,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-white/60 text-xs mb-1",
                                    children: "Card Number"
                                }, void 0, false, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                    lineNumber: 62,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-white text-lg tracking-widest font-mono",
                                    children: showDetails ? `•••• •••• •••• ${card.lastFour}` : (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCardNumber"])(card.lastFour)
                                }, void 0, false, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                    lineNumber: 63,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                            lineNumber: 61,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-end justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-white/60 text-[10px] mb-0.5",
                                            children: "CARDHOLDER"
                                        }, void 0, false, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                            lineNumber: 70,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-white text-sm",
                                            children: card.cardholderName
                                        }, void 0, false, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                            lineNumber: 71,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                    lineNumber: 69,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-right",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-white/60 text-[10px] mb-0.5",
                                            children: "EXPIRES"
                                        }, void 0, false, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                            lineNumber: 74,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-white text-sm",
                                            children: card.expiryDate
                                        }, void 0, false, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                            lineNumber: 75,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                    lineNumber: 73,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                            lineNumber: 68,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                    lineNumber: 46,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `absolute inset-0 backface-hidden rotate-y-180 rounded-2xl bg-gradient-to-br ${getCardGradient()}`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full h-10 bg-black/40 mt-6"
                        }, void 0, false, {
                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                            lineNumber: 84,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-6 mt-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white/90 rounded p-2 text-right",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-slate-800 font-mono text-sm tracking-wider",
                                        children: showDetails ? "•••" : "•••"
                                    }, void 0, false, {
                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                        lineNumber: 87,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                    lineNumber: 86,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-white/60 text-xs mt-4 text-center",
                                    children: "Tap to flip back"
                                }, void 0, false, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                    lineNumber: 89,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                            lineNumber: 85,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                    lineNumber: 81,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
            lineNumber: 42,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
function CardActions({ card, onFreeze, onUnfreeze }) {
    const [showLimitsDialog, setShowLimitsDialog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showReplaceDialog, setShowReplaceDialog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [newLimit, setNewLimit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(card.limit || 50000);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        variant: card.status === "frozen" ? "default" : "outline",
                        className: "flex items-center gap-2",
                        onClick: card.status === "frozen" ? onUnfreeze : onFreeze,
                        children: card.status === "frozen" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__["Sun"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                    lineNumber: 120,
                                    columnNumber: 15
                                }, this),
                                "Unfreeze"
                            ]
                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$snowflake$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Snowflake$3e$__["Snowflake"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                    lineNumber: 125,
                                    columnNumber: 15
                                }, this),
                                "Freeze"
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        className: "flex items-center gap-2 bg-transparent",
                        onClick: ()=>setShowLimitsDialog(true),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings2$3e$__["Settings2"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                lineNumber: 135,
                                columnNumber: 11
                            }, this),
                            "Limits"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                        lineNumber: 130,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        className: "flex items-center gap-2 col-span-2 bg-transparent",
                        onClick: ()=>setShowReplaceDialog(true),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                lineNumber: 143,
                                columnNumber: 11
                            }, this),
                            "Replace Card"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                        lineNumber: 138,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Dialog"], {
                open: showLimitsDialog,
                onOpenChange: setShowLimitsDialog,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogContent"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogHeader"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                    children: "Card Limits"
                                }, void 0, false, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                    lineNumber: 152,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogDescription"], {
                                    children: "Adjust your daily transaction limits"
                                }, void 0, false, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                    lineNumber: 153,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                            lineNumber: 151,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-6 py-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                    children: "Daily Transaction Limit"
                                                }, void 0, false, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                                    lineNumber: 159,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm font-medium",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(newLimit)
                                                }, void 0, false, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                                    lineNumber: 160,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                            lineNumber: 158,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$slider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Slider"], {
                                            value: [
                                                newLimit
                                            ],
                                            onValueChange: ([value])=>setNewLimit(value),
                                            min: 1000,
                                            max: 100000,
                                            step: 1000
                                        }, void 0, false, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                            lineNumber: 162,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-muted-foreground",
                                            children: [
                                                "Limit can be set between ",
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(1000),
                                                " and ",
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(100000)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                            lineNumber: 169,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                    lineNumber: 157,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-3 rounded-lg bg-muted/30 text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 mb-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__["Bot"], {
                                                    className: "h-4 w-4 text-primary"
                                                }, void 0, false, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                                    lineNumber: 176,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-medium",
                                                    children: "Policy Reference"
                                                }, void 0, false, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                                    lineNumber: 177,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                            lineNumber: 175,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-muted-foreground",
                                            children: "Per Card Terms v3.0, daily limits can be adjusted up to your account maximum. Changes take effect immediately."
                                        }, void 0, false, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                            lineNumber: 179,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ai$2f$citation$2d$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CitationBadge"], {
                                            citation: {
                                                id: "cite_1",
                                                source: "Card Terms v3.0",
                                                type: "product_terms"
                                            },
                                            className: "mt-2"
                                        }, void 0, false, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                            lineNumber: 183,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                    lineNumber: 174,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                            lineNumber: 156,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogFooter"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "outline",
                                    onClick: ()=>setShowLimitsDialog(false),
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                    lineNumber: 191,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    onClick: ()=>setShowLimitsDialog(false),
                                    children: "Save Changes"
                                }, void 0, false, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                    lineNumber: 194,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                            lineNumber: 190,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                    lineNumber: 150,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                lineNumber: 149,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Dialog"], {
                open: showReplaceDialog,
                onOpenChange: setShowReplaceDialog,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogContent"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogHeader"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                    children: "Replace Card"
                                }, void 0, false, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                    lineNumber: 203,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogDescription"], {
                                    children: "Request a replacement for your card"
                                }, void 0, false, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                    lineNumber: 204,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                            lineNumber: 202,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4 py-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                            htmlFor: "reason",
                                            children: "Reason for Replacement"
                                        }, void 0, false, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                            lineNumber: 209,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            id: "reason",
                                            className: "w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "damaged",
                                                    children: "Card Damaged"
                                                }, void 0, false, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                                    lineNumber: 214,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "lost",
                                                    children: "Card Lost"
                                                }, void 0, false, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                                    lineNumber: 215,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "stolen",
                                                    children: "Card Stolen"
                                                }, void 0, false, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                                    lineNumber: 216,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "expired",
                                                    children: "Card Expiring Soon"
                                                }, void 0, false, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                                    lineNumber: 217,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                            lineNumber: 210,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                    lineNumber: 208,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                className: "h-4 w-4 text-yellow-500 mt-0.5"
                                            }, void 0, false, {
                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                                lineNumber: 223,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-medium text-yellow-500",
                                                        children: "Important"
                                                    }, void 0, false, {
                                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                                        lineNumber: 225,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-muted-foreground",
                                                        children: "Your current card will be deactivated immediately if you select “Lost” or “Stolen”."
                                                    }, void 0, false, {
                                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                                        lineNumber: 226,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                                lineNumber: 224,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                        lineNumber: 222,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                    lineNumber: 221,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm text-muted-foreground",
                                    children: [
                                        "Replacement fee:",
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-foreground font-medium",
                                            children: card.type === "credit" ? "Free" : "AED 50"
                                        }, void 0, false, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                            lineNumber: 236,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                    lineNumber: 234,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                            lineNumber: 207,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogFooter"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "outline",
                                    onClick: ()=>setShowReplaceDialog(false),
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                    lineNumber: 241,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    onClick: ()=>setShowReplaceDialog(false),
                                    children: "Request Replacement"
                                }, void 0, false, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                    lineNumber: 244,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                            lineNumber: 240,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                    lineNumber: 201,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                lineNumber: 200,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
function CardInsightsPanel({ card }) {
    const aiInsights = {
        unusualSpend: {
            detected: true,
            category: "Entertainment",
            increase: 45
        },
        benefits: [
            "Lounge access: 4 complimentary visits remaining",
            "Travel insurance: Active for international trips",
            "Extended warranty: Covers electronics purchases"
        ]
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
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
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                    lineNumber: 271,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                                    className: "text-sm",
                                    children: "Card Benefits"
                                }, void 0, false, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                    lineNumber: 272,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                            lineNumber: 270,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                        lineNumber: 269,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "space-y-2",
                                children: aiInsights.benefits.map((benefit, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: "text-sm text-muted-foreground flex items-start gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-primary",
                                                children: "•"
                                            }, void 0, false, {
                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                                lineNumber: 279,
                                                columnNumber: 17
                                            }, this),
                                            benefit
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                        lineNumber: 278,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                lineNumber: 276,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-1 mt-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ai$2f$citation$2d$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CitationBadge"], {
                                    citation: {
                                        id: "cite_1",
                                        source: "Card T&Cs v3.0",
                                        type: "product_terms"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                    lineNumber: 285,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                lineNumber: 284,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ai$2f$citation$2d$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConfidenceIndicator"], {
                                confidence: "high",
                                className: "mt-2"
                            }, void 0, false, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                lineNumber: 287,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                        lineNumber: 275,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                lineNumber: 268,
                columnNumber: 7
            }, this),
            aiInsights.unusualSpend.detected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                className: "border-yellow-500/30 bg-yellow-500/5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                        className: "pb-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                    className: "h-4 w-4 text-yellow-500"
                                }, void 0, false, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                    lineNumber: 295,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                                    className: "text-sm text-yellow-500",
                                    children: "Unusual Spend Detected"
                                }, void 0, false, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                    lineNumber: 296,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                            lineNumber: 294,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                        lineNumber: 293,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-muted-foreground",
                                children: [
                                    "Your ",
                                    aiInsights.unusualSpend.category,
                                    " spending is ",
                                    aiInsights.unusualSpend.increase,
                                    "% higher than your average this month."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                lineNumber: 300,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-1 mt-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ai$2f$citation$2d$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CitationBadge"], {
                                    citation: {
                                        id: "cite_2",
                                        source: "Transaction History",
                                        type: "transaction_history"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                    lineNumber: 305,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                lineNumber: 304,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                        lineNumber: 299,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                lineNumber: 292,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
        lineNumber: 267,
        columnNumber: 5
    }, this);
}
function CardsPage() {
    const { currentUser } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$role$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRole"])();
    const [selectedCard, setSelectedCard] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [cards, setCards] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        async function fetchCards() {
            if (!currentUser?.id) return;
            setIsLoading(true);
            const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
            const { data, error } = await supabase.from("cards").select("*").eq("user_id", currentUser.id);
            if (error) {
                console.error("Error fetching cards:", error);
            } else {
                const mappedCards = (data || []).map((c)=>({
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
            }
            setIsLoading(false);
        }
        fetchCards();
    }, [
        currentUser
    ]);
    const handleFreeze = async (cardId)=>{
        // In a real app, we would update Supabase here
        console.log("Freezing card:", cardId);
        // Optimistic update
        setCards((prev)=>prev.map((c)=>c.id === cardId ? {
                    ...c,
                    status: "frozen"
                } : c));
    };
    const handleUnfreeze = async (cardId)=>{
        // In a real app, we would update Supabase here
        console.log("Unfreezing card:", cardId);
        // Optimistic update
        setCards((prev)=>prev.map((c)=>c.id === cardId ? {
                    ...c,
                    status: "active"
                } : c));
    };
    // AI Banker questions relevant to cards page
    const aiQuestions = [
        "What are my card benefits?",
        "How do I increase my credit limit?",
        "Why was my card declined?",
        "How do I report a lost card?"
    ];
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-screen items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                className: "h-8 w-8 animate-spin text-primary"
            }, void 0, false, {
                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                lineNumber: 379,
                columnNumber: 71
            }, this)
        }, void 0, false, {
            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
            lineNumber: 379,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$page$2d$header$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PageHeader"], {
                title: "Cards",
                description: "Manage your debit and credit cards"
            }, void 0, false, {
                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                lineNumber: 384,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                            children: cards.map((card)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Sheet"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SheetTrigger"], {
                                            asChild: true,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                                                className: "cursor-pointer hover:bg-muted/30 transition-colors overflow-hidden",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                                                    className: "p-0",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "p-4",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CreditCardVisual, {
                                                                card: card
                                                            }, void 0, false, {
                                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                                                lineNumber: 396,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                                            lineNumber: 395,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "p-4 border-t",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center justify-between mb-3",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: "font-medium capitalize",
                                                                                    children: [
                                                                                        card.type,
                                                                                        " Card"
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                                                                    lineNumber: 402,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: "text-sm text-muted-foreground",
                                                                                    children: card.brand
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                                                                    lineNumber: 403,
                                                                                    columnNumber: 29
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                                                            lineNumber: 401,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                                            variant: "secondary",
                                                                            className: card.status === "frozen" ? "bg-blue-500/20 text-blue-500" : "bg-emerald-500/20 text-emerald-500",
                                                                            children: card.status === "frozen" ? "Frozen" : "Active"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                                                            lineNumber: 405,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                                                    lineNumber: 400,
                                                                    columnNumber: 25
                                                                }, this),
                                                                card.limit && card.spent !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "space-y-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex items-center justify-between text-sm",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "text-muted-foreground",
                                                                                    children: "Spent this month"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                                                                    lineNumber: 420,
                                                                                    columnNumber: 31
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    children: [
                                                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(card.spent),
                                                                                        " / ",
                                                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(card.limit)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                                                                    lineNumber: 421,
                                                                                    columnNumber: 31
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                                                            lineNumber: 419,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$progress$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Progress"], {
                                                                            value: card.spent / card.limit * 100,
                                                                            className: "h-2"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                                                            lineNumber: 425,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                                                    lineNumber: 418,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                                            lineNumber: 399,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                                    lineNumber: 394,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                                lineNumber: 393,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                            lineNumber: 392,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SheetContent"], {
                                            className: "w-full sm:max-w-lg overflow-y-auto",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SheetHeader"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SheetTitle"], {
                                                            className: "capitalize",
                                                            children: [
                                                                card.type,
                                                                " Card"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                                            lineNumber: 435,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SheetDescription"], {
                                                            children: "Manage your card and view insights"
                                                        }, void 0, false, {
                                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                                            lineNumber: 436,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                                    lineNumber: 434,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-6 space-y-6",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CreditCardVisual, {
                                                            card: card,
                                                            showDetails: true
                                                        }, void 0, false, {
                                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                                            lineNumber: 440,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "p-4 rounded-lg bg-muted/30",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "grid grid-cols-2 gap-4",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-xs text-muted-foreground",
                                                                                children: "Card Number"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                                                                lineNumber: 445,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex items-center gap-2",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                        className: "text-sm font-medium",
                                                                                        children: [
                                                                                            "•••• ",
                                                                                            card.lastFour
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                                                                        lineNumber: 447,
                                                                                        columnNumber: 29
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                                                        variant: "ghost",
                                                                                        size: "icon",
                                                                                        className: "h-6 w-6",
                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                                                                            className: "h-3 w-3"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                                                                            lineNumber: 449,
                                                                                            columnNumber: 31
                                                                                        }, this)
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                                                                        lineNumber: 448,
                                                                                        columnNumber: 29
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                                                                lineNumber: 446,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                                                        lineNumber: 444,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-xs text-muted-foreground",
                                                                                children: "Expiry"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                                                                lineNumber: 454,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-sm font-medium",
                                                                                children: card.expiryDate
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                                                                lineNumber: 455,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                                                        lineNumber: 453,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-xs text-muted-foreground",
                                                                                children: "Status"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                                                                lineNumber: 458,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                                                variant: "secondary",
                                                                                className: card.status === "frozen" ? "bg-blue-500/20 text-blue-500" : "bg-emerald-500/20 text-emerald-500",
                                                                                children: card.status
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                                                                lineNumber: 459,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                                                        lineNumber: 457,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    card.limit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-xs text-muted-foreground",
                                                                                children: "Credit Limit"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                                                                lineNumber: 472,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-sm font-medium",
                                                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(card.limit)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                                                                lineNumber: 473,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                                                        lineNumber: 471,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                                                lineNumber: 443,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                                            lineNumber: 442,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CardActions, {
                                                            card: card,
                                                            onFreeze: ()=>handleFreeze(card.id),
                                                            onUnfreeze: ()=>handleUnfreeze(card.id)
                                                        }, void 0, false, {
                                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                                            lineNumber: 479,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CardInsightsPanel, {
                                                            card: card
                                                        }, void 0, false, {
                                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                                            lineNumber: 485,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                                    lineNumber: 439,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                            lineNumber: 433,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, card.id, true, {
                                    fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                                    lineNumber: 391,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                            lineNumber: 389,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                        lineNumber: 388,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-1",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ai$2f$ask$2d$ai$2d$banker$2d$widget$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AskAIBankerWidget"], {
                            questions: aiQuestions,
                            description: "Get help with your cards"
                        }, void 0, false, {
                            fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                            lineNumber: 495,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                        lineNumber: 494,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                lineNumber: 386,
                columnNumber: 7
            }, this),
            cards.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                className: "p-12 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"], {
                        className: "h-12 w-12 text-muted-foreground mx-auto mb-4"
                    }, void 0, false, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                        lineNumber: 501,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-medium mb-2",
                        children: "No Cards Yet"
                    }, void 0, false, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                        lineNumber: 502,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted-foreground mb-4",
                        children: "You don't have any cards linked to your account."
                    }, void 0, false, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                        lineNumber: 503,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AI__Agents$2f$Future_Banking$2f$v0$2d$bank$2d$of$2d$the$2d$future$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        children: "Apply for a Card"
                    }, void 0, false, {
                        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                        lineNumber: 504,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
                lineNumber: 500,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/AI Agents/Future_Banking/v0-bank-of-the-future/app/(dashboard)/cards/page.tsx",
        lineNumber: 383,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=AI%20Agents_Future_Banking_v0-bank-of-the-future_4436ee78._.js.map