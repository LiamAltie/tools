#!/bin/bash
# ──────────────────────────────────────────────────────────
# Claude Code チートシート自動更新スクリプト
#
# 毎日 cron で実行。新バージョンがあればチートシートを更新する。
# 流れ:
#   1. 現在の versionInfo.version を取得
#   2. claude --version で最新バージョンを取得
#   3. 差分があれば claude -p で更新処理を実行
#   4. 変更があれば commit & push（自動デプロイ）
# ──────────────────────────────────────────────────────────

set -euo pipefail

REPO_DIR="$HOME/repos/tools"
CHEATSHEET_DIR="$REPO_DIR/apps/claude-code-cheatsheet"
COMMANDS_FILE="$CHEATSHEET_DIR/src/data/commands.ts"
CHANGELOG_FILE="$CHEATSHEET_DIR/src/data/changelog.ts"
LOG_FILE="$HOME/altie/logs/cheatsheet-update.log"

log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" | tee -a "$LOG_FILE"
}

# 1. 現在のバージョンを取得
CURRENT_VERSION=$(grep 'version:' "$COMMANDS_FILE" | head -1 | sed 's/.*"\(.*\)".*/\1/')
log "現在のバージョン: v$CURRENT_VERSION"

# 2. 最新バージョンを取得
LATEST_VERSION=$(claude --version 2>/dev/null | grep -oP '[\d]+\.[\d]+\.[\d]+' | head -1)
if [ -z "$LATEST_VERSION" ]; then
  log "ERROR: claude --version の取得に失敗"
  exit 1
fi
log "最新バージョン: v$LATEST_VERSION"

# 3. 差分チェック
if [ "$CURRENT_VERSION" = "$LATEST_VERSION" ]; then
  log "更新なし。終了。"
  exit 0
fi

log "新バージョン検出！ v$CURRENT_VERSION → v$LATEST_VERSION"

# 4. Claude Code で更新処理を実行
cd "$REPO_DIR"

claude -p --max-turns 30 "$(cat <<PROMPT
Claude Code チートシートの自動更新タスク。

## 状況
- 現在のチートシート: v${CURRENT_VERSION}
- 最新の Claude Code: v${LATEST_VERSION}

## やること（順番に）

### Step 1: チェンジログの取得
WebFetch で https://code.claude.com/docs/en/changelog を取得し、
v${CURRENT_VERSION} 以降 v${LATEST_VERSION} までの全変更内容を確認する。

### Step 2: commands.ts の更新
ファイル: ${COMMANDS_FILE}

1. \`versionInfo.version\` を "${LATEST_VERSION}" に更新
2. \`versionInfo.date\` を今日の日付（YYYY-MM-DD）に更新
3. チェンジログから新しいコマンド・ショートカット・フラグ・環境変数・hookイベントを特定
4. 該当するカテゴリに追加（\`addedIn: "${LATEST_VERSION}"\` を付ける）
5. 既存のデータは絶対に変更・削除しない

### Step 3: changelog.ts の更新
ファイル: ${CHANGELOG_FILE}

1. v${CURRENT_VERSION} 以降の各バージョンのエントリを日本語に翻訳して追加
2. 配列の先頭に新しいバージョンを追加（降順）
3. 既存エントリはそのまま維持

### Step 4: newSinceVersion の調整
\`versionInfo.newSinceVersion\` を「2週間前のバージョン」に更新。
チェンジログの日付を見て、今日から14日前以降で最も古いバージョンを設定する。

## 重要なルール
- 日本語で記述すること
- 既存のデータ構造（interface, group, カテゴリ構成）は変更しない
- 新しいカテゴリは作らない。既存カテゴリに追加する
- ビルドが通ることを確認する（npx next build を実行）
- 変更がない場合（新コマンドが0件）でも versionInfo は更新する

更新を開始してください。
PROMPT
)" 2>&1 | tee -a "$LOG_FILE"

# 5. 変更があれば commit & push
cd "$REPO_DIR"
if git diff --quiet && git diff --cached --quiet; then
  log "ファイルに変更なし（versionInfoのみ更新の可能性）"
fi

if ! git diff --quiet || ! git diff --cached --quiet; then
  git add "$COMMANDS_FILE" "$CHANGELOG_FILE"
  git commit -m "$(cat <<EOF
update: Claude Code v${LATEST_VERSION} 対応

チートシート・チェンジログを自動更新

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
  )"
  git push origin main
  log "commit & push 完了。Vercel 自動デプロイへ。"

  # Telegram 通知（~/shared/alerts/ 経由）
  ALERT_FILE="$HOME/shared/alerts/cheatsheet-$(date +%Y%m%d-%H%M%S).json"
  cat > "$ALERT_FILE" <<ALERT
{
  "source": "cheatsheet-update",
  "version_from": "${CURRENT_VERSION}",
  "version_to": "${LATEST_VERSION}",
  "status": "updated",
  "message": "Claude Code チートシートを v${CURRENT_VERSION} → v${LATEST_VERSION} に自動更新してデプロイしたよ。"
}
ALERT
  log "Telegram 通知送信。"
else
  log "変更なし。commit スキップ。"
fi

log "更新処理完了。"
