const DEFAULTS = { enabled: true, showTone: true, rtSize: 50, disabledHosts: [] };
const $ = (id) => document.getElementById(id);

chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
  let host = "";
  try {
    host = new URL(tab.url).hostname;
  } catch (e) {}

  chrome.storage.sync.get(DEFAULTS, (s) => {
    $("enabled").checked = s.enabled;
    $("showTone").checked = s.showTone;
    $("rtSize").value = s.rtSize;
    $("rtSizeVal").textContent = s.rtSize + "%";
    $("host").textContent = host;
    $("siteDisabled").checked = s.disabledHosts.includes(host);
    $("siteDisabled").disabled = !host;

    $("enabled").onchange = (e) => chrome.storage.sync.set({ enabled: e.target.checked });
    $("showTone").onchange = (e) => chrome.storage.sync.set({ showTone: e.target.checked });
    $("rtSize").oninput = (e) => {
      $("rtSizeVal").textContent = e.target.value + "%";
      chrome.storage.sync.set({ rtSize: Number(e.target.value) });
    };
    $("siteDisabled").onchange = (e) => {
      chrome.storage.sync.get(DEFAULTS, ({ disabledHosts }) => {
        const set = new Set(disabledHosts);
        if (e.target.checked) set.add(host);
        else set.delete(host);
        chrome.storage.sync.set({ disabledHosts: [...set] });
      });
    };
  });
});
