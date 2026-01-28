# 🧮 Online Calculator

A professional-grade, multi-purpose calculator web application built with React and TypeScript. Featuring multiple calculator types with a modern, responsive UI.

## ✨ Features

- **Basic Calculator** - Simple arithmetic operations (addition, subtraction, multiplication, division)
- **Scientific Calculator** - Advanced functions including trigonometry, logarithms, powers, and roots
- **Fraction Calculator** - Perform calculations with fractions and mixed numbers, simplify results
- **Percentage Calculator** - Calculate percentages, percentage change, and increase/decrease
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI** - Built with Tailwind CSS for a sleek, professional appearance
- **SEO Optimized** - Proper meta tags and structured data for search engines

## 🚀 Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety and better developer experience
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Online-Calculator.git
   cd Online-Calculator-1-main
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## 🏃 Run Locally

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000` (or the next available port)

## 📦 Build for Production

Build the app for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 🌐 Deployment on Vercel

1. Push your code to GitHub (see below)
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect the Vite configuration
6. Click "Deploy"

Your site will be live at `https://YOUR_PROJECT.vercel.app`

## 📤 Push to GitHub

1. Create a new repository on [GitHub](https://github.com/new)
2. Run these commands:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Calculator app"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/Online-Calculator.git
   git push -u origin main
   ```

## 📁 Project Structure

```
Online-Calculator-1-main/
├── components/
│   ├── calculators/
│   │   ├── BasicCalculator.tsx
│   │   ├── ScientificCalculator.tsx
│   │   ├── FractionCalculator.tsx
│   │   └── PercentageCalculator.tsx
│   ├── pages/
│   │   ├── AboutPage.tsx
│   │   ├── PrivacyPage.tsx
│   │   └── TermsPage.tsx
│   ├── Button.tsx
│   ├── Display.tsx
│   ├── Footer.tsx
│   └── Sidebar.tsx
├── utils/
│   └── mathUtils.ts
├── App.tsx
├── index.tsx
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
└── public/
    └── favicon.png
```

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

Created as a professional calculator suite for students, engineers, and anyone needing reliable mathematical calculations.
