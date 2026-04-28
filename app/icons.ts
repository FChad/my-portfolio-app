/**
 * Icons used dynamically via variables, props, or function calls.
 * Static usages like `<Icon name="mdi:home" />` are detected automatically
 * by the clientBundle scanner and don't need to be listed here.
 */
export const dynamicIcons = [
    // LanguageSwitcher flags (dynamic via getFlag function)
    'circle-flags:de',
    'circle-flags:fr',
    'circle-flags:gb',
    'circle-flags:lu',

    // About page: profile info, certifications, interests, languages, experiences
    'mdi:account-group',
    'mdi:account-heart',
    'mdi:car',
    'mdi:certificate',
    'mdi:code-braces',
    'mdi:controller',
    'mdi:flag',
    'mdi:heart',
    'mdi:helicopter',
    'mdi:home-heart',
    'mdi:map-marker',
    'mdi:music-note',
    'mdi:parachute',
    'mdi:school',

    // Project features (from data files)
    'mdi:book-open-variant',
    'mdi:brain',
    'mdi:bug',
    'mdi:chat-processing',
    'mdi:content-save',
    'mdi:database',
    'mdi:database-sync',
    'mdi:github',
    'mdi:lan',
    'mdi:lightning-bolt',
    'mdi:magnify',
    'mdi:palette',
    'mdi:play-circle',
    'mdi:responsive',
    'mdi:robot',
    'mdi:robot-angry',
    'mdi:server',
    'mdi:shield-alert',
    'mdi:shield-check',
    'mdi:sync',
    'mdi:theme-light-dark',
    'mdi:tools',
    'mdi:update',
    'mdi:web',
    'mdi:web-off',
    'mdi:wrench',

    // Documentation resources
    'mdi:download',
    'mdi:email-outline',

    // Error page helpful link icons (bound via NAV_LINKS)
    'mdi:home',
    'mdi:account',
    'mdi:eye',
    'mdi:email',
] as const
