#!/usr/bin/env bash
set -euo pipefail

BUILD_DIR="${1:-build}"
PHOTOS_DIR="$BUILD_DIR/photos"

if [[ ! -d "$PHOTOS_DIR" ]]; then
  echo "Missing $PHOTOS_DIR"
  exit 1
fi

invalid=0

while IFS= read -r -d '' file; do
  if head -c 40 "$file" | grep -q "git-lfs.github.com"; then
    echo "LFS pointer detected (run 'git lfs pull' first): $file"
    invalid=1
  fi
done < <(find "$PHOTOS_DIR" -type f \( -iname '*.jpg' -o -iname '*.jpeg' \) -print0)

if [[ "$invalid" -ne 0 ]]; then
  exit 1
fi

echo "Deploy photos verified."
