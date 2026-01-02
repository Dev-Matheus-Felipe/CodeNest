# 💻 Code Nest

Code Nest is a web application inspired by **Stack Overflow**, built to allow developers to ask questions, share knowledge, and interact with the community in a clean and intuitive way.

The project was developed using **Next.js**, featuring OAuth2 authentication, database integration with Prisma, and a modern UI with light and dark themes.

---

## 🚀 Main Features

- 📄 View posts made by the community
- 🏷️ Browse posts by tags specifications
- 👥 Community page with registered users
- ⭐ Save posts to personal collections
- 👤 User profile with edit options
- ❓ Ask and answer questions
- ✏️ Edit as well as Like questions and answers
- 🌗 Switch between Light Mode and Dark Mode

---

## 📑 Pages

- **Home** – General feed of questions
- **Community** – Platform users
- **Collections** – Saved posts
- **Profile** – User profile and edit page
- **Tags** – Questions organized by tags
- **Ask a Question** – Create new questions

---

## 🔐 Authentication

Authentication is handled via **OAuth2**, using:

- GitHub
- Google
- Discord

The system is implemented with **NextAuth (Auth.js)** and integrated with the database using the **Prisma Adapter**.

---

## 🎥 Video Demo

> ⚠️ **Coming soon**

A demo video will be added showing:
- Application navigation
- Asking and answering questions
- Editing posts and answers
- Like system
- Light and dark themes
- OAuth authentication flow

---

## 🛠️ Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- next-themes
- lucide-react

### Authentication
- NextAuth (Auth.js)
- OAuth2 (GitHub, Google, Discord)

### Backend / Database
- Prisma
- Prisma Client
- MongoDB

### UX / UI
- Sonner (toasts & notifications)
- @uiw/react-textarea-code-editor

---

## ⚙️ Getting Started

Follow the steps below to run the project locally.

Clone the repository:
```bash
git clone https://github.com/Dev-Matheus-Felipe/CodeNest.git
```
Navigate to the project directory:

```bash
cd CodeNest
```
Install the dependencies:

```bash
npm install
```
Create a .env file in the root of the project and configure the following variables:
```bash
DATABASE_URL="your mongodb database url"
NODE_ENV="development"

AUTH_GITHUB_ID=your_github_client_id
AUTH_GITHUB_SECRET=your_github_client_secret

AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret

AUTH_DISCORD_CLIENT_ID=your_discord_client_id
AUTH_DISCORD_CLIENT_SECRET=your_discord_client_secret

NEXTAUTH_URL=http://localhost:3000
AUTH_TRUST_HOST=true
```

Generate Prisma Client and Next Auth Secret:
```bash
npx auth secret

npx prisma generate
```
Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open your browser and access:

```
http://localhost:3000
```

---

Feel free to contribute or open issues if you find any bugs or have suggestions.


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📚 Additional Setup Help

If you have any questions about how to configure the MongoDB database or how to obtain OAuth Client IDs and Secrets, please refer to the official documentation links below:

🐙 GitHub OAuth

https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app

🔎 Google OAuth

https://developers.google.com/identity/protocols/oauth2

🎮 Discord OAuth

https://discord.com/developers/docs/topics/oauth2

🗄 MongoDB (Atlas)

https://www.mongodb.com/docs/atlas/getting-started/

https://www.prisma.io/docs/orm/overview/databases/mongodb

💡 Note

Make sure your OAuth callback URLs match your environment (local or production), and never commit your .env file to the repository.




