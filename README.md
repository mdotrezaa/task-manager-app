# Task Manager App

A simple Task Management (To-Do List) application built using Next.js and TypeScript. This project demonstrates state management, API integration, and clean frontend architecture.

---

## 🚀 Tech Stack

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* shadcn/ui
* React Query (TanStack Query)
* Postman Mock API

---

## ✨ Features

* Add new task
* Toggle task status (Completed / Pending)
* Delete task
* Filter tasks (All / Completed / Pending)
* Pagination
* Form validation
* Optimistic UI updates for better UX

---

## ⚙️ How to Run

```bash
npm install
npm run dev
```

Open in browser:

```bash
http://localhost:3000
```

---

## 🔑 Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://your-mock-id.mock.pstmn.io
```

---

## 🌐 API Endpoints

Base URL:

```bash
https://your-mock-id.mock.pstmn.io
```

| Method | Endpoint   | Description     |
| ------ | ---------- | --------------- |
| GET    | /tasks     | Get all tasks   |
| POST   | /tasks     | Create new task |
| PATCH  | /tasks/:id | Update task     |
| DELETE | /tasks/:id | Delete task     |

> Note: Using Postman Mock API (stateless). Data is not persisted.

---

## 🧠 Architecture

### Structure

```
/app
/components
/hooks
/services
/types
```


## Architecture
- Custom hook for state management (useTasks)
- Component-based structure
- Separation of concerns (types, hooks, components)

## 🧪 Testing

Run tests:

```bash
npm run test
```

Open coverage report:

```bash
npm run test:coverage
```

Testing includes:

* Component testing (React Testing Library)
* Hook testing (`useTasks`)
* API mocking with Jest
  
## 💎 Notes

Since the app uses a mock API:

* Responses are static
* No real persistence

To handle this:

* Optimistic updates are implemented
* React Query cache is manually updated

## 👨‍💻 Author

Muhammad Reza