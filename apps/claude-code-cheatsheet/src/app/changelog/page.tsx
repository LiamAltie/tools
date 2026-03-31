import { changelog } from "@/data/changelog";
import { versionInfo, isNewCommand } from "@/data/commands";

export const metadata = {
  title: "変更履歴 — Claude Code チートシート",
  description: "Claude Codeの全バージョンの変更履歴を日本語で確認",
};

function VersionBadge({ version }: { version: string }) {
  const isRecent = isNewCommand(version);
  return (
    <span
      className={`inline-block font-mono text-[0.8rem] px-2 py-0.5 rounded ${
        isRecent
          ? "bg-[var(--color-green)] text-[#2E3440] font-bold"
          : "bg-[var(--t-surface-2)] text-[var(--t-text-sub)]"
      }`}
    >
      v{version}
    </span>
  );
}

export default function ChangelogPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[var(--t-border)] bg-[var(--t-bg)]">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="text-[var(--t-text-sub)] hover:text-[var(--t-brand)] transition-colors text-sm"
            >
              &larr; チートシート
            </a>
            <span
              className="text-xl font-bold text-[var(--t-brand)]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Changelog
            </span>
            <span className="text-[0.8rem] text-[var(--t-text-sub)] hidden sm:inline">
              変更履歴
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={versionInfo.docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.8rem] text-[var(--t-text-sub)] hover:text-[var(--t-brand)] transition-colors"
            >
              公式チェンジログ &rarr;
            </a>
            <button id="theme-toggle" aria-label="テーマ切替">
              <svg id="theme-icon-sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
              <svg id="theme-icon-moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <p className="text-[var(--t-text-sub)] text-sm mb-8">
          v{versionInfo.newSinceVersion} 以降のバージョンは
          <span className="inline-block mx-1 px-1.5 py-0.5 rounded text-[0.7rem] font-bold bg-[var(--color-green)] text-[#2E3440]">
            NEW
          </span>
          マークが付きます。最終確認: v{versionInfo.version}（{versionInfo.date}）
        </p>

        <div className="space-y-6">
          {changelog.map((entry) => (
            <article
              key={entry.version}
              className="border border-[var(--t-border)] rounded-lg overflow-hidden"
            >
              <div className="flex items-center gap-3 px-4 py-3 bg-[var(--t-surface)]">
                <VersionBadge version={entry.version} />
                <span className="text-[0.85rem] text-[var(--t-text-sub)]">
                  {entry.date}
                </span>
              </div>
              <ul className="px-4 py-3 space-y-1.5">
                {entry.changes.map((change, i) => (
                  <li
                    key={i}
                    className="text-[0.9rem] text-[var(--t-text)] pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-[var(--t-brand)]"
                    dangerouslySetInnerHTML={{
                      __html: change
                        .replace(
                          /\*\*(.+?)\*\*/g,
                          '<strong class="text-[var(--t-accent)]">$1</strong>'
                        )
                        .replace(
                          /`(.+?)`/g,
                          '<code class="font-mono text-[0.8rem] px-1 py-0.5 rounded bg-[var(--t-surface-2)] text-[var(--t-accent)]">$1</code>'
                        ),
                    }}
                  />
                ))}
              </ul>
            </article>
          ))}
        </div>

        <footer className="mt-12 py-6 border-t border-[var(--t-border)] text-center text-[0.8rem] text-[var(--t-text-sub)]">
          <a href="/" className="hover:text-[var(--t-brand)] transition-colors">
            &larr; チートシートに戻る
          </a>
        </footer>
      </div>
    </div>
  );
}
