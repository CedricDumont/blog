---
date: "2019-01-11T20:10:02Z"
title: "Using multiple accounts on the same machine for github"
categories: ["tools"]
tags: ["ssh"]
excerpt: "First create your two ssh keys and add them to the ssh agent..."
---

First create your two ssh keys and add them to the ssh agent

> ssh-keygen -t rsa -C "x@outlook.com"

save it to id_rsa_x

> ssh-keygen -t rsa -C "y@outlook.com"

save it to id_rsa_y

check if agent is running <code>eval "$(ssh-agent -s)"</code>

add the Identity to the agent (will ask for passphrase)

> ssh-add -K ~/.ssh/id_rsa_x

> ssh-add -K ~/.ssh/id_rsa_y

create a config file in the .ssh folder

```bash
# x account
Host x
HostName github.com
AddKeysToAgent yes
UseKeychain yes
IdentityFile ~/.ssh/id_rsa_x

# y account
Host y
HostName github.com
AddKeysToAgent yes
UseKeychain yes
IdentityFile ~/.ssh/id_rsa_y

```

now, if you clone for **x**, use 

> git clone git@<span style="color:red">x</span>:CedricDumont/Trade.git

instead of

> git clone git@<span style="color:red">github.com</span>:CedricDumont/Trade.git


see : **use x instead of github.com in the git ssh url**