---
date: "2016-12-15T17:22:07Z"
title: "Configure camel -openwebbeans - deltaspike to get a standalone camel application running with cdi"
categories: ["How-to", "java"]
tags: ["camel", "maven"]
excerpt: "here are code snippet to get camel, OpenWebBeans container and deltaspike .```java  org.apache.came..."
---

here are code snippet to get camel, OpenWebBeans container and deltaspike .

* The code that boots the app

```java
  org.apache.camel.cdi.Main maincdi = new org.apache.camel.cdi.Main(){};
  maincdi.run();
```

* camel context producer

```java
public class CamelContextFactory {

    @Produces
    @ApplicationScoped
    CamelContext customize() {
        DefaultCamelContext context = new DefaultCamelContext();
        context.setName("my-custom-camel-context");
        return context;
    }

    void cleanUp(@Disposes CamelContext context) {
        // ...
    }
}
```

* create a context initializer

```java
@ApplicationScoped
public class ContextInitializer {
    @Inject
    private CamelContext ctx;

    @Inject
    @Any
    private Instance routes;

    @PostConstruct
    public void init() {

    // add routes
    for (RouteBuilder route : routes) {
        try {
        ctx.addRoutes(route);

        } catch (Exception ex) {
        Logger.getLogger(ContextInitializer.class.getName()).log(Level.SEVERE, null, ex);
        }
        }
        //this.ctx.start();
    }

    @PreDestroy
    public void stop() {
       //this.ctx.stop();
    }
}

```

*/ A route class that will be injected in 'routes' property

```java
public class SomeRouteClass extends RouteBuilder {

    @Override
    public void configure() throws Exception {
          from("timer:foo?period=2000")
          //.bean(testBean)
          .process(new Processor() {
          public void process(Exchange exchange) throws Exception {
          System.out.println("route called from context " + exchange.getContext().getName());
          }
        });
    }

}
```

* part of the pom.xml

```xml
<br /> <properties>
        <deltaspike.version>1.7.2</deltaspike.version>
        <!--<weld.version>2.3.3.Final</weld.version>-->
        <owb.version>1.6.3</owb.version>
    </properties>
    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.apache.deltaspike.distribution</groupId>
                <artifactId>distributions-bom</artifactId>
                <version>${deltaspike.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <dependencies>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>3.8.1</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.apache.camel</groupId>
            <artifactId>camel-core</artifactId>
            <version>2.18.1</version>
        </dependency>
        <dependency>
            <groupId>org.apache.camel</groupId>
            <artifactId>camel-cdi</artifactId>
            <version>2.18.1</version>
        </dependency>

        <!--delta spike core-->
        <dependency>
            <groupId>org.apache.deltaspike.core</groupId>
            <artifactId>deltaspike-core-api</artifactId>
            <version>${deltaspike.version}</version>
            <scope>compile</scope>
        </dependency>

        <dependency>
            <groupId>org.apache.deltaspike.core</groupId>
            <artifactId>deltaspike-core-impl</artifactId>
            <version>${deltaspike.version}</version>
            <scope>runtime</scope>
        </dependency>

        <!--container control-->
        <dependency>
            <groupId>org.apache.deltaspike.cdictrl</groupId>
            <artifactId>deltaspike-cdictrl-api</artifactId>
            <version>${deltaspike.version}</version>
            <scope>compile</scope>
        </dependency>

        <!--open web bean dependency-->

        <dependency>
            <groupId>org.apache.openwebbeans</groupId>
            <artifactId>openwebbeans-impl</artifactId>
            <version>${owb.version}</version>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.apache.openwebbeans</groupId>
            <artifactId>openwebbeans-spi</artifactId>
            <version>${owb.version}</version>
            <scope>compile</scope>
        </dependency>
        <dependency>
            <groupId>org.apache.geronimo.specs</groupId>
            <artifactId>geronimo-jcdi_1.1_spec</artifactId>
            <version>1.0</version>
        </dependency>
        <dependency>
            <groupId>org.apache.geronimo.specs</groupId>
            <artifactId>geronimo-atinject_1.0_spec</artifactId>
            <version>1.0</version>
        </dependency>
        <dependency>
            <groupId>org.apache.geronimo.specs</groupId>
            <artifactId>geronimo-interceptor_1.2_spec</artifactId>
            <version>1.0</version>
        </dependency>
        <dependency>
            <groupId>org.apache.geronimo.specs</groupId>
            <artifactId>geronimo-annotation_1.2_spec</artifactId>
            <version>1.0</version>
        </dependency>
        <dependency>
            <groupId>org.apache.deltaspike.cdictrl</groupId>
            <artifactId>deltaspike-cdictrl-owb</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>javax.enterprise</groupId>
            <artifactId>cdi-api</artifactId>
            <version>1.2</version>
        </dependency>
    </dependencies>

```

**=> be carrefull to keep camel component version the same 2.18.1\. otherwise you will hit this kind of error:**

[code lang=text]
org.apache.webbeans.exception.WebBeansDeploymentException: javax.enterprise.inject.AmbiguousResolutionException: There is more than one Bean with type org.apache.camel.CamelContextQualifiers: [@javax.enterprise.inject.Default()]
for injection into Field Injection Point, field name : ctx, Bean Owner : [ContextInitializer, WebBeansType:MANAGED, Name:null, API Types:[java.lang.Object,proj.core.ContextInitializer], Qualifiers:[javax.enterprise.inject.Default,javax.enterprise.inject.Any]]
found beans:
CdiCamelContext, WebBeansType:THIRDPARTY, Name:CamelContext, API Types:[org.apache.camel.CamelContext,org.apache.camel.cdi.CdiCamelContext,java.lang.Object], Qualifiers:[javax.enterprise.inject.Default,javax.enterprise.inject.Any] from jar:file:/P:/atos/common/apache-maven-repo/org/apache/camel/camel-cdi/2.16.1/camel-cdi-2.16.1.jar!/org/apache/camel/cdi/CdiCamelContext.class
CamelContext, WebBeansType:PRODUCERMETHOD, Name:null, API Types:[org.apache.camel.CamelContext,org.apache.camel.SuspendableService,org.apache.camel.RuntimeConfiguration,java.lang.Object,org.apache.camel.Service], Qualifiers:[javax.enterprise.inject.Default,javax.enterprise.inject.Any] from file:/P:/atos/proj-vnext/proj-core/target/classes/proj/core/CamelContextFactory.class
[/code]