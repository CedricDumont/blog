---
date: "2015-11-11T11:04:17Z"
title: "Using Html5 Details Tag to hide some text in your post"
categories: ["Writing Post"]
tags: ["html5"]
excerpt: "When you write a post, you sometimes have to provide some more in depth explanation or some informa..."
---

When you write a post, you sometimes have to provide some more in depth explanation or some information that the reader might want or not, but you don't want it to pollute your content. for example :

<details><summary>Disclaimer</summary>

<section>this was hidden at load time, at least if your browser supports html 5
</section>

</details>

For this purpose, I simply use the **details** html5 tag like this:

```

<details>
    <summary> Disclaimer </summary>
    <br />
    <section>
      this was hidden at load time, at least if your browser supports html 5
    </section>
    <br />
</details>

```

**It can also be some long information**

<details><summary>Some lot more information</summary>

<section>

# Lorem Ipsum

> [32] Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, **quia voluptas sit, aspernatur aut odit aut fugit,**sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur? [33] At vero eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati cupiditate non provident, similique sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio, cumque nihil impedit, quo minus id, quod maxime placeat, facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet, ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.

</section>

</details>