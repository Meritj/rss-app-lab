#!/bin/sh

# Start Redis server
redis-server &

# Start the Next.js application
exec npm start
