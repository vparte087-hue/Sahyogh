import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import {
  createServiceRequest,
  getServiceRequests,
  getServiceRequestById,
  cancelServiceRequest,
} from "../modules/requests/request.controller";
import {
  getAdminDashboardStats,
  getRequestCandidates,
  assignWorkerToRequest,
} from "../modules/admin/admin.controller";
import {
  getWorkerJobs,
  acceptWorkerJob,
  rejectWorkerJob,
  startWorkerJob,
  completeWorkerJob,
  getWorkerEarnings,
} from "../modules/worker/worker.controller";
import {
  getInvoiceByRequestId,
  submitWorkerRating,
} from "../modules/billing/invoice.controller";
import { getAuditLogs } from "../modules/audit/audit.controller";

export const apiRouter = Router();

apiRouter.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    service: "Sahyog Cooperative REST API Engine",
    version: "v1.0",
    timestamp: new Date().toISOString(),
  });
});

apiRouter.post("/requests", requireAuth(["CONSUMER", "MEMBER" as any]), createServiceRequest);
apiRouter.get("/requests", requireAuth(), getServiceRequests);
apiRouter.get("/requests/:id", requireAuth(), getServiceRequestById);
apiRouter.post("/requests/:id/cancel", requireAuth(["CONSUMER", "MEMBER" as any]), cancelServiceRequest);

apiRouter.get("/admin/dashboard-stats", requireAuth(["COOPERATIVE_ADMIN", "PLATFORM_AUTHORITY"]), getAdminDashboardStats);
apiRouter.post("/requests/:id/candidates", requireAuth(["COOPERATIVE_ADMIN", "PLATFORM_AUTHORITY"]), getRequestCandidates);
apiRouter.post("/requests/:id/assign", requireAuth(["COOPERATIVE_ADMIN", "PLATFORM_AUTHORITY"]), assignWorkerToRequest);

apiRouter.get("/worker/jobs", requireAuth(["WORKER"]), getWorkerJobs);
apiRouter.post("/jobs/:id/accept", requireAuth(["WORKER"]), acceptWorkerJob);
apiRouter.post("/jobs/:id/reject", requireAuth(["WORKER"]), rejectWorkerJob);
apiRouter.post("/jobs/:id/start", requireAuth(["WORKER"]), startWorkerJob);
apiRouter.post("/jobs/:id/complete", requireAuth(["WORKER"]), completeWorkerJob);
apiRouter.get("/worker/earnings", requireAuth(["WORKER"]), getWorkerEarnings);

apiRouter.get("/invoices/:id", requireAuth(), getInvoiceByRequestId);
apiRouter.post("/ratings", requireAuth(["CONSUMER", "MEMBER" as any]), submitWorkerRating);

apiRouter.get("/audit-logs", requireAuth(["COOPERATIVE_ADMIN", "PLATFORM_AUTHORITY"]), getAuditLogs);
