/**
 * Expandable Projects Menu
 * Include this script along with projects-config.js to add the menu to any page.
 * Usage: <script src="projects-config.js"></script>
 *        <script src="projects-menu.js"></script>
 */

(function() {
  'use strict';

  // Calculate base path relative to current page
  function getBasePath() {
    const path = window.location.pathname;
    const depth = (path.match(/\//g) || []).length - 1;

    // Check if we're in a subfolder
    if (path.includes('/docs/')) {
      return '../';
    } else if (path.includes('/park-enrichment-mockups/')) {
      return '../';
    } else if (path.includes('/park-enrichment-site/')) {
      return '../';
    }
    return '';
  }

  // Inject styles
  function injectStyles() {
    const styles = document.createElement('style');
    styles.textContent = `
      .projects-menu-fab {
        position: fixed;
        bottom: 24px;
        right: 24px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border: none;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        font-size: 24px;
      }

      .projects-menu-fab:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 24px rgba(102, 126, 234, 0.5);
      }

      .projects-menu-fab.active {
        transform: rotate(45deg);
      }

      .projects-menu-fab svg {
        width: 28px;
        height: 28px;
        fill: white;
        transition: transform 0.3s ease;
      }

      .projects-menu-panel {
        position: fixed;
        bottom: 100px;
        right: 24px;
        width: 320px;
        max-height: calc(100vh - 140px);
        background: white;
        border-radius: 16px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        z-index: 9999;
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px) scale(0.95);
        transition: all 0.3s ease;
        overflow: hidden;
      }

      .projects-menu-panel.active {
        opacity: 1;
        visibility: visible;
        transform: translateY(0) scale(1);
      }

      .projects-menu-header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 20px;
        text-align: center;
      }

      .projects-menu-header h2 {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
      }

      .projects-menu-list {
        padding: 12px;
        max-height: 400px;
        overflow-y: auto;
      }

      .projects-menu-item {
        display: flex;
        align-items: center;
        padding: 14px;
        border-radius: 12px;
        text-decoration: none;
        color: #333;
        transition: background 0.2s ease;
        margin-bottom: 8px;
      }

      .projects-menu-item:last-child {
        margin-bottom: 0;
      }

      .projects-menu-item:hover {
        background: #f5f7ff;
      }

      .projects-menu-item.current {
        background: #eef1ff;
        border: 2px solid #667eea;
      }

      .projects-menu-icon {
        width: 48px;
        height: 48px;
        border-radius: 12px;
        background: #f0f2f5;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        margin-right: 14px;
        flex-shrink: 0;
      }

      .projects-menu-info {
        flex: 1;
        min-width: 0;
      }

      .projects-menu-name {
        font-weight: 600;
        font-size: 15px;
        margin-bottom: 4px;
        color: #333;
      }

      .projects-menu-desc {
        font-size: 12px;
        color: #666;
        line-height: 1.4;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .projects-menu-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.3);
        z-index: 9998;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
      }

      .projects-menu-overlay.active {
        opacity: 1;
        visibility: visible;
      }

      @media (max-width: 480px) {
        .projects-menu-panel {
          right: 12px;
          left: 12px;
          width: auto;
          bottom: 90px;
        }

        .projects-menu-fab {
          right: 16px;
          bottom: 16px;
          width: 54px;
          height: 54px;
        }
      }
    `;
    document.head.appendChild(styles);
  }

  // Create menu HTML
  function createMenu() {
    const basePath = getBasePath();
    const currentPath = window.location.pathname;

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'projects-menu-overlay';
    overlay.id = 'projectsMenuOverlay';

    // Create FAB button
    const fab = document.createElement('button');
    fab.className = 'projects-menu-fab';
    fab.id = 'projectsMenuFab';
    fab.innerHTML = `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 6h4v4H4V6zm0 8h4v4H4v-4zm8-8h4v4h-4V6zm0 8h4v4h-4v-4zm8-8h4v4h-4V6zm0 8h4v4h-4v-4z"/>
      </svg>
    `;
    fab.setAttribute('aria-label', 'Open projects menu');

    // Create panel
    const panel = document.createElement('div');
    panel.className = 'projects-menu-panel';
    panel.id = 'projectsMenuPanel';

    let projectsHtml = '';
    PROJECTS_CONFIG.projects.forEach(project => {
      const projectUrl = basePath + project.url;
      const isCurrent = currentPath.includes(project.url.replace('index.html', '')) ||
                       (project.url === 'index.html' && (currentPath.endsWith('/') || currentPath.endsWith('/index.html')));

      projectsHtml += `
        <a href="${projectUrl}" class="projects-menu-item ${isCurrent ? 'current' : ''}">
          <div class="projects-menu-icon">${project.icon}</div>
          <div class="projects-menu-info">
            <div class="projects-menu-name">${project.name}</div>
            <div class="projects-menu-desc">${project.description}</div>
          </div>
        </a>
      `;
    });

    panel.innerHTML = `
      <div class="projects-menu-header">
        <h2>${PROJECTS_CONFIG.siteName}</h2>
      </div>
      <div class="projects-menu-list">
        ${projectsHtml}
      </div>
    `;

    // Add to document
    document.body.appendChild(overlay);
    document.body.appendChild(panel);
    document.body.appendChild(fab);

    // Event listeners
    function toggleMenu() {
      const isActive = panel.classList.contains('active');
      panel.classList.toggle('active');
      overlay.classList.toggle('active');
      fab.classList.toggle('active');
      fab.setAttribute('aria-expanded', !isActive);
    }

    fab.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && panel.classList.contains('active')) {
        toggleMenu();
      }
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    if (typeof PROJECTS_CONFIG === 'undefined') {
      console.error('Projects Menu: PROJECTS_CONFIG not found. Make sure to include projects-config.js before projects-menu.js');
      return;
    }
    injectStyles();
    createMenu();
  }
})();
