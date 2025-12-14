#!/bin/bash

# Image optimization script using sharp-cli
# Usage: ./scripts/optimize-image.sh <input-image> [output-image] [quality] [--remove-original]
#
# Examples:
#   ./scripts/optimize-image.sh public/blog-images/image.png
#   ./scripts/optimize-image.sh public/blog-images/image.png public/blog-images/image.webp
#   ./scripts/optimize-image.sh public/blog-images/image.png public/blog-images/image.webp 90
#   ./scripts/optimize-image.sh public/blog-images/image.png --remove-original

REMOVE_ORIGINAL=false
INPUT=""
OUTPUT=""
QUALITY=85

# Parse arguments
for arg in "$@"; do
  if [ "$arg" = "--remove-original" ] || [ "$arg" = "-r" ]; then
    REMOVE_ORIGINAL=true
  elif [ -z "$INPUT" ]; then
    INPUT="$arg"
  elif [ -z "$OUTPUT" ]; then
    OUTPUT="$arg"
  else
    QUALITY="$arg"
  fi
done

# Set default output if not provided
if [ -z "$OUTPUT" ]; then
  OUTPUT="${INPUT%.*}.webp"
fi

if [ -z "$INPUT" ]; then
  echo "Error: Input image path is required"
  echo "Usage: ./scripts/optimize-image.sh <input-image> [output-image] [quality] [--remove-original|-r]"
  exit 1
fi

if [ ! -f "$INPUT" ]; then
  echo "Error: Input file '$INPUT' not found"
  exit 1
fi

echo "Converting: $INPUT -> $OUTPUT (quality: $QUALITY%)"
npx sharp-cli -i "$INPUT" -o "$OUTPUT" -f webp -q "$QUALITY"

if [ $? -eq 0 ]; then
  echo "✓ Successfully converted to WebP"
  
  # Show file size comparison
  if [ -f "$INPUT" ] && [ -f "$OUTPUT" ]; then
    ORIGINAL_SIZE=$(stat -f%z "$INPUT" 2>/dev/null || stat -c%s "$INPUT" 2>/dev/null)
    NEW_SIZE=$(stat -f%z "$OUTPUT" 2>/dev/null || stat -c%s "$OUTPUT" 2>/dev/null)
    
    if [ -n "$ORIGINAL_SIZE" ] && [ -n "$NEW_SIZE" ]; then
      REDUCTION=$(awk "BEGIN {printf \"%.1f\", (1 - $NEW_SIZE / $ORIGINAL_SIZE) * 100}")
      echo "  Original: $(numfmt --to=iec-i --suffix=B $ORIGINAL_SIZE 2>/dev/null || echo "${ORIGINAL_SIZE} bytes")"
      echo "  WebP: $(numfmt --to=iec-i --suffix=B $NEW_SIZE 2>/dev/null || echo "${NEW_SIZE} bytes")"
      echo "  Reduction: ${REDUCTION}%"
    fi
  fi
  
  # Remove original file if requested
  if [ "$REMOVE_ORIGINAL" = true ] && [ "$INPUT" != "$OUTPUT" ]; then
    rm "$INPUT"
    echo "  ✓ Removed original file: $INPUT"
  fi
else
  echo "✗ Conversion failed"
  exit 1
fi
