# Defect & Investigation Log

This document tracks all bugs, performance issues, and security vulnerabilities found during the assessment. We will use this to generate the final engineering report.

## 1. Infinite Render Loop on Dashboard

- **Status:** Fixed
- **Severity:** High
- **Category:** Bug / Performance
- **Description:** Navigating to the dashboard crashes the page in the browser with a "Maximum update depth exceeded" React error.
- **Root Cause:** A `useEffect` hook in `dashboard/page.tsx` was intentionally or accidentally written to update a `renderVersion` state variable which was also in its dependency array, causing an infinite render loop.
- **Fix Implemented:** Removed the unnecessary `renderVersion` state and the offending `useEffect` block entirely, as `useQuery` already handles re-rendering when data arrives.
- **Files Modified:** `apps/web/app/(dashboard)/dashboard/page.tsx`
- **Verification:** Refreshed the dashboard page and verified it loads without crashing.

## 2. Dashboard Shows Stale Data After Project Creation

- **Status:** Fixed
- **Severity:** Medium
- **Category:** Bug / UX
- **Description:** When a new project is created, it shows up on the Projects page but not on the Dashboard until the user manually reloads the page.
- **Root Cause:** The `create` mutation on the projects page only invalidated the `['projects']` React Query cache, leaving the `['dashboard']` cache stale.
- **Fix Implemented:** Added `await client.invalidateQueries({ queryKey: ['dashboard'] });` right after the projects invalidation.
- **Files Modified:** `apps/web/app/(dashboard)/projects/page.tsx`
- **Verification:** Created a project and immediately navigated to the dashboard; the new project was instantly visible.

## 3. Dashboard UI Stretching Bug

- **Status:** Fixed
- **Severity:** Low
- **Category:** Bug / UI
- **Description:** On the dashboard, the "Assigned tasks" container stretches vertically to match the height of the "My projects" container if the user has many projects.
- **Root Cause:** The two containers were wrapped in a CSS Grid `<section>` without explicit vertical alignment, causing them to use the default `align-items: stretch` behavior.
- **Fix Implemented:** Added the Tailwind class `items-start` to the parent `<section>` so both containers only take up as much vertical space as their content requires.
- **Files Modified:** `apps/web/app/(dashboard)/dashboard/page.tsx`
- **Verification:** Verified visually that the two containers now independently size to their own content heights.

## 4. Cross-Site Scripting (XSS) Vulnerability in Project Description

- **Status:** Fixed
- **Severity:** High
- **Category:** Security
- **Description:** On the Projects list page, the project description is rendered using React's `dangerouslySetInnerHTML`. Since the description input is not sanitized, an attacker could inject malicious JavaScript (e.g., `<img src=x onerror=alert(1)>`) which would execute in the browser of anyone viewing the projects.
- **Root Cause:** Use of `dangerouslySetInnerHTML` for user-provided text instead of normal React text rendering.
- **Fix Implemented:** Replaced `<p dangerouslySetInnerHTML={{...}} />` with standard React text interpolation `<p>{project.description}</p>`.
- **Files Modified:** `apps/web/app/(dashboard)/projects/page.tsx`
- **Verification:** Verified that HTML tags in the project description are now safely rendered as plain text.

## 5. Missing Project Details and Task Management UI

- **Status:** Fixed
- **Severity:** High
- **Category:** Bug / Feature Defect
- **Description:** The frontend application completely lacks the UI to view project details, create tasks, or complete tasks, despite the backend API fully supporting these features. The dashboard links to `/projects/[id]`, which returns a 404 error.
- **Root Cause:** Incomplete frontend implementation.
- **Fix Implemented:** Created the missing `projects/[id]/page.tsx` route. Added data fetching for project details and tasks, a form to create new tasks, and a button to mark tasks as "in_progress" or "done". Hooked everything up to the existing API endpoints and React Query cache.
- **Files Modified:** Added `apps/web/app/(dashboard)/projects/[id]/page.tsx`
- **Verification:** Navigated to a project from the dashboard, created a new task, marked it as completed, and verified the updates reflected correctly on the dashboard.

## 6. Lint Script Failing on Windows OS

- **Status:** Fixed
- **Severity:** Medium
- **Category:** Operational / Build
- **Description:** Running `pnpm lint` fails entirely on Windows environments with an error stating `'ESLINT_USE_FLAT_CONFIG' is not recognized as an internal or external command`.
- **Root Cause:** The `package.json` lint script inside `apps/web` sets environment variables directly inline (`ESLINT_USE_FLAT_CONFIG=false eslint ...`), which works on POSIX systems (Linux/macOS) but throws an error in Windows Command Prompt and PowerShell.
- **Fix Implemented:** Installed `cross-env` as a dev dependency in the web app and prepended the script with `cross-env` so environment variables are parsed correctly across all operating systems.
- **Files Modified:** `apps/web/package.json`
- **Verification:** Ran `npx pnpm lint` and verified that the linting process executes successfully instead of crashing immediately.

## 7. Assigned Tasks Not Showing in Overview / My Tasks

- **Status:** Fixed
- **Severity:** Medium
- **Category:** Bug / UX
- **Description:** Tasks created inside a project were not reliably visible in the Overview and My Tasks sections because they were not being surfaced as assigned work for the current user. Completed tasks also remained visible in those lists until the page was refreshed.
- **Root Cause:** The dashboard logic only shows tasks that are explicitly assigned to the logged-in user, but newly created tasks were not always assigned to that user by the task creation flow. In addition, the client-side views were not refreshing the assigned-task lists immediately after task updates.
- **Fix Implemented:** Updated the task creation flow so new tasks default to the signed-in user as the assignee when no assignee is supplied. I also filtered completed tasks out of the assigned-task views and invalidated the relevant dashboard/My Tasks queries after task creation and status updates so the UI refreshes instantly.
- **Files Modified:** `apps/api/src/controllers/task-controller.ts`, `apps/api/src/controllers/dashboard-controller.ts`, `apps/web/app/(dashboard)/dashboard/page.tsx`, `apps/web/app/(dashboard)/tasks/page.tsx`, `apps/web/app/(dashboard)/projects/[id]/page.tsx`
- **Verification:** Created a task from a project page, confirmed it appeared in both the Overview assigned-task section and the My Tasks list, and verified that completed tasks disappeared from those lists after their status changed.
