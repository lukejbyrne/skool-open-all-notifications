# Skool – Open All Notifications

A Chrome extension that adds an **"Open All"** button to your Skool notification dropdown. One click opens every notification in a new tab and marks them all as read.

![Chrome Web Store](https://img.shields.io/badge/platform-Chrome-4285F4?logo=googlechrome&logoColor=white)

## Features

- Opens all community member notifications in new tabs with one click
- Automatically marks all notifications as read
- Filters out noise — skips `(following)` and `(admin)` notifications
- Lightweight — no permissions required, runs only on skool.com

## Install from source

1. Clone or download this repo
2. Open `chrome://extensions` in Chrome
3. Enable **Developer mode** (top right)
4. Click **Load unpacked** and select the repo folder

## How it works

When you click the notification bell on Skool, the extension injects an **"Open All"** button next to "Mark all as read". Clicking it:

1. Collects all notification links (excluding following/admin posts)
2. Opens each one in a new tab
3. Clicks "Mark all as read" automatically

## Privacy

This extension does not collect, store, or transmit any user data. See [PRIVACY.md](PRIVACY.md).
