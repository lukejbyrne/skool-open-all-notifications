# Chrome Extension: Skool Notifications

<!-- VIDEO EMBED -->

---

## What You'll Build

A Chrome extension that adds an "Open All" button to the Skool notification dropdown, letting you open every unread notification in a new tab with a single click and automatically mark them all as read.

- One-click open all unread notifications
- Auto marks everything as read
- Filters out (following) and (admin) noise
- Lightweight -- no special permissions, runs only on skool.com
- Styled purple button injected right next to "Mark all as read"

**Source Code:** https://github.com/lukejbyrne/skool-open-all-notifications

---

## Step 1: Get It Running

```bash
git clone https://github.com/lukejbyrne/skool-open-all-notifications.git
```

1. Open Chrome and go to `chrome://extensions`
2. Toggle **Developer mode** on (top-right corner)
3. Click **Load unpacked**
4. Select the `skool-open-all-notifications` folder
5. Go to [skool.com](https://www.skool.com) and log in
6. Click the notification bell -- you should see the purple **"Open All"** button next to "Mark all as read"

That's it. Click the button and every unread notification opens in a new tab.

---

## Step 2: Make It Yours

### Change the target site

In `manifest.json`, update the `matches` array to target a different site:

```json
"content_scripts": [
  {
    "matches": ["https://www.example.com/*"],
    "js": ["content.js"],
    "css": ["style.css"]
  }
]
```

Also update `background.js` to change which site lights up the extension icon:

```js
pageUrlFilters: [{ hostEquals: "www.example.com" }],
```

### Change the button style

Edit `style.css` to change colors, size, or shape:

```css
#skool-open-all-btn {
  background: #4f46e5;   /* Change this for a different color */
  border-radius: 6px;    /* Make it rounder or square */
  font-size: 13px;       /* Bigger or smaller text */
}
```

### Change the notification filters

In `content.js`, find the `SKIP` array:

```js
const SKIP = ["(following)", "(admin)"];
```

Add or remove tags to filter different notification types.

### Key files

| File | What it does |
|------|-------------|
| `manifest.json` | Extension config -- name, permissions, which sites to run on |
| `content.js` | Main logic -- finds notifications, injects the button, opens tabs |
| `style.css` | Button styling |
| `background.js` | Controls when the extension icon is active |

---

## Step 3: Modify With Claude Code

Open Claude Code in the project folder and try these prompts:

1. `"Make this extension work on LinkedIn notifications instead of Skool"`
2. `"Add a keyboard shortcut (Ctrl+Shift+O) that opens all notifications without clicking the button"`
3. `"Add a counter badge on the button showing how many unread notifications will be opened"`
4. `"Change the filter so it only opens notifications from the last 24 hours"`
5. `"Add a popup that lets users toggle which notification types to skip"`

---

## Step 4: Deploy

To publish on the Chrome Web Store:

1. **Zip the extension folder** -- select all files (not the parent folder) and compress
2. Go to the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
3. **Pay the one-time $5 registration fee** (if you haven't already)
4. Click **New Item** and upload your zip file
5. Fill in the listing: name, description, screenshots, category (Productivity)
6. Add a **privacy policy** -- the repo includes `PRIVACY.md`, host it or paste the text
7. Submit for review -- typically takes 1-3 business days

Tip: Take a screenshot of the "Open All" button in the notification dropdown for your store listing.

---

## Challenge

Build an extension that does something useful on a site YOU use every day. Share it in the community.

Ideas to get you started:
- Auto-expand all collapsed comments on Reddit
- Add a "Copy all links" button to a Google search results page
- Highlight keywords on any page you're researching
- Add a word count to Twitter/X compose boxes

Pick a site you're on daily, find one small annoyance, and fix it with an extension. Post your repo link and a screenshot in the community.
