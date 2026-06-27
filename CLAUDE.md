# sleepschedule.in — Claude Instructions

## After every git push

Run the IndexNow submission script to notify Bing of updated URLs:

```
INDEXNOW_KEY=6d64109e0e7f4b63b179a2e8e478d4f6 node scripts/indexnow-submit.mjs
```

Wait for the push to land (the script polls the live site internally if needed). A 202 response means success.
