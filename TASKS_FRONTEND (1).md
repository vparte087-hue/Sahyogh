# Cooperative Gig Services Platform

## Frontend Development Task Plan

**Version:** 1.0\
**Target:** Hackathon MVP

------------------------------------------------------------------------

## 1. Priority Rule

Build the core service lifecycle first:

Consumer Request → Admin Review → Eligible Worker Filtering → Manual
Assignment → Worker Acceptance → Scheduling → Service → Completion →
Payment → Invoice → Rating

Everything outside this path is secondary.

------------------------------------------------------------------------

# Phase 0 --- Team Foundation

-   [ ] Create Git repository
-   [ ] Define branch strategy
-   [ ] Define coding conventions
-   [ ] Define issue/task workflow
-   [ ] Create environment variable template
-   [ ] Set up frontend
-   [ ] Configure linting/formatting
-   [ ] Create base documentation

------------------------------------------------------------------------

# Phase 2 --- Authentication

-   [ ] Consumer registration
-   [ ] Worker registration
-   [ ] Administrator registration
-   [ ] Login
-   [ ] Logout
-   [ ] Session/token management
-   [ ] Role-based routing
-   [ ] Account status handling

------------------------------------------------------------------------

# Phase 3 --- Cooperative and Verification

## Federation/Society

-   [ ] Admin federation profile

## Worker

-   [ ] Worker verification form
-   [ ] Worker photo
-   [ ] Skills
-   [ ] Certifications
-   [ ] Cooperative membership
-   [ ] NCD-ID/organizational information
-   [ ] Verification status

## Administrator

-   [ ] Federation documents
-   [ ] Administrator photo
-   [ ] Identity information
-   [ ] Authorization information
-   [ ] Verification queue
-   [ ] Approve/reject

------------------------------------------------------------------------

# Phase 4 --- Consumer Experience

-   [ ] Consumer dashboard
-   [ ] Service category cards
-   [ ] Service details
-   [ ] Request form
-   [ ] Dynamic service-specific questions
-   [ ] Conditional photo upload
-   [ ] Location input
-   [ ] Schedule selector
-   [ ] Additional instructions
-   [ ] Request review
-   [ ] Submit request
-   [ ] Request tracking
-   [ ] Worker details after acceptance
-   [ ] Service history
-   [ ] Invoice history

------------------------------------------------------------------------

# Phase 6 --- Worker Experience

-   [ ] Worker dashboard
-   [ ] Profile
-   [ ] Skills
-   [ ] Certifications
-   [ ] Cooperative association
-   [ ] Service area
-   [ ] Availability
-   [ ] Job queue
-   [ ] Job details
-   [ ] Accept job
-   [ ] Reject job
-   [ ] Rejection reason
-   [ ] Start job
-   [ ] Complete job
-   [ ] Completion notes
-   [ ] Conditional evidence upload
-   [ ] Payment/earnings status

------------------------------------------------------------------------

# Phase 8 --- Admin Dashboard

-   [ ] Dashboard overview
-   [ ] Request queue
-   [ ] Request detail
-   [ ] Consumer requirement view
-   [ ] Service category view
-   [ ] Service evidence view
-   [ ] Eligible worker list
-   [ ] Worker detail
-   [ ] Manual assignment
-   [ ] Assignment history
-   [ ] Worker rejection handling
-   [ ] Worker cancellation handling
-   [ ] Reassignment
-   [ ] Schedule monitoring
-   [ ] Worker database
-   [ ] Performance view
-   [ ] Welfare view

------------------------------------------------------------------------

# Phase 9 --- Scheduling

-   [ ] Availability UI
-   [ ] Schedule updates
-   [ ] Schedule notifications

------------------------------------------------------------------------

# Phase 10 --- Service Execution

-   [ ] Scheduled state
-   [ ] Start service
-   [ ] In-progress state
-   [ ] Completion state
-   [ ] Conditional before evidence
-   [ ] Conditional after evidence
-   [ ] Completion notes
-   [ ] Consumer completion notification
-   [ ] Consumer confirmation
-   [ ] Report-problem option

------------------------------------------------------------------------

# Phase 11 --- Payments

-   [ ] Payment UI

Deferred:

-   [ ] Cooperative/platform/worker financial split
-   [ ] Weekly settlement formula
-   [ ] Bonus formula

------------------------------------------------------------------------

# Phase 12 --- Invoice

-   [ ] Consumer invoice view
-   [ ] Admin invoice view
-   [ ] Invoice download

------------------------------------------------------------------------

# Phase 13 --- Rating and Performance

-   [ ] Rating UI
-   [ ] Feedback
-   [ ] Admin performance dashboard

------------------------------------------------------------------------

# Phase 14 --- Complaints and Refunds

-   [ ] Complaint form
-   [ ] Complaint category
-   [ ] Evidence upload
-   [ ] Complaint queue
-   [ ] Worker response
-   [ ] Admin investigation
-   [ ] Resolution decision
-   [ ] Refund approval
-   [ ] Refund status
-   [ ] 24-hour target tracking
-   [ ] Complaint audit history

------------------------------------------------------------------------

# Phase 15 --- Cancellation

## Consumer

-   [ ] Three-hour cancellation rule
-   [ ] Optional reason

## Worker

-   [ ] Cancellation action
-   [ ] Reason
-   [ ] Admin notification
-   [ ] Replacement workflow
-   [ ] Consumer notification
-   [ ] Cancellation audit

------------------------------------------------------------------------

# Phase 16 --- Notifications

-   [ ] In-app notifications
-   [ ] Push notifications
-   [ ] SMS integration if feasible
-   [ ] Notification templates
-   [ ] Delivery status
-   [ ] Retry handling

------------------------------------------------------------------------

# Phase 17 --- Welfare

-   [ ] Authorized admin view
-   [ ] Worker welfare information

Do not build a full insurance claims system.

------------------------------------------------------------------------

# Phase 18 --- Privacy and Security

-   [ ] RBAC audit
-   [ ] Resource authorization
-   [ ] Sensitive field protection
-   [ ] Secure file uploads
-   [ ] Private object storage
-   [ ] Signed file access
-   [ ] Error sanitization

------------------------------------------------------------------------

# Phase 19 --- Low-Bandwidth

-   [ ] Client-side image compression
-   [ ] Lightweight screens
-   [ ] Pagination
-   [ ] Small API responses
-   [ ] Cache service data
-   [ ] Cache relevant job information
-   [ ] Retry transient requests
-   [ ] Offline state indicator
-   [ ] Safe synchronization
-   [ ] Duplicate-submission protection

------------------------------------------------------------------------

# Phase 20 --- Testing

## Unit Tests

-   [ ] Eligibility
-   [ ] Scheduling
-   [ ] State transitions
-   [ ] Cancellation window
-   [ ] Permissions
-   [ ] Pricing calculation
-   [ ] Performance score

## Integration Tests

-   [ ] Registration
-   [ ] Verification
-   [ ] Request creation
-   [ ] Candidate filtering
-   [ ] Manual assignment
-   [ ] Worker acceptance
-   [ ] Worker rejection
-   [ ] Service completion
-   [ ] Payment
-   [ ] Invoice
-   [ ] Complaint
-   [ ] Refund

## E2E Tests

-   [ ] Consumer golden path
-   [ ] Admin golden path
-   [ ] Worker golden path
-   [ ] Worker rejection path
-   [ ] Worker cancellation path
-   [ ] Complaint path
-   [ ] Payment failure path
-   [ ] Network interruption path

------------------------------------------------------------------------

# Phase 21 --- Demo Dataset

-   [ ] Demo federation
-   [ ] Demo societies
-   [ ] Verified admin
-   [ ] Verified workers
-   [ ] Multiple skills
-   [ ] Multiple service categories
-   [ ] Availability schedules
-   [ ] Sample consumer
-   [ ] Sample requests
-   [ ] Sample complaint
-   [ ] Sample invoice
-   [ ] Sample ratings

------------------------------------------------------------------------

# Phase 22 --- Hackathon Demo

Demonstrate:

-   [ ] Consumer creates service request
-   [ ] Conditional photo requirement
-   [ ] Admin receives request
-   [ ] Candidate workers filtered
-   [ ] Admin manually assigns worker
-   [ ] Worker receives assignment
-   [ ] Worker accepts
-   [ ] Schedule shown
-   [ ] Worker starts service
-   [ ] Worker completes service
-   [ ] Consumer confirms
-   [ ] Payment succeeds
-   [ ] Invoice generated
-   [ ] Consumer rates worker
-   [ ] Complaint flow
-   [ ] Admin audit trail
-   [ ] Low-bandwidth behavior

------------------------------------------------------------------------

# Deferred / Future

-   [ ] AI demand forecasting
-   [ ] AI workforce allocation
-   [ ] Emergency/on-demand services
-   [ ] Live worker tracking
-   [ ] Advanced routing
-   [ ] Full insurance claims
-   [ ] Advanced welfare management
-   [ ] Institutional customer workflows
-   [ ] Cross-federation worker sharing
-   [ ] Fully offline operation
-   [ ] Automated financial settlement
-   [ ] Bonus engine

------------------------------------------------------------------------

# Definition of Done

A feature is complete when:

-   [ ] UI exists
-   [ ] API exists
-   [ ] Database support exists
-   [ ] Validation exists
-   [ ] Authorization exists
-   [ ] Error states are handled
-   [ ] Audit behavior exists where required
-   [ ] Notifications exist where required
-   [ ] Tests pass
-   [ ] Integrated flow works

------------------------------------------------------------------------

# Critical Path

``` text
Request
  ↓
Admin
  ↓
Filter
  ↓
Manual Assignment
  ↓
Worker Accept
  ↓
Schedule
  ↓
Service
  ↓
Complete
  ↓
Pay
  ↓
Invoice
  ↓
Rate
```

This path has the highest implementation priority.
