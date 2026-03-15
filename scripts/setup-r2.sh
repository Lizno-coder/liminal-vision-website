#!/bin/bash
# Setup R2 structure for contact inquiries

echo "Setting up R2 structure for liminalo-contact-requests bucket..."

# Check if AWS CLI is available
if ! command -v aws &> /dev/null; then
    echo "AWS CLI not found. Please install it first."
    exit 1
fi

# Set R2 credentials from environment
export AWS_ACCESS_KEY_ID="${R2_ACCESS_KEY_ID}"
export AWS_SECRET_ACCESS_KEY="${R2_SECRET_ACCESS_KEY}"
export AWS_DEFAULT_REGION="auto"

BUCKET="liminalo-contact-requests"
ENDPOINT="https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com"

# Create folder structure (R2 is flat, but we can create empty objects as markers)
echo "Creating folder structure..."

# Create a test file to establish the structure
echo '{"setup": true, "createdAt": "'$(date -u +%Y-%m-%dT%H:%M:%SZ)'"}' > /tmp/setup.json

aws s3 cp /tmp/setup.json s3://${BUCKET}/inquiries/new/.keep \
    --endpoint-url ${ENDPOINT} \
    --cli-read-timeout 0

aws s3 cp /tmp/setup.json s3://${BUCKET}/inquiries/read/.keep \
    --endpoint-url ${ENDPOINT} \
    --cli-read-timeout 0

# Remove the setup files
aws s3 rm s3://${BUCKET}/inquiries/new/.keep \
    --endpoint-url ${ENDPOINT}

aws s3 rm s3://${BUCKET}/inquiries/read/.keep \
    --endpoint-url ${ENDPOINT}

echo "R2 structure initialized!"
echo ""
echo "Structure:"
echo "  inquiries/"
echo "    new/      <- New contact requests land here"
echo "    read/     <- Move read requests here"
