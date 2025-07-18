# 🚀 TrackKaro – Your Personal Job Application Tracker

TrackKaro is a productivity-focused job tracking app that helps job seekers build consistent habits, visualize application progress, and stay motivated — just like a fitness tracker, but for job hunting.

🛠️ Built with modern tech. Inspired by platforms like LeetCode and jobpulse.fyi.


## ✅ Features

| Feature | Description |
|--------|-------------|
| 🔐 **Google Login (Supabase Auth)** | One-click secure login without the hassle of managing passwords |
| 📆 **Daily Tracker Counter** | Add or subtract how many jobs you've applied for today |
| 📊 **Heatmap Visualization** | Get a LeetCode-style calendar heatmap showing your daily consistency |
| 📈 **Applications Summary** | Instantly see monthly and total job applications |
| 💾 **Auto-Save with Supabase** | Cloud-synced data — refresh-proof and persistent |
| 🖥️ **Responsive UI** | Sleek, modern UI built with Tailwind CSS for clean UX |

---

## 💡 Why TrackKaro?

Job hunting can feel like a black box — tiring, disorganized, and discouraging.  
**TrackKaro** solves that by offering:

| Problem | How TrackKaro Helps |
|--------|----------------------|
| ❌ Lack of motivation | ✅ Visual streaks encourage daily action |
| ❌ Forgetting progress | ✅ Dashboard shows daily, monthly, total stats |
| ❌ Manual spreadsheets | ✅ Centralized, cloud-based job log |
| ❌ Overwhelmed by process | ✅ Progress insights to stay organized and in control |

---

## 🛠️ Tech Stack

| Category | Tech/Tool | Purpose |
|--------|-----------|---------|
| **Frontend** | Next.js (App Router) | React-based framework for UI |
|  | Tailwind CSS | Utility-first styling for clean UI/UX |
|  | TypeScript | Type-safe JavaScript |
|  | Day.js | Date formatting |
|  | React Calendar Heatmap | Streak visualization |
| **Authentication** | Supabase Auth | Google OAuth login |
| **Backend/DB** | Supabase (PostgreSQL) | Managed database for users & logs |
| **Database Table** | `applications` | Stores date-wise job count |
| **Deployment** | Vercel / Netlify / Render | *(optional next step)* |

---

## 🚧 Future Enhancements

- 🎯 **Goal Setting:** e.g., “Apply to 5 jobs/day”
- 📄 **Saved Job Descriptions**
- ⏳ **Application Status Tracker:** (Applied → Interview → Offer)
- 🌙 **Dark Mode Toggle**
- ✉️ **Email Reminders** (Daily/Weekly)
- 📤 **Export as CSV or PDF**

---

## 📦 Getting Started (Local Dev)

```bash
# 1. Clone the repo
git clone https://github.com/your-username/trackkaro.git
cd trackkaro

# 2. Install dependencies
npm install

# 3. Create .env.local file and add:
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# 4. Run locally
npm run dev
