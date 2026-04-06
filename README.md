# Skool — Open All Notifications

A Chrome extension that adds an **"Open All"** button to your Skool notification dropdown. One click opens every notification in a new tab and marks them all as read.

![Chrome](https://img.shields.io/badge/Chrome-Extension-4285F4?logo=googlechrome&logoColor=white) ![Vanilla JS](https://img.shields.io/badge/Vanilla-JS-F7DF1E?logo=javascript&logoColor=black) ![Zero Deps](https://img.shields.io/badge/Dependencies-Zero-333)

## Features

- One-click opens all unread notifications in new tabs
- Automatically marks all as read
- Filters out (following) and (admin) noise
- No special permissions required
- Lightweight — runs only on skool.com
- Purple button styled to match Skool's UI

## Quick Start

```bash
git clone https://github.com/lukejbyrne/skool-open-all-notifications.git
```

1. Open `chrome://extensions`
2. Toggle **Developer mode** on (top right)
3. Click **Load unpacked** → select the folder
4. Go to [skool.com](https://www.skool.com) → click the notification bell
5. Click **"Open All"**

## How It Works

Just 3 files:

| File | Purpose |
|------|---------|
| `manifest.json` | Extension config — name, permissions, target sites |
| `content.js` | Main logic — finds notifications, injects button, opens tabs |
| `background.js` | Controls when the extension icon is active |

## Modify With Claude Code

- `"Make this work on LinkedIn notifications instead"`
- `"Add a keyboard shortcut (Ctrl+Shift+O)"`
- `"Add a counter badge showing unread count"`
- `"Only open notifications from the last 24 hours"`

See [LESSON.md](LESSON.md) for the full customization guide.

## Publish to Chrome Web Store

1. Zip the folder
2. Go to the [Chrome Developer Dashboard](https://chrome.google.com/webstore/devconsole)
3. Pay one-time $5 fee → upload → submit for review

## Part of Build with Luke

This is one of 22 apps inside [Build with Luke](https://www.skool.com/luke). Clone it, customize it, ship it.
