# 🏦 Ireland Empowerment Benefit — Banking Demo App

A high-quality, realistic banking demo web application built with **React + Vite + Tailwind CSS**.

---

## 🚀 Quick Start

### Prerequisitess
- [Node.js](https://nodejs.org/) version **18 or higher**
- npm (comes with Node.js)

### Installation & Run

```bash
# 1. Navigate into the project folder
cd ireland-empowerment-benefit

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open your browser at:
#    http://localhost:5173
```

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🔐 Login Credentials

| Field    | Value              |
|----------|--------------------|
| Username | `Mr Desmond`       |
| Password | `Demondireland`    |

---

## 📁 Project Structure

```
src/
├── context/
│   └── AppContext.jsx       # Global state (auth, payees, notifications)
├── pages/
│   ├── Login.jsx            # Login page
│   ├── Dashboard.jsx        # Main dashboard with balance card
│   ├── Withdraw.jsx         # Withdrawal form
│   ├── Payees.jsx           # Payee management
│   ├── DebitCard.jsx        # Debit card application
│   ├── Support.jsx          # WhatsApp support page
│   ├── Transactions.jsx     # Full transaction history
│   └── Settings.jsx         # Account settings & preferences
├── components/
│   ├── Layout.jsx           # Sidebar navigation + layout wrapper
│   ├── IrelandFlag.jsx      # SVG Ireland flag component
│   ├── Notifications.jsx    # Toast notification system
│   └── Spinner.jsx          # Loading spinner
├── App.jsx                  # Router setup
├── main.jsx                 # Entry point
└── index.css                # Tailwind + custom styles
```

---

## ✨ Features

- **Authentication** — Login with credentials, error handling, loading state
- **Dashboard** — Animated balance counter, account info, quick actions
- **Withdraw** — Form with UK bank dropdown + custom bank input
- **Payees** — Add and view saved payees with validation
- **Debit Card** — Apply page redirecting to support
- **Support** — WhatsApp chat button (+447920732417)
- **Transactions** — Full transaction history view
- **Settings** — Dark mode toggle, notification preferences
- **Dark Mode** — Full dark theme support
- **Responsive** — Mobile-first, works on all screen sizes
- **Toast Notifications** — Real-time feedback for actions

---

## 🎨 Tech Stack

| Tool | Version |
|------|---------|
| React | 18 |
| Vite | 5 |
| Tailwind CSS | 3 |
| React Router | 6 |

---

## ⚠️ Disclaimer

This is a **demo application only**. No real banking functionality, payments, or APIs are used. All data is simulated in local state.

---

© 2025 Ireland Empowerment Benefit. Demo purposes only.
# irelandempowerment
