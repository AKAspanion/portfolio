# Decisions

<!-- GA-GENERATED:index -->

- [Blog posts are written in a TipTap editor and stored as JSON](blog-editor-json.md) - Posts are written in a WYSIWYG TipTap editor and saved as its structured JSON, which the public page turns into HTML through the same fixed set of elements — never as stored HTML.
- [Blog posts are managed in a Firebase-backed web manager](blog-firebase-manager.md) - The blog's posts are written and published in a web manager on the live site, signed in with the owner's Google account only, and stored in Firestore with images in Firebase Storage.
- [The blog owner is identified by a verified Google email in the security rules](blog-owner-identity.md) - Only a verified Google sign-in with the owner's email may read drafts or write posts and images; the email is written into the Firestore and Storage rules, not looked up.
- [Each blog post is written in one language](blog-posts-single-language.md) - A post is written once, in English or Hindi, and shown as written whatever the site's language; the blog's own labels still follow the site language.

<!-- GA-GENERATED:END -->
