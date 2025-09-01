# Bank API (NestJS + Clean Architecture, In-Memory)

Minimal account service with operations for **deposit**, **withdraw**, **transfer**, **balance inquiry**, and **reset**.  
Built with **business rules via Use Cases**, **idempotency**, and **concurrency locks** — all **in memory**.

---

## ✨ Key Concepts

- **Clean Architecture + Use Cases**: business logic isolated from the framework (Nest).
- **In-memory repository**: `Map` simulates the database (volatile; restarting = data loss).
- **Optional Idempotency**: supports `Idempotency-Key` (response replay) without requiring the header.
- **Concurrency control**: `AccountLockService` (mutex per account) prevents race conditions.
- **Test contract**:
  - `POST /reset` → **200** `"OK"`
  - `GET /balance?account_id=NOT_FOUND` → **404** with body **`0`** (global filter)
  - Successful `/event` → **201**

---

## 🗺️ Endpoints

### `/event` — Body

POST /reset
GET /balance?account_id={id}
POST /event

```json
{ "type": "deposit", "destination": "100", "amount": 10 }
{ "type": "withdraw", "origin": "100", "amount": 5 }
{ "type": "transfer", "origin": "100", "destination": "300", "amount": 15 }
```

---

## ▶ Running locally

### Prerequisites
- Node 18+
- npm or yarn

### Install
```bash
npm install
# or
yarn
```

### Run

```bash
npm run start:dev
# or
yarn start:dev
```

### Tests

```bash
# unit
npm run test
```