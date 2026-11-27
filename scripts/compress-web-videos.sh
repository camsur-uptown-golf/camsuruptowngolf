#!/bin/sh
# Re-encode the site's web videos to sensible bitrates (H.264, faststart).
# Originals are moved, never deleted, to media-archive/web-video-originals/
# (gitignored) and the smaller copy is written back to the same public path.
# Re-running is safe: a file whose original is already archived is skipped.
#
#   sh scripts/compress-web-videos.sh
set -eu
cd "$(dirname "$0")/.."
ARCHIVE=media-archive/web-video-originals
X264="-c:v libx264 -preset slow -profile:v high -pix_fmt yuv420p -movflags +faststart"

# encode <public path> <source path> <width> <crf> <maxrate> <audio: keep|none>
encode() {
  out=$1; src=$2; width=$3; crf=$4; max=$5; audio=$6
  if [ "$audio" = keep ]; then a="-c:a aac -b:a 96k"; else a="-an"; fi
  tmp="$out.tmp.mp4"
  # shellcheck disable=SC2086
  ffmpeg -v error -y -i "$src" -vf "scale=$width:-2" $X264 -crf "$crf" \
    -maxrate "$max" -bufsize "$(echo "$max" | sed 's/M$//' | awk '{print $1*2}')M" $a "$tmp"
  mv "$tmp" "$out"
  echo "$(du -h "$out" | cut -f1)	$out"
}

# archive <public path> -> prints archived path (moves it once)
archive() {
  dest="$ARCHIVE/${1#public/}"
  mkdir -p "$(dirname "$dest")"
  [ -f "$dest" ] || mv "$1" "$dest"
  echo "$dest"
}

# Unused hero edits: archive only (nothing in src/ points at them).
for f in public/hero-golf-2027-1280.mp4 public/hero-golf-2027-1920.mp4 public/hero-golf-2027-2560.mp4 \
         public/hero-golf-2027-v2-1280.mp4 public/hero-golf-2027-v2-1920.mp4 public/hero-golf-2027-v2-2560.mp4 \
         public/hero-golf-2027.mp4 public/hero-golf-club.mp4; do
  [ -f "$f" ] && archive "$f" >/dev/null && echo "archived	$f"
done

# Homepage hero (92s, muted): every size made from the 2560 original.
if [ ! -f "$ARCHIVE/hero-golf-2027-v3-2560.mp4" ]; then
  for w in 1280 1920; do archive "public/hero-golf-2027-v3-$w.mp4" >/dev/null; done
  src=$(archive public/hero-golf-2027-v3-2560.mp4)
  encode public/hero-golf-2027-v3-2560.mp4 "$src" 2560 29 3.8M none
  encode public/hero-golf-2027-v3-1920.mp4 "$src" 1920 27 3.5M none
  encode public/hero-golf-2027-v3-1280.mp4 "$src" 1280 28 1.6M none
fi

# Hole flyovers: 1280 and 1920 made from the 1920 original (keeps AAC audio).
for n in 01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18; do
  for kind in "" "-clear"; do
    big="public/golf/flyovers/hole-$n$kind-1920.mp4"
    small="public/golf/flyovers/hole-$n$kind-1280.mp4"
    [ -f "$ARCHIVE/golf/flyovers/hole-$n$kind-1920.mp4" ] && continue
    [ -f "$big" ] || continue
    archive "$small" >/dev/null
    src=$(archive "$big")
    encode "$big" "$src" 1920 27 4M keep
    encode "$small" "$src" 1280 27 2M keep
  done
done

# Clubhouse hero.
if [ ! -f "$ARCHIVE/clubhouse/clubhouse-hero-1920.mp4" ]; then
  archive public/clubhouse/clubhouse-hero-1280.mp4 >/dev/null
  src=$(archive public/clubhouse/clubhouse-hero-1920.mp4)
  encode public/clubhouse/clubhouse-hero-1920.mp4 "$src" 1920 27 2.5M keep
  encode public/clubhouse/clubhouse-hero-1280.mp4 "$src" 1280 28 1.4M keep
fi

echo "done"
