
ASM AI — Student & Admission Assistant for ASM CSIT
Today I officially started ASM AI, a new AI-powered student/college assistant project.
---

---

## What I built
Initial frontend UI
Project structure
Initial chatbot experience
Foundation for future backend integration
Initial system architecture
---



---
## Planned architecture
Student
   ↓
Frontend UI
   ↓
Node.js + Express
   ↓
Supabase
   ↓
PostgreSQL
   ↓
Knowledge Documents
   ↓
RAG
   ↓
LLM
   ↓
Grounded Response
---

---
## Biggest challenge

The biggest challenge wasn't writing the UI.

It was deciding how the entire system should be structured before adding the AI layer.
---

---
## The chatbot is now working across the complete application flow:

Student
   ↓
ASM AI Frontend
   ↓
Node.js + Express Backend
   ↓
Supabase / PostgreSQL
   ↓
Structured Knowledge Retrieval
   ↓
LLM
   ↓
Streaming Response
   ↓
Student

## What was completed
✅ Enquiry form connected to backend
✅ Enquiries stored in admission_enquiries
✅ PostgreSQL trigger created
✅ pg_net enabled
✅ n8n webhook connected
✅ Real enquiry successfully received by n8n
✅ Existing ASM AI chatbot remains untouched
---


## Next milestone
n8n
 ↓
AI Enquiry Analysis
 ↓
Admission Team Notification
 ↓
WhatsApp Automation

The goal is to build the V1 demo using free/open-source/free-tier resources wherever realistically possible.
