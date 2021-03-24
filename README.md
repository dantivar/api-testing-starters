# API testing for starters

The aim of this repository is to make personal progress on API
testing and make the knowledge obtained available for others
to use.

## Commit structure

For commit structure [Convencional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary) specification should be followed. Said structure is as follows:

```
<type>[optional scope]: <description>
[optional body]
[optional footer(s)]
```

For more information please visit the link above.


## Getting Started

### Requirements

To succesfully follow the steps listed in this repository the following requirements must be meet:

- [Docker](https://www.docker.com/get-started) version 17.05 or above.
- [GoLang](https://golang.org/doc/install) version 1.13 or above.
- [Node.js](https://nodejs.org/en/) version 14.16.0 or above.
- Access to a Bash console.

### Base Project

As the purpose of this repository is not development but testing,
the project in which the work is performed is called [Go RESTful API Starter Kit (Boilerplate)](https://github.com/qiangxue/go-rest-api). It can be installed in UNIX systems following the given instructions in the project's documentation.
Nonetheless, for Windows system a different path is recommended.

### Windows Installation

For Windows system it is still recommended to have a bash console that can make
use of tools such as `make` and `chmod`. First head to the `app` folder,
there you'll find a docker image called `server`, a `Dockerfile` that will
help you build the docker image for the database, a `init.sql` script that will
create and populate some data and a `testing.yml` file which will contain the
configuration for the testing local environment.

The first step to take is to build and run the docker image for the database. To
do that, and from the `app` folder, you'll need to run the following commands:
```
# Build the docker image of the database
docker build -t psql-database

# Run the docker image on port 5432 in detached mode
docker run -d -p 5432:5432 psql-database
```

With that the database should be up and running with some test data in it. Now,
to run the server you'll need to make the `server` file executable, to do that
run the following command:

```
chmod +x server
```

An then you'll just need to run:

```
./server -config="./testing.yml"
```

Now, go to your browser and access `localhost:8080/healthcheck` and you should
see something like `OK v1.0.0`
