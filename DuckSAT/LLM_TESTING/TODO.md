# TODO: Generate 90 SAT Questions and Create Review Page

## 1. Modify llm_query.py for Batch Mode
- [ ] Add batch_generation() function that sets defaults (models: first 3, temperature: 0.7, max_tokens: 16384, num_questions_per_subtopic: 3, delay_minutes: 1) and runs the generation loop without user prompts.
- [ ] Update main block to call batch_generation() if args.batch is True.

## 2. Run Batch Generation
- [ ] Execute `python llm_query.py --batch` to generate 90 questions (3 per subtopic) and store in database.

## 3. Create Review Page in ducksat-app
- [ ] Create new page: ducksat-app/src/app/admin/questions-review/page.tsx
  - [ ] Display list of questions with status (pending/approved/rejected).
  - [ ] Allow filtering by category, subtopic, review status.
  - [ ] For each question, show details and form to approve/reject with comments.
- [ ] Add API route: ducksat-app/src/app/api/admin/questions/[id]/review/route.ts
  - [ ] PUT endpoint to update reviewStatus, reviewComments, reviewedBy, reviewedAt.

## 4. Test and Deploy
- [ ] Test batch generation completes successfully.
- [ ] Test review page loads questions and updates database on review actions.
- [ ] Deploy changes to kiroducksat.vercel.app.
