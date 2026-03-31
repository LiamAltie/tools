import { categories, groups, versionInfo, isNewCommand } from "@/data/commands";

function KeyDisplay({
  keys,
}: {
  keys: { mac: string; win: string };
}) {
  const renderKeys = (keyStr: string) =>
    keyStr.split(" ").map((k, i) => {
      if (k === "+" || k === "/") return <span key={i} className="mx-0.5 text-[var(--t-text-sub)] opacity-60">{k}</span>;
      return <kbd key={i}>{k}</kbd>;
    });

  return (
    <>
      <span className="os-mac inline-flex items-center gap-1 flex-wrap">
        {renderKeys(keys.mac)}
      </span>
      <span className="os-win inline-flex items-center gap-1 flex-wrap">
        {renderKeys(keys.win)}
      </span>
    </>
  );
}

function DocLink({ url }: { url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="doc-link"
      title="公式ドキュメント"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </svg>
    </a>
  );
}

function CommandRow({
  cmd,
  copyable,
}: {
  cmd: (typeof categories)[number]["commands"][number];
  copyable: boolean;
}) {
  const copyText = copyable ? (cmd.command || "") : "";

  return (
    <div className="cmd-row">
      <div>
        <div className="flex items-center gap-2 flex-wrap">
          {cmd.keys && <KeyDisplay keys={cmd.keys} />}
          {cmd.command && (
            <code className="font-mono text-[0.85rem] text-[var(--t-accent)]">
              {cmd.command}
            </code>
          )}
          <span className="text-[var(--t-text)]">{cmd.description}</span>
          {isNewCommand(cmd.addedIn) && (
            <span className="new-badge" title={`v${cmd.addedIn} で追加`}>
              NEW
            </span>
          )}
          {cmd.docUrl && <DocLink url={cmd.docUrl} />}
        </div>
        {cmd.detail && <p className="cmd-detail">{cmd.detail}</p>}
      </div>
      {copyText && (
        <button className="copy-btn" data-copy={copyText}>
          Copy
        </button>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[var(--t-border)] bg-[var(--t-bg)] backdrop-blur-sm bg-opacity-95">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-[var(--t-brand)]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Claude Code
              </span>
              <span className="text-[0.8rem] text-[var(--t-text-sub)] hidden sm:inline">
                チートシート
              </span>
              <a
                href={versionInfo.docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="version-badge hidden sm:inline-flex"
                title={`最終更新: ${versionInfo.date}`}
              >
                v{versionInfo.version}
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* OS Toggle */}
            <div className="flex items-center bg-[var(--t-surface)] rounded-md p-0.5">
              <button className="os-btn" data-os="mac">Mac</button>
              <button className="os-btn" data-os="win">Win</button>
            </div>
            {/* Theme toggle */}
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

      <div className="max-w-7xl mx-auto px-4 py-6 xl:flex xl:gap-6">
        {/* Sidebar nav */}
        <aside className="xl:w-64 flex-shrink-0 mb-6 xl:mb-0">
          <div className="xl:sticky xl:top-16 xl:pt-2 xl:max-h-[calc(100vh-5rem)] xl:overflow-y-auto">
            {/* Search */}
            <div className="relative mb-3">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--t-text-sub)] opacity-50" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                id="search-input"
                type="text"
                className="search-input !text-[0.8rem] !pl-8 !py-1.5"
                placeholder="検索..."
              />
            </div>
            {/* Nav links - groups + subcategories */}
            <nav className="side-nav flex xl:flex-col gap-0.5 overflow-x-auto xl:overflow-x-visible pb-2 xl:pb-0 [&_.cat-link]:whitespace-nowrap xl:[&_.cat-link]:whitespace-normal">
              {groups.map((g) => {
                const groupCats = categories.filter((c) => c.group === g.id);
                return (
                  <div key={g.id}>
                    <a href={`#${g.id}`} className="cat-link font-bold">
                      <span className="inline-flex items-center justify-center w-5 shrink-0 opacity-70 text-center">{g.icon}</span>
                      <span>{g.title}</span>
                    </a>
                    {groupCats.length > 1 && (
                      <div className="hidden xl:flex flex-col gap-0.5 ml-6 mt-0.5 mb-1">
                        {groupCats.map((cat) => (
                          <a key={cat.id} href={`#${cat.id}`} className="sub-link">
                            {cat.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              <div className="hidden xl:block mt-3 pt-3 border-t border-[var(--t-border)]">
                <a href="/changelog" className="cat-link text-[0.8rem]">
                  変更履歴
                </a>
              </div>
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1">
          <div className="space-y-12">
            {groups.map((g) => {
              const groupCats = categories.filter((c) => c.group === g.id);
              return (
                <div key={g.id} id={g.id} className="group-section scroll-mt-20">
                  {/* Group header - sticky */}
                  <div className="sticky top-12 z-30 bg-[var(--t-bg)] pt-4 pb-2 mb-4 border-b border-[var(--t-border)]">
                    <h2 className="flex items-center text-xl font-bold text-[var(--t-text)]">
                      <span className="section-icon text-base">{g.icon}</span>
                      {g.title}
                    </h2>
                  </div>
                  {/* Subcategories */}
                  <div className="space-y-8">
                    {groupCats.map((cat) => (
                      <section key={cat.id} id={cat.id} className="category-section scroll-mt-20">
                        <h3 className="flex items-center text-[0.95rem] font-bold text-[var(--t-text-sub)] mb-3">
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-[var(--t-surface-2)] text-[0.75rem] mr-2 flex-shrink-0">{cat.icon}</span>
                          {cat.title}
                          {cat.docUrl && (
                            <a
                              href={cat.docUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="doc-link ml-2"
                              title="公式ドキュメント"
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                <polyline points="15 3 21 3 21 9" />
                                <line x1="10" y1="14" x2="21" y2="3" />
                              </svg>
                            </a>
                          )}
                        </h3>
                        <div className="space-y-0.5">
                          {cat.commands.map((cmd, i) => (
                            <CommandRow key={i} cmd={cmd} copyable={g.copyable} />
                          ))}
                        </div>
                      </section>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <footer className="mt-16 py-6 border-t border-[var(--t-border)] text-center text-[0.8rem] text-[var(--t-text-sub)]">
            <p>
              Claude Code v{versionInfo.version}（{versionInfo.date}）対応 ・{" "}
              <a href="/changelog" className="underline hover:text-[var(--t-brand)]">
                変更履歴（日本語）
              </a>
              {" "}・{" "}
              <a href={versionInfo.docsUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-[var(--t-brand)]">
                公式チェンジログ
              </a>
            </p>
            <p className="mt-1 opacity-60">
              Built with Next.js + Tailwind CSS + Nord Theme
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
