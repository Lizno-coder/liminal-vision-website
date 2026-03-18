#!/bin/bash
cd /data/.openclaw/workspace/projects/liminal-vision-website
echo "Starting Vercel deployment..."
npx vercel deploy --prod --yes --token="$VERCEL_TOKEN" --cwd=. 2>&1
echo "Deployment finished with exit code: $?"