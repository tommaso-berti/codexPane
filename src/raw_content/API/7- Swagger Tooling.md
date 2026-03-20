# 7. Swagger Tooling


<u>[Swagger](https://swagger.io/tools/)</u> is the name for a set of tools that help with each step of designing, developing, testing, and visualizing an API. In this article, we will be exploring three specific open-source tools: <u>[Swagger Editor](https://swagger.io/tools/swagger-editor/)</u>, <u>[Swagger Codegen](https://swagger.io/tools/swagger-codegen/)</u>, and <u>[Swagger UI](https://swagger.io/tools/swagger-ui/)</u>. We will take a look at each tool, examine what it accomplishes, and see how we can use all three together to build an API. By the end of this article, we will better understand how these three tools can help us and the teams we work on to develop APIs more efficiently. Let’s dive in!
* OpenAPI = Specification
* Swagger = Tools for implementing the specification

## **Swagger Editor**
This tool is primarily used to design, define and document RESTful APIs. This editor accepts different OpenAPI versions, includes the option to convert a written specification to YAML (or JSON), and highlights any errors that might be occurring in the specification. The other two tools (Swagger Codegen and Swagger UI) can also be used directly from the Swagger Editor, but we will touch more on that later in this article.
The Swagger Editor can be accessed two ways:
* Via a web browser by visiting <u>[Swagger’s online editor](https://editor.swagger.io/)</u>.
* Via a local machine by downloading the editor from <u>[Swagger’s GitHub repository](https://github.com/swagger-api/swagger-editor)</u>.

## **Swagger Codegen**
Using Swagger Codegen and a provided API specification, we can generate server and client-side code in many different languages. The generated code will even include documentation from the provided specification. Besides saving time by easily generating code, the Swagger Codegen tool provides more consistent code than writing it manually from scratch.
Since code generation typically occurs after the design process, the Swagger Editor tool allows you to generate the code directly through its options.
Swagger Codegen can also be downloaded via its <u>[GitHub repository](https://github.com/swagger-api/swagger-codegen)</u> and used locally through a Command Line Interface (CLI).

## **Swagger UI**
Lastly, once we have a specification in place, and have created (or generated) our server and client-side code, we will need to document the API. The Swagger UI tool allows anyone — be it a development team or end-users — to visualize and interact with an API’s resources without having any of the implementation logic in place. This means we don’t even have to have any code written for an end-user to see the APIs resources, end-points, and even execute mock API calls.
Swagger UI can primarily be accessed two ways:
* Via the online <u>[Swagger Editor](https://editor.swagger.io/)</u> tool. The right-hand side of the editor tool neatly displays any valid specification using Swagger UI. This means Swagger Editor already has Swagger UI built into it and generates the specification documentation live as it is created.
* Via a local machine by downloading from the <u>[Swagger UI GitHub repo](https://github.com/swagger-api/swagger-ui)</u>.
