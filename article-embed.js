// Embeds a mirrored article page inside the article section without navigating away.
// The iframe is same-origin, so we can size it to its content and keep its colour
// scheme in sync with the site theme toggle.
const THEME_ATTR = 'data-theme';
const FALLBACK_HEIGHT = 3200;

function syncHeight(frame) {
    const doc = frame.contentDocument;
    if (!doc || !doc.documentElement) return;
    const height = Math.max(
        doc.documentElement.scrollHeight,
        doc.body ? doc.body.scrollHeight : 0
    );
    if (height > 0) {
        frame.style.height = height + 'px';
    }
}

function syncTheme(frame) {
    const doc = frame.contentDocument;
    if (!doc || !doc.documentElement) return;
    const theme = document.documentElement.getAttribute(THEME_ATTR);
    if (theme) {
        doc.documentElement.setAttribute(THEME_ATTR, theme);
    } else {
        doc.documentElement.removeAttribute(THEME_ATTR);
    }
}

function setupFrame(frame) {
    let doc;
    try {
        doc = frame.contentDocument;
    } catch (err) {
        doc = null;
    }
    if (!doc) {
        // Content is not reachable (unexpected for a same-origin file); let the
        // frame scroll on its own instead of collapsing to nothing.
        frame.style.height = FALLBACK_HEIGHT + 'px';
        frame.removeAttribute('scrolling');
        return;
    }

    syncTheme(frame);
    syncHeight(frame);

    const resize = () => syncHeight(frame);

    if (typeof ResizeObserver === 'function') {
        const observer = new ResizeObserver(resize);
        observer.observe(doc.documentElement);
        if (doc.body) observer.observe(doc.body);
    }
    window.addEventListener('resize', resize);
    frame.contentWindow.addEventListener('load', resize);
    if (doc.fonts && doc.fonts.ready) {
        doc.fonts.ready.then(resize, () => { });
    }
    // Late-loading images (the article ships lazy-loaded figures) change height.
    doc.querySelectorAll('img').forEach((img) => {
        if (!img.complete) img.addEventListener('load', resize);
    });

    new MutationObserver(() => syncTheme(frame)).observe(document.documentElement, {
        attributes: true,
        attributeFilter: [THEME_ATTR]
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('iframe[data-article-embed]').forEach((frame) => {
        if (frame.contentDocument && frame.contentDocument.readyState === 'complete') {
            setupFrame(frame);
        } else {
            frame.addEventListener('load', () => setupFrame(frame));
        }
    });
});
