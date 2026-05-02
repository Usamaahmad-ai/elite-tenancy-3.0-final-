@echo off
echo Starting Frontend and Backend servers...
start cmd /k "pnpm --filter @workspace/elite-tenancy run dev"
start cmd /k "pnpm --filter @workspace/api-server run dev"
echo Servers are starting in separate windows.
