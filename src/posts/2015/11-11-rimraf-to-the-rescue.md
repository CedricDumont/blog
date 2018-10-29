---
date: "2015-11-11T09:11:26Z"
title: "rimraf to the rescue"
categories: ["tools"]
tags: []
excerpt: "```>npm install -g rimraf...└─┬ rimraf@2.4.3  └─┬ glob@5.0.15    ├─┬ inflight@1.0.4    │ └── wrappy..."
---

**Question**: ever encountered this exception :

> Cannot delete : The file name you specified is not valid or too long. Specify a different file name

**Answer** :  install [rimraf](https://github.com/isaacs/rimraf)and the delete the dir. basically, what it does is **rm -rf**

**Step by Step** :

```

>npm install -g rimraf

...
└─┬ rimraf@2.4.3
  └─┬ glob@5.0.15
    ├─┬ inflight@1.0.4
    │ └── wrappy@1.0.1
    ├── inherits@2.0.1
    ├─┬ minimatch@3.0.0
    │ └─┬ brace-expansion@1.1.1
    │   ├── balanced-match@0.2.1
    │   └── concat-map@0.0.1
    ├── once@1.3.2
    └── path-is-absolute@1.0.0
...

>rimraf path_to_your_dir 

```

`(prerequisite : You should already have node installed)`