(() => {
  const BUTTON_ID = "skool-open-all-btn";
  const POLL_MS = 500;

  function getNotificationDropdown() {
    // The notification list lives inside a PopoverItems container
    // which sits next to the NotificationsHeader
    return document.querySelector('[class*="PopoverItems-sc-1ucrcaa"]');
  }

  function getHeader() {
    return document.querySelector('[class*="NotificationsHeader-sc-rqbw39"]');
  }

  function isUnread(item) {
    // The blue dot is a ReadButton div — when unread it has a visible background
    const dot = item.querySelector('[class*="ReadButton-sc-bymlbk"]');
    if (!dot) return false;
    const style = window.getComputedStyle(dot);
    // Unread dots have a solid background color; read ones are transparent/hidden
    const bg = style.backgroundColor;
    const visible =
      bg && bg !== "transparent" && bg !== "rgba(0, 0, 0, 0)";
    // Also check if the dot is actually displayed
    return visible && style.display !== "none" && style.visibility !== "hidden";
  }

  function getNotificationLinks(container) {
    // Each notification is a NotificationItem div containing an <a> with the href
    const items = container.querySelectorAll('[class*="NotificationItem-sc-bymlbk"]');
    const seen = new Set();
    const results = [];
    const SKIP = ["(following)", "(admin)"];

    items.forEach((item) => {
      const text = item.textContent || "";
      // Skip notifications from (following) or (admin) users
      if (SKIP.some((tag) => text.includes(tag))) return;
      // Skip already-read notifications
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

    // Remove stale button if dropdown closed
    if (!header || !list) {
      const stale = document.getElementById(BUTTON_ID);
      if (stale) stale.remove();
      return;
    }

    // Already injected
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

      // Auto-click "Mark all as read" after a short delay
      setTimeout(() => {
        const markAll = document.querySelector('[class*="MarkAllRead-sc-rqbw39"]');
        if (markAll) markAll.click();
      }, 500);

      setTimeout(() => (btn.textContent = "Open All"), 2000);
    });

    // Place button next to "Mark all as read" in the header row
    const markAll = document.querySelector('[class*="MarkAllRead-sc-rqbw39"]');
    if (markAll) {
      markAll.parentElement.parentElement.insertBefore(
        btn,
        markAll.parentElement.nextSibling
      );
    } else {
      // Fallback: insert after the header text
      header.parentElement.insertBefore(btn, header.nextSibling);
    }
  }

  // MutationObserver catches the dropdown opening/closing
  const observer = new MutationObserver(injectButton);
  observer.observe(document.body, { childList: true, subtree: true });

  // Backup poll
  setInterval(injectButton, POLL_MS);
})();
