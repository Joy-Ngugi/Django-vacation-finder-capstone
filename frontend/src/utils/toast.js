import toast from "react-hot-toast";

/**
 * Reusable toast helpers — import anywhere and call.
 * All automatically styled to match the app palette.
 */

const baseStyle = {
  borderRadius: "12px",
  background: "#ffffff",
  color: "#1f2937",
  border: "1px solid #dbeafe", // blue-100
  boxShadow: "0 4px 12px rgba(137, 207, 240, 0.35)",
  padding: "12px 16px",
  fontSize: "0.9rem",
  fontWeight: 500,
};

export const notify = {
  success: (message) =>
    toast.success(message, {
      style: { ...baseStyle, borderLeft: "4px solid #16a34a" },
      iconTheme: { primary: "#16a34a", secondary: "#ffffff" },
    }),

  error: (message) =>
    toast.error(message, {
      style: { ...baseStyle, borderLeft: "4px solid #dc2626" },
      iconTheme: { primary: "#dc2626", secondary: "#ffffff" },
    }),

  info: (message) =>
    toast(message, {
      icon: "ℹ️",
      style: { ...baseStyle, borderLeft: "4px solid #2563eb" },
    }),

  loading: (message) =>
    toast.loading(message, {
      style: { ...baseStyle, borderLeft: "4px solid #2563eb" },
    }),

  warning: (message) =>
    toast(message, {
      icon: "⚠️",
      style: { ...baseStyle, borderLeft: "4px solid #f59e0b" },
    }),

  // Promise helper — shows loading → success/error automatically
  promise: (promise, { loading, success, error }) =>
    toast.promise(
      promise,
      {
        loading,
        success,
        error,
      },
      { style: baseStyle }
    ),

  // Dismiss a specific or all toasts
  dismiss: (id) => toast.dismiss(id),
};