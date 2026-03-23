#!/usr/bin/env bash
set -euo pipefail

APP_TYPE=""
SERVER="caddy"
STRATEGY=""
DOMAIN=""
WWW_DOMAIN=""
REPO=""
APP_NAME=""
DEPLOY_USER="deploy"
RELEASE_VERSION="v0.0.0"
ENABLE_HTTPS="false"
DRY_RUN="false"

usage() {
  cat <<'EOF'
Unified VPS deploy helper (docs-oriented operational script)

Usage:
  deploy-vps-unified.sh --app-type <static|react> --strategy <ci-artifact|build-on-vps> \
    --app-name <name> --domain <domain> [options]

Required:
  --app-type           static | react
  --strategy           ci-artifact | build-on-vps
  --app-name           app identifier used for config file names
  --domain             bare domain or primary domain

Optional:
  --server             caddy | nginx (default: caddy)
  --www-domain         explicit www domain (default derived from --domain)
  --repo               required for --strategy build-on-vps
  --deploy-user        default: deploy
  --release-version    default: v0.0.0
  --enable-https       true | false (default: false)
  --dry-run            print commands without executing
  --help               show this help

Examples:
  sudo bash scripts/deploy-vps-unified.sh \
    --app-type react \
    --server caddy \
    --strategy ci-artifact \
    --app-name myapp \
    --domain example.com \
    --www-domain www.example.com

  sudo bash scripts/deploy-vps-unified.sh \
    --app-type react \
    --server nginx \
    --strategy build-on-vps \
    --app-name myapp \
    --domain app.example.com \
    --repo https://github.com/<org>/<repo>.git \
    --enable-https true
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --app-type) APP_TYPE="${2:-}"; shift 2 ;;
    --server) SERVER="${2:-}"; shift 2 ;;
    --strategy) STRATEGY="${2:-}"; shift 2 ;;
    --domain) DOMAIN="${2:-}"; shift 2 ;;
    --www-domain) WWW_DOMAIN="${2:-}"; shift 2 ;;
    --repo) REPO="${2:-}"; shift 2 ;;
    --app-name) APP_NAME="${2:-}"; shift 2 ;;
    --deploy-user) DEPLOY_USER="${2:-}"; shift 2 ;;
    --release-version) RELEASE_VERSION="${2:-}"; shift 2 ;;
    --enable-https) ENABLE_HTTPS="${2:-}"; shift 2 ;;
    --dry-run) DRY_RUN="true"; shift ;;
    --help|-h) usage; exit 0 ;;
    *) echo "Unknown option: $1" >&2; usage; exit 1 ;;
  esac
done

die() {
  echo "Error: $*" >&2
  exit 1
}

run_sh() {
  local cmd="$1"
  if [[ "$DRY_RUN" == "true" ]]; then
    printf '[dry-run] %s\n' "$cmd"
  else
    bash -lc "$cmd"
  fi
}

require_cmd() {
  local cmd="$1"
  if [[ "$DRY_RUN" == "true" ]]; then
    if ! command -v "$cmd" >/dev/null 2>&1; then
      echo "[dry-run] command not found locally: $cmd (skipped)"
    fi
    return 0
  fi
  command -v "$cmd" >/dev/null 2>&1 || die "Missing command: $cmd"
}

[[ -n "$APP_TYPE" ]] || die "--app-type is required"
[[ -n "$STRATEGY" ]] || die "--strategy is required"
[[ -n "$APP_NAME" ]] || die "--app-name is required"
[[ -n "$DOMAIN" ]] || die "--domain is required"

[[ "$APP_TYPE" == "static" || "$APP_TYPE" == "react" ]] || die "--app-type must be static or react"
[[ "$SERVER" == "caddy" || "$SERVER" == "nginx" ]] || die "--server must be caddy or nginx"
[[ "$STRATEGY" == "ci-artifact" || "$STRATEGY" == "build-on-vps" ]] || die "--strategy must be ci-artifact or build-on-vps"
[[ "$ENABLE_HTTPS" == "true" || "$ENABLE_HTTPS" == "false" ]] || die "--enable-https must be true or false"

if [[ "$STRATEGY" == "build-on-vps" && -z "$REPO" ]]; then
  die "--repo is required when --strategy is build-on-vps"
fi

if [[ "$RELEASE_VERSION" != v* ]]; then
  RELEASE_VERSION="v$RELEASE_VERSION"
fi

if [[ -z "$WWW_DOMAIN" ]]; then
  WWW_DOMAIN="$DOMAIN"
fi

if [[ "$DRY_RUN" != "true" && "$(id -u)" -ne 0 ]]; then
  die "Run as root (or use --dry-run)."
fi

BARE_DOMAIN="${DOMAIN#www.}"
WEB_ROOT="/srv/www/$WWW_DOMAIN"
RELEASES_DIR="$WEB_ROOT/releases"
CURRENT_LINK="$WEB_ROOT/current"
TARGET_RELEASE="$RELEASES_DIR/$RELEASE_VERSION"
APP_SRC_DIR="/srv/apps/$APP_NAME"

echo "Unified deploy configuration:"
echo "  app-type:        $APP_TYPE"
echo "  server:          $SERVER"
echo "  strategy:        $STRATEGY"
echo "  domain:          $DOMAIN"
echo "  www-domain:      $WWW_DOMAIN"
echo "  app-name:        $APP_NAME"
echo "  deploy-user:     $DEPLOY_USER"
echo "  release-version: $RELEASE_VERSION"
echo "  dry-run:         $DRY_RUN"

require_cmd mkdir
require_cmd ln
require_cmd chown
require_cmd find

if ! id -u "$DEPLOY_USER" >/dev/null 2>&1; then
  run_sh "adduser --disabled-password --gecos '' $DEPLOY_USER"
  run_sh "usermod -aG sudo $DEPLOY_USER"
fi

run_sh "mkdir -p '$TARGET_RELEASE/assets' '$APP_SRC_DIR'"

if [[ ! -f "$TARGET_RELEASE/index.html" ]]; then
  run_sh "cat > '$TARGET_RELEASE/index.html' <<'HTML'
<!doctype html>
<html lang=\"en\">
  <head><meta charset=\"UTF-8\"><title>Provisioning</title></head>
  <body><h1>Provisioning complete</h1><p>Waiting for deploy artifact.</p></body>
</html>
HTML"
fi

run_sh "ln -sfn '$TARGET_RELEASE' '$CURRENT_LINK'"
run_sh "chown -R '$DEPLOY_USER:$DEPLOY_USER' '$WEB_ROOT'"
run_sh "find '$WEB_ROOT' -type d -exec chmod 755 {} \\;"
run_sh "find '$WEB_ROOT' -type f -exec chmod 644 {} \\;"

if [[ "$SERVER" == "caddy" ]]; then
  require_cmd caddy
  run_sh "mkdir -p /etc/caddy/sites-enabled"
  run_sh "touch /etc/caddy/Caddyfile"

  if ! grep -q '^import sites-enabled/\\*$' /etc/caddy/Caddyfile 2>/dev/null; then
    run_sh "printf '\nimport sites-enabled/*\n' >> /etc/caddy/Caddyfile"
  fi

  REDIR_BLOCK=""
  if [[ "$BARE_DOMAIN" != "$WWW_DOMAIN" ]]; then
    REDIR_BLOCK="$BARE_DOMAIN {
  redir https://$WWW_DOMAIN{uri} 301
}"
  fi

  run_sh "cat > '/etc/caddy/sites-enabled/${APP_NAME}.conf' <<CADDY
$WWW_DOMAIN {
  encode zstd gzip
  root * $CURRENT_LINK

  header /assets/* Cache-Control \"public, max-age=31536000, immutable\"

  @spa {
    not file
    path /*
  }
  rewrite @spa /index.html
  file_server
}

$REDIR_BLOCK
CADDY"

  run_sh "caddy fmt --overwrite /etc/caddy/Caddyfile"
  run_sh "caddy validate --config /etc/caddy/Caddyfile"
  run_sh "systemctl reload caddy"
fi

if [[ "$SERVER" == "nginx" ]]; then
  require_cmd nginx
  run_sh "mkdir -p /etc/nginx/sites-available /etc/nginx/sites-enabled"
  run_sh "cat > '/etc/nginx/sites-available/${APP_NAME}.conf' <<'NGINX'
server {
  listen 80;
  server_name $WWW_DOMAIN;
  root $CURRENT_LINK;
  index index.html;

  location / {
    try_files \$uri \$uri/ /index.html;
  }
}
NGINX"
  run_sh "ln -sfn '/etc/nginx/sites-available/${APP_NAME}.conf' '/etc/nginx/sites-enabled/${APP_NAME}.conf'"
  run_sh "nginx -t"
  run_sh "systemctl reload nginx"

  if [[ "$ENABLE_HTTPS" == "true" ]]; then
    require_cmd certbot
    run_sh "certbot --nginx -d '$WWW_DOMAIN'"
  fi
fi

if [[ "$STRATEGY" == "build-on-vps" ]]; then
  require_cmd git
  require_cmd rsync
  require_cmd npm

  if [[ -d "$APP_SRC_DIR/.git" ]]; then
    run_sh "cd '$APP_SRC_DIR' && git fetch --all --prune && git reset --hard origin/main && git clean -fdx"
  else
    run_sh "rm -rf '$APP_SRC_DIR'/* && git clone '$REPO' '$APP_SRC_DIR'"
  fi

  if [[ "$APP_TYPE" == "react" ]]; then
    run_sh "cd '$APP_SRC_DIR' && npm ci --no-audit --no-fund || npm install"
    run_sh "cd '$APP_SRC_DIR' && npm run build"

    if [[ "$DRY_RUN" == "true" ]]; then
      run_sh "rsync -az --delete '$APP_SRC_DIR/dist/' '$TARGET_RELEASE/'"
      run_sh "echo 'If dist does not exist, use build instead.'"
    elif [[ -d "$APP_SRC_DIR/dist" ]]; then
      run_sh "rsync -az --delete '$APP_SRC_DIR/dist/' '$TARGET_RELEASE/'"
    elif [[ -d "$APP_SRC_DIR/build" ]]; then
      run_sh "rsync -az --delete '$APP_SRC_DIR/build/' '$TARGET_RELEASE/'"
    else
      die "React build output not found (expected dist/ or build/)."
    fi
  else
    run_sh "rsync -az --delete --exclude .git --exclude .github --exclude node_modules '$APP_SRC_DIR/' '$TARGET_RELEASE/'"
  fi

  run_sh "ln -sfn '$TARGET_RELEASE' '$CURRENT_LINK'"
  if [[ "$SERVER" == "caddy" ]]; then
    run_sh "systemctl reload caddy"
  else
    run_sh "systemctl reload nginx"
  fi
fi

echo
echo "Sanity checks:"
echo "  cd $WEB_ROOT"
echo "  ls -l current"
echo "  readlink -f current"
echo "  test -f current/index.html"
echo
echo "CI hints for strategy=$STRATEGY:"
if [[ "$STRATEGY" == "ci-artifact" ]]; then
  echo "  - Build in CI"
  echo "  - Rsync artifact to: $TARGET_RELEASE"
  echo "  - Activate with: ln -sfn '$TARGET_RELEASE' '$CURRENT_LINK'"
  echo "  - Reload server: systemctl reload $SERVER"
else
  echo "  - Build executed on VPS under: $APP_SRC_DIR"
  echo "  - Output synced to: $TARGET_RELEASE"
fi
