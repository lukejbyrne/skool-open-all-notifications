# Video Script: Build a Chrome Extension in 5 Minutes

**Target length:** ~6.5 minutes
**Tone:** Casual, direct, like you're showing a friend
**Assets:** presentation/index.html, screen recording, camera

---

## Slide 0: Teleprompter

Use the teleprompter overlay in presentation/index.html (press T) to display key talking points while recording to camera. The teleprompter is only visible to you -- it won't appear in screen recordings or OBS captures.

---

## Hook -- to camera (0:00-0:30)

[SCREEN: Skool.com open, notification bell showing unread count]

"I have 47 unread notifications on Skool. Normally I'd click through each one, one at a time, like an animal."

[SCREEN: Click the bell, show the "Open All" button next to "Mark all as read"]

"Instead..."

[SCREEN: Click "Open All" -- tabs fly open across the browser]

"Every single notification, opened in its own tab. One click. And it marks them all as read."

"This is a Chrome extension I built in about 5 minutes using Claude Code. And I'm going to show you exactly how -- because Chrome extensions are way simpler than you think."

---

## Presentation slides (0:30-1:30)

[PRESENTATION: Slide 1 -- "Build a Chrome Extension in 5 Minutes"]

"Here's the thing about Chrome extensions -- they sound intimidating. They're not."

[PRESENTATION: Slide 2 -- Just 3 Files]

"It's literally three files. manifest.json tells Chrome what your extension is. content.js is the actual logic -- it finds notifications, injects a button, opens tabs. And background.js just controls when your extension icon lights up. That's it. No React. No build step. No framework."

[PRESENTATION: Slide 3 -- The Process]

"The whole process is: load it, test it, modify it, publish it. Four steps."

---

## Screen share (1:30-5:30)

### Load it (1:30-2:30)

[SCREEN: Chrome browser, type chrome://extensions in the address bar]

"Loading a Chrome extension you built yourself takes about 30 seconds."

[SCREEN: Toggle Developer mode on]

"Go to chrome://extensions. Turn on Developer mode."

[SCREEN: Click "Load unpacked", select folder]

"Click Load unpacked. Point it at the extension folder."

[SCREEN: Extension appears, navigate to Skool, click bell, show button]

"And it's loaded. Go to Skool, click the bell... there's our button. Open All. Click it."

[SCREEN: Tabs opening]

"Every notification, its own tab. Done."

### Walk through the code (2:30-3:30)

[SCREEN: manifest.json open in editor]

"manifest.json -- your extension's config. It tells Chrome the name, permissions, and which websites to run on. Ours only runs on skool.com."

[SCREEN: content.js open in editor]

"content.js -- where the magic happens. It watches for the notification dropdown, injects the button, and when you click it -- grabs every unread notification link and opens each one in a new tab. About 110 lines. Just DOM selectors and window.open."

[SCREEN: background.js open in editor]

"background.js -- 15 lines. Makes the icon light up on skool.com, grey out everywhere else. That's the whole extension."

### Claude Code modify (3:30-5:30)

[SCREEN: Open Claude Code in the project folder]

"Now here's where it gets interesting. What if you don't use Skool? What if you want this for a different site?"

[SCREEN: Type prompt into Claude Code]

**Prompt:** "Make this extension work on GitHub notifications instead of Skool. It should add an 'Open All' button to the GitHub notifications page at github.com/notifications that opens every unread notification in a new tab."

[SCREEN: Claude Code modifying files]

"Watch. It's updating manifest.json to target github.com. Rewriting content.js to find GitHub's notification elements. Updating background.js. Same three files, completely different site. Took maybe 30 seconds."

[SCREEN: Reload extension, go to GitHub notifications, show button working]

"Reload the extension, go to GitHub notifications... and there's our button. Works the same way."

[PRESENTATION: Slide 5 -- Claude Code Prompts]

"You can keep going. Here are prompts straight from the lesson."

---

## Final presentation slide + CTA (5:30-6:30)

[PRESENTATION: Slide 4 -- Make It Work Anywhere]

"This is the power of starting with a working example. You're not building from scratch. You're giving Claude Code a template and saying 'adapt this.' It's fast and it works."

[PRESENTATION: Slide 6 -- CTA]

"This Chrome extension is one of 22 apps inside Build with Luke. Every module comes with the source code, a customization guide, and Claude Code prompts to make it your own."

"Portfolio sites. SaaS dashboards. Mobile apps. Browser extensions like this one. All built the same way -- start with a working app, customize it, ship it."

"Link's in the description. Come build something."

---

**Total estimated runtime:** ~6.5 minutes
