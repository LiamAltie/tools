export interface Command {
  keys?: { mac: string; win: string };
  command?: string;
  description: string;
  detail?: string;
  docUrl?: string;
  addedIn?: string;
}

export interface Category {
  id: string;
  title: string;
  icon: string;
  group?: string;
  docUrl?: string;
  commands: Command[];
}

export interface CategoryGroup {
  id: string;
  title: string;
  icon: string;
  categoryIds: string[];
  /**
   * このグループ内のコマンドにCopyボタンを表示するか。
   * true: ターミナルや設定ファイルに貼り付けて使うもの（コマンド、フラグ、環境変数など）
   * false: ショートカットキーや概念的な説明など、コピーしても意味がないもの
   */
  copyable: boolean;
}

export const groups: CategoryGroup[] = [
  { id: "keyboard", title: "キーボードショートカット", icon: "⌨", categoryIds: ["keys-global", "keys-chat", "keys-misc", "keys-transcript", "vim"], copyable: false },
  { id: "slash", title: "スラッシュコマンド", icon: "/", categoryIds: ["slash-session", "slash-config", "slash-tools", "slash-special", "slash-skills"], copyable: true },
  { id: "cli", title: "CLI", icon: ">_", categoryIds: ["cli-commands", "cli-flags"], copyable: true },
  { id: "config", title: "設定・環境変数", icon: "⚙", categoryIds: ["env", "settings"], copyable: true },
  { id: "hooks-group", title: "Hooks", icon: "🪝", categoryIds: ["hooks", "hook-types"], copyable: true },
  { id: "tools-mcp", title: "ツール・MCP", icon: "🔧", categoryIds: ["tools", "mcp"], copyable: false },
  { id: "agents", title: "Agents & Skills", icon: "🤖", categoryIds: ["agents-skills"], copyable: true },
];

export const versionInfo = {
  version: "2.1.88",
  date: "2026-03-30",
  docsUrl: "https://code.claude.com/docs/en/changelog",
  /** この バージョン以降に追加されたものを NEW 表示 */
  newSinceVersion: "2.1.78",
};

/** addedIn のバージョンが newSinceVersion 以降かどうかを判定 */
export function isNewCommand(addedIn?: string): boolean {
  if (!addedIn) return false;
  const parse = (v: string) => v.split(".").map(Number);
  const [ma, mi, pa] = parse(addedIn);
  const [ta, ti, tp] = parse(versionInfo.newSinceVersion);
  if (ma !== ta) return ma > ta;
  if (mi !== ti) return mi > ti;
  return pa >= tp;
}

export const categories: Category[] = [
  // ─────────────────────────────────────────────
  // 1. キーボードショートカット — グローバル
  // ─────────────────────────────────────────────
  {
    id: "keys-global",
    title: "グローバル",
    icon: "⌨",
    group: "keyboard",
    docUrl: "https://code.claude.com/docs/en/keybindings",
    commands: [
      {
        keys: { mac: "⌃C", win: "Ctrl+C" },
        description: "現在の応答をキャンセル",
        detail: "生成中のレスポンスを即座に停止する",
      },
      {
        keys: { mac: "⌃D", win: "Ctrl+D" },
        description: "Claude Codeを終了",
        detail: "セッションを終了してシェルに戻る",
      },
      {
        keys: { mac: "⌃T", win: "Ctrl+T" },
        description: "ToDoリストの表示/非表示を切り替え",
        addedIn: "2.1.84",
      },
      {
        keys: { mac: "⌃O", win: "Ctrl+O" },
        description: "トランスクリプト（会話履歴）を表示",
        detail: "会話の全履歴を閲覧。⌃E で全表示切替、/ で検索",
        addedIn: "2.1.63",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 2. ショートカット — チャット入力
  // ─────────────────────────────────────────────
  {
    id: "keys-chat",
    title: "チャット入力",
    icon: "💬",
    group: "keyboard",
    docUrl: "https://code.claude.com/docs/en/keybindings",
    commands: [
      {
        keys: { mac: "Esc", win: "Esc" },
        description: "応答のキャンセル / 入力クリア / ターン取り消し",
        detail:
          "生成中→停止、入力中→クリア、空入力→直前のユーザーメッセージを取り消し",
      },
      {
        keys: { mac: "⇧Tab", win: "Shift+Tab" },
        description: "権限モードを順に切り替え",
        detail: "default → plan → bypassPermissions をサイクル",
      },
      {
        keys: { mac: "⌘P / ⌥P", win: "Alt P" },
        description: "モデルピッカーを開く",
        detail: "使用モデルをインタラクティブに切り替え",
      },
      {
        keys: { mac: "⌥O", win: "Alt O" },
        description: "Fastモードの切り替え",
        detail: "同じモデルで高速出力モードをトグル",
        docUrl: "https://code.claude.com/docs/en/fast-mode",
      },
      {
        keys: { mac: "⌥T", win: "Alt T" },
        description: "Thinkingの表示/非表示を切り替え",
      },
      {
        keys: { mac: "⌃G / ⌃X ⌃E", win: "Ctrl+G / Ctrl+X Ctrl+E" },
        description: "外部エディタで編集",
        detail: "$EDITOR でプロンプトを編集。長文入力や複雑な指示に便利",
        addedIn: "2.1.83",
      },
      {
        keys: { mac: "⌃S", win: "Ctrl+S" },
        description: "プロンプトを一時退避（stash）",
        detail: "入力中のテキストを保存して別の操作をしてから復元",
        addedIn: "2.1.85",
      },
      {
        keys: { mac: "⌃V / ⌥V", win: "Ctrl+V / Alt+V" },
        description: "画像を貼り付け",
        detail: "クリップボードの画像をプロンプトに添付",
      },
      {
        keys: { mac: "⌃B", win: "Ctrl+B" },
        description: "バックグラウンドタスクとして送信",
        detail: "現在のプロンプトをバックグラウンドで実行",
        addedIn: "2.1.84",
      },
      {
        keys: { mac: "⌃X ⌃K", win: "Ctrl+X Ctrl+K" },
        description: "バックグラウンドエージェントを全停止",
        addedIn: "2.1.49",
      },
      {
        keys: { mac: "Tab", win: "Tab" },
        description: "ファイルパスを自動補完",
        detail: "入力中のファイルパスやコマンドをタブ補完",
      },
      {
        keys: { mac: "⌥↩ / ⇧↩", win: "Alt+Enter / Shift+Enter" },
        description: "改行を挿入（送信せずに改行）",
        detail: "Shift+Enterは /terminal-setup で設定後に利用可能",
      },
      {
        keys: { mac: "⌘K", win: "Ctrl+L" },
        description: "画面をクリア（履歴は保持）",
        detail: "表示だけクリアし、会話コンテキストはそのまま",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 3. ショートカット — 入力プレフィックス・履歴・その他
  // ─────────────────────────────────────────────
  {
    id: "keys-misc",
    title: "履歴・プレフィックス・その他",
    icon: "🔤",
    group: "keyboard",
    docUrl: "https://code.claude.com/docs/en/keybindings",
    commands: [
      {
        command: "/ (先頭)",
        description: "スラッシュコマンドを入力",
        detail: "入力の先頭に / を置くとコマンドモードになる",
      },
      {
        command: "! (先頭)",
        description: "Bashコマンドを直接実行",
        detail: "例: !ls -la でシェルコマンドを即実行",
      },
      {
        command: "@ (入力中)",
        description: "ファイルメンション",
        detail: "@src/index.ts のようにファイル内容をコンテキストに追加",
      },
      {
        keys: { mac: "⌃R", win: "Ctrl+R" },
        description: "履歴を検索",
        detail: "過去のプロンプトをインクリメンタル検索",
      },
      {
        keys: { mac: "↑ / ↓", win: "Up / Down" },
        description: "入力履歴をナビゲート",
        detail: "入力欄が空のときに↑↓で過去のメッセージを呼び戻す",
      },
      {
        keys: { mac: "Space（音声モード中）", win: "Space（音声モード中）" },
        description: "Push-to-Talk（押している間だけ録音）",
        detail: "/voice 起動後にスペースキーで音声入力",
        addedIn: "2.1.84",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 4. ショートカット — トランスクリプト・確認画面
  // ─────────────────────────────────────────────
  {
    id: "keys-transcript",
    title: "トランスクリプト・確認",
    icon: "📜",
    group: "keyboard",
    docUrl: "https://code.claude.com/docs/en/keybindings",
    commands: [
      {
        keys: { mac: "⌃E", win: "Ctrl+E" },
        description: "トランスクリプトの全表示/要約表示を切り替え",
        detail: "ツール呼び出しの詳細を展開/折りたたみ",
      },
      {
        keys: { mac: "⌃C / Esc", win: "Ctrl+C / Esc" },
        description: "トランスクリプトを閉じる",
      },
      {
        keys: { mac: "y", win: "y" },
        description: "確認画面で「はい」を選択",
        detail: "ツール実行の権限確認ダイアログで承認",
      },
      {
        keys: { mac: "n", win: "n" },
        description: "確認画面で「いいえ」を選択",
      },
      {
        keys: { mac: "a", win: "a" },
        description: "確認画面で「常に許可」を選択",
        detail: "このセッション中は同じツールの確認をスキップ",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 5. Vimモード
  // ─────────────────────────────────────────────
  {
    id: "vim",
    title: "Vimモード",
    icon: "Vi",
    group: "keyboard",
    docUrl: "https://code.claude.com/docs/en/keybindings",
    commands: [
      {
        command: "/vim",
        description: "Vimモードの有効化/無効化",
        detail: "入力欄でVimキーバインドを使用できるようになる",
      },
      {
        keys: { mac: "Esc / ⌃[", win: "Esc / Ctrl+[" },
        description: "ノーマルモードへ",
      },
      {
        keys: { mac: "i", win: "i" },
        description: "カーソル位置でインサートモード",
      },
      {
        keys: { mac: "a", win: "a" },
        description: "カーソルの後ろでインサートモード",
      },
      {
        keys: { mac: "A", win: "A" },
        description: "行末でインサートモード",
      },
      {
        keys: { mac: "o", win: "o" },
        description: "下に行を追加してインサートモード",
      },
      {
        keys: { mac: "v", win: "v" },
        description: "ビジュアル（選択）モード",
      },
      {
        keys: { mac: "dd", win: "dd" },
        description: "行を削除",
      },
      {
        keys: { mac: "yy", win: "yy" },
        description: "行をコピー（yank）",
      },
      {
        keys: { mac: "p", win: "p" },
        description: "貼り付け（put）",
      },
      {
        keys: { mac: "u", win: "u" },
        description: "アンドゥ",
      },
      {
        keys: { mac: "w / b", win: "w / b" },
        description: "単語単位で移動（次/前）",
      },
      {
        keys: { mac: "0 / $", win: "0 / $" },
        description: "行頭/行末に移動",
      },
      {
        keys: { mac: "gg / G", win: "gg / G" },
        description: "先頭/末尾に移動",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 6. スラッシュコマンド — セッション管理
  // ─────────────────────────────────────────────
  {
    id: "slash-session",
    title: "セッション管理",
    icon: "/",
    group: "slash",
    docUrl: "https://code.claude.com/docs/en/commands",
    commands: [
      {
        command: "/clear",
        description: "会話履歴を完全にクリア",
        detail: "新しいセッションとして最初からやり直す",
      },
      {
        command: "/compact",
        description: "会話履歴を圧縮",
        detail:
          "コンテキストウィンドウの使用量を削減。カスタム要約プロンプトも指定可能",
        docUrl: "https://code.claude.com/docs/en/context-window",
      },
      {
        command: "/resume",
        description: "過去のセッションを再開",
        detail: "セッション一覧から選んで会話を再開する",
      },
      {
        command: "/branch",
        description: "会話を分岐",
        detail: "現在の会話をフォークして別の方向性を試す",
        addedIn: "2.1.50",
      },
      {
        command: "/rename",
        description: "セッション名を変更",
        detail: "プロンプトバーに表示されるセッション名を設定",
        addedIn: "2.1.75",
      },
      {
        command: "/cost",
        description: "トークン使用量とコストを表示",
        detail: "現在のセッションの入出力トークン数と概算コスト",
      },
      {
        command: "/status",
        description: "アカウント・コンテキストの状態を表示",
        detail: "プラン残量、モデル、コンテキスト使用率など",
      },
      {
        command: "/stats",
        description: "セッション統計を表示",
        detail: "ツール使用回数やターン数などの統計情報",
        addedIn: "2.1.78",
      },
      {
        command: "/exit",
        description: "Claude Codeを終了",
      },
      {
        command: "/copy",
        description: "コードブロックをコピー",
        detail:
          "直前の応答のコードブロックをインタラクティブに選択してコピー。/copy N で指定も可",
        addedIn: "2.1.59",
      },
      {
        command: "/export",
        description: "会話をエクスポート",
        detail: "現在の会話をMarkdownやJSON形式でファイルに保存",
        addedIn: "2.1.78",
      },
      {
        command: "/diff",
        description: "変更差分を表示",
        detail: "セッション中にClaude Codeが行ったファイル変更の差分を表示",
      },
      {
        command: "/rewind",
        description: "会話を巻き戻し",
        detail: "指定したターンまで会話を巻き戻す",
        addedIn: "2.1.78",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 7. スラッシュコマンド — 設定・構成
  // ─────────────────────────────────────────────
  {
    id: "slash-config",
    title: "設定・構成",
    icon: "⚙",
    group: "slash",
    docUrl: "https://code.claude.com/docs/en/commands",
    commands: [
      {
        command: "/config",
        description: "設定を変更",
        detail: "権限モード、テーマ、通知などの設定を対話的に変更",
      },
      {
        command: "/model",
        description: "AIモデルを切り替え",
        detail: "Sonnet, Opus, Haikuなどモデルを変更",
      },
      {
        command: "/fast",
        description: "Fastモードの切り替え",
        detail: "同じモデルで出力速度が速いモード",
        docUrl: "https://code.claude.com/docs/en/fast-mode",
      },
      {
        command: "/effort",
        description: "思考の深さ（effort）を設定",
        detail: "low / medium / high / auto を切り替え",
        addedIn: "2.1.76",
      },
      {
        command: "/permissions",
        description: "権限設定を表示・変更",
        detail: "ツールの許可/拒否ルールを管理",
        docUrl: "https://code.claude.com/docs/en/permissions",
      },
      {
        command: "/memory",
        description: "CLAUDE.mdを編集",
        detail: "プロジェクトのCLAUDE.mdファイルを直接編集",
        docUrl: "https://code.claude.com/docs/en/memory",
      },
      {
        command: "/init",
        description: "CLAUDE.mdを生成",
        detail: "プロジェクトのCLAUDE.mdファイルを対話的に作成",
        docUrl: "https://code.claude.com/docs/en/memory",
      },
      {
        command: "/context",
        description: "コンテキスト改善の提案",
        detail: "現在の会話コンテキストを分析し、改善アクションを提案",
        addedIn: "2.1.74",
      },
      {
        command: "/color",
        description: "プロンプトバーの色を変更",
        detail: "セッションごとに色を設定して視覚的に区別",
        addedIn: "2.1.75",
      },
      {
        command: "/theme",
        description: "テーマを変更",
        detail: "dark / light / auto を切り替え",
      },
      {
        command: "/statusline",
        description: "ステータスラインの表示設定",
        detail: "プロンプトバーに表示する情報をカスタマイズ",
        addedIn: "2.1.85",
      },
      {
        command: "/vim",
        description: "Vimモードの切り替え",
        docUrl: "https://code.claude.com/docs/en/keybindings",
      },
      {
        command: "/terminal-setup",
        description: "ターミナルの設定",
        detail: "Shift+Enterの改行設定など",
      },
      {
        command: "/keybindings",
        description: "キーバインド設定ファイルを開く",
        detail: "~/.claude/keybindings.json を編集",
        docUrl: "https://code.claude.com/docs/en/keybindings",
        addedIn: "2.1.85",
      },
      {
        command: "/privacy-settings",
        description: "プライバシー設定を開く",
        detail: "テレメトリやデータ共有の設定",
      },
      {
        command: "/login",
        description: "Anthropicアカウントにログイン",
      },
      {
        command: "/logout",
        description: "現在のアカウントからログアウト",
      },
      {
        command: "/extra-usage",
        description: "追加利用枠を購入",
        detail: "API利用枠の追加購入ページを開く",
        addedIn: "2.1.78",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 8. スラッシュコマンド — ツール・連携
  // ─────────────────────────────────────────────
  {
    id: "slash-tools",
    title: "ツール・連携",
    icon: "🔧",
    group: "slash",
    docUrl: "https://code.claude.com/docs/en/commands",
    commands: [
      {
        command: "/mcp",
        description: "MCPサーバーの管理",
        detail: "Model Context Protocolサーバーの設定と管理",
        docUrl: "https://code.claude.com/docs/en/mcp",
      },
      {
        command: "/hooks",
        description: "Hooks設定を管理",
        detail: "PreToolUse, PostToolUse等のhookを設定",
        docUrl: "https://code.claude.com/docs/en/hooks",
      },
      {
        command: "/agents",
        description: "利用可能なエージェント一覧を表示",
        docUrl: "https://code.claude.com/docs/en/sub-agents",
        addedIn: "2.1.50",
      },
      {
        command: "/skills",
        description: "利用可能なスキル一覧を表示",
        docUrl: "https://code.claude.com/docs/en/skills",
        addedIn: "2.1.78",
      },
      {
        command: "/plugin",
        description: "プラグインの管理",
        detail: "プラグインのインストール・有効化・無効化",
        addedIn: "2.1.71",
      },
      {
        command: "/reload-plugins",
        description: "プラグインを再読み込み",
        addedIn: "2.1.71",
      },
      {
        command: "/ide",
        description: "IDE連携の設定",
        detail: "VS Code等のIDE連携を設定",
      },
      {
        command: "/install-github-app",
        description: "GitHub Appをインストール",
        detail: "Claude Code GitHub Appをリポジトリにインストール",
      },
      {
        command: "/install-slack-app",
        description: "Slack Appをインストール",
        detail: "Claude Code Slack連携をワークスペースにインストール",
        addedIn: "2.1.85",
      },
      {
        command: "/chrome",
        description: "Chrome拡張機能の設定",
        detail: "ブラウザ操作ツールの設定",
        addedIn: "2.1.78",
      },
      {
        command: "/desktop",
        description: "デスクトップ操作ツールの設定",
        addedIn: "2.1.78",
      },
      {
        command: "/remote-control",
        description: "リモートコントロールサーバーを起動",
        detail: "外部アプリからClaude Codeを操作可能にする",
        addedIn: "2.1.78",
      },
      {
        command: "/remote-env",
        description: "リモート環境の設定",
        detail: "リモートサーバーでの実行環境を設定",
        addedIn: "2.1.85",
      },
      {
        command: "/sandbox",
        description: "サンドボックスモードの設定",
        detail: "隔離された環境でコードを実行",
        addedIn: "2.1.85",
      },
      {
        command: "/voice",
        description: "音声入力（Push-to-Talk）",
        detail: "音声でプロンプトを入力。20言語対応",
        addedIn: "2.1.84",
        docUrl: "https://code.claude.com/docs/en/voice-dictation",
      },
      {
        command: "/mobile",
        description: "モバイルからの接続設定",
        detail: "スマートフォンからClaude Codeに接続",
        addedIn: "2.1.85",
      },
      {
        command: "/stickers",
        description: "ステッカーの設定",
        addedIn: "2.1.88",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 9. スラッシュコマンド — 特殊・情報
  // ─────────────────────────────────────────────
  {
    id: "slash-special",
    title: "情報・特殊",
    icon: "ℹ",
    group: "slash",
    docUrl: "https://code.claude.com/docs/en/commands",
    commands: [
      {
        command: "/help",
        description: "ヘルプを表示",
      },
      {
        command: "/doctor",
        description: "環境の診断",
        detail: "インストール状態や設定の問題を検出",
      },
      {
        command: "/usage",
        description: "プラン使用量を表示",
        detail: "現在のプランの残り利用枠を確認",
      },
      {
        command: "/review",
        description: "コードレビューを実行",
        detail: "現在の変更に対してコードレビューを実行",
      },
      {
        command: "/security-review",
        description: "セキュリティレビューを実行",
        detail: "コードのセキュリティ上の問題を分析",
        addedIn: "2.1.85",
      },
      {
        command: "/pr-comments",
        description: "PRコメントを確認",
        detail: "GitHub PRのレビューコメントを取得して対応",
        addedIn: "2.1.78",
      },
      {
        command: "/plan",
        description: "プランモードに切り替え",
        detail: "実装前に計画を立てるモード。ファイル変更なしで方針を議論",
        docUrl: "https://code.claude.com/docs/en/plan-mode",
      },
      {
        command: "/feedback",
        description: "フィードバックを送信",
        detail: "Anthropicにフィードバックを送信",
      },
      {
        command: "/release-notes",
        description: "リリースノートを表示",
        detail: "最新バージョンの変更点を確認",
        addedIn: "2.1.78",
      },
      {
        command: "/upgrade",
        description: "Claude Codeを最新版に更新",
      },
      {
        command: "/passes",
        description: "マルチパスの設定",
        detail: "複数パスでの処理を有効化",
        addedIn: "2.1.85",
      },
      {
        command: "/insights",
        description: "コードベースのインサイトを表示",
        detail: "プロジェクトの構造やパターンに関する分析",
        addedIn: "2.1.85",
      },
      {
        command: "/add-dir",
        description: "作業ディレクトリを追加",
        detail: "複数ディレクトリをコンテキストに追加",
      },
      {
        command: "/btw",
        description: "会話を中断せずに補足を送信",
        detail: "Claudeの作業を中断せずにサイドメッセージを送る",
        addedIn: "2.1.78",
      },
      {
        command: "/tasks",
        description: "バックグラウンドタスクの管理",
        detail: "実行中のタスク一覧と状態を確認",
        addedIn: "2.1.84",
      },
      {
        command: "/schedule",
        description: "スケジュール実行の管理",
        detail: "cron形式でリモートエージェントの定期実行を設定",
        addedIn: "2.1.85",
        docUrl: "https://code.claude.com/docs/en/scheduled-tasks",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 10. スラッシュコマンド — バンドルスキル
  // ─────────────────────────────────────────────
  {
    id: "slash-skills",
    title: "バンドルスキル",
    icon: "✦",
    group: "slash",
    docUrl: "https://code.claude.com/docs/en/skills",
    commands: [
      {
        command: "/simplify",
        description: "コードを簡素化",
        detail: "変更されたコードの再利用性・品質・効率を分析し改善",
        addedIn: "2.1.63",
      },
      {
        command: "/batch",
        description: "バッチ処理モード",
        detail: "複数ファイルやタスクをまとめて処理",
        addedIn: "2.1.63",
      },
      {
        command: "/debug",
        description: "デバッグモード",
        detail: "エラーや問題の原因を段階的に調査",
        addedIn: "2.1.78",
      },
      {
        command: "/loop",
        description: "定期実行ループ",
        detail: "例: /loop 5m check deploy — 指定間隔でプロンプトを繰り返す",
        addedIn: "2.1.71",
        docUrl: "https://code.claude.com/docs/en/scheduled-tasks",
      },
      {
        command: "/claude-api",
        description: "Claude APIでアプリを構築",
        detail:
          "Anthropic SDK / Agent SDKを使ったアプリ開発を支援するスキル",
        addedIn: "2.1.78",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 11. CLIコマンド・起動オプション
  // ─────────────────────────────────────────────
  {
    id: "cli-commands",
    title: "コマンド",
    icon: ">_",
    group: "cli",
    docUrl: "https://code.claude.com/docs/en/cli-reference",
    commands: [
      {
        command: "claude",
        description: "対話モードで起動",
      },
      {
        command: 'claude "プロンプト"',
        description: "初期プロンプト付きで対話モードを起動",
      },
      {
        command: "claude -p 'プロンプト'",
        description: "非対話（ワンショット）モード",
        detail: "結果を出力して終了。スクリプトやパイプラインに最適",
      },
      {
        command: "cat file | claude -p '要約して'",
        description: "パイプで入力を渡す",
        detail: "stdinからの入力をプロンプトと組み合わせて処理",
      },
      {
        command: "claude -c",
        description: "直前の会話を再開",
        detail: "前回のセッションのコンテキストを引き継ぐ",
      },
      {
        command: "claude -r 'セッションID'",
        description: "指定セッションを再開",
      },
      {
        command: "claude update",
        description: "Claude Codeを最新版に更新",
      },
      {
        command: "claude auth login",
        description: "認証ログイン",
      },
      {
        command: "claude auth logout",
        description: "認証ログアウト",
      },
      {
        command: "claude auth status",
        description: "認証状態を確認",
      },
      {
        command: "claude agents",
        description: "利用可能なエージェント一覧を表示",
        docUrl: "https://code.claude.com/docs/en/sub-agents",
        addedIn: "2.1.50",
      },
      {
        command: "claude auto-mode defaults",
        description: "auto mode分類器のデフォルト設定",
        detail: "自動権限モードのツール別デフォルト動作を設定",
      },
      {
        command: "claude mcp serve",
        description: "Claude CodeをMCPサーバーとして起動",
        detail: "他のツールからClaude Codeを利用可能にする",
        docUrl: "https://code.claude.com/docs/en/mcp",
      },
      {
        command: "claude mcp add <name> <command>",
        description: "MCPサーバーを追加",
        docUrl: "https://code.claude.com/docs/en/mcp",
      },
      {
        command: "claude mcp remove <name>",
        description: "MCPサーバーを削除",
      },
      {
        command: "claude mcp list",
        description: "MCPサーバー一覧を表示",
      },
      {
        command: "claude plugin add <name>",
        description: "プラグインを追加",
        addedIn: "2.1.71",
      },
      {
        command: "claude remote-control start",
        description: "リモートコントロールサーバーを起動",
        addedIn: "2.1.78",
      },
      {
        command: "claude config set <key> <value>",
        description: "設定値を変更",
        detail: "例: claude config set theme dark",
      },
      {
        command: "claude config get <key>",
        description: "設定値を取得",
      },
      {
        command: "claude config list",
        description: "設定一覧を表示",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 12. CLIフラグ
  // ─────────────────────────────────────────────
  {
    id: "cli-flags",
    title: "フラグ",
    icon: "🚩",
    group: "cli",
    docUrl: "https://code.claude.com/docs/en/cli-reference",
    commands: [
      {
        command: "-p, --print",
        description: "非対話モード（結果を出力して終了）",
      },
      {
        command: "-c, --continue",
        description: "直前の会話を再開",
      },
      {
        command: "-r, --resume <id>",
        description: "指定セッションを再開",
      },
      {
        command: "-n, --name <name>",
        description: "セッション名を指定して起動",
        addedIn: "2.1.76",
      },
      {
        command: "--model <model>",
        description: "使用モデルを指定",
        detail: "claude-sonnet-4-6, claude-opus-4-6 など",
      },
      {
        command: "--fast",
        description: "Fastモードで起動",
        docUrl: "https://code.claude.com/docs/en/fast-mode",
      },
      {
        command: "--permission-mode <mode>",
        description: "権限モードを指定",
        detail: "default, plan, bypassPermissions のいずれか",
        docUrl: "https://code.claude.com/docs/en/permission-modes",
      },
      {
        command: "--allowedTools <tools>",
        description: "許可するツールを限定",
        detail:
          "Bash, Read, Write, Edit, Glob, Grep, Agent, WebFetch, WebSearch 等",
      },
      {
        command: "--disallowedTools <tools>",
        description: "特定ツールを禁止",
      },
      {
        command: "--output-format <format>",
        description: "出力形式を指定",
        detail: "text（デフォルト）, json, stream-json",
      },
      {
        command: "--max-turns <n>",
        description: "最大ターン数を制限",
        detail: "非対話モードでのエージェントループ回数上限",
      },
      {
        command: "--system-prompt <prompt>",
        description: "システムプロンプトを指定",
        detail: "デフォルトのシステムプロンプトを上書き",
      },
      {
        command: "--append-system-prompt <prompt>",
        description: "システムプロンプトに追加",
        detail: "デフォルトに追加する形で指示を付与",
      },
      {
        command: "--input-format <format>",
        description: "入力形式を指定",
        detail: "text（デフォルト）, stream-json",
      },
      {
        command: "-w, --worktree",
        description: "git worktreeで隔離実行",
        detail: "独立した作業ツリーで安全に並列作業",
        addedIn: "2.1.49",
      },
      {
        command: "--bare",
        description: "最小モードで実行",
        detail: "hooks, LSP, プラグインをスキップ。スクリプト用途に最適",
        addedIn: "2.1.81",
      },
      {
        command: "--no-memory",
        description: "CLAUDE.mdを無視して起動",
        detail: "メモリファイルを読み込まずに起動",
      },
      {
        command: "--verbose",
        description: "詳細ログを表示",
        detail: "デバッグ用の詳細な出力を有効化",
      },
      {
        command: "--dangerously-skip-permissions",
        description: "権限チェックをスキップ（危険）",
        detail: "CI/CD環境でのみ使用。対話的な環境では使用禁止",
      },
      {
        command: "--add-dir <path>",
        description: "追加ディレクトリを指定",
        detail: "複数ディレクトリをコンテキストに含める",
      },
      {
        command: "--cwd <path>",
        description: "作業ディレクトリを指定",
      },
      {
        command: "--version",
        description: "バージョンを表示",
      },
      {
        command: "--help",
        description: "ヘルプを表示",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 13. 環境変数
  // ─────────────────────────────────────────────
  {
    id: "env",
    title: "環境変数",
    icon: "$",
    group: "config",
    docUrl: "https://code.claude.com/docs/en/env-vars",
    commands: [
      {
        command: "ANTHROPIC_API_KEY",
        description: "APIキーを直接指定",
        detail: "API利用時の認証キー",
      },
      {
        command: "ANTHROPIC_MODEL",
        description: "デフォルトモデルを変更",
        detail: "起動時に毎回 --model を指定しなくて済む",
      },
      {
        command: "CLAUDE_CODE_USE_BEDROCK=1",
        description: "Amazon Bedrockを使用",
        detail: "AWS_REGION, AWS_ACCESS_KEY_ID等も別途必要",
        docUrl: "https://code.claude.com/docs/en/amazon-bedrock",
      },
      {
        command: "CLAUDE_CODE_USE_VERTEX=1",
        description: "Google Cloud Vertexを使用",
        detail: "CLOUD_ML_REGION, ANTHROPIC_VERTEX_PROJECT_ID等も別途必要",
        docUrl: "https://code.claude.com/docs/en/google-vertex-ai",
      },
      {
        command: "CLAUDE_CODE_MAX_OUTPUT_TOKENS",
        description: "最大出力トークン数を設定",
        detail: "デフォルト: 16384（Sonnet）, 32768（Opus）",
      },
      {
        command: "CLAUDE_CODE_BUDGET_TOKENS",
        description: "Extended Thinking用のトークン予算",
        detail: "思考に使うトークン数の上限を設定",
      },
      {
        command: "CLAUDE_CODE_MAX_TURNS",
        description: "非対話モードの最大ターン数",
      },
      {
        command: "DISABLE_PROMPT_CACHING=1",
        description: "プロンプトキャッシングを無効化",
      },
      {
        command: "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1",
        description: "非必須の通信を無効化",
        detail: "テレメトリや更新チェックを送信しない",
      },
      {
        command: "CLAUDE_CODE_DISABLE_CRON=1",
        description: "cronスケジュール機能を無効化",
        addedIn: "2.1.72",
      },
      {
        command: "CLAUDE_CODE_SIMPLE=1",
        description: "シンプル表示モード",
        detail: "簡素化された出力表示。CI/CDに最適",
        addedIn: "2.1.50",
      },
      {
        command: "CLAUDE_CODE_NO_FLICKER=1",
        description: "ちらつき防止レンダリング",
        detail: "alt-screenのちらつきを抑制",
        addedIn: "2.1.88",
      },
      {
        command: "CLAUDE_CODE_THEME",
        description: "テーマを指定",
        detail: "dark, light, auto のいずれか",
      },
      {
        command: "HTTP_PROXY / HTTPS_PROXY",
        description: "プロキシを設定",
        detail: "企業ネットワーク等でプロキシ経由で接続",
        docUrl: "https://code.claude.com/docs/en/network-config",
      },
      {
        command: "CLAUDE_CODE_API_URL",
        description: "APIエンドポイントURLを変更",
        detail: "カスタムプロキシやゲートウェイ経由で接続",
      },
      {
        command: "CLAUDE_CODE_SKIP_SYSTEM_PROMPT=1",
        description: "デフォルトシステムプロンプトをスキップ",
        detail: "--system-prompt と併用して完全にカスタマイズ",
      },
      {
        command: "CLAUDE_CODE_ENABLE_EXPERIMENTAL_MCP_ELICITATION=1",
        description: "MCP elicitationを有効化",
        detail: "MCPサーバーがユーザーに質問できる実験的機能",
      },
      {
        command: "EDITOR / VISUAL",
        description: "外部エディタを指定",
        detail: "⌃G / ⌃X ⌃E で使用されるエディタ",
      },
      {
        command: "CLAUDE_CODE_GIT_FETCH_INTERVAL_MS",
        description: "git fetchの実行間隔（ミリ秒）",
        detail: "0で無効化。デフォルト: 300000（5分）",
      },
      {
        command: "CLAUDE_CODE_MAX_FILE_SIZE_KB",
        description: "読み取り可能なファイルサイズの上限（KB）",
        detail: "デフォルト: 2048",
      },
      {
        command: "CLAUDE_CODE_AGENT_MAX_CONCURRENT",
        description: "並列サブエージェントの最大数",
        detail: "デフォルト: 8",
      },
      {
        command: "TMPDIR",
        description: "一時ファイルのディレクトリ",
        detail: "Claude Codeが一時ファイルを保存する場所",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 14. 設定ファイル・メモリ
  // ─────────────────────────────────────────────
  {
    id: "settings",
    title: "設定ファイル・メモリ",
    icon: "📁",
    group: "config",
    docUrl: "https://code.claude.com/docs/en/settings",
    commands: [
      {
        command: "~/.claude/settings.json",
        description: "グローバル設定",
        detail: "全プロジェクト共通のClaude Code設定（hooks, permissions等）",
      },
      {
        command: ".claude/settings.json",
        description: "プロジェクト設定（Gitコミット可）",
        detail: "チーム共有の設定。allowedTools, hooks等",
      },
      {
        command: "~/.claude/settings.local.json",
        description: "ローカルグローバル設定（Git管理外）",
        detail: "APIキーの参照先など個人的な設定",
      },
      {
        command: ".claude/settings.local.json",
        description: "ローカルプロジェクト設定（Git管理外）",
      },
      {
        command: "CLAUDE.md",
        description: "プロジェクト指示ファイル",
        detail: "プロジェクトルートに配置。コーディング規約やコンテキストを記述",
        docUrl: "https://code.claude.com/docs/en/memory",
      },
      {
        command: "CLAUDE.local.md",
        description: "ローカル指示ファイル（Git管理外）",
        detail: "個人的なカスタム指示",
      },
      {
        command: "~/.claude/CLAUDE.md",
        description: "グローバル指示ファイル",
        detail: "全プロジェクトに適用される指示",
      },
      {
        command: ".claude/rules/*.md",
        description: "ルールファイル（複数配置可）",
        detail:
          "CLAUDE.mdの代わりに個別ルールファイルとして管理。paths フロントマターで適用範囲を限定可能",
        addedIn: "2.1.85",
      },
      {
        command: "@import ファイルパス",
        description: "CLAUDE.mdから別ファイルをインポート",
        detail:
          "例: @import docs/api.md — 外部ドキュメントをコンテキストに取り込む",
      },
      {
        command: "~/.claude/auto-memory.md",
        description: "自動メモリ（Claude自身が書き込み）",
        detail: "Claudeが会話から学んだことを自動的に保存するファイル",
      },
      {
        command: "~/.claude/keybindings.json",
        description: "キーバインド設定",
        detail: "ショートカットキーのカスタマイズ",
        docUrl: "https://code.claude.com/docs/en/keybindings",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 15. Hooks（自動化）
  // ─────────────────────────────────────────────
  {
    id: "hooks",
    title: "イベント",
    icon: "🪝",
    group: "hooks-group",
    docUrl: "https://code.claude.com/docs/en/hooks",
    commands: [
      {
        command: "SessionStart",
        description: "セッション開始時に発火",
        detail: "環境のセットアップ、初期化処理に使う",
      },
      {
        command: "UserPromptSubmit",
        description: "ユーザーがプロンプトを送信した時に発火",
        detail: "プロンプトのバリデーションやログ記録に使う",
      },
      {
        command: "PreToolUse",
        description: "ツール実行前に発火",
        detail:
          "exit 0=許可, exit 2=ブロック。入力の検証やフィルタリングに使う",
      },
      {
        command: "PostToolUse",
        description: "ツール実行後に発火",
        detail:
          "exit 0=続行, exit 1=エラーをClaudeに返す。lint, format, 通知に使う",
      },
      {
        command: "PostToolUseFailure",
        description: "ツール実行失敗後に発火",
        detail: "ツールがエラーを返した際のリカバリ処理に使う",
      },
      {
        command: "PermissionRequest",
        description: "権限確認が必要な時に発火",
        detail: "権限リクエストのカスタム処理やログ記録に使う",
      },
      {
        command: "PermissionDenied",
        description: "権限拒否時に発火",
        detail: "auto mode分類器による拒否後に実行",
        addedIn: "2.1.88",
      },
      {
        command: "Notification",
        description: "通知発生時に発火",
        detail: "通知をカスタム先に転送する場合などに使う",
      },
      {
        command: "SubagentStart",
        description: "サブエージェント起動時に発火",
      },
      {
        command: "SubagentStop",
        description: "サブエージェント停止時に発火",
      },
      {
        command: "TaskCreated",
        description: "タスク作成時に発火",
        addedIn: "2.1.84",
      },
      {
        command: "TaskCompleted",
        description: "タスク完了時に発火",
        addedIn: "2.1.84",
      },
      {
        command: "Stop",
        description: "応答完了時に発火",
        detail: "ログ保存、後処理、外部通知などに使う",
      },
      {
        command: "StopFailure",
        description: "応答失敗時に発火",
        addedIn: "2.1.78",
      },
      {
        command: "CwdChanged",
        description: "作業ディレクトリ変更時に発火",
        addedIn: "2.1.83",
      },
      {
        command: "FileChanged",
        description: "ファイル変更時に発火",
        addedIn: "2.1.83",
      },
      {
        command: "WorktreeCreate",
        description: "git worktree作成時に発火",
        addedIn: "2.1.85",
      },
      {
        command: "WorktreeRemove",
        description: "git worktree削除時に発火",
        addedIn: "2.1.85",
      },
      {
        command: "PreCompact",
        description: "compact実行前に発火",
        addedIn: "2.1.76",
      },
      {
        command: "PostCompact",
        description: "compact実行後に発火",
        addedIn: "2.1.76",
      },
      {
        command: "Elicitation",
        description: "MCP elicitation発生時に発火",
        addedIn: "2.1.85",
      },
      {
        command: "ElicitationResult",
        description: "MCP elicitation結果取得時に発火",
        addedIn: "2.1.85",
      },
      {
        command: "ConfigChange",
        description: "設定変更時に発火",
        addedIn: "2.1.85",
      },
      {
        command: "InstructionsLoaded",
        description: "CLAUDE.md等の指示ファイル読み込み時に発火",
        addedIn: "2.1.85",
      },
      {
        command: "TeammateIdle",
        description: "チームメイトエージェントがアイドル状態になった時に発火",
        addedIn: "2.1.88",
      },
      {
        command: "SessionEnd",
        description: "セッション終了時に発火",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 16. Hookの種別
  // ─────────────────────────────────────────────
  {
    id: "hook-types",
    title: "ハンドラ種別",
    icon: "⚡",
    group: "hooks-group",
    docUrl: "https://code.claude.com/docs/en/hooks",
    commands: [
      {
        command: 'type: "command"',
        description: "シェルコマンドを実行するhook（デフォルト）",
        detail:
          "stdinからJSONを受け取り、exit codeで結果を返す。stdoutはClaudeへのメッセージ",
      },
      {
        command: 'type: "http"',
        description: "HTTP hookでURLにPOST送信",
        detail:
          "シェルスクリプトの代わりにHTTPエンドポイントにJSON送信。レスポンスで制御",
        addedIn: "2.1.63",
      },
      {
        command: 'type: "prompt"',
        description: "Claudeにプロンプトを追加するhook",
        detail: "hookの結果としてClaudeへの追加指示を挿入",
        addedIn: "2.1.85",
      },
      {
        command: 'type: "agent"',
        description: "エージェントを起動するhook",
        detail: "hookの処理をサブエージェントに委任",
        addedIn: "2.1.85",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 17. 内蔵ツール
  // ─────────────────────────────────────────────
  {
    id: "tools",
    title: "内蔵ツール",
    icon: "🔧",
    group: "tools-mcp",
    docUrl: "https://code.claude.com/docs/en/tools-reference",
    commands: [
      {
        command: "Read",
        description: "ファイルを読み取り",
        detail:
          "任意のファイルの内容を取得。画像・PDF・Jupyterノートブックも対応",
      },
      {
        command: "Write",
        description: "ファイルを新規作成 / 完全上書き",
        detail: "新しいファイルを作成。既存ファイルの部分編集にはEditを推奨",
      },
      {
        command: "Edit",
        description: "ファイルを部分編集",
        detail: "差分だけ送信して既存ファイルを編集。replace_all でリネームにも対応",
      },
      {
        command: "Bash",
        description: "シェルコマンドを実行",
        detail:
          "任意のBashコマンドを実行。timeout, run_in_background オプションあり",
      },
      {
        command: "Glob",
        description: "パターンでファイル検索",
        detail: '**/*.ts のようなglobパターンでファイルを探す',
      },
      {
        command: "Grep",
        description: "ファイル内容を正規表現で検索",
        detail:
          "ripgrepベースの高速全文検索。出力モード: content, files_with_matches, count",
      },
      {
        command: "Agent",
        description: "サブエージェントを起動",
        detail: "複雑なタスクを並列処理するための子プロセスを生成",
        docUrl: "https://code.claude.com/docs/en/sub-agents",
      },
      {
        command: "WebFetch",
        description: "URLの内容を取得",
        detail: "Webページやファイルをダウンロード",
      },
      {
        command: "WebSearch",
        description: "Web検索を実行",
        detail: "インターネット上の情報を検索",
      },
      {
        command: "TodoWrite",
        description: "タスクリストを管理",
        detail: "作業の進捗を追跡するToDoリスト。⌃T で表示切替",
      },
      {
        command: "NotebookEdit",
        description: "Jupyterノートブックを編集",
        detail: ".ipynbファイルのセルを操作",
      },
      {
        command: "ToolSearch",
        description: "遅延ロードツールを検索・取得",
        detail:
          "MCPツール等の未ロードツールのスキーマを取得して呼び出し可能にする",
      },
      {
        command: "Skill",
        description: "スキルを実行",
        detail: "登録済みスキルを名前で呼び出す",
        docUrl: "https://code.claude.com/docs/en/skills",
      },
      {
        command: "EnterWorktree / ExitWorktree",
        description: "git worktreeの作成/終了",
        detail: "隔離された作業ツリーでの並列作業を管理",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 18. MCP (Model Context Protocol)
  // ─────────────────────────────────────────────
  {
    id: "mcp",
    title: "MCP",
    icon: "🔌",
    group: "tools-mcp",
    docUrl: "https://code.claude.com/docs/en/mcp",
    commands: [
      {
        command: "stdio トランスポート",
        description: "標準入出力でMCPサーバーと通信",
        detail: "ローカルプロセスとして起動するMCPサーバー。最も一般的",
      },
      {
        command: "http トランスポート",
        description: "HTTP Streamable Transport で通信",
        detail: "リモートのMCPサーバーに接続",
      },
      {
        command: "sse トランスポート",
        description: "Server-Sent Events で通信（レガシー）",
        detail: "旧式のSSEベースのMCPサーバーに接続",
      },
      {
        command: "~/.claude/settings.json の mcpServers",
        description: "グローバルMCPサーバー設定",
        detail: "全プロジェクトで使用するMCPサーバーを定義",
      },
      {
        command: ".claude/settings.json の mcpServers",
        description: "プロジェクトMCPサーバー設定",
        detail: "プロジェクト固有のMCPサーバーを定義",
      },
      {
        command: "claude mcp add <name> -s user -- <cmd>",
        description: "ユーザースコープでMCPサーバーを追加",
        detail: "-s user / -s project / -s project-local でスコープを指定",
      },
      {
        command: "Elicitation",
        description: "MCPサーバーがユーザーに質問を表示",
        detail:
          "CLAUDE_CODE_ENABLE_EXPERIMENTAL_MCP_ELICITATION=1 で有効化",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 19. エージェント・スキル
  // ─────────────────────────────────────────────
  {
    id: "agents-skills",
    title: "エージェント・スキル",
    icon: "🤖",
    group: "agents",
    docUrl: "https://code.claude.com/docs/en/sub-agents",
    commands: [
      {
        command: "Explore エージェント",
        description: "コードベースの調査・探索用エージェント",
        detail: "Read, Glob, Grep のみ使用。ファイル変更なし",
      },
      {
        command: "Plan エージェント",
        description: "計画策定用エージェント",
        detail: "調査＋計画の立案。ファイル変更なし",
      },
      {
        command: "Bash エージェント",
        description: "Bashコマンド特化エージェント",
        detail: "シェルコマンドの実行に特化",
      },
      {
        command: "汎用エージェント",
        description: "全ツール利用可能な汎用エージェント",
        detail: "フルアクセスで複雑なタスクを処理",
      },
      {
        command: ".claude/agents/<name>.md",
        description: "カスタムエージェントの定義場所",
        detail:
          "Markdownファイルでエージェントを定義。frontmatterでツール制限等を設定",
        docUrl: "https://code.claude.com/docs/en/sub-agents",
      },
      {
        command: ".claude/skills/<name>.md",
        description: "カスタムスキルの定義場所",
        detail: "Markdownファイルでスキルを定義。triggerでスキル発動条件を設定",
        docUrl: "https://code.claude.com/docs/en/skills",
      },
      {
        command: "allowedTools (frontmatter)",
        description: "エージェント/スキルで使用可能なツールを制限",
        detail: "YAML frontmatterで許可ツールのリストを指定",
      },
      {
        command: "trigger (frontmatter)",
        description: "スキルの自動発動条件",
        detail: "ファイルパターンやキーワードでスキルを自動的にロード",
      },
    ],
  },

];
