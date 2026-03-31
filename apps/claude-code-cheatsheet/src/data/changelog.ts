export interface ChangelogEntry {
  version: string;
  date: string;
  changes: string[];
}

export const changelog: ChangelogEntry[] = [
  {
    version: "2.1.88",
    date: "2026-03-30",
    changes: [
      "環境変数 `CLAUDE_CODE_NO_FLICKER=1` 追加 — alt-screenのちらつきを防止するレンダリング",
      "`PermissionDenied` hook 追加 — autoモード分類器による拒否後に発火",
      "サブエージェントの名前付き `@` メンションがタイプアヘッドに対応",
    ],
  },
  {
    version: "2.1.87",
    date: "2026-03-29",
    changes: [
      "バグ修正: Cowork Dispatchのメッセージ処理",
    ],
  },
  {
    version: "2.1.86",
    date: "2026-03-27",
    changes: [
      "APIリクエストに `X-Claude-Code-Session-Id` ヘッダーを追加",
      "VCS除外リストに `.jj`（Jujutsu）と `.sl`（Sapling）を追加",
    ],
  },
  {
    version: "2.1.85",
    date: "2026-03-26",
    changes: [
      "環境変数 `CLAUDE_CODE_MCP_SERVER_NAME` / `CLAUDE_CODE_MCP_SERVER_URL` 追加",
      "Hooksに条件分岐 `if` フィールド追加（permission ruleの構文を使用）",
      "スケジュールタスクのトランスクリプトにタイムスタンプマーカー追加",
      "ディープリンクのクエリが最大5,000文字に対応（スクロール警告付き）",
      "PreToolUse hookで `updatedInput` パラメータが `AskUserQuestion` に対応",
      "環境変数 `OTEL_LOG_TOOL_DETAILS=1` 追加",
    ],
  },
  {
    version: "2.1.84",
    date: "2026-03-26",
    changes: [
      "**PowerShellツール** 追加（Windows向け、オプトインプレビュー）",
      "環境変数 `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL_SUPPORTS` 追加",
      "環境変数 `ANTHROPIC_DEFAULT_*_MODEL_NAME/DESCRIPTION` 追加",
      "環境変数 `CLAUDE_STREAM_IDLE_TIMEOUT_MS` 追加（デフォルト90秒）",
      "`TaskCreated` hook イベント追加",
      "`WorktreeCreate` hookが `type: \"http\"` に対応",
      "管理設定 `allowedChannelPlugins` 追加",
      "APIリクエストに `x-client-request-id` ヘッダー追加",
      "`/voice` Push-to-Talk の改善",
    ],
  },
  {
    version: "2.1.83",
    date: "2026-03-25",
    changes: [
      "`managed-settings.d/` ドロップインディレクトリでポリシーフラグメントに対応",
      "`CwdChanged` / `FileChanged` hook イベント追加",
      "設定 `sandbox.failIfUnavailable` 追加",
      "設定 `disableDeepLinkRegistration` 追加",
      "環境変数 `CLAUDE_CODE_SUBPROCESS_ENV_SCRUB=1` 追加",
      "**トランスクリプト検索** — `Ctrl+O` でトランスクリプトモード、`/` で検索",
      "`Ctrl+X Ctrl+E` で外部エディタを起動するエイリアス追加",
      "貼り付けた画像がカーソル位置に `[Image #N]` チップとして挿入",
      "エージェントフロントマターに `initialPrompt` 追加（自動送信用）",
    ],
  },
  {
    version: "2.1.81",
    date: "2026-03-20",
    changes: [
      "`--bare` フラグ追加 — スクリプト用の `-p` 実行時にhooks, LSP, プラグインをスキップ",
      "`--channels` 権限リレー（リサーチプレビュー）",
    ],
  },
  {
    version: "2.1.80",
    date: "2026-03-19",
    changes: [
      "ステータスラインスクリプトに `rate_limits` フィールド追加",
      "プラグインマーケットプレイスソースに `source: 'settings'` 追加",
      "CLI ツール使用検出によるプラグインTips表示",
      "skills/スラッシュコマンドのフロントマターに `effort` 追加",
      "`--channels` リサーチプレビュー",
    ],
  },
  {
    version: "2.1.79",
    date: "2026-03-18",
    changes: [
      "`claude auth login` に `--console` フラグ追加（Anthropic Console用）",
      "`/config` メニューに「ターン時間を表示」トグル追加",
      "VSCode: `/remote-control` コマンド追加",
      "VSCode: AI生成セッションタイトル",
    ],
  },
  {
    version: "2.1.78",
    date: "2026-03-17",
    changes: [
      "`StopFailure` hook イベント追加",
      "プラグイン永続状態用の `${CLAUDE_PLUGIN_DATA}` 変数追加",
      "エージェントフロントマターに `effort`, `maxTurns`, `disallowedTools` 追加",
      "**レスポンスの行単位ストリーミング** — 生成されたテキストが行ごとにリアルタイム表示",
    ],
  },
  {
    version: "2.1.77",
    date: "2026-03-17",
    changes: [
      "デフォルト出力トークン上限を拡大（Opus 4.6: 64k）",
      "サンドボックスファイルシステム設定に `allowRead` 追加",
      "`/copy N` でオプションのインデックスパラメータ対応",
      "`/effort` コマンドの改善",
    ],
  },
  {
    version: "2.1.76",
    date: "2026-03-14",
    changes: [
      "**MCP elicitation対応** — タスク実行中の構造化入力に対応",
      "`Elicitation` / `ElicitationResult` hook 追加",
      "`-n / --name` CLIフラグ追加 — セッション表示名を指定",
      "設定 `worktree.sparsePaths` 追加 — モノレポでのスパースチェックアウト",
      "`PostCompact` hook 追加",
      "**`/effort` スラッシュコマンド追加** — モデルのeffortレベルを設定",
      "セッション品質サーベイ（`feedbackSurveyRate` 設定）",
    ],
  },
  {
    version: "2.1.75",
    date: "2026-03-13",
    changes: [
      "Opus 4.6で1Mコンテキストウィンドウ対応（Max, Team, Enterprise）",
      "**`/color` コマンド追加** — プロンプトバーの色を変更",
      "`/rename` でプロンプトバーにセッション名を表示",
      "メモリファイルに最終更新タイムスタンプ追加",
      "権限プロンプトにhookソースを表示",
    ],
  },
  {
    version: "2.1.74",
    date: "2026-03-12",
    changes: [
      "**`/context` コマンド追加** — コンテキスト改善のアクション提案",
      "設定 `autoMemoryDirectory` 追加 — カスタムメモリ保存先",
    ],
  },
  {
    version: "2.1.73",
    date: "2026-03-11",
    changes: [
      "設定 `modelOverrides` 追加 — カスタムプロバイダのモデルIDを指定",
    ],
  },
  {
    version: "2.1.72",
    date: "2026-03-10",
    changes: [
      "`/copy` で `w` キーを押すと選択内容をファイルに書き出し",
      "`/plan` にオプションの説明引数追加",
      "`ExitWorktree` ツール追加",
      "環境変数 `CLAUDE_CODE_DISABLE_CRON` 追加",
      "effortレベルを簡素化（low/medium/high）",
      "`/effort auto` でデフォルトにリセット",
    ],
  },
  {
    version: "2.1.71",
    date: "2026-03-07",
    changes: [
      "**`/loop` コマンド追加** — 定期実行ループ（例: `/loop 5m check deploy`）",
      "**cronスケジューリングツール** — 定期的なプロンプト実行",
      "`voice:pushToTalk` キーバインドでリバインド可能な音声入力",
      "音声STTが10言語追加対応（計20言語）",
      "ターミナルタイトルにエージェント名を表示",
      "設定 `sandbox.enableWeakerNetworkIsolation`（macOS）",
      "設定 `includeGitInstructions` / 環境変数 `CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS`",
      "**`/reload-plugins` コマンド追加**",
      "変数 `${CLAUDE_SKILL_DIR}` 追加",
      "`InstructionsLoaded` hook イベント追加",
      "hookイベントに `agent_id`, `agent_type`, `worktree` フィールド追加",
      "管理設定 `pluginTrustMessage` 追加",
      "`strictKnownMarketplaces` に `pathPattern` 追加",
      "プラグインソースに `git-subdir` タイプ追加",
      "MCPサーバーの `oauth.authServerMetadataUrl` 対応",
    ],
  },
  {
    version: "2.1.70",
    date: "2026-03-06",
    changes: [
      "**`/claude-api` スキル追加** — Claude APIでの開発支援",
      "環境変数 `ANTHROPIC_CUSTOM_MODEL_OPTION` 追加 — カスタムモデルピッカー項目",
      "`/rename` コマンドの改善",
      "`/color` リセットオプション追加",
    ],
  },
  {
    version: "2.1.69",
    date: "2026-03-05",
    changes: [
      "空のbashプロンプト（`!`）で `Ctrl+U` でbashモードを終了",
      "`/remote-control` にオプションの名前引数追加",
      "音声STTが10言語追加対応",
      "effortレベルをロゴ/スピナーに表示",
    ],
  },
  {
    version: "2.1.68",
    date: "2026-03-04",
    changes: [
      "Opus 4.6のデフォルトeffortがmediumに変更",
      "**\"ultrathink\" キーワード復活** — 高effortモードを指定",
      "ファーストパーティAPIからOpus 4/4.1を削除",
    ],
  },
  {
    version: "2.1.63",
    date: "2026-02-28",
    changes: [
      "**`/simplify` / `/batch` スラッシュコマンド追加**",
      "ローカルスラッシュコマンドの出力をシステムメッセージとして表示",
      "プロジェクト設定とautoメモリがgit worktree間で共有",
      "環境変数 `ENABLE_CLAUDEAI_MCP_SERVERS=false` 追加",
      "**HTTP hooks** — URLにPOST JSONする hookタイプ追加",
      "トランスクリプト検索 — `Ctrl+O` のトランスクリプトモードで `/` 検索",
    ],
  },
  {
    version: "2.1.59",
    date: "2026-02-26",
    changes: [
      "**autoメモリ機能** — 有用なコンテキストを自動保存",
      "**`/memory` コマンド追加** — autoメモリの管理",
      "**`/copy` コマンド追加** — コードブロックのインタラクティブ選択コピー",
    ],
  },
  {
    version: "2.1.51",
    date: "2026-02-24",
    changes: [
      "`claude remote-control` サブコマンド追加",
      "環境変数 `CLAUDE_CODE_PLUGIN_GIT_TIMEOUT_MS` 追加",
      "プラグインインストール用のカスタムnpmレジストリ対応",
      "環境変数 `CLAUDE_CODE_ACCOUNT_UUID`, `CLAUDE_CODE_USER_EMAIL`, `CLAUDE_CODE_ORGANIZATION_UUID` 追加",
      "macOS plist / Windows RegistryによるManaged Settings対応",
    ],
  },
  {
    version: "2.1.50",
    date: "2026-02-20",
    changes: [
      "LSPサーバーに `startupTimeout` 設定追加",
      "`WorktreeCreate` / `WorktreeRemove` hook イベント追加",
      "`CLAUDE_CODE_SIMPLE` モードの改善",
      "環境変数 `CLAUDE_CODE_DISABLE_1M_CONTEXT` 追加",
      "**`claude agents` CLIコマンド追加** — エージェント一覧表示",
      "Stop/SubagentStop hookに `last_assistant_message` フィールド追加",
      "`/branch` コマンド追加（`/fork` のエイリアス）",
      "VSCode: `/extra-usage` コマンド追加",
    ],
  },
  {
    version: "2.1.49",
    date: "2026-02-19",
    changes: [
      "MCP OAuthのステップアップ認証対応",
      "**`--worktree / -w` フラグ追加** — 隔離されたgit worktreeで実行",
      "サブエージェントに `isolation: \"worktree\"` オプション追加",
      "**`Ctrl+F` キーバインド追加** — バックグラウンドエージェントの停止",
      "エージェント定義に `background: true` 追加",
      "プラグインが `settings.json` を同梱可能に",
      "`ConfigChange` hook イベント追加",
      "SDKモデル情報に `supportsEffort`, `supportedEffortLevels`, `supportsAdaptiveThinking` 追加",
    ],
  },
  {
    version: "2.1.46",
    date: "2026-02-18",
    changes: [
      "claude.aiのMCPコネクターをClaude Codeでサポート",
    ],
  },
  {
    version: "2.1.45",
    date: "2026-02-17",
    changes: [
      "**Claude Sonnet 4.6 対応**",
      "`--add-dir` に `enabledPlugins`, `extraKnownMarketplaces` 追加",
      "設定 `spinnerTipsOverride` 追加",
      "SDK型 `SDKRateLimitInfo`, `SDKRateLimitEvent` 追加",
      "**`/effort` コマンド追加** — モデルeffortレベルの設定",
    ],
  },
];
