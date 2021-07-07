# nrk-terminal-news
A simple script to connect to NRKs sse endpoint and print news to the commandline

## Installation 

This script requires the [eventsource](https://github.com/EventSource/eventsource) library. Install it by running 
```bash
npm i
```

## Usage

Start the script with 
```bash
npm run start
```
or
```bash
node index.js
```

## Configure

The script can be configured with the following environment variables:

| Variable | Default | Description |
| - | - | - |
| `NEWS_MAX_LEAD` | 100 | Sets the max character count for the lead text to include |
| `NEWS_STOP_ON_NEWLINE` | false | Trims the lead to the first newline character if it occurs before `NEWS_MAX_LEAD` | 
