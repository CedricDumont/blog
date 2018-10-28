---
date: "2017-02-23T07:40:51Z"
title: "once upon Git commands"
categories: ["Development Tools", "How-to"]
tags: ["git"]
excerpt: "Shortcuts to some usefull Git commands used in day to day work```text//create a branchgit branch <b..."
---

Shortcuts to some usefull Git commands used in day to day work

```text
//create a branch
git branch <branch_name>

//set us currently on a specific branch
git checkout <branch_name>

//shortcut for all that
git checkout -b <branch_name>

//push branch to origin 
git push -u origin <branch_name>

//delete local branch
git branch -d <branch_name>

//delete branch remotely
git push origin --delete <branch_name>
git push origin :<branch_name>

```

when a fix has been done on the master branch and you want the changes from that master in your branch. The best approach, in my opinion. after you done all commit in your local "feature, fix..." branch locally (and remotely)

```text
master     : ---A---B---C--------G
                         \        \
branch-bis :              \        H--I---J---K ....
                           \         /
branch     :                D---E---F

//1\. set ourselves in the master branch and pull changes locally
git checkout master
git pull

//2\. create a new branch locally and optionally remotely
git checkout -b <branch_name_bis>
git push -u origin <branch_name_bis>

//3\. merge changes from the original branch we want 
// the master changes merge to,
// and optionaly delete it locally and remotely
git merge <branch_name>
git branch -d <branch_name>
git push origin :<branch_name>

```