import express from "express";
import Listing from "../models/listing.model.js";

const router = express.Router();

const SITE_URL = "https://mern-estate-bpqf.onrender.com";

router.get("/sitemap.xml", async (req, res) => {
  try {
    const listings = await Listing.find({}, "_id");

    const listingUrls = listings
      .map(
        (listing) => `
    <url>
      <loc>${SITE_URL}/listing/${listing._id}</loc>
    </url>`
      )
      .join("");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
>
  <url>
    <loc>${SITE_URL}/</loc>
  </url>

  <url>
    <loc>${SITE_URL}/about</loc>
  </url>

  <url>
    <loc>${SITE_URL}/search</loc>
  </url>

  ${listingUrls}
</urlset>`;

    res.header("Content-Type", "application/xml");
    res.status(200).send(sitemap);
  } catch (error) {
    console.error("Sitemap generation error:", error);
    res.status(500).send("Unable to generate sitemap");
  }
});

router.get("/robots.txt", (req, res) => {
  const robots = `User-agent: *
Allow: /

Disallow: /sign-in
Disallow: /sign-up
Disallow: /profile
Disallow: /create-listing
Disallow: /update-listing
Disallow: /success
Disallow: /cancel

Sitemap: ${SITE_URL}/sitemap.xml
`;

  res.header("Content-Type", "text/plain");
  res.status(200).send(robots);
});

export default router;