BOARDPACK 2.0 — PINTEREST IMAGE EXPORTER FOR CHROME

INSTALL / UPDATE
Extract this ZIP. Open chrome://extensions, enable Developer mode and choose Load unpacked, selecting the boardpack folder. To update, replace the files in the existing extension folder and click Reload.

PRIVATE BOARDS
Open the board while signed into Pinterest and wait for pins to appear. Click BoardPack, then Scan open board. You can close the popup and switch tabs. Keep the board tab open and do not navigate it elsewhere. Scan pasted link opens a dedicated inactive tab using your Chrome profile.

AUTOMATIC STOP
The scanner scrolls from the top, including scrollable board containers. At the bottom it waits for roughly 10 seconds of stable page height and image count with no visible loading indicator before stopping. Late-loading content resets this wait. If enabled, Download ZIP when scan finishes starts the export automatically. Limits of one hour or 15,000 images stop a scan as partial and do not automatically export. Complete capture depends on Pinterest loading every image.

EXPORT
Download ZIP exports the collected images after scanning has stopped. Found means unique image files, packed means images added to ZIPs, and ZIPs saved means completed browser downloads. Images, including available video thumbnails, are exported; video files are not scanned or downloaded. Exports split around 150 MB and include export-report.json. Stop preserves collected images or finishes a partial ZIP during downloading. Keep Chrome running.

VERSION 2.0
Reference-inspired pastel background, white URL card, gradient download button, switches, colourful counters and rounded controls. Image-only workflow. Automatic bottom detection. Fixed the export completion error caused by an out-of-scope error variable.

IMPLEMENTATION NOTES
Manifest V3; event-driven service worker; job state in chrome.storage.session; packaged offscreen document for ZIP assembly. No remote scripts or frameworks. HTTPS image host validation, internal message sender checks, and blob download validation. Native labelled controls, visible focus, polite status announcements only on actual message changes, and reduced-motion support.
Guidance reviewed: https://developer.chrome.com/docs/extensions/develop/concepts/service-workers/lifecycle ; https://developer.chrome.com/docs/extensions/develop/security-privacy/stay-secure ; https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html
Validation: simulated auto-stop and late-loading content; successful image-only ZIP completion; existing-tab reuse and preservation; JavaScript syntax; ZIP integrity. Live Pinterest and visual browser checks remain unverified.

LOGO
Custom BoardPack B/download-arrow mark generated using the built-in image generator. Original transparent PNG and toolbar PNGs (16, 32, 48, 128 px) included in icons/.

LICENSE
BoardPack is available under the MIT License. See LICENSE.
