import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import SentryInit from "./sentry-init";

export const metadata: Metadata = {
  title: "Claude Code チートシート",
  description:
    "Claude Codeの全コマンド・ショートカット・設定を日本語でまとめたインタラクティブチートシート。Mac/Win対応、ワンクリックコピー。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=LINE+Seed+JP:wght@100;300;400;700;900&family=Space+Grotesk:wght@500;700&family=M+PLUS+1+Code:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light')document.documentElement.setAttribute('data-light','');var o=localStorage.getItem('os');if(!o)o=/Mac|iPhone|iPad/.test(navigator.platform||navigator.userAgent)?'mac':'win';if(o==='win')document.documentElement.setAttribute('data-os','win');}catch(e){}})();`,
          }}
        />
      </head>
      <body className="font-sans">
        <SentryInit />
        <Script
          defer
          src="https://umami.altie.io/script.js"
          data-website-id="4928a2d1-6260-4b32-82e2-2373a79c092d"
          strategy="afterInteractive"
        />
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function(){
  // Theme toggle
  var toggle = document.getElementById('theme-toggle');
  if(toggle) toggle.addEventListener('click', function(){
    var html = document.documentElement;
    if(html.hasAttribute('data-light')){
      html.removeAttribute('data-light');
      localStorage.setItem('theme','dark');
    } else {
      html.setAttribute('data-light','');
      localStorage.setItem('theme','light');
    }
  });

  // OS toggle (CSS-driven via html[data-os])
  var html = document.documentElement;
  var curOS = html.getAttribute('data-os') === 'win' ? 'win' : 'mac';
  function setOS(os){
    curOS = os;
    if(os === 'win') html.setAttribute('data-os','win');
    else html.removeAttribute('data-os');
    localStorage.setItem('os', os);
    document.querySelectorAll('.os-btn').forEach(function(b){
      b.classList.toggle('active', b.dataset.os === os);
    });
  }
  document.querySelectorAll('.os-btn').forEach(function(b){
    b.addEventListener('click', function(){ setOS(b.dataset.os); });
  });
  setOS(curOS);

  // Copy
  document.addEventListener('click', function(e){
    var btn = e.target.closest('.copy-btn');
    if(!btn) return;
    var text = btn.dataset.copy;
    if(!text) return;
    navigator.clipboard.writeText(text).then(function(){
      btn.classList.add('copied');
      var orig = btn.textContent;
      btn.textContent = 'Copied!';
      setTimeout(function(){ btn.classList.remove('copied'); btn.textContent = orig; }, 1200);
    });
  });

  // Search
  var search = document.getElementById('search-input');
  if(search) search.addEventListener('input', function(){
    var q = search.value.toLowerCase().trim();
    document.querySelectorAll('.cmd-row').forEach(function(row){
      var text = (row.textContent || '').toLowerCase();
      row.style.display = q && text.indexOf(q) === -1 ? 'none' : '';
    });
    document.querySelectorAll('.category-section').forEach(function(sec){
      var visible = sec.querySelectorAll('.cmd-row:not([style*="display: none"])');
      sec.style.display = q && visible.length === 0 ? 'none' : '';
    });
    document.querySelectorAll('.group-section').forEach(function(grp){
      var visible = grp.querySelectorAll('.category-section:not([style*="display: none"])');
      grp.style.display = q && visible.length === 0 ? 'none' : '';
    });
  });

  // Nav scroll (both cat-link and sub-link)
  document.querySelectorAll('.cat-link, .sub-link').forEach(function(link){
    link.addEventListener('click', function(e){
      var href = link.getAttribute('href');
      if(!href || href.charAt(0) !== '#') return;
      e.preventDefault();
      var target = document.getElementById(href.slice(1));
      if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
      if(link.classList.contains('cat-link')){
        document.querySelectorAll('.cat-link').forEach(function(l){ l.classList.remove('active'); });
        link.classList.add('active');
      }
    });
  });

  // Intersection observer for nav highlight (group + sub sections)
  var groupSections = document.querySelectorAll('.group-section');
  var navLinks = document.querySelectorAll('.cat-link');
  if(groupSections.length && 'IntersectionObserver' in window){
    var obs = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          navLinks.forEach(function(l){ l.classList.remove('active'); });
          var active = document.querySelector('.cat-link[href="#'+entry.target.id+'"]');
          if(active) active.classList.add('active');
        }
      });
    }, {rootMargin:'-20% 0px -70% 0px'});
    groupSections.forEach(function(s){ obs.observe(s); });
  }

  // Sub-section observer for sub-links
  var subSections = document.querySelectorAll('.category-section');
  var subLinks = document.querySelectorAll('.sub-link');
  if(subSections.length && subLinks.length && 'IntersectionObserver' in window){
    var subObs = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          subLinks.forEach(function(l){ l.classList.remove('active'); });
          var active = document.querySelector('.sub-link[href="#'+entry.target.id+'"]');
          if(active) active.classList.add('active');
        }
      });
    }, {rootMargin:'-25% 0px -65% 0px'});
    subSections.forEach(function(s){ subObs.observe(s); });
  }
})();
`,
          }}
        />
      </body>
    </html>
  );
}
