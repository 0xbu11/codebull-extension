const STORAGE_KEY = 'codebull-theme';
const THEME_ATTR = 'data-theme';
const DARK = 'dark';
const LIGHT = 'light';

function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK : LIGHT;
}

function getSavedTheme() {
    return localStorage.getItem(STORAGE_KEY);
}

function setTheme(theme) {
    document.documentElement.setAttribute(THEME_ATTR, theme);
    localStorage.setItem(STORAGE_KEY, theme);
    updateToggleButton(theme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute(THEME_ATTR);
    const newTheme = currentTheme === DARK ? LIGHT : DARK;
    setTheme(newTheme);
}

function updateToggleButton(theme) {
    const btn = document.getElementById('theme-toggle');
    if (btn) {
        // Simple text/icon change. You can use icons (SVG) if preferred.
        // For now, let's use text or simple emoji for simplicity.
        // Moon for Dark, Sun for Light.
        // If current is dark, show Sun (to switch to light).
        // If current is light, show Moon (to switch to dark).
        btn.textContent = theme === DARK ? '☀️' : '🌙';
        btn.setAttribute('aria-label', `Switch to ${theme === DARK ? 'Light' : 'Dark'} mode`);
    }
}

// Initialize
(function initTheme() {
    const savedTheme = getSavedTheme();
    const systemTheme = getSystemTheme();
    const theme = savedTheme || systemTheme;
    setTheme(theme);
})();

// Wait for DOM to load button
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('theme-toggle');
    if (btn) {
        btn.addEventListener('click', toggleTheme);
        // Ensure button state matches current theme
        const currentTheme = document.documentElement.getAttribute(THEME_ATTR);
        updateToggleButton(currentTheme);
    }

    embedArticleBehaviorDashboard();
});

function embedArticleBehaviorDashboard() {
    const graph = document.querySelector('.article-graph-embed');
    const dashboardLink = document.querySelector('.article-dashboard-link a[href*="codebull-dashboard-service.web.app"]');
    if (!graph || !dashboardLink) {
        return;
    }

    const dashboardUrl = new URL(dashboardLink.href);
    dashboardUrl.hash = 'behaviorgraph';

    const isZh = (document.documentElement.lang || '').toLowerCase().startsWith('zh');
    const title = isZh ? '本文 Behavior Graph 遠端面板' : 'Remote dashboard Behavior Graph';
    const loadingText = isZh ? '正在載入遠端 Behavior Graph…' : 'Loading remote Behavior Graph…';
    const openText = isZh ? '在新分頁開啟完整面板' : 'Open full dashboard';

    graph.setAttribute('data-dashboard-upgraded', 'true');
    graph.innerHTML = `
        <div class="article-dashboard-embed-head">
            <span>${title}</span>
            <a href="${dashboardUrl.href}" target="_blank" rel="noopener noreferrer">${openText}</a>
        </div>
        <div class="article-dashboard-frame-wrap">
            <iframe
                class="article-dashboard-frame"
                src="${dashboardUrl.href}"
                title="${title}"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                allow="clipboard-read; clipboard-write; fullscreen">
            </iframe>
            <div class="article-dashboard-frame-fallback">${loadingText}</div>
        </div>`;

    const iframe = graph.querySelector('iframe');
    const showBehaviorGraph = () => {
        iframe.contentWindow?.postMessage({ command: 'setActiveTab', tab: 'behaviorgraph' }, dashboardUrl.origin);
    };
    iframe.addEventListener('load', () => {
        [0, 800, 2500, 6000].forEach((delay) => setTimeout(showBehaviorGraph, delay));
    });
}
