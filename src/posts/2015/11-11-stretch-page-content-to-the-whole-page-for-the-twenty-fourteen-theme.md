---
date: "2015-11-11T10:51:26Z"
title: "Stretch page content to fit the whole page for the Twenty Fourteen Theme"
categories: ["Writing Post"]
tags: ["css", "wordpress"]
excerpt: "As you might see at the bottom of this page, I use the Twenty Fourteen Theme. When I had it running..."
---

As you might see at the bottom of this page, I use the Twenty Fourteen Theme. When I had it running, all post body were only using about 50 % of the space of the page (in fact hard coded 474px), and I wanted it to spread the whole content.

to do this, I added this in the customized css section of the theme

```

.site,
.site-header {
	max-width: 100%;
}

.site-content .entry-header,
.site-content .entry-content,
.site-content .entry-summary,
.site-content .entry-meta, .page-content, .comments-area {
/* Original max-width: 474px */
	max-width: 95%;
}

```