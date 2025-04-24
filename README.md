## 🧠 How to Understand It Yourself

---

### 🔁 Step 1: Login with Cookie

- Click the **“Login with Cookie”** button in your browser.
- This sends a `POST` request to `/login-cookie`.
- The backend:
  - Creates a JWT.
  - Stores it in a **cookie** using `res.cookie(...)`.

#### 🔍 Check it:
- Open **DevTools → Application → Cookies**
- Look for a cookie called `userToken`.

✅ This shows the browser is now storing your token, and **automatically sends it** on future requests to your server.

---

### 🔁 Step 2: Login with Header

- Click the **“Login with Header”** button.
- This sends a `POST` to `/login-header`.
- The backend:
  - Creates a JWT.
  - Sends it **in the response** (not in a cookie).

The frontend:
- Stores the token in the `token` variable in JS.

✅ You are now in control of when to send it.

---

### 🛡 Step 3: Access Protected Route

- Click the **“Access Protected Route”** button.
- The frontend sends a `GET /protected` request.
  - If you logged in with cookies, the token is sent **automatically**.
  - If you logged in with header, it sends:
    ```js
    headers: { Authorization: "Bearer <yourToken>" }
    ```

---

### 🔐 What the middleware does (`protect`):

1. Looks for `userToken` in `req.cookies`.
2. If not found, looks for `Authorization` header:
   ```js
   Bearer abc123...
   ```
3. Verifies the token using `jwt.verify`.
4. If valid, adds the user info to `req.user`.
5. If not, sends `401 Unauthorized`.

✅ This is how your route is “protected.”

---

### 🧪 How to Observe & Learn:

#### A. Add `console.log()` inside the middleware:

```js
console.log("Token found:", token);
console.log("Decoded user:", decoded);
```

It helps you **see** what’s happening in the backend every step of the way.

---

#### B. Use DevTools → Network tab

- Click “Login with Cookie” and see the `Set-Cookie` in response.
- Click “Access Protected Route” and check the **Request Headers**:
  - Look under **Cookies** (for cookie-based auth)
  - Look under **Authorization** (for header-based auth)

---

#### C. Modify & Break It

Try these:

- Delete the cookie manually → Try accessing the protected route.
- Change the token value in code → Watch it get rejected.
- Set a shorter expiry like 5 seconds → Watch it expire.

Breaking things is one of the best ways to learn!
