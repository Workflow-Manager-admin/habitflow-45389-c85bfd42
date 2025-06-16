#!/bin/bash
cd /home/kavia/workspace/code-generation/habitflow-45389-c85bfd42/habitflow_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

