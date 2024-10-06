import RSS from "rss";
import { writeFileSync } from "fs";
import { client } from "./contentful/client";

async function getBlogs() {
    try {
        const blogPostRef = await client.getEntries({
            content_type: 'blogPost',
            order: '-fields.date'
        });

        return blogPostRef;
    } catch (err) {
        console.log(err);
    }
}

export default async function generateRssFeed() {
    const baseUrl = "https://neelanjan.dev";

    const feed = new RSS({
        title: "Neelanjan's Blog",
        description: "Read practitioner blogs and thought leadership articles about Chaos Engineering, LitmusChaos, Kubernetes, Docker, and Go.",
        generator: "Next.js using Feed for Node.js",
        site_url: `${baseUrl}/blog`,
        feed_url: `${baseUrl}/feed.xml`,
        image_url: `${baseUrl}/portrait.png`,
        language: "en",
        pubDate: new Date(),
        managingEditor: "Neelanjan Manna",
        copyright: `All rights reserved ${new Date().getFullYear()}, Your Name`,
    });

    const blogs = await getBlogs();

    blogs.items.forEach(blog => {
        feed.item({
            title: blog.fields.title,
            description: blog.fields.summary,
            url: `${baseUrl}/blog/${blog.fields.slug}`,
            date: new Date(blog.fields.date),
            author: "Neelanjan Manna"
        });
    });

    writeFileSync("./public/feed.xml", feed.xml({ indent: true }));
}
