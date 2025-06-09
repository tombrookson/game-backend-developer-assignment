# Game Backend Developer Assignment

This is my submission for the game backend developer assignment. It is a web application for managing board games.

## Tech stack

- Frontend: React with Typescript and Ant
- Backend: NodeJS with typescript in Cloudfunctions and Firestore as a database
- Infrastructure: Docker and docker compose allowing for full developer local setup

## Developer environment setup

### Prerequisites

- Docker desktop (docker-compose is optional but it is bundled with docker, this uses `docker compose` throughout)
- Node@22 with NPM
- Firebase CLI is not needed as this app is self contained in the Docker setup

### To setup

To start, in the root directory, run:

```
npm run buildImage
```

View Emulator UI at http://127.0.0.1:4000/. This will setup the docker environment and start the full firebase emulator in the docker container.

Once the above has started, run:

```
npm i
npm run seed
```

This will seed the database with the data found in `data/games.json`. You can edit this beforehand to add anymore data you need.

Last, run:

```
npm run start
```

This will start the react app. This app connects to the Games API.

# Notes and musings

- First, I would prefer to have the initial commands in a Make file or a bash script. This could help reduce the amount of json packages everywhere and reduce CI/CD overhead with less node_modules. This could also be solved by using modules in package.json somehow. If the general developer population is more comfortable in Typescript for scripting like this, it can stay as is, small enough script for now to now need it.
- Potentially move the seed script to inside a docker container inside the docker compose network. This removes the need to run it on the local machine and having to 'jump' into the network.
- A question could be made over whether to split the singular Cloudfunction into a Cloudfunction per verb. This could be done easily down the line if the single code is kept fairly modular. The code should be kept as one code base but during CD, you could cherry pick parts of the code to build out multiple functions.
