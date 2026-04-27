bug solved :

# 1. I was not able to connect prisma with Supabase PostgreSQL
-> Problem: It was throwing error cant reach database server, the problem was in password suggested by supabase it included some character like '?' which caused the problem.
-> Solution: Changed the password in supabase project section which was confusing due to UI, and then pasted the password in url removing the square brackets "[]" and it get connected it took almost a day to solve this problem.