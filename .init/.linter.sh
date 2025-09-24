#!/bin/bash
cd /home/kavia/workspace/code-generation/blog-hub-25733-25742/blog_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

