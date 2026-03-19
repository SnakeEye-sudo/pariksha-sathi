# ParikshaSathi Security Hardening

## Implemented in this pass

1. Client-side admin access removed
   The old `admin.html` exposed a hardcoded password flow and browser-side reads of the `users` collection.
   It now shows a lock-down notice instead of direct Firebase analytics access.

2. Self-only Firestore rules added
   `firestore.rules` allows authenticated users to read and write only their own:
   - `users/{uid}`
   - `users/{uid}/...` nested documents

3. Self-only Storage rules added
   `storage.rules` allows authenticated users to access only `users/{uid}/...` paths.

4. New users still work
   These rules do not require a pre-approved allowlist.
   Any new Google-authenticated user can create and manage only their own data.

5. Shared family theme auto-follow
   The app now follows the family theme keys by default:
   - `sathi-family-theme`
   - `sathi-family-theme-mode`

## Important remaining console-side work

These steps require Firebase Console access and cannot be finished from static repository edits alone:

- Deploy `firestore.rules` and `storage.rules`
- Enable Firebase App Check for the web app
- Add only trusted production domains to Firebase Authentication authorized domains
- Create any future admin dashboard behind server-side verification
