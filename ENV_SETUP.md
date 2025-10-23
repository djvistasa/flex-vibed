# Environment Variables Setup

## Setup Instructions

1. Create a `.env` file in the root of the project:

```bash
touch .env
```

2. Add your environment variables to the `.env` file:

```env
# API Configuration
VITE_BEARER_TOKEN=your_actual_bearer_token_here
VITE_API_URL=https://api.example.com
```

3. Replace `your_actual_bearer_token_here` with your actual bearer token.

## Important Notes

- **Never commit the `.env` file to git** - It's already added to `.gitignore`
- All Vite environment variables must be prefixed with `VITE_` to be exposed to the client
- The `.env` file is already ignored by git for security
- Environment variables are available via `import.meta.env` in Vite

## Usage in Code

Import the config file to access environment variables:

```typescript
import { env } from "@common/config/env";

// Use the bearer token
const token = env.bearerToken;

// Use the API URL
const apiUrl = env.apiUrl;
```

## Example API Call with Bearer Token

```typescript
fetch(`${env.apiUrl}/endpoint`, {
  headers: {
    Authorization: `Bearer ${env.bearerToken}`,
  },
});
```
