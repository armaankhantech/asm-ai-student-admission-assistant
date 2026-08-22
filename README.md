# asm-ai-student-admission-assistant
ASM AI — Student & Admission Assistant for ASM CSIT
Today I officially started ASM AI, a new AI-powered student/college assistant project.

## What I built
Initial frontend UI
Project structure
Initial chatbot experience
Foundation for future backend integration
Initial system architecture

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


## Biggest challenge

The biggest challenge wasn't writing the UI.

It was deciding how the entire system should be structured before adding the AI layer.

## What I learned

A production-oriented AI application shouldn't be:

UI → LLM

Instead, the AI should eventually sit inside a proper system:

UI
 ↓
API
 ↓
Data
 ↓
Retrieval
 ↓
LLM
 ↓
Response
