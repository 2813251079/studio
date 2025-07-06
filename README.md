# Open Music Academy

Created and developed by Elo Diaz Allende.

This project is built with Next.js in Firebase Studio.

## 🚀 Getting Started

To run the application in a development environment, use the following command:

```bash
npm run dev
```

## 📦 Building for Production

To create a production-ready build of the application, run:

```bash
npm run build
```

This will generate an optimized version of your app in the `.next` folder. You can then start the production server with:

```bash
npm run start
```

## ✨ Environment Variables

Before deploying, you need to configure your environment variables for Firebase. Create a `.env.production.local` file by copying the example file:

```bash
cp .env.example .env.production.local
```

Then, fill in the required values in `.env.production.local`. These keys are necessary for features like authentication to work correctly in your deployed application.
