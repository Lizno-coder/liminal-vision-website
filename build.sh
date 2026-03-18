#!/bin/bash
cd /data/.openclaw/workspace/projects/liminal-vision-website
npm run build 2>&1 | tee /tmp/build.log