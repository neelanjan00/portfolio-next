import React from "react";
import * as fs from "fs";
import { db } from "../services/firebase";
const path = require("path");

const Sitemap = () => {
  return null;
};

export const getServerSideProps = async ({ res }) => {
  const dirPath = path.join(__dirname);

  const BASE_URL = "https://neelanjan.dev";

  const staticPaths = fs
    .readdirSync(dirPath)
    .filter((staticPage) => {
      if (staticPage === "blog.js") {
        // we already have the blog dir, hence avoiding repetition
        return false;
      }

      return !(
        staticPage.includes("sitemap") ||
        staticPage.includes("404") ||
        staticPage.includes("500") ||
        staticPage.includes("_app") ||
        staticPage.includes("_document") ||
        staticPage.includes("_error") ||
        staticPage.includes("admin") ||
        staticPage.includes(".nft.json") ||
        staticPage.includes(".html") ||
        staticPage.includes(".json")
      );
    })
    .map((staticPagePath) => {
      return `${BASE_URL}/${
        staticPagePath === "index.js" ? "" : staticPagePath.replace(".js", "")
      }`;
    });

  const getBlogPaths = async () => {
    const blogsRef = db.collection("blogs");
    try {
      const blogsSnapshot = await blogsRef.orderBy("dateTime", "desc").get();
      return blogsSnapshot.docs.map((doc) => `${BASE_URL}/blog/${doc.id}`);
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
