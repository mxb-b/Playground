/**
 * Projects Configuration
 * Add new projects here to automatically update the menu across all pages.
 * Each project needs: id, name, description, url, and icon
 */
const PROJECTS_CONFIG = {
  siteName: "Jordan's Hobby Projects",
  hubUrl: 'hub.html',
  projects: [
    {
      id: 'hub',
      name: 'Project Hub',
      description: 'Central hub for all hobby projects',
      url: 'hub.html',
      icon: '🏠'
    },
    {
      id: 'calculator',
      name: 'Visual Calculator',
      description: 'Interactive calculator for first graders with visual learning tools',
      url: 'index.html',
      icon: '🧮'
    },
    {
      id: 'park-enrichment',
      name: 'Park Enrichment Site',
      description: 'The Park School Enrichment program website',
      url: 'docs/index.html',
      icon: '🌳'
    },
    {
      id: 'mockups',
      name: 'Brand Mockups',
      description: 'Business cards, t-shirts, and social media mockups',
      url: 'park-enrichment-mockups/landing-page.html',
      icon: '🎨'
    },
    {
      id: 'snow-storms',
      name: 'MA Snow Storm Explorer',
      description: 'Interactive history of Massachusetts historic snowstorms',
      url: 'ma-snow-storms/index.html',
      icon: '❄️'
    }
  ]
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PROJECTS_CONFIG;
}
