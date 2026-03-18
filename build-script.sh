#!/bin/bash
cd /data/.openclaw/workspace/projects/liminal-vision-website
rm -rf dist .next
npm run build 2>&1 | tee /tmp/build-output.log
echo "BUILD_EXIT_CODE=$?" >> /tmp/build-output.log