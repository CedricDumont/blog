---
date: "2018-05-03T17:21:42Z"
title: "How to get the running port in springboot Tests"
categories: ["java"]
tags: ["springboot"]
excerpt: "To get the random server port in spring boot tests, you must :full code snippet:```java@RunWith(Spr..."
---

To get the random server port in spring boot tests, you must :

* decorate your test class with : `@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)`
* add a property in your Test class : `@LocalServerPort private String serverPort;`

full code snippet:

```java

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_CLASS)
public class RandomPortTest{

    @LocalServerPort
    private int serverPort;

    @Test
    public void validateRandomPort(){
       assertThat(serverPort > 0).isTrue();
    }
}

```