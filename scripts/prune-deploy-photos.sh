#!/usr/bin/env bash
set -euo pipefail

BUILD_PHOTOS_DIR="${1:-build/photos}"

if [[ ! -d "$BUILD_PHOTOS_DIR" ]]; then
  echo "No build photos directory at $BUILD_PHOTOS_DIR"
  exit 0
fi

keep_dirs=(
  "british-grand-prix"
  "versailles"
)

for entry in "$BUILD_PHOTOS_DIR"/*; do
  [[ -e "$entry" ]] || continue
  name="$(basename "$entry")"

  should_keep=false
  for keep in "${keep_dirs[@]}"; do
    if [[ "$name" == "$keep" ]]; then
      should_keep=true
      break
    fi
  done

  if [[ "$should_keep" == false ]]; then
    rm -rf "$entry"
  fi
done

# Drop legacy/unused thumbs that aren't referenced by gallery data.
find "$BUILD_PHOTOS_DIR/versailles/thumbs" -type f ! -name 'versailles-*.jpg' -delete 2>/dev/null || true

rm -rf "$BUILD_PHOTOS_DIR/__pycache__" 2>/dev/null || true
rm -f "$BUILD_PHOTOS_DIR/formatter.py" 2>/dev/null || true

echo "Deploy photos size: $(du -sh "$BUILD_PHOTOS_DIR" | awk '{print $1}')"
