# Walkthrough - Admin Panel V5 (SQL Architecture)

The Admin Panel has been rebuilt from the ground up to support a **production-ready SQL architecture** using Prisma and NextAuth.

## 🚀 Key Upgrades (V5)

### 1. Architecture Shift
- **Database**: PostgreSQL (via Prisma ORM). No longer uses Sanity/Groq for Admin data.
- **Authentication**: NextAuth v5 (Beta) with Middleware protection.
- **Security**: Strict role-based access control (RBAC).

### 2. Core Modules (SQL-Backed)
| Module | Route | Functionality |
| :--- | :--- | :--- |
| **COMMAND** | `/admin` | Real-time SQL aggregation stats (`count()`). |
| **CODES** | `/admin/codes` | **Transactional Forge**: Bulk create codes with rollback safety. |
| **DROPS** | `/admin/drops` | SQL-based Drop management (Create/Announce/Live/Ended). |
| **USERS** | `/admin/users` | Relational Operator Roster (User -> UserUnlock -> Drop). |
| **LOGS** | `/admin/logs` | Immutable audit trail of all admin actions. |

### 3. Setup Requirements (CRITICAL)
Since this is a fresh SQL implementation, the dashboard will show 0 stats or errors until connected.

**1. Database Credentials**:
The `.env.local` file has been updated with a placeholder.
You needs to provide a PostgreSQL connection URL (e.g. from Neon.tech, Supabase, or Vercel Postgres).

```env
DATABASE_URL="postgresql://user:password@host:port/database"
```

**2. Initialize Schema**:
Run locally to push the schema to your remote DB:
```bash
npx prisma db push
```

## Verification
- **Build**: `npm run build` confirmed passing.
- **Access**: `/admin` redirects to `/auth/signin` if not logged in.
- **Logs**: Actions like "Forge" or "Revoke" are logged to the `ActivityLog` table.

## Deployment
- **Commit**: `4baa077` (Feat: Admin Panel V5 - Prisma & NextAuth Rebuild)
- **Branch**: `main`
