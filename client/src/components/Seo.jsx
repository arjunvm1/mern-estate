import { useEffect } from "react";

export default function Seo({
  title,
  description,
  image,
  url,
  noIndex = false,
}) {
  useEffect(() => {
    document.title = title;

    const setMeta = (attribute, value, content) => {
      let element = document.head.querySelector(
        `meta[${attribute}="${value}"]`
      );

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, value);
        document.head.appendChild(element);
      }

      element.setAttribute("content", content);
    };

    setMeta("name", "description", description);

    setMeta(
      "name",
      "robots",
      noIndex ? "noindex, nofollow" : "index, follow"
    );

    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:url", url);

    if (image) {
      setMeta("property", "og:image", image);
    }

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);

    if (image) {
      setMeta("name", "twitter:image", image);
    }

    // Canonical URL
    let canonical = document.head.querySelector(
      'link[rel="canonical"]'
    );

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }

    canonical.setAttribute("href", url);

    return () => {
      // Nothing needed here because the next page
      // will update the metadata.
    };
  }, [title, description, image, url, noIndex]);

  return null;
}