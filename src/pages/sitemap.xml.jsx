import React from "react";

const path = require("path");

const Sitemap = () => {
  return null;
};

export const getServerSideProps = async ({ res }) => {
  const BASE_URL = "https://neelanjan.dev";

  const staticPaths = [
    `${BASE_URL}/`,
    `${BASE_URL}/blog/`,
    `${BASE_URL}/projects/`,
  ];

  const getBlogPaths = async () => {
    try {
      const blogPostRef = await client.getEntries({
        content_type: 'blogPost',
        order: '-fields.date'
      });

      return blogPostRef.items.map(blog => `${BASE_URL}/blog/${blog.fields.slug}`);
    } catch (err) {
      console.log(err);
    }
  };

  const dynamicPaths = await getBlogPaths();

  const allPaths = [...staticPaths, ...dynamicPaths];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allPaths
        .map((url) => {
          return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString().substring(0, 10)}</lastmod>
            </url>
          `;
        })
        .join("")}
    </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
