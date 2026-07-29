# Trafiesta (Next.js app)

Travel itinerary demo that shows **API integration** against RapidAPI booking-style endpoints, with a secure server-side BFF and mock fixtures when no API key is configured.

## Features demonstrated

- Server-only RapidAPI client (`X-RapidAPI-Key` / `X-RapidAPI-Host`, timeout, 401/429/5xx handling)
- Next.js App Router BFF routes: `GET /api/flights`, `GET /api/hotels`, `GET /api/activities`
- Typed response mapping (Zod) into itinerary models
- Search UI with loading, error + retry, and mock/live source badge
- Add / remove items on the in-memory itinerary

## Setup

```bash
cd app
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment

| Variable | Required | Description |
|---|---|---|
| `RAPIDAPI_KEY` | No (mocks used if empty) | RapidAPI key |
| `RAPIDAPI_HOST` | No | Defaults to `booking-com15.p.rapidapi.com` |
| `RAPIDAPI_FLIGHTS_PATH` | No | Override flights search path |
| `RAPIDAPI_HOTELS_PATH` | No | Override hotels search path |
| `RAPIDAPI_ACTIVITIES_PATH` | No | Override activities search path |

Without `RAPIDAPI_KEY`, the BFF still returns fixture data with `source: "mock"` and a warning so the full UI flow works for reviewers.

## API routes

```http
GET /api/flights?q=Bahamas
GET /api/hotels?q=Bahamas
GET /api/activities?q=Bahamas
```

Example success body:

```json
{
  "source": "mock",
  "query": "Bahamas",
  "results": [{ "id": "mock-flight-1", "route": "JFK → Bahamas", "time": "08:15 – 12:40", "price": "$289" }],
  "warning": "RAPIDAPI_KEY not set — serving demo fixtures"
}
```

## Project layout

- `src/lib/rapidapi.ts` — server RapidAPI helper + search + mock fallback
- `src/lib/mocks.ts` — demo fixtures
- `src/lib/api-client.ts` — browser fetch helpers for the BFF
- `src/app/api/*/route.ts` — BFF route handlers
- `src/app/context/TravelContext.tsx` — itinerary + search state
