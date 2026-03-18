# How to Build & Publish Your First Chrome Extension

## What We're Building

A Chrome extension that adds an "Open All" button to Skool's notification dropdown — opens every unread notification in a new tab and marks them all as read.

## Part 1: Project Setup

Create a folder for your extension. You only need a few files:

```
skool-open-all-notifications/
├── manifest.json      ← tells Chrome what your extension does
├── content.js         ← the actual logic (injected into web pages)
├── background.js      ← controls the toolbar icon
├── style.css          ← styles for the injected button
├── icon16.png         ← toolbar icon
├── icon48.png         ← extension management page icon
└── icon128.png        ← Chrome Web Store icon
```

## Part 2: The Manifest (manifest.json)

This is the config file Chrome reads to understand your extension. Every extension needs one.

```json
{
  "manifest_version": 3,
  "name": "Skool – Open All Notifications",
  "version": "1.1",
  "description": "Opens every Skool notification in a new tab with one click.",
  "permissions": ["activeTab", "declarativeContent"],
  "action": {
    "default_icon": {
      "48": "icon48.png",
      "128": "icon128.png"
    },
    "default_title": "Skool – Open All Notifications"
  },
  "content_scripts": [
    {
      "matches": ["https://www.skool.com/*"],
      "js": ["content.js"],
      "css": ["style.css"]
    }
  ],
  "icons": {
    "48": "icon48.png",
    "128": "icon128.png"
  },
  "background": {
    "service_worker": "background.js"
  }
}
```

Key things to understand:
- **manifest_version: 3** — always use v3, v2 is deprecated
- **content_scripts** — code that gets injected into matching web pages
- **matches** — which URLs your extension runs on (only skool.com for us)
- **permissions** — what your extension is allowed to do
- **background service_worker** — runs in the background to control things like the toolbar icon

## Part 3: The Content Script (content.js)

This is the main logic. It gets injected into every page on skool.com.

### Step 1: Detect the notification dropdown

Skool is a Single Page App (SPA), so we can't just run code once on page load. We use a MutationObserver to watch for DOM changes and a polling interval as backup.

The key is finding the right CSS selectors. To do this:
1. Open Skool in Chrome
2. Click the notification bell
3. Right-click the dropdown → Inspect
4. Look at the class names on the elements

For Skool, the important selectors are:
- `PopoverItems-sc-1ucrcaa` — the notification list container
- `NotificationsHeader-sc-rqbw39` — the header with "Notifications" text
- `NotificationItem-sc-bymlbk` — each individual notification
- `ReadButton-sc-bymlbk` — the blue dot indicating unread
- `MarkAllRead-sc-rqbw39` — the "Mark all as read" button

### Step 2: Check if a notification is unread

The blue dot next to each notification has a background color when unread and is transparent when read. We check this with `getComputedStyle()`.

### Step 3: Filter out noise

We skip notifications containing "(following)" or "(admin)" in the text since those are from people you follow or group admins — not direct community engagement.

### Step 4: Open all and mark as read

Collect all unread notification links, open each in a new tab with `window.open()`, then auto-click "Mark all as read".

### Full content.js:

```javascript
(() => {
  const BUTTON_ID = "skool-open-all-btn";
  const POLL_MS = 500;

  function getNotificationDropdown() {
    return document.querySelector('[class*="PopoverItems-sc-1ucrcaa"]');
  }

  function getHeader() {
    return document.querySelector('[class*="NotificationsHeader-sc-rqbw39"]');
  }

  function isUnread(item) {
    const dot = item.querySelector('[class*="ReadButton-sc-bymlbk"]');
    if (!dot) return false;
    const style = window.getComputedStyle(dot);
    const bg = style.backgroundColor;
    const visible =
      bg && bg !== "transparent" && bg !== "rgba(0, 0, 0, 0)";
    return visible && style.display !== "none" && style.visibility !== "hidden";
  }

  function getNotificationLinks(container) {
    const items = container.querySelectorAll('[class*="NotificationItem-sc-bymlbk"]');
    const seen = new Set();
    const results = [];
    const SKIP = ["(following)", "(admin)"];

    items.forEach((item) => {
      const text = item.textContent || "";
      if (SKIP.some((tag) => text.includes(tag))) return;
      if (!isUnread(item)) return;

      const link = item.querySelector("a[href]");
      if (link && link.href && !seen.has(link.href)) {
        seen.add(link.href);
        results.push(link.href);
      }
    });

    return results;
  }

  function injectButton() {
    const header = getHeader();
    const list = getNotificationDropdown();

    if (!header || !list) {
      const stale = document.getElementById(BUTTON_ID);
      if (stale) stale.remove();
      return;
    }

    if (document.getElementById(BUTTON_ID)) return;

    const btn = document.createElement("button");
    btn.id = BUTTON_ID;
    btn.textContent = "Open All";
    btn.title = "Open every notification in a new tab";

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const links = getNotificationLinks(list);
      if (links.length === 0) {
        btn.textContent = "No links found";
        setTimeout(() => (btn.textContent = "Open All"), 2000);
        return;
      }

      btn.textContent = `Opening ${links.length}…`;
      links.forEach((url) => window.open(url, "_blank"));

      setTimeout(() => {
        const markAll = document.querySelector('[class*="MarkAllRead-sc-rqbw39"]');
        if (markAll) markAll.click();
      }, 500);

      setTimeout(() => (btn.textContent = "Open All"), 2000);
    });

    const markAll = document.querySelector('[class*="MarkAllRead-sc-rqbw39"]');
    if (markAll) {
      markAll.parentElement.parentElement.insertBefore(
        btn,
        markAll.parentElement.nextSibling
      );
    } else {
      header.parentElement.insertBefore(btn, header.nextSibling);
    }
  }

  const observer = new MutationObserver(injectButton);
  observer.observe(document.body, { childList: true, subtree: true });
  setInterval(injectButton, POLL_MS);
})();
```

## Part 4: Background Script (background.js)

This controls when the toolbar icon is active vs greyed out. We only want it lit up on skool.com.

```javascript
chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrlFilters: [{ hostEquals: "www.skool.com" }],
          }),
        ],
        actions: [new chrome.declarativeContent.ShowAction()],
      },
    ]);
  });
});
```

## Part 5: Styling (style.css)

Keep it simple and matching the Skool UI:

```css
#skool-open-all-btn {
  background: #4f46e5;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 5px 14px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  margin-left: 12px;
  transition: background 0.15s;
  white-space: nowrap;
}

#skool-open-all-btn:hover {
  background: #4338ca;
}
```

## Part 6: Icons

You need icons at 16px, 48px, and 128px. You can:
- Design them in Figma/Canva
- Generate them with a script (we used Python + Pillow)
- Use any PNG with transparency

## Part 7: Test Locally

1. Open Chrome → go to `chrome://extensions`
2. Toggle **Developer mode** ON (top right)
3. Click **Load unpacked** → select your extension folder
4. Go to skool.com and click the notification bell
5. You should see the "Open All" button in the dropdown

Every time you change code, hit the refresh icon on the extension card in `chrome://extensions`.

## Part 8: Publish to Chrome Web Store

### 1. Register as a developer
- Go to [Chrome Developer Dashboard](https://chrome.google.com/webstore/devconsole)
- Pay the one-time $5 USD registration fee

### 2. Set up your account
- Click the hamburger menu (top left) → **Account**
- Under Profile, enter your **Contact Email Address**
- Click verify and confirm via the link sent to your email
- You can't publish until this is done

### 3. Create your listing
- Click **New Item**
- Upload a `.zip` of your extension folder (exclude `.git` folder)
- Fill in the store listing details:
  - **Description** — what it does in plain English
  - **Category** — Productivity
  - **Screenshots** — 1280x800 or 640x400, JPEG or 24-bit PNG (no alpha)
  - At least one screenshot required

### 4. Privacy section
- **Single purpose description** — one clear sentence about what the extension does
- **Permission justifications** — explain why you need each permission
  - `activeTab` — to detect when user is on skool.com
  - `declarativeContent` — to show/hide toolbar icon based on current site
  - Host permissions — content script needs to run on skool.com to inject the button
- **Remote code** — select "No" (all code is in the package)
- **Data usage** — check nothing (we collect zero data)
- **Certify all three privacy disclosures**
- **Privacy policy URL** — link to your PRIVACY.md on GitHub

### 5. Trader status
- If you're not selling goods/services, select **"Not a trader"**

### 6. Submit for review
- Hit publish
- Review typically takes 1-3 business days
- You'll get an email when it's approved

## Tips

- **Save the web page** (Ctrl+S / Cmd+S) of the site you're building for — you can inspect the HTML offline to find selectors without the page changing on you
- **Use `class*=` selectors** for styled-components sites where class names have random hashes — match on the stable part of the name
- **MutationObserver + polling** is the most reliable pattern for SPAs
- **Keep permissions minimal** — fewer permissions = faster review and more user trust
- **Write a privacy policy** even for simple extensions — it's required if you declare any permissions
