
# React-timetables

Timetables for Pasila Train Station to Eficode headquarters and vice versa.</br>
Uses HSL digitransit HSL GraphiQL api to get the data for timetables and uses Bootstrap
and React components to display it.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.</br>

### Prerequisites

What things you need to install the software and how to install them

```
You'll need node.js installed to be able to run npm commands. You can install **node.js** at [https://nodejs.org/en/](https://nodejs.org/en/) for windows. If using linux, check how to install **node.js** on your distripution.
```

### Installing

A step by step series of examples that tell you how to get a development env running.</br>
Copy this repository with git clone or download zip. Navigate to the directory and begin installing.</br>

Installing all the modules

```
npm install --save
```

Launching the app

```
npm start
```

End with an react Timetables app which should open at [http://localhost:3000](http://localhost:3000)

### Launching with docker

You'll have to have virtualization on and Docker installed to your computer.

Creating the Docker image

```
docker build -t react-timetables:latest .
```

Launching the docker image

```
docker run -d -p 3000:80 react-timetables:latest .
```

End with an react Timetables app which should open at [http://localhost:3000](http://localhost:3000)