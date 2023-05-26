#!/bin/bash
cd /app && yarn start &
nginx -g "daemon off;"
