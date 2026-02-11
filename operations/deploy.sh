#!/bin/bash
# Production deploy: sync public/ to S3 (lookingglassvr bucket) using AWS CLI.
#
# One-time setup: configure the AWS account that owns the lookingglassvr bucket.
#   aws configure --profile lgvr
# (Use whatever profile name you prefer; set LOOKINGGLASS_AWS_PROFILE to override.)
#
# You need: AWS Access Key ID and Secret for an account that has the bucket
# "lookingglassvr" (or set BUCKET to your bucket name). Optional: CloudFront
# distribution ID in CLOUDFRONT_ID to invalidate cache after upload.

set -e
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$REPO_ROOT"

PROFILE="${LOOKINGGLASS_AWS_PROFILE:-lgvr}"
BUCKET="${LOOKINGGLASS_BUCKET:-lookingglassvr}"
CLOUDFRONT_ID="${LOOKINGGLASS_CLOUDFRONT_ID:-EB5YG59666WVK}"

if ! command -v aws >/dev/null 2>&1; then
  echo "deploy.sh: AWS CLI not found. Install it (e.g. apt install awscli), then run:" >&2
  echo "  aws configure --profile $PROFILE" >&2
  exit 1
fi

if ! aws sts get-caller-identity --profile "$PROFILE" >/dev/null 2>&1; then
  echo "deploy.sh: Profile '$PROFILE' not configured or invalid." >&2
  echo "" >&2
  echo "Configure the AWS account that owns the Looking Glass site bucket:" >&2
  echo "  aws configure --profile $PROFILE" >&2
  echo "" >&2
  echo "Optional: set LOOKINGGLASS_AWS_PROFILE / LOOKINGGLASS_BUCKET / LOOKINGGLASS_CLOUDFRONT_ID" >&2
  exit 1
fi

echo "Using profile: $PROFILE (bucket: $BUCKET)"
npm run prod
aws s3 sync public/ "s3://$BUCKET/" --exclude '.DS_Store' --acl public-read --profile "$PROFILE"

if [ -n "$CLOUDFRONT_ID" ]; then
  echo "Invalidating CloudFront cache..."
  aws cloudfront create-invalidation --profile "$PROFILE" --distribution-id "$CLOUDFRONT_ID" --paths "/*"
fi

echo "Deploy complete."
