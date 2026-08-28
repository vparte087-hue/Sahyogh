import { RequestStatus, VerificationStatus, PaymentStatus } from "../types";

export const COLOR_TOKENS = {
  background: "#F5F7FA",
  surface: "#FFFFFF",
  primary: "#173F5F",
  secondary: "#20639B",
  accent: "#F6A623",
  success: "#2E8B57",
  warning: "#D9822B",
  danger: "#C0392B",
  textPrimary: "#17212B",
  textSecondary: "#5A6B7B",
  border: "#DDE3EA",
};

export const REQUEST_STATUS_CONFIG: Record<
  RequestStatus,
  { label: string; bg: string; text: string; border: string }
> = {
  REQUESTED: {
    label: "Submitted",
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
  },
  UNDER_REVIEW: {
    label: "Pending Review",
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
  },
  ASSIGNMENT_PENDING: {
    label: "Assign Pending",
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
  },
  WORKER_ASSIGNED: {
    label: "Worker Assigned",
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
  },
  WORKER_ACCEPTED: {
    label: "Accepted",
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
  },
  SCHEDULED: {
    label: "Scheduled",
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
  },
  IN_PROGRESS: {
    label: "In Progress",
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
  },
  COMPLETION_PENDING: {
    label: "Awaiting Confirmation",
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
  },
  COMPLETED: {
    label: "Completed",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
  },
  PAYMENT_PENDING: {
    label: "Payment Pending",
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
  },
  PAID: {
    label: "Paid",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
  },
  INVOICED: {
    label: "Invoiced",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
  },
  CLOSED: {
    label: "Closed",
    bg: "bg-gray-100",
    text: "text-gray-700",
    border: "border-gray-300",
  },
  CANCELLED: {
    label: "Cancelled",
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
  },
  DISPUTED: {
    label: "Disputed",
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
  },
  NO_WORKER_AVAILABLE: {
    label: "No Worker Available",
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
  },
};
