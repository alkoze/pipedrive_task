## Installation

To install all dependencies run ```sh npm install ``` in console.

## Starting

To start app type ```sh npm start ``` in console.
By default app runs on port 3000.

## Endpoints

To see new Gists for user that are not in pipedrive app.

```sh GET '/gists/:username' ```

To add Gists in pipedrive app.

```sh GET '/deals/:username' ```

To add users that are being tracked.

```sh POST '/users/:userName' ```

To delete users that are being tracked.

```sh DELETE '/users/:userName' ```

To get users that are being tracked.

```sh GET '/users' ```

## Cloud

Application is up in google cloud.

https://docker-app-pipedrive-n5neuditda-nn.a.run.app/