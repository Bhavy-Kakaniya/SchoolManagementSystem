problem solved :

# 1. I was not able to connect prisma with Supabase PostgreSQL
-> Problem: It was throwing error cant reach database server, the problem was in password suggested by supabase it included some character like '?' which caused the problem.
-> Solution: Changed the password in supabase project section which was confusing due to UI, and then pasted the password in url removing the square brackets "[]" and it get connected it took almost a day to solve this problem.

# 2. Problem in using icons inside MUI Input field
-> Problem: Faced difficulty adding icons inside the input field using MUI because icons were not positioning correctly inside the text field.
-> Solution: Used `startAdornment` and `endAdornment` from MUI `InputProps` to place icons properly inside the input field for better UI/UX experience.

# 3. Problem in using req.user in Express Middleware
-> Problem: TypeScript showed an error because the default Express Request type does not contain a user property.
-> Solution: Extended the Express Request interface using declaration merging (index.d.ts) so TypeScript recognizes req.user added by the authentication middleware.

# 4. Getting error NextRouter was not mounted
-> Problem: I was trying to use useRouter() hook from next/router inside app directory, as the App Router's useRouter() from next/navigation has different behavior to the useRouter hook in pages.
-> Solution: changed import from next/router to next/navigation.

# 5. Error squiggle in status in controller though there was no syntax problem.
-> Problem: No error in service but still getting error in controller in status code despite everything was working.
-> Solution: I forgot to import Request and Response from express and started coding controller directly so simply imported them and the error was solved.

# 6 Bug in saving BirthDate
-> Problem: Getting error while creating student.
Invalid `tx.student.create()` invocation in D:\SchoolManagementSystem\backend\src\modules\student\student.service.ts:58:46 55 roleId: studentRole.id 56 } 57 }); → 58 const student = await tx.student.create({ data: { userId: "615e2a89-915a-4330-96bf-8ff993a71b34", schoolId: "9198f731-ea15-4710-834e-38b8fe0292ef", firstName: "new ", lastName: "student", admissionNo: "1003", gender: "MALE", dateOfBirth: "2002-06-23", ~~~~~~~~~~~~ phone: "1231231231", bloodGroup: "A", address: "akjdhjkajhkjwehkjewh" }, include: { user: { select: { id: true, email: true, name: true } } } }) Invalid value for argument `dateOfBirth`: premature end of input. Expected ISO-8601 DateTime.
-> Solution: Frontend sending 2002-06-23, but prisma's DateTime expects 2002-06-23T00:00:00.000Z a full ISO-8601 datetime, in backend I changed dateOfBirth: data.dateOfBirth to dateOfBirth: new Date(data.dateOfBirth)