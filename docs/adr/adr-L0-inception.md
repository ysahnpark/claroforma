Architectural Decision Record
=============================

This document are list of architectural relevant decisions made durinng the inception phase.
The decision made in this phase is subject to change during the elaboration phase, as the
requirements and context is fleshed out. 
The decisions here are mostly selecction of technologies giving the initial starting point
of the projecct codebase.

# ADR 1: Backend Programming Language - TypeScript

- Context: The backend is a REST API server handling short lived requests, mostly CRUD.

- Decision: Typescript, Because it provides type checking and as is based on 
java it has large ecosystem of tools and libraries. Additionally the same 
development skills can be used in both client and server development.

- Consequences: The code needs to be transpiled prior execuction. Many
libraries type definitions will be few version behind.

- Other considered alternatives: Scala - It is also type chcked and has large 
ecosystem of tools and libraries as it runs on JVM, but has learning curve.  
Kotlin - Same as Scala, runs on JVM.

# ADR 2: Database - PostgreSQL

- Context: There are two major database type that can satisfy the data 
persistence requirement, RDBMS and Document store (NoSQL).  

- Decision: PostgreSQL. The newer versions of of PostgreSQL supports JSON(b) 
type providing comparable benefits to NoSQL such as extensible schema.

- Consequences: SDLC should include DB migration. 

- Other alternatives: Mongo - very popular, well documented, still a viable
solution.

# ADR 3: ORM - Bookshelf & Knex

- Context: Accessing persistent data is a major aspect of the request 
processing. Rather than the Object mapping, the underlying specicfic 
techhnology abstraction is the primary motivation for ORM.

- Decision: Use Bookshelf & Knex. It is mature, field tested in other
open source products such as Ghost blog. It is based on Laravel's Eloquent.

- Other alternatives: Sequelize - 

# ADR 4: Web Framework - Express

- Context: A web framework can increase productivity offloading the boilarplate
code related to network and http handling.

- Deicsion: Express - Relatively simple (shorrt learning curve), widely
used, thin layer with minimal impact performance. Large ecosystem of 
contributed plugin, Passportjs is especially useful.

- Other alternatives: Hapi.