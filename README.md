# streaming-use-effect-react-query-swr

Code for [blog post](https://dev.to/fibonacid/consuming-web-streams-with-usestate-swr-and-react-query-3mjf)

## Requirements

This project relies on a local server to stream data.
The server uses [`dalai`](https://github.com/cocktailpeanut/dalai) to generate completions using the `llama.13B` model.

To run the server, you'll need to install `dalai` and download the model:

```sh
npx dalai llama install 13B
```
> Note: this will download a 60GB model file in your home directory.

## Running the project

Install node modules

```sh
yarn install
```

Start the server

```sh
yarn dev
```
