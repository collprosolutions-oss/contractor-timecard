const defaultSiteUrl = "https://hqwatchfolio.com";

export function getPublicSiteUrl() {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!value) {
    return defaultSiteUrl;
  }

  try {
    return new URL(value).toString().replace(/\/$/, "");
  } catch {
    return defaultSiteUrl;
  }
}

export const brandingAssets = {
  logo: "/brand-logo.svg",
  icon: "/brand-icon.svg",
};
