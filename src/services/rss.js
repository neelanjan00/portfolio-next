import { db } from "../services/firebase";
import RSS from "rss";
import { writeFileSync } from "fs";

async function getBlogs() {
    
    const blogsRef = db.collection("blogs");
    
    try {
        const blogsSnapshot = await blogsRef.orderBy("dateTime", "desc").get();
        return blogsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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
        site_url: baseUrl,
        feed_url: `${baseUrl}/feed.xml`,
        image_url: `${baseUrl}/portrait.png`,
        language: "en",
        pubDate: new Date(),
        managingEditor: "Neelanjan Manna",
        copyright: `All rights reserved ${new Date().getFullYear()}, Your Name`,
    });

    const blogs = await getBlogs();

    blogs.forEach(blog => {
        feed.item({
            title: blog.title,
            description: blog.contentPreview,
            url: `${baseUrl}/blog/${blog.id}`,
            date: new Date(blog.dateTime),
            author: "Neelanjan Manna"
        });
    });

    writeFileSync("./public/feed.xml", feed.xml({ indent: true }));
}
