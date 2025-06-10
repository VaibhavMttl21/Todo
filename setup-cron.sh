#!/bin/bash

# Get the absolute path to the project
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$PROJECT_DIR/backend"

echo "Setting up cron job for backend health pings..."
echo "Project directory: $PROJECT_DIR"
echo "Backend directory: $BACKEND_DIR"

# Create the cron job entry
CRON_COMMAND="*/8 * * * * cd $BACKEND_DIR && npm run cron:ping >> /tmp/backend-health-ping.log 2>&1"

# Add to crontab
(crontab -l 2>/dev/null | grep -v "backend-health-ping"; echo "$CRON_COMMAND") | crontab -

echo "✅ Cron job added successfully!"
echo "The job will run every 8 minutes and log to /tmp/backend-health-ping.log"
echo ""
echo "To verify the cron job was added, run:"
echo "crontab -l"
echo ""
echo "To view the logs, run:"
echo "tail -f /tmp/backend-health-ping.log"
echo ""
echo "To remove the cron job later, run:"
echo "crontab -e"
echo "Then delete the line containing 'backend-health-ping'"
