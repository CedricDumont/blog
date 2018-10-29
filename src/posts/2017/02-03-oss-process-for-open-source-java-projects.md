---
date: "2017-02-03T14:10:52Z"
title: "OSS process for open source java projects"
categories: ["Uncategorized"]
tags: []
excerpt: "This post is a list of my OSS process for open source java projects.for CI integrations, I use Trav..."
---

This post is a list of my OSS process for open source java projects.

### CI

for CI integrations, I use [Travis CI](https://travis-ci.org/), easy to set up and link to github. just add a**.travis.yml** with the content below and your done (I am using maven and provide a pom.xml). pushing to [github](https://github.com)will start the build.

```text
language: java
jdk:
- oraclejdk8
```

### Sonatype

I just list the steps. read this for more info : [OSSRH Guide](http://central.sonatype.org/pages/ossrh-guide.html)

1. create a sonatype jira account and create a new project ticket. (it takes about two budiness days, but for my project, it was done in one day)
2. create a pgp signature : [dealing with PGP signatures](http://central.sonatype.org/pages/working-with-pgp-signatures.html)

    1. download gpg from : https://www.gnupg.org/download/ (you'll find binaries at the bottom of the page)
    2. in a command promp **gpg 2--gen-key** and answer the questions
    3. **gpg2 --list-keys** to list your keys
    4. publish your key  **gpg2 --keyserver hkp://pool.sks-keyservers.net --send-keys XXXXXXX**

3. update your pom.xml to contain all the requirements
4. login to **https://oss.sonatype.org** and get your account key (in your profile, access user account key
5. add your user account key in your maven **settings.xml** (so that your password is not hardcoded.
6. first release with  **mvn clean deploy -P release** if you have created a release profile in your_pom.xml_
7. add a comment on your jira issue to activate the sync process to the Central Repository

### Then Create a releases and Snapshots

_Deploy Snapshots with_

> mvn clean deploy

snapshots will be liste here [https://oss.sonatype.org/content/repositories/snapshots/](https://oss.sonatype.org/content/repositories/snapshots/)

_Release With_

> mvn versions:set -DnewVersion=x.x.x mvn clean deploy -P release

to see if the release was accepted you can login to here [oss.sonatype.org](https://oss.sonatype.org) and check if you have sthg in your staging reprositories or searhc on your artifacts, or check here [search.maven.org/](https://search.maven.org/)