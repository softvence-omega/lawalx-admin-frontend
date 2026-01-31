# Project Architecture: LawalX Admin Frontend

This document outlines the architectural patterns, folder structure, and technical stack used in the LawalX Admin Frontend project. This structure is designed for scalability, maintainability, and high-performance in a modern React environment.

## 🛠 Technical Stack

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/) & [Redux Persist](https://github.com/rt2zz/redux-persist)
- **Routing:** [React Router DOM 7](https://reactrouter.com/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/) (Primitives) & [Lucide React](https://lucide.dev/) (Icons)
- **Forms:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) (Validation)
- **Data Visualization:** [Recharts](https://recharts.org/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)

---

## 📂 Folder Structure

The project follows a modular, feature-based directory structure:

```text
src/
├── assets/          # Static assets (images, fonts, svg)
├── common/          # Shared complex components (DynamicTable, DynamicForm)
├── components/      # UI components
│   ├── Dashboard/   # Dashboard-specific shared widgets
│   └── ui/          # Low-level UI primitives (Button, Modal, Input, etc.)
├── hooks/           # Custom React hooks
├── Layout/          # Layout wrappers (DashboardLayout, PublicLayout)
├── lib/             # Third-party library configurations (e.g., utils.ts for cn)
├── pages/           # Feature-based pages
│   ├── Admin/       # Admin-specific modules (Analytics, Support, Clients, etc.)
│   ├── Auth/        # Authentication pages (Login, Register)
│   └── Public/      # General public pages
├── routes/          # Centralized route definitions and generators
├── store/           # Redux slices, API services, and store configuration
├── types/           # Global TypeScript interfaces and types
└── utils/           # Helper functions and formatting utilities
```

---

## 🏗 Key Architectural Patterns

### 1. Feature-Based Organization
Pages are grouped logically by actor (Admin, Supporter) and then by feature. Each feature folder inside `pages/Admin/` (like `Support`) contains its own `Components/` subfolder for local, feature-specific components.

### 2. Centralized Routing
Routes are defined in `src/routes/` as configuration objects. This allows for dynamic menu generation and centralized permission management.

### 3. Separation of Concerns (UI vs. Logic)
- **UI Components:** Found in `src/components/ui`, these are pure, reusable primitives.
- **Common Components:** Found in `src/common`, these handle more complex shared logic like dynamic data rendering.
- **Feature Components:** Located within the page folders, these are specific to a single module.

### 4. State Management Strategy
- **Global State:** Managed via Redux Toolkit slices (`src/store/`).
- **Persistence:** Sensitive or necessary data (like auth tokens) is persisted using `redux-persist`.
- **Local State:** React `useState` and `useMemo` are preferred for component-specific logic.

### 5. Type Safety
The project enforces strict TypeScript usage. Global types reside in `src/types/`, while component-specific interfaces are defined within the component files for proximity and clarity.

---

## 🎨 Design & Aesthetic Guidelines

1. **Premium Aesthetics:** Use high-contrast text, vibrant primary colors (Indigo/Blue), and soft backgrounds (`#F8FAFC`).
2. **Rounded Corners:** Consistent use of `rounded-xl` and `rounded-lg` across the application.
3. **Micro-interactions:** Smooth transitions using CSS transitions and Framer Motion for modal entries and hover states.
4. **Data Presentation:** Use striped tables with interactive hover states and descriptive empty states.

---

## 🚀 Creating New Modules

When adding a new feature (e.g., "Inventory"):

1. Create `src/pages/Admin/Inventory/`.
2. Add the main page component and a `Components/` sub-folder for its sub-sections.
3. Define the route in `src/routes/AdminRoutes.tsx`.
4. If it requires global state, create a slice in `src/store/`.
5. Use existing UI primitives from `src/components/ui/` to maintain design consistency.
