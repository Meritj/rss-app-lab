#!/bin/sh

# Start Redis server
redis-server &

# Set node options to require the tracing file
export NODE_OPTIONS='--require ./tracing.js'

# Start the Next.js application
exec npm start
