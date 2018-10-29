---
date: "2016-09-22T19:02:23Z"
title: "Create a new git repository from one folder contained in another git repository"
categories: ["Development Tools", "How-to"]
tags: []
excerpt: "When your repository is becoming too big and you using git sparse checkout is not what you want bec..."
---

When your repository is becoming too big and you using git sparse checkout is not what you want because you just want to get rid of some folders but still want to keep the commit history, then you need to do the following :

for example, you have the following folder structure in **Repo_A**:

https://someserver/Repo_A.git
   -> src
   -> documentation
   -> src-feature1

you want to put **src-feature1** in another new git repo : **Repo_B**

1 . clone the original repository

```text
git clone https://someserver/Repo_A.git
```

2 . change current directory to **Repo_A**

```text
cd Repo_A
```

3 . filter branch (the branch name here is master)

```text
git filter-branch --prune-empty --subdirectory-filter src-feature1  master 
```

4 . change your origin url

```text
git remote set-url origin https://someserver/Repo_B.git
```

5 . push to the new origin

```text
git push origin master
```

* * *

You have now two repo:

https://someserver/Repo_A.git
   -> src
   -> documentation
   -> src-feature1

and

https://someserver/Repo_B.git
  -> src-feature1

you can delete src-feature1 from Repo_A