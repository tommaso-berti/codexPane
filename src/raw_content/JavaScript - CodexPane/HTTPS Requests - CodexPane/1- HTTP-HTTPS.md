# 1. HTTP/HTTPS

# 
## HTTP
HTTP stands for Hypertext Transfer Protocol and is used to structure requests and responses over the internet. HTTP requires data to be transferred from one point to another over the network.
The transfer of resources happens using TCP (Transmission Control Protocol). In viewing this webpage, TCP manages the channels between your browser and the server (in this case, codecademy.com). TCP is used to manage many types of internet connections in which one computer or device wants to send something to another. HTTP is the command language that the devices on both sides of the connection must follow in order to communicate.

When you type an address such as [www.wikipedia.com](http://www.wikipedia.com) into your browser, you are commanding it to open a TCP channel to the server that responds to that URL (or Uniform Resource Locator, which you can read more about on <u>[Wikipedia](https://en.wikipedia.org/wiki/Uniform_Resource_Locator)</u>). A URL is like your home address or phone number because it describes how to reach you.
In this situation, your computer, which is making the request, is called the client. The URL you are requesting is the address that belongs to the server. Once the TCP connection is established, the client sends a HTTP *GET* request to the server to retrieve the webpage it should display. After the server has sent the response, it closes the TCP connection. If you open the website in your browser again, or if your browser automatically requests something from the server, a new connection is opened which follows the same process described above. GET requests are one kind of HTTP method a client can call. 

After you type the URL into your browser, your browser will extract the http part and recognize that it is the name of the network protocol to use. Then, it takes the domain name from the URL, in this case “codecademy.com”, and asks the internet Domain Name Server to return an Internet Protocol (IP) address.Now the client knows the destination’s IP address. It then opens a connection to the server at that address, using the http protocol as specified. It will initiate a GET request to the server which contains the IP address of the host and optionally a data payload. The GET request contains the following text:

```
GET / HTTP/1.1
Host: www.codecademy.com

```

This identifies the type of request, the path on [www.wikipedia.com](http://www.wikipedia.com) (in this case, “/“) and the protocol “HTTP/1.1.” HTTP/1.1 is a revision of the first HTTP, which is now called HTTP/1.0. In HTTP/1.0, every resource request requires a separate connection to the server. HTTP/1.1 uses one connection more than once, so that additional content (like images or stylesheets) is retrieved even after the page has been retrieved. As a result, requests using HTTP/1.1 have less delay than those using HTTP/1.0.The second line of the request contains the address of the server which is "www.codecademy.com". There may be additional lines as well depending on what data your browser chooses to send.

If the server is able to locate the path requested, the server might respond with the header:

```
HTTP/1.1 200 OK
Content-Type: text/html

```

The first line of the header, HTTP/1.1 200 OK, is confirmation that the server understands the protocol that the client wants to communicate with (HTTP/1.1), and an <u>[HTTP status code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)</u> signifying that the resource was found on the server. The second line, Content-Type: text/html, shows the type of content that it will be sending to the client.
If the server is not able to locate the path requested by the client, it will respond with the header:

```
HTTP/1.1 404 NOT FOUND

```

# 
## HTTPS
Since your HTTP request can be read by anyone at certain network junctures, it might not be a good idea to deliver information such as your credit card or password using this protocol. Fortunately, many servers support HTTPS, short for HTTP Secure, which allows you to encrypt data that you send and receive.
HTTPS is important to use when passing sensitive or personal information to and from websites. However, it is up to the businesses maintaining the servers to set it up. In order to support HTTPS, the business must apply for a certificate from a <u>[Certificate Authority](https://en.wikipedia.org/wiki/Certificate_authority)</u>.