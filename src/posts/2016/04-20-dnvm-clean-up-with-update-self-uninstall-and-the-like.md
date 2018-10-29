---
date: "2016-04-20T20:47:27Z"
title: "DNVM clean up with update-self, uninstall and the like"
categories: ["Development Tools", "tools"]
tags: [".net core", "asp.net"]
excerpt: "This post is about upgrading and managing dnvm and runtimes installed on your machine.```text@power..."
---

This post is about upgrading and managing dnvm and runtimes installed on your machine.

## Short Story

```text
@powershell -NoProfile -ExecutionPolicy unrestricted -Command "&{$Branch='dev';iex ((new-object net.webclient).DownloadString('https://raw.githubusercontent.com/aspnet/Home/dev/dnvminstall.ps1'))}"
```

first install of `dnvm`to get some `dnx`

```text
dnvm 
```

lists the commands you can call with dnvm to manage your runtimes

```text
dnvm update-self
```

will update your version manager tool (dnvm itself,  not the runtimes)

```text
dnvm list
```

will list all installed runtimes

```text
dnvm uninstall  1.0.0-beta8 -arch x64 -r clr
```

unintsall a runtime version

```text
dnvm upgrade -r coreclr -arch x64
```

upgrades a version already installed

## Long Story

##### > which version is installed on your machine

Currently I have dnvm v1.0.0-beta5-10368 installed on my machine. to check this, just open a command prompt and type dnvm

[![dnvm-help](20-1.jpg?w=474)](20-1.jpg)

By the way, if nothing is installed on your machine, just type the following in a command prompt :

```text
@powershell -NoProfile -ExecutionPolicy unrestricted -Command "&{$Branch='dev';iex ((new-object net.webclient).DownloadString('https://raw.githubusercontent.com/aspnet/Home/dev/dnvminstall.ps1'))}"
```

you might want to check this also : [installing on windows](https://docs.asp.net/en/latest/getting-started/installing-on-windows.html)

##### > upgrade dnvm self

Now update dnvm version to the latest version:

```text
dnvm update-self
```

this results for me in version  v1.0.0-rc2-15546 which is the latest when writing this post

[![dnvm-update-self](20-2.jpg?w=474)](20-2.jpg)

##### > dnvm list, install, upgrade and uninstall

```text
dnvm list
```

will show all runtimes installed on your machine. you can uninstall them by issuing the following

```text
dnvm uninstall  1.0.0-beta5 -arch x64 -r coreclr
```

and that for each version installed in each arch and in each runtime

so I had to issue a long list of commands :

```text
...
C:\Temp>dnvm uninstall  1.0.0-beta8 -arch x86 -r coreclr
Removed 'C:\Users\a406775\.dnx\runtimes\dnx-coreclr-win-x86.1.0.0-beta8'

C:\Temp>dnvm uninstall  1.0.0-beta8 -arch x86 -r clr
Removed 'C:\Users\a406775\.dnx\runtimes\dnx-clr-win-x86.1.0.0-beta8'

C:\Temp>dnvm uninstall  1.0.0-beta8 -arch x64 -r clr
Removed 'C:\Users\a406775\.dnx\runtimes\dnx-clr-win-x64.1.0.0-beta8'
...

use dnvm upgrade to upgrade your dnx version to the latest:

```

dnvm upgrade -r coreclr -arch x64
```

if you have any issues, you canc check if there is a solution here : [known-issues](https://github.com/aspnet/Tooling/blob/master/known-issues.md)