import { create } from "zustand";
import { UserRole, ServiceRequest, WorkerProfile, ServiceCategory, AuditLog, ServiceAddress } from "../types";
import { INITIAL_CATEGORIES, INITIAL_WORKERS, INITIAL_REQUESTS, INITIAL_AUDIT_LOGS } from "./mock-data";

interface AppState {
  activeRole: UserRole;
  requests: ServiceRequest[];
  workers: WorkerProfile[];
  categories: ServiceCategory[];
  auditLogs: AuditLog[];

  // Actions
  setActiveRole: (role: UserRole) => void;
  createServiceRequest: (payload: {
    categoryId: string;
    title: string;
    problemDescription: string;
    preferredDate: string;
    preferredTimeSlot: string;
    address: ServiceAddress;
    photos?: string[];
  }) => string; // returns generated request ID

  assignWorker: (requestId: string, workerId: string) => void;
  acceptJob: (requestId: string) => void;
  rejectJob: (requestId: string, reason: string) => void;
  startJob: (requestId: string) => void;
  completeJob: (requestId: string, notes: string, photos?: string[]) => void;
  processPayment: (requestId: string) => void;
  submitRating: (requestId: string, stars: number, review?: string, issues?: string[]) => void;
  resetDemoData: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  activeRole: "CONSUMER",
  requests: INITIAL_REQUESTS,
  workers: INITIAL_WORKERS,
  categories: INITIAL_CATEGORIES,
  auditLogs: INITIAL_AUDIT_LOGS,

  setActiveRole: (role) => set({ activeRole: role }),

  createServiceRequest: (payload) => {
    const category = get().categories.find((c) => c.id === payload.categoryId);
    const categoryName = category ? category.name : "Service";
    const basePrice = category ? category.basePrice : 500;
    const serviceFee = Math.round(basePrice * 0.1);
    const gst = Math.round((basePrice + serviceFee) * 0.18);
    const total = basePrice + serviceFee + gst;

    const newId = `REQ-${1000 + get().requests.length + 1}`;
    const timestamp = new Date().toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    const newRequest: ServiceRequest = {
      id: newId,
      consumerId: "cons-current",
      consumerName: "Priya Verma",
      consumerPhone: "+91 98200 11223",
      categoryId: payload.categoryId,
      categoryName,
      title: payload.title || `${categoryName} Request`,
      problemDescription: payload.problemDescription,
      preferredDate: payload.preferredDate,
      preferredTimeSlot: payload.preferredTimeSlot,
      address: payload.address,
      photos: payload.photos || [],
      status: "UNDER_REVIEW",
      createdAt: timestamp,
      amount: {
        base: basePrice,
        serviceFee,
        gst,
        total,
      },
      timeline: [
        {
          status: "REQUESTED",
          label: "Request Submitted",
          timestamp,
          description: "Submitted by Priya Verma",
        },
        {
          status: "UNDER_REVIEW",
          label: "Admin Reviewing",
          timestamp,
          description: "Cooperative Admin is matching candidate workers",
        },
      ],
    };

    const newAudit: AuditLog = {
      id: `audit-${Date.now()}`,
      timestamp,
      action: "CREATE_REQUEST",
      actorRole: "CONSUMER",
      actorName: "Priya Verma",
      details: `Created service request ${newId} for ${categoryName}`,
    };

    set((state) => ({
      requests: [newRequest, ...state.requests],
      auditLogs: [newAudit, ...state.auditLogs],
    }));

    return newId;
  },

  assignWorker: (requestId, workerId) => {
    const worker = get().workers.find((w) => w.id === workerId);
    if (!worker) return;

    const timestamp = new Date().toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    set((state) => ({
      requests: state.requests.map((req) => {
        if (req.id !== requestId) return req;
        return {
          ...req,
          status: "WORKER_ASSIGNED",
          assignedWorkerId: worker.id,
          assignedWorkerName: worker.name,
          timeline: [
            ...req.timeline,
            {
              status: "WORKER_ASSIGNED",
              label: "Worker Assigned",
              timestamp,
              description: `Assigned to ${worker.name} (${worker.workerCode}) from ${worker.societyName}`,
            },
          ],
        };
      }),
      auditLogs: [
        {
          id: `audit-${Date.now()}`,
          timestamp,
          action: "ASSIGN_WORKER",
          actorRole: "COOPERATIVE_ADMIN",
          actorName: "Admin Sharma",
          details: `Assigned ${worker.name} (${worker.workerCode}) to ${requestId}`,
        },
        ...state.auditLogs,
      ],
    }));
  },

  acceptJob: (requestId) => {
    const timestamp = new Date().toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    set((state) => ({
      requests: state.requests.map((req) => {
        if (req.id !== requestId) return req;
        return {
          ...req,
          status: "WORKER_ACCEPTED",
          timeline: [
            ...req.timeline,
            {
              status: "WORKER_ACCEPTED",
              label: "Worker Accepted",
              timestamp,
              description: "Worker confirmed job assignment & schedule",
            },
          ],
        };
      }),
      auditLogs: [
        {
          id: `audit-${Date.now()}`,
          timestamp,
          action: "ACCEPT_JOB",
          actorRole: "WORKER",
          actorName: "Ramesh Sharma",
          details: `Worker accepted assignment for ${requestId}`,
        },
        ...state.auditLogs,
      ],
    }));
  },

  rejectJob: (requestId, reason) => {
    const timestamp = new Date().toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    set((state) => ({
      requests: state.requests.map((req) => {
        if (req.id !== requestId) return req;
        return {
          ...req,
          status: "ASSIGNMENT_PENDING",
          assignedWorkerId: undefined,
          assignedWorkerName: undefined,
          rejectionReason: reason,
          timeline: [
            ...req.timeline,
            {
              status: "ASSIGNMENT_PENDING",
              label: "Assignment Rejected - Reassignment Needed",
              timestamp,
              description: `Worker rejected: "${reason}". Returned to admin assignment queue.`,
            },
          ],
        };
      }),
      auditLogs: [
        {
          id: `audit-${Date.now()}`,
          timestamp,
          action: "REJECT_JOB",
          actorRole: "WORKER",
          actorName: "Ramesh Sharma",
          details: `Worker rejected job ${requestId}. Reason: ${reason}`,
        },
        ...state.auditLogs,
      ],
    }));
  },

  startJob: (requestId) => {
    const timestamp = new Date().toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    set((state) => ({
      requests: state.requests.map((req) => {
        if (req.id !== requestId) return req;
        return {
          ...req,
          status: "IN_PROGRESS",
          timeline: [
            ...req.timeline,
            {
              status: "IN_PROGRESS",
              label: "Service In Progress",
              timestamp,
              description: "Worker arrived on site and began work",
            },
          ],
        };
      }),
      auditLogs: [
        {
          id: `audit-${Date.now()}`,
          timestamp,
          action: "START_JOB",
          actorRole: "WORKER",
          actorName: "Ramesh Sharma",
          details: `Started service execution for ${requestId}`,
        },
        ...state.auditLogs,
      ],
    }));
  },

  completeJob: (requestId, notes, photos) => {
    const timestamp = new Date().toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    set((state) => ({
      requests: state.requests.map((req) => {
        if (req.id !== requestId) return req;
        return {
          ...req,
          status: "COMPLETION_PENDING",
          completionNotes: notes,
          completionPhotos: photos || [],
          timeline: [
            ...req.timeline,
            {
              status: "COMPLETION_PENDING",
              label: "Work Finished - Pending Confirmation",
              timestamp,
              description: "Worker submitted completion notes. Awaiting consumer confirmation & payment.",
            },
          ],
        };
      }),
      auditLogs: [
        {
          id: `audit-${Date.now()}`,
          timestamp,
          action: "COMPLETE_JOB",
          actorRole: "WORKER",
          actorName: "Ramesh Sharma",
          details: `Completed work for ${requestId}`,
        },
        ...state.auditLogs,
      ],
    }));
  },

  processPayment: (requestId) => {
    const timestamp = new Date().toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    set((state) => ({
      requests: state.requests.map((req) => {
        if (req.id !== requestId) return req;
        return {
          ...req,
          status: "PAID",
          paymentStatus: "SUCCESS",
          timeline: [
            ...req.timeline,
            {
              status: "COMPLETED",
              label: "Service Confirmed",
              timestamp,
            },
            {
              status: "PAID",
              label: "Payment Success",
              timestamp,
              description: `Payment of ₹${req.amount?.total} processed via Razorpay`,
            },
          ],
        };
      }),
      auditLogs: [
        {
          id: `audit-${Date.now()}`,
          timestamp,
          action: "PROCESS_PAYMENT",
          actorRole: "CONSUMER",
          actorName: "Priya Verma",
          details: `Payment processed for ${requestId}`,
        },
        ...state.auditLogs,
      ],
    }));
  },

  submitRating: (requestId, stars, review, issues) => {
    const timestamp = new Date().toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    set((state) => ({
      requests: state.requests.map((req) => {
        if (req.id !== requestId) return req;
        return {
          ...req,
          rating: { stars, review, issues },
        };
      }),
      auditLogs: [
        {
          id: `audit-${Date.now()}`,
          timestamp,
          action: "SUBMIT_RATING",
          actorRole: "CONSUMER",
          actorName: "Priya Verma",
          details: `Submitted ${stars}-star rating for ${requestId}`,
        },
        ...state.auditLogs,
      ],
    }));
  },

  resetDemoData: () =>
    set({
      requests: INITIAL_REQUESTS,
      workers: INITIAL_WORKERS,
      categories: INITIAL_CATEGORIES,
      auditLogs: INITIAL_AUDIT_LOGS,
    }),
}));
