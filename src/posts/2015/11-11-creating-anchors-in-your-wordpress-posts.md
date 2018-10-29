---
date: "2015-11-11T10:19:36Z"
title: "Creating anchors in your wordpress posts"
categories: ["How-to", "Writing Post"]
tags: []
excerpt: "```<div id=\"bibliography\"></div><!-- or --><span id=\"bibliography\"></span><!-- or --><section i..."
---

**Question** : how to create anchors in your wordpress posts.
**Answer** : to illustrate this, we will create a _bibliography_ section at the bottom of the post and put an anchor in this form :

```

<div id="bibliography"></div>

<!-- or -->

<span id="bibliography"></span>

<!-- or -->
<section id="bibliography">my bibliorgraphy list</section>

```

to reference it in your post, just add

```

<a href="#bibliography">check the prerequisite first</a>
```

**Result**:
here just some lorem ipsum to give some content...[[bibliography]](#bibliography)

> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit. Ut velit mauris, egestas sed, gravida nec, ornare ut, mi. Aenean ut orci vel massa suscipit pulvinar. Nulla sollicitudin. Fusce varius, ligula non tempus aliquam, nunc turpis ullamcorper nibh, in tempus sapien eros vitae ligula. Pellentesque rhoncus nunc et augue. Integer id felis. Curabitur aliquet pellentesque diam. Integer quis metus vitae elit lobortis egestas. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi vel erat non mauris convallis vehicula. Nulla et sapien. Integer tortor tellus, aliquam faucibus, convallis id, congue eu, quam. Mauris ullamcorper felis vitae erat. Proin feugiat, augue non elementum posuere, metus purus iaculis lectus, et tristique ligula justo vitae magna. Aliquam convallis sollicitudin purus. Praesent aliquam, enim at fermentum mollis, ligula massa adipiscing nisl, ac euismod nibh nisl eu lectus. Fusce vulputate sem at sapien. Vivamus leo. Aliquam euismod libero eu enim. Nulla nec felis sed leo placerat imperdiet. Aenean suscipit nulla in justo. Suspendisse cursus rutrum augue. Nulla tincidunt tincidunt mi. Curabitur iaculis, lorem vel rhoncus faucibus, felis magna fermentum augue, et ultricies lacus lorem varius purus. Curabitur eu amet.

<section id="bibliography"><u>Bibliography</u> Hey, I got this text from [wikipedia](https://fr.wikipedia.org/wiki/Faux-texte) So, here you are at the bottom or the post. And here is a link to return to the top : [top](#top)</section>

some anchors I usually use

```

<!-- at the top -->
<span id="top"></span>

<!--and at the bottom -->
<a href="#top">top</a> 
```