#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

BUILD_DIR="$ROOT/build"
DEPLOY_DIR="$(mktemp -d)"
REPO_URL="$(git config --get remote.origin.url)"
BRANCH="gh-pages"

cleanup() {
  rm -rf "$DEPLOY_DIR"
}
trap cleanup EXIT

if [[ ! -d "$BUILD_DIR" ]]; then
  echo "Missing build directory. Run npm run build first."
  exit 1
fi

bash scripts/verify-deploy-photos.sh "$BUILD_DIR"

echo "Cloning $BRANCH branch..."
git clone --branch "$BRANCH" --single-branch "$REPO_URL" "$DEPLOY_DIR"

cd "$DEPLOY_DIR"

# Ensure JPG/PNG files are stored as regular git blobs, not LFS pointers.
git config filter.lfs.process ""
git config filter.lfs.required false
git config filter.lfs.clean ""
git config filter.lfs.smudge ""

find . -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +

if command -v rsync >/dev/null 2>&1; then
  rsync -a --exclude '.DS_Store' "$BUILD_DIR/" .
else
  cp -R "$BUILD_DIR/." .
  find . -name '.DS_Store' -delete
fi

git add -A

if git diff --cached --quiet; then
  echo "No deploy changes detected."
  exit 0
fi

git commit -m "Deploy $(date -u +%Y-%m-%dT%H:%M:%SZ)"
git push origin "$BRANCH"

echo "Deploy complete."
