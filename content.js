(() => {
  "use strict";

  const HAN = /\p{Script=Han}/u;
  const KANA = /[぀-ヿㇰ-ㇿ]/; // 平仮名・片仮名があれば日本語とみなす
  const SKIP_TAGS = new Set([
    "SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA", "INPUT", "SELECT", "OPTION",
    "RUBY", "RT", "RP", "TITLE", "SVG", "MATH", "CANVAS", "IFRAME", "TEMPLATE",
  ]);
  const WRAP_CLASS = "jyut-wrap";
  const TIME_BUDGET_MS = 12;

  const DEFAULTS = { enabled: true, showTone: true, rtSize: 50, disabledHosts: [] };
  let settings = { ...DEFAULTS };
  let active = false;

  // 置き換えた <span> → 元のテキストノード（無効化時に元に戻すため）
  const originals = new WeakMap();

  // 簡体字 → 繁体字（香港）に変換してから粵拼を引く
  const toTraditional = OpenCC.Converter({ from: "cn", to: "hk" });

  function lookupString(chars) {
    const text = chars.join("");
    const converted = Array.from(toTraditional(text));
    if (converted.length === chars.length) return converted.join("");
    // 語句変換で文字数が変わった場合は1文字ずつ変換する
    return chars.map((c) => toTraditional(c)).join("");
  }

  function getPairs(chars) {
    const list = ToJyutping.getJyutpingList(lookupString(chars));
    if (list.length === chars.length) return list.map(([, jp], i) => [chars[i], jp]);
    // 念のため：対応が取れないときは原文で直接引く
    const direct = ToJyutping.getJyutpingList(chars.join(""));
    if (direct.length === chars.length) return direct;
    return null;
  }

  function makeRt(jyutping) {
    const rt = document.createElement("rt");
    rt.className = "jyut-rt";
    // 「cin1 ngaa5」のように複数音節になる字もある
    jyutping.split(" ").forEach((syl, i) => {
      if (i > 0) rt.appendChild(document.createTextNode(" "));
      const m = /^(.*?)([1-6]?)$/.exec(syl);
      rt.appendChild(document.createTextNode(m[1]));
      if (m[2]) {
        const tone = document.createElement("span");
        tone.className = "jyut-tone";
        tone.textContent = m[2];
        rt.appendChild(tone);
      }
    });
    return rt;
  }

  function isSkippable(el) {
    for (let e = el; e && e !== document.documentElement; e = e.parentElement) {
      if (SKIP_TAGS.has(e.tagName.toUpperCase())) return true;
      if (e.classList && e.classList.contains(WRAP_CLASS)) return true;
      if (e.isContentEditable) return true;
    }
    const langEl = el.closest("[lang]");
    if (langEl && /^ja\b/i.test(langEl.getAttribute("lang"))) return true;
    return false;
  }

  function annotateTextNode(node) {
    const text = node.nodeValue;
    if (!text || !HAN.test(text) || KANA.test(text)) return;
    const parent = node.parentElement;
    if (!parent || !node.isConnected || isSkippable(parent)) return;

    const chars = Array.from(text);
    const pairs = getPairs(chars);
    if (!pairs) return;

    const wrap = document.createElement("span");
    wrap.className = WRAP_CLASS;
    let plain = "";
    const flush = () => {
      if (plain) wrap.appendChild(document.createTextNode(plain));
      plain = "";
    };
    for (const [ch, jp] of pairs) {
      if (jp && HAN.test(ch)) {
        flush();
        const ruby = document.createElement("ruby");
        ruby.className = "jyut-ruby";
        ruby.appendChild(document.createTextNode(ch));
        ruby.appendChild(makeRt(jp));
        wrap.appendChild(ruby);
      } else {
        plain += ch;
      }
    }
    flush();

    originals.set(wrap, node);
    node.replaceWith(wrap);
  }

  // ---- 処理キュー（重いページでも固まらないよう少しずつ処理） ----
  const queue = [];
  let scheduled = false;

  function enqueue(root) {
    if (!active) return;
    queue.push(root);
    if (!scheduled) {
      scheduled = true;
      requestIdleCallback(processQueue, { timeout: 500 });
    }
  }

  function collectTextNodes(root, out) {
    if (root.nodeType === Node.TEXT_NODE) {
      out.push(root);
      return;
    }
    if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_NODE) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: (n) => (HAN.test(n.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT),
    });
    for (let n = walker.nextNode(); n; n = walker.nextNode()) out.push(n);
  }

  let pendingNodes = [];

  function processQueue() {
    const start = performance.now();
    while (active && (pendingNodes.length || queue.length)) {
      if (!pendingNodes.length) collectTextNodes(queue.shift(), pendingNodes);
      while (pendingNodes.length) {
        annotateTextNode(pendingNodes.shift());
        if (performance.now() - start > TIME_BUDGET_MS) {
          requestIdleCallback(processQueue, { timeout: 500 });
          return;
        }
      }
    }
    scheduled = false;
  }

  // ---- 動的に追加される内容の監視 ----
  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.type === "characterData") {
        enqueue(m.target);
      } else {
        for (const n of m.addedNodes) {
          if (n.nodeType === Node.ELEMENT_NODE && n.classList.contains(WRAP_CLASS)) continue;
          enqueue(n);
        }
      }
    }
  });

  // ---- 有効化・無効化 ----
  function isEnabledHere() {
    return settings.enabled && !settings.disabledHosts.includes(location.hostname);
  }

  function applyStyle() {
    const root = document.documentElement;
    root.style.setProperty("--jyut-rt-size", settings.rtSize / 100 + "em");
    root.classList.toggle("jyut-hide-tone", !settings.showTone);
  }

  function start() {
    if (active) return;
    active = true;
    enqueue(document.body);
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  }

  function stop() {
    if (!active) return;
    active = false;
    observer.disconnect();
    queue.length = 0;
    pendingNodes = [];
    scheduled = false;
    for (const wrap of document.querySelectorAll("span." + WRAP_CLASS)) {
      const orig = originals.get(wrap);
      wrap.replaceWith(orig || document.createTextNode(wrap.textContent));
    }
  }

  function refresh() {
    applyStyle();
    if (isEnabledHere()) start();
    else stop();
  }

  if (typeof chrome !== "undefined" && chrome.storage) {
    chrome.storage.sync.get(DEFAULTS, (s) => {
      settings = s;
      refresh();
    });
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area !== "sync") return;
      for (const [k, { newValue }] of Object.entries(changes)) settings[k] = newValue;
      refresh();
    });
  } else {
    refresh(); // テスト用（拡張機能外で読み込んだ場合）
  }
})();
