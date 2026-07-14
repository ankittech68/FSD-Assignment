# AI Usage Report

**Complete this report even if you did not use any AI tools. AI-assisted development is encouraged. This report is intended to document your workflow and engineering process.**

---

# Candidate Information

**Name:** **Ankit**

**Date:** **14-July-2026**

**Assignment Version:**

---

# 1. AI Tools Used

* Did you use AI during this assignment?

  * ☑ Yes
  * ☐ No

If yes, list all tools used.

| Tool   | Version / Model | Purpose                                                      |
| ------ | --------------- | ------------------------------------------------------------ |
| Cursor | Not specified   | Code assistance, refactoring, and file modifications         |
| Gemini | Not specified   | Troubleshooting, explanations, and documentation support     |
| Claude | Not specified   | Implementation guidance, debugging, and code recommendations |

---

# 2. AI Usage Timeline

| Problem                     | Prompt Given (verbatim)                                                                                                | Tool's Response (verbatim)                                                                        | Accepted? | How You Verified / What You Changed                                                                 |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | --------- | --------------------------------------------------------------------------------------------------- |
| Dashboard rendering issue   | "check the 5 and 6 bug or error and fix it"                                                                            | Detected the rendering loop problem and project/task synchronization issue, then suggested fixes. | Yes       | Inspected the dashboard logic, removed the problematic update cycle, and verified stable rendering. |
| Completed task handling     | "fix it and make sure when the task is completed it remove from the assigned task"                                     | Updated task filtering so completed tasks no longer appear in assigned-task sections.             | Yes       | Tested task completion workflows and confirmed automatic removal from assigned lists.               |
| Notification icon analysis  | "now in my project i show the notification icon what i use of that by review the code only use not start implementing" | Examined the existing functionality and described it as an unread notification indicator.         | Yes       | Reviewed the implementation and backend logic without introducing new functionality.                |
| Environment variables       | "as in the .env file the environment variables MONGO_URI ... should i need to use it mine or leave it as it ish"       | Clarified that actual MongoDB and JWT values should replace placeholders.                         | Yes       | Configured valid local values and ensured the application worked correctly.                         |
| TypeScript build issue      | "outDir": "dist", error in this fix it                                                                                 | Recommended defining rootDir explicitly within the TypeScript configuration.                      | Yes       | Updated tsconfig settings and confirmed the build error disappeared.                                |
| Report documentation update | "if the issue is important add in candidate-report.md file"                                                            | Suggested documenting notification reliability concerns and future visibility issues.             | Yes       | Reviewed and updated the report with the relevant findings and observations.                        |
| Conversation export request | "can you give the whole conversation in the chat in one file"                                                          | Generated a consolidated conversation summary and transcript file.                                | Yes       | Stored the generated content for later reference and review.                                        |

---

# 3. Validation & Verification

| Issue / Feature           | Verification Method                                                                                | Evidence of Success                                                          |
| ------------------------- | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Dashboard rendering issue | Recreated the issue, reviewed the component behavior, applied fixes, and reloaded the application. | Dashboard loaded successfully without render-loop or update-depth errors.    |
| Assigned task filtering   | Tested task assignment, completion, and dashboard synchronization.                                 | Completed tasks were automatically removed from assigned-task views.         |
| Notification handling     | Inspected API interactions and polling behavior for state-management issues.                       | Notification updates became more stable and resilient to temporary failures. |
| Environment configuration | Reviewed validation requirements and checked environment variables.                                | Application started correctly with properly configured values.               |
| TypeScript configuration  | Re-ran build validation after modifying configuration files.                                       | Previous configuration-related errors were resolved successfully.            |
| Candidate report updates  | Reviewed final report content after modifications.                                                 | Newly identified issues and decisions were clearly documented.               |

---

# 4. Incorrect or Misleading AI Suggestions

| Issue                         | AI Suggested                                               | Why It Was Incorrect                                                                        | Final Solution                                              |
| ----------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| Notification functionality    | Build a complete notification management system            | The task only required evaluation of the current implementation, not new development.       | Restricted work to code review and documentation.           |
| Access-control visibility bug | Apply authentication and authorization changes immediately | The requirement was to record the issue for future resolution rather than implement it now. | Added the issue to the report as a future enhancement item. |

---

# 5. Significant Engineering Decisions

| Decision                   | Options Evaluated                                    | Final Choice                                   | Reasoning                                                                     |
| -------------------------- | ---------------------------------------------------- | ---------------------------------------------- | ----------------------------------------------------------------------------- |
| Dashboard issue resolution | Retain existing logic or simplify state management   | Removed problematic state/update logic         | Eliminated crashes while remaining consistent with the existing architecture. |
| Task display behavior      | Keep completed tasks visible or hide them            | Hide completed tasks and refresh relevant data | Improved clarity and aligned the UI with expected behavior.                   |
| Notification reliability   | Ignore temporary failures or strengthen API handling | Improved polling and API error handling        | Increased application stability without introducing unnecessary complexity.   |

---

# 6. Security & Privacy

Did you provide any of the following to an AI tool?

* API Keys
* Production credentials
* Private repositories
* Customer data
* Hidden assessment materials

☐ No

☑ Yes (Explain)

During debugging and documentation, I shared portions of non-production source code, configuration examples, and project-specific implementation details. No sensitive production credentials, customer information, or confidential business data were disclosed.

---

# 7. Estimated AI Contribution

Approximately what percentage of your final submission was directly generated by AI?

* ☐ 0%
* ☐ 1–25%
* ☑ 26–50%
* ☐ 51–75%
* ☐ 76–100%

### Explanation

The majority of the project work, testing, validation, and decision-making was completed manually. AI primarily assisted with troubleshooting, documentation drafting, error analysis, and implementation guidance. All final modifications were reviewed and approved by me before inclusion.

---

# 8. Reflection

AI was particularly useful for quickly identifying configuration problems, TypeScript-related issues, and possible causes of dashboard and notification bugs. It also helped structure documentation and summarize technical findings efficiently.

AI was less effective in situations that required understanding project scope and assignment expectations. Decisions regarding feature boundaries and implementation priorities required manual judgment based on project requirements.

One investigation completed independently involved tracing dashboard data flow, reviewing backend routes, and validating task visibility logic directly within the codebase.

If I were to complete this assignment again, I would use AI earlier during project exploration and later during testing and documentation phases, while continuing to manually verify every accepted change.

---

# Candidate Declaration

I confirm that:

* This report accurately reflects my use of AI tools.
* I understand all modifications included in the final submission.
* I can explain the reasoning behind each major implementation decision, regardless of AI assistance.

**Signature (Type Full Name):** **Ankit**

**Date:** **14-July-2026**
