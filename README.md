# Arkona - gRPC Web Application for cinema

## Table of content
* [General information](#general-information)
* [Technologies](#technologies)
* [Sample views](#sample-views)

## General information
Arkona is a web application for cinema based on the gRPC protocol. It was created as an project for engineering thesis. 
The aim of the diploma thesis was to examine the possibilities of gRPC in a web environment. 

Most of the communication between the server and the client is done using the gRPC protocol.
Due to the fact that streaming is not fully supported in the browser, only server streaming and unary calls were implemented.

At the moment, the application offers the following features:

* viewing the movie repertoire
* searching for movies
* purchase of tickets with the selection of seats in real time
* viewing purchased tickets
* management of films by an authorized employee
* sign in and sign up with external providers (Google and Facebook)

## Technologies
1. Frontend
  * `React 18.2.0`
  * `Typescript 4.8.4`
  * `improbable-eng/grpc-web 0.15.0`
  
2. Backend
  * `.NET 6`
  * `C# 10`
  * `Grpc.AspNetCore.Web 2.49.0`
  * `Serilog 5.0.0`
  * `FluentValidation 11.2.2`
  * `EF Core 6.0.3`

3. Database
  * `SQL Server 2019`

## Sample views
 
Register page
![Register_page](https://user-images.githubusercontent.com/59890909/224357184-347b536d-f202-437d-9b4c-76b51fb6628d.png)
 
Seat choice
![Seat_choice(2)](https://user-images.githubusercontent.com/59890909/224356990-bc22c169-6ea5-40c9-926d-694bf03be39d.png)

Order summary
![Order_summary(1)](https://user-images.githubusercontent.com/59890909/224357335-c33a59ef-ddcc-4c3f-b735-37f79b38d5de.png)
