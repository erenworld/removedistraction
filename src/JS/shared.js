"use strict";

const DEFAULT_BLACKLIST_SITES = [
    "instagram.com",
    "tiktok.com",
    "facebook.com",
    "x.com",
    "twitter.com",
];

const DEFAULT_WHITELIST_SITES = [
    "google.com",
    "github.com",
    "stackoverflow.com",
];

/**
 * @typedef {Object} Settings
 * @property {boolean} antishortsMode - Wheter antishorts mode is enabled
 * @property {number | null | undefined} antishortsModeEnableAt - The timestamp when antishorts mode was enabled, or undefined.
 * @property {string[]} blacklistSites
 * @property {string[]} whitelistSites
 * @property {boolean} whitelistMode
 */

/**
 * Load settings from storage. It also sets some defaults in the storage
 * so call this function once on installation
 * 
 * @returns {Promise<Settings>} readonly settings object
 */
async function loadSettingsFromStorage() {
    const data = await chrome.storage.sync.get([
        "antishortsMode",
        "antishortsModeEnabledAt",
        "blacklistSites",
        "whitelistSites",
        "whitelistMode",
    ]);

    const antishortsMode = 
        typeof data.antishortsMode == "boolean" ? data.antishortsMode : true;

    /** @type {Settings} */
    const withDefault = Object.freeze({
        antishortsMode,
        antishortsModeEnableAt,
        blacklistSites: data.blacklistSites || DEFAULT_BLACKLIST_SITES,
        whitelistSites: data.whitelistSites || DEFAULT_WHITELIST_SITES,
        whitelistMode,
    });
    return withDefault;
}
