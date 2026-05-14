problem solved :

# 1. I was not able to connect prisma with Supabase PostgreSQL
-> Problem: It was throwing error cant reach database server, the problem was in password suggested by supabase it included some character like '?' which caused the problem.
-> Solution: Changed the password in supabase project section which was confusing due to UI, and then pasted the password in url removing the square brackets "[]" and it get connected it took almost a day to solve this problem.

# 2. Problem in using icons inside MUI Input field
-> Problem: Faced difficulty adding icons inside the input field using MUI because icons were not positioning correctly inside the text field.
-> Solution: Used `startAdornment` and `endAdornment` from MUI `InputProps` to place icons properly inside the input field for better UI/UX experience.