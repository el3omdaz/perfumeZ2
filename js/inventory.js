// ═══════════════════════════════════════════════════
// inventory.js — تبويب مخزون الزيوت
// يستخدم نفس مفتاح التخزين وصيغة الملف في تطبيق الانفينتوري القديم
// ═══════════════════════════════════════════════════
const INV = (function () {
  const STORAGE_KEY = "kuwait_perfume_manager_v3";
  const GROUPS = ["نسائي", "رجالي", "يونيسكس"];
  const STAGES = ["المرحلة الأولى", "المرحلة الثانية"];

  const DEFAULTS = [
    {id:"w01",gender:"نسائي",brand:"YSL",name:"Libre Intense",priority:3,stage:"المرحلة الأولى"},
    {id:"w02",gender:"نسائي",brand:"Carolina Herrera",name:"Good Girl",priority:3,stage:"المرحلة الأولى"},
    {id:"w03",gender:"نسائي",brand:"Lancôme",name:"La Vie Est Belle",priority:3,stage:"المرحلة الأولى"},
    {id:"w04",gender:"نسائي",brand:"Giorgio Armani",name:"Si",priority:3,stage:"المرحلة الأولى"},
    {id:"w05",gender:"نسائي",brand:"YSL",name:"Black Opium",priority:3,stage:"المرحلة الأولى"},
    {id:"w06",gender:"نسائي",brand:"Prada",name:"Paradoxe",priority:3,stage:"المرحلة الأولى"},
    {id:"w07",gender:"نسائي",brand:"Burberry",name:"Her",priority:2,stage:"المرحلة الأولى"},
    {id:"w08",gender:"نسائي",brand:"Chanel",name:"Coco Mademoiselle",priority:3,stage:"المرحلة الأولى"},
    {id:"w09",gender:"نسائي",brand:"Dior",name:"Miss Dior",priority:2,stage:"المرحلة الأولى"},
    {id:"w10",gender:"نسائي",brand:"Giorgio Armani",name:"My Way",priority:2,stage:"المرحلة الأولى"},
    {id:"w11",gender:"نسائي",brand:"Mugler",name:"Alien",priority:2,stage:"المرحلة الأولى"},
    {id:"w12",gender:"نسائي",brand:"Kayali",name:"Vanilla 28",priority:3,stage:"المرحلة الأولى"},
    {id:"w13",gender:"نسائي",brand:"Chanel",name:"Chance",priority:2,stage:"المرحلة الأولى"},
    {id:"w14",gender:"نسائي",brand:"Versace",name:"Bright Crystal",priority:2,stage:"المرحلة الأولى"},
    {id:"w15",gender:"نسائي",brand:"Narciso Rodriguez",name:"For Her",priority:2,stage:"المرحلة الأولى"},
    {id:"w16",gender:"نسائي",brand:"Valentino",name:"Donna Born in Roma",priority:3,stage:"المرحلة الأولى"},
    {id:"m01",gender:"رجالي",brand:"Dior",name:"Sauvage",priority:3,stage:"المرحلة الأولى"},
    {id:"m02",gender:"رجالي",brand:"Chanel",name:"Bleu de Chanel",priority:3,stage:"المرحلة الأولى"},
    {id:"m03",gender:"رجالي",brand:"YSL",name:"Y EDP",priority:3,stage:"المرحلة الأولى"},
    {id:"m04",gender:"رجالي",brand:"Rabanne",name:"1 Million",priority:3,stage:"المرحلة الأولى"},
    {id:"m05",gender:"رجالي",brand:"Giorgio Armani",name:"Stronger With You Intensely",priority:3,stage:"المرحلة الأولى"},
    {id:"m06",gender:"رجالي",brand:"Jean Paul Gaultier",name:"Le Male Le Parfum",priority:3,stage:"المرحلة الأولى"},
    {id:"m07",gender:"رجالي",brand:"Versace",name:"Dylan Blue",priority:2,stage:"المرحلة الأولى"},
    {id:"m08",gender:"رجالي",brand:"Giorgio Armani",name:"Acqua di Gio Profondo",priority:2,stage:"المرحلة الأولى"},
    {id:"m09",gender:"رجالي",brand:"Montblanc",name:"Explorer",priority:2,stage:"المرحلة الأولى"},
    {id:"m10",gender:"رجالي",brand:"Prada",name:"Luna Rossa Carbon",priority:2,stage:"المرحلة الأولى"},
    {id:"m11",gender:"رجالي",brand:"Versace",name:"Pour Homme",priority:2,stage:"المرحلة الأولى"},
    {id:"m12",gender:"رجالي",brand:"Rabanne",name:"Invictus",priority:2,stage:"المرحلة الأولى"},
    {id:"m13",gender:"رجالي",brand:"Rasasi",name:"Hawas",priority:3,stage:"المرحلة الأولى"},
    {id:"m14",gender:"رجالي",brand:"Giorgio Armani",name:"Stronger With You Absolutely",priority:2,stage:"المرحلة الأولى"},
    {id:"m15",gender:"رجالي",brand:"Giorgio Armani",name:"Armani Code Parfum",priority:2,stage:"المرحلة الأولى"},
    {id:"m16",gender:"رجالي",brand:"Dior",name:"Dior Homme Intense",priority:3,stage:"المرحلة الأولى"},
    {id:"u01",gender:"يونيسكس",brand:"Maison Francis Kurkdjian",name:"Baccarat Rouge 540",priority:3,stage:"المرحلة الأولى"},
    {id:"u02",gender:"يونيسكس",brand:"Louis Vuitton",name:"Imagination",priority:3,stage:"المرحلة الأولى"},
    {id:"u03",gender:"يونيسكس",brand:"Tom Ford",name:"Tobacco Vanille",priority:3,stage:"المرحلة الأولى"},
    {id:"u04",gender:"يونيسكس",brand:"Tom Ford",name:"Oud Wood",priority:3,stage:"المرحلة الأولى"},
    {id:"u05",gender:"يونيسكس",brand:"Mancera",name:"Instant Crush",priority:3,stage:"المرحلة الأولى"},
    {id:"u06",gender:"يونيسكس",brand:"Xerjoff",name:"Erba Pura",priority:3,stage:"المرحلة الأولى"},
    {id:"u07",gender:"يونيسكس",brand:"Maison Francis Kurkdjian",name:"Grand Soir",priority:2,stage:"المرحلة الأولى"},
    {id:"u08",gender:"يونيسكس",brand:"Swiss Arabian",name:"Shaghaf Oud",priority:2,stage:"المرحلة الأولى"},
    {id:"p201",gender:"نسائي",brand:"Givenchy",name:"L’Interdit",priority:2,stage:"المرحلة الثانية"},
    {id:"p202",gender:"نسائي",brand:"Viktor & Rolf",name:"Flowerbomb",priority:2,stage:"المرحلة الثانية"},
    {id:"p203",gender:"رجالي",brand:"Azzaro",name:"The Most Wanted",priority:3,stage:"المرحلة الثانية"},
    {id:"p204",gender:"رجالي",brand:"Jean Paul Gaultier",name:"Ultra Male",priority:2,stage:"المرحلة الثانية"},
    {id:"p205",gender:"يونيسكس",brand:"Sospiro",name:"Erba Pura Style",priority:2,stage:"المرحلة الثانية"},
    {id:"p206",gender:"يونيسكس",brand:"Arabian Oud",name:"Kalemat",priority:2,stage:"المرحلة الثانية"},
    {id:"p207",gender:"يونيسكس",brand:"Arabian Oud",name:"Madawi",priority:2,stage:"المرحلة الثانية"},
    {id:"p208",gender:"يونيسكس",brand:"Gissah",name:"Imperial Valley",priority:3,stage:"المرحلة الثانية"},
    {id:"w17",gender:"نسائي",brand:"Jean Paul Gaultier",name:"Scandal",priority:3,stage:"المرحلة الأولى"},
    {id:"w18",gender:"نسائي",brand:"Dior",name:"Poison Girl",priority:3,stage:"المرحلة الأولى"},
    {id:"w19",gender:"نسائي",brand:"Giorgio Armani",name:"Si Passione",priority:3,stage:"المرحلة الأولى"},
    {id:"w20",gender:"نسائي",brand:"Kayali",name:"Yum Pistachio",priority:3,stage:"المرحلة الأولى"},
    {id:"m17",gender:"رجالي",brand:"Versace",name:"Eros",priority:3,stage:"المرحلة الأولى"},
    {id:"m18",gender:"رجالي",brand:"YSL",name:"Y Le Parfum",priority:3,stage:"المرحلة الأولى"},
    {id:"m19",gender:"رجالي",brand:"Rabanne",name:"Invictus Victory",priority:3,stage:"المرحلة الأولى"},
    {id:"m20",gender:"رجالي",brand:"Dior",name:"Fahrenheit",priority:2,stage:"المرحلة الأولى"},
    {id:"m21",gender:"رجالي",brand:"Jean Paul Gaultier",name:"Le Beau Le Parfum",priority:3,stage:"المرحلة الأولى"},
    {id:"u09",gender:"يونيسكس",brand:"Maison Francis Kurkdjian",name:"Gentle Fluidity Silver",priority:3,stage:"المرحلة الأولى"},
    {id:"u10",gender:"يونيسكس",brand:"Initio",name:"Oud for Greatness",priority:3,stage:"المرحلة الأولى"},
    {id:"u11",gender:"يونيسكس",brand:"Byredo",name:"Bal d’Afrique",priority:2,stage:"المرحلة الأولى"},
    {id:"u12",gender:"يونيسكس",brand:"Ex Nihilo",name:"Fleur Narcotique",priority:3,stage:"المرحلة الأولى"},
    {id:"u13",gender:"يونيسكس",brand:"Xerjoff",name:"Naxos",priority:3,stage:"المرحلة الأولى"}
  ];

  // ── State ──
  let items = [];
  let filters = { search: "", gender: "all", stage: "all", status: "all" };
  let expanded = new Set();
  let ready = false;
  let sheetOpen = false;
  let filtersOpen = false;
  let flashTimer = null;

  // ── Helpers ──
  const $ = id => document.getElementById(id);
  function esc(v) {
    return String(v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }
  function normalize(item, index) {
    const purchased = Boolean(item.purchased ?? item.bought ?? false);
    const wanted = purchased ? false : Boolean(item.wanted ?? item.toBuy ?? false);
    return {
      ...item,
      id: item.id || `item_${Date.now()}_${index || 0}`,
      gender: item.gender || "يونيسكس",
      brand: item.brand || "",
      name: item.name || "",
      stage: item.stage || STAGES[0],
      priority: Math.min(3, Math.max(1, Number(item.priority) || 1)),
      cost50: item.cost50 ?? "",
      notes: item.notes ?? "",
      canceled: Boolean(item.canceled),
      purchased, wanted
    };
  }
  function defaults() { return DEFAULTS.map((x, i) => normalize(x, i)); }
  function load() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const list = Array.isArray(parsed) ? parsed : parsed.perfumes;
        if (Array.isArray(list)) return list.map(normalize);
      }
    } catch (e) { console.warn("INV load", e); }
    return defaults();
  }
  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); }
    catch (e) { alert("تعذر الحفظ على الجهاز. تأكد من وجود مساحة تخزين كافية."); }
  }
  function find(id) { return items.find(x => x.id === id); }
  function money(n) { return (Math.round(n * 1000) / 1000).toFixed(3).replace(/\.?0+$/, "") || "0"; }
  function flash(msg) {
    const t = $("inv-toast"); if (!t) return;
    t.textContent = msg; t.classList.add("show");
    clearTimeout(flashTimer);
    flashTimer = setTimeout(() => t.classList.remove("show"), 2200);
  }
  function genderIcon(g) { return g === "نسائي" ? "👩" : g === "رجالي" ? "👨" : "🌐"; }
  function initials(b) {
    const s = String(b || "").split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]).join("").toUpperCase();
    return s || "PF";
  }
  function stateOf(it) { return it.canceled ? "canceled" : it.purchased ? "purchased" : it.wanted ? "wanted" : "none"; }
  function costOf(it) { return parseFloat(it.cost50) || 0; }

  // ── Filtering / sorting ──
  function filtered() {
    const q = filters.search.trim().toLocaleLowerCase("ar");
    return items.filter(it => {
      if (q && !`${it.brand} ${it.name}`.toLocaleLowerCase("ar").includes(q)) return false;
      if (filters.gender !== "all" && it.gender !== filters.gender) return false;
      if (filters.stage !== "all" && it.stage !== filters.stage) return false;
      const st = stateOf(it);
      if (filters.status === "purchased" && st !== "purchased") return false;
      if (filters.status === "wanted" && st !== "wanted") return false;
      if (filters.status === "unset" && st !== "none") return false;
      if (filters.status === "canceled" && st !== "canceled") return false;
      return true;
    });
  }
  function sortItems(list) {
    return [...list].sort((a, b) => {
      if (a.canceled !== b.canceled) return Number(a.canceled) - Number(b.canceled);
      if (a.wanted !== b.wanted) return Number(b.wanted) - Number(a.wanted);
      if (a.stage !== b.stage) return a.stage.localeCompare(b.stage, "ar");
      if (a.priority !== b.priority) return b.priority - a.priority;
      if (a.brand !== b.brand) return a.brand.localeCompare(b.brand, "ar");
      return a.name.localeCompare(b.name, "ar");
    });
  }
  function filtersActive() {
    return filters.search || filters.gender !== "all" || filters.stage !== "all" || filters.status !== "all";
  }

  // ── Render: shell (once) ──
  function shell() {
    $("tab-inv").innerHTML = `
    <div class="inv">
      <header class="inv-hero">
        <div class="inv-hero-brand">
          <span class="inv-hero-logo">◇</span>
          <div>
            <p class="inv-kicker">PERFUME INVENTORY</p>
            <h2>مجموعتي العطرية</h2>
            <span class="inv-saved"><i></i>يتم الحفظ تلقائيًا</span>
          </div>
        </div>
        <details class="inv-more">
          <summary aria-label="المزيد">⋯</summary>
          <div class="inv-more-menu">
            <button type="button" class="inv-btn" onclick="INV.exportData()">⬇️ تصدير نسخة</button>
            <label class="inv-btn">⬆️ استيراد نسخة
              <input id="inv-import" type="file" accept=".json,application/json" onchange="INV.importData(event)" style="display:none">
            </label>
            <button type="button" class="inv-btn inv-danger" onclick="INV.resetDefaults()">↩️ استعادة الأصلية</button>
          </div>
        </details>
      </header>

      <div id="inv-stats" class="inv-stats"></div>
      <div id="inv-cost" class="inv-cost"></div>

      <div class="inv-toolbar">
        <div class="inv-toolbar-main">
          <div class="inv-search">
            <input id="inv-q" type="search" placeholder="ابحث عن عطر أو ماركة…" autocomplete="off" oninput="INV.setFilter('search',this.value)">
          </div>
          <button id="inv-filter-btn" type="button" class="inv-filter-btn" onclick="INV.toggleFilters()" aria-label="إظهار الفلاتر">☰</button>
        </div>
        <div id="inv-view-tabs" class="inv-view-tabs"></div>
        <div id="inv-filter-panel" class="inv-filter-panel">
          <select id="inv-f-stage" aria-label="المرحلة" onchange="INV.setFilter('stage',this.value)">
            <option value="all">كل المراحل</option>
            ${STAGES.map(s => `<option value="${s}">${s}</option>`).join("")}
          </select>
          <select id="inv-f-status" aria-label="حالة الشراء" onchange="INV.setFilter('status',this.value)">
            <option value="all">كل الحالات</option>
            <option value="purchased">تم شراؤه</option>
            <option value="wanted">مطلوب شراؤه</option>
            <option value="unset">غير محدد</option>
            <option value="canceled">ملغي</option>
          </select>
          <button type="button" class="inv-clear" onclick="INV.clearFilters()">✕ مسح البحث والفلاتر</button>
        </div>
      </div>

      <div class="inv-list-head">
        <div><h3 id="inv-list-title">كل العطور</h3><p>اضغط على البطاقة لعرض التفاصيل والتعديل</p></div>
        <span id="inv-count" class="inv-count"></span>
      </div>

      <div id="inv-list"></div>
      <div id="inv-empty" class="inv-empty" style="display:none">
        <strong>لا توجد نتائج مطابقة</strong>جرّب تغيير البحث أو مسح الفلاتر
      </div>
      <button type="button" class="inv-add-btn" onclick="INV.openSheet()"><b>＋</b> إضافة عطر جديد</button>
    </div>

    <div id="inv-sheet" class="inv-sheet" onclick="if(event.target===this)INV.closeSheet()">
      <form class="inv-sheet-card" onsubmit="INV.add(event)">
        <div class="inv-sheet-head">
          <strong>➕ إضافة عطر جديد</strong>
          <button type="button" class="inv-x" onclick="INV.closeSheet()" aria-label="إغلاق">✕</button>
        </div>
        <label>القسم
          <select id="inv-n-gender" required>
            <option value="">اختر القسم</option>
            ${GROUPS.map(g => `<option value="${g}">${genderIcon(g)} ${g}</option>`).join("")}
          </select>
        </label>
        <label>الماركة <input id="inv-n-brand" type="text" placeholder="مثال: Dior" autocomplete="off" required></label>
        <label>اسم العطر <input id="inv-n-name" type="text" placeholder="مثال: Sauvage" autocomplete="off" required></label>
        <div class="inv-row2">
          <label>المرحلة
            <select id="inv-n-stage">${STAGES.map(s => `<option value="${s}">${s}</option>`).join("")}</select>
          </label>
          <label>الأولوية
            <select id="inv-n-priority">
              <option value="3">⭐⭐⭐ عالية</option>
              <option value="2">⭐⭐ متوسطة</option>
              <option value="1">⭐ منخفضة</option>
            </select>
          </label>
        </div>
        <label>حالة الشراء
          <select id="inv-n-state">
            <option value="none">غير محدد</option>
            <option value="wanted">مطلوب شراؤه</option>
            <option value="purchased">تم شراؤه</option>
          </select>
        </label>
        <button type="submit" class="inv-primary">＋ إضافة العطر</button>
      </form>
    </div>
    <div id="inv-toast" class="inv-toast" role="status"></div>`;
  }

  // ── Render: stats + cost ──
  function renderStats() {
    const nPurchased = items.filter(x => stateOf(x) === "purchased").length;
    const nWanted = items.filter(x => stateOf(x) === "wanted").length;
    const live = items.filter(x => !x.canceled);
    const totalCost = live.reduce((sum, x) => sum + costOf(x), 0);
    $("inv-stats").innerHTML = `
      <article class="inv-stat cost"><span class="inv-stat-l">إجمالي التكلفة</span><strong class="inv-stat-n">${money(totalCost)} <small>د.ك</small></strong></article>
      <article class="inv-stat"><span class="inv-stat-l">كل العطور</span><strong class="inv-stat-n">${items.length}</strong></article>
      <article class="inv-stat want"><span class="inv-stat-l">قائمة الشراء</span><strong class="inv-stat-n">${nWanted}</strong></article>
      <article class="inv-stat ok"><span class="inv-stat-l">تم شراؤها</span><strong class="inv-stat-n">${nPurchased}</strong></article>`;
    renderViewTabs();
    renderCost();
  }
  function renderViewTabs() {
    const counts = Object.fromEntries(GROUPS.map(g => [g, items.filter(x => x.gender === g).length]));
    const wanted = items.filter(x => stateOf(x) === "wanted").length;
    const active = filters.status === "wanted" && filters.gender === "all"
      ? "wanted"
      : filters.status === "all" ? filters.gender : "custom";
    const tabs = [
      { key: "all", label: "الكل", n: items.length },
      ...GROUPS.map(g => ({ key: g, label: g, n: counts[g] })),
      { key: "wanted", label: "قائمة الشراء", n: wanted }
    ];
    $("inv-view-tabs").innerHTML = tabs.map(t => `
      <button type="button" class="inv-view-tab ${active === t.key ? "on" : ""}" onclick="INV.setView('${t.key}')">
        ${t.label} <b>${t.n}</b>
      </button>`).join("");
  }
  function renderCost() {
    const wanted = items.filter(x => stateOf(x) === "wanted");
    const bought = items.filter(x => stateOf(x) === "purchased");
    const sum = l => l.reduce((a, x) => a + costOf(x), 0);
    const missing = wanted.filter(x => !costOf(x)).length;
    $("inv-cost").innerHTML = `
      <span>المطلوب: <strong>${money(sum(wanted))} د.ك</strong>${missing ? ` · ${missing} بدون تكلفة` : ""}</span>
      <span>المشترى: <strong>${money(sum(bought))} د.ك</strong></span>`;
  }

  // ── Render: list ──
  function stars(n) { return "⭐".repeat(n); }
  function statusLabel(st) {
    return st === "purchased" ? "تم شراؤه" : st === "wanted" ? "مطلوب" : st === "canceled" ? "ملغي" : "غير محدد";
  }
  function rowHtml(it) {
    const st = stateOf(it);
    const open = expanded.has(it.id);
    const cost = costOf(it);
    return `
    <article class="inv-item ${st} ${open ? "open" : ""}" id="inv-i-${esc(it.id)}">
      <div class="inv-row" role="button" tabindex="0" aria-expanded="${open}" onclick="INV.toggle('${esc(it.id)}')" onkeydown="if(event.key==='Enter'){INV.toggle('${esc(it.id)}')}">
        <span class="inv-badge">${esc(initials(it.brand))}</span>
        <div class="inv-info">
          <div class="inv-brand">${esc(it.brand)}</div>
          <div class="inv-name">${esc(it.name)}</div>
          <div class="inv-sub">
            <span class="inv-priority">${stars(it.priority)}</span>
            <span class="inv-stage">${esc(it.stage)}</span>
            ${cost ? `<span class="inv-cost-chip">${money(cost)} د.ك</span>` : ""}
          </div>
        </div>
        <span class="inv-pill ${st}">${statusLabel(st)}</span>
        <span class="inv-chev">⌄</span>
      </div>
      ${open ? detailHtml(it, st) : ""}
    </article>`;
  }
  function detailHtml(it, st) {
    const base = st === "canceled" ? (it.purchased ? "purchased" : it.wanted ? "wanted" : "none") : st;
    const seg = (val, label) =>
      `<button type="button" class="inv-seg ${val} ${base === val ? "on" : ""}" onclick="INV.setState('${esc(it.id)}','${val}')">${label}</button>`;
    return `
    <div class="inv-detail">
      <div class="inv-detail-inner">
        <div class="inv-lbl">حالة الشراء</div>
        <div class="inv-segs">${seg("none", "غير محدد")}${seg("wanted", "مطلوب")}${seg("purchased", "تم شراؤه")}</div>

        <div class="inv-lbl">الأولوية</div>
        <div class="inv-segs">
          ${[1, 2, 3].map(v => `<button type="button" class="inv-seg star ${it.priority === v ? "on" : ""}" onclick="INV.setPriority('${esc(it.id)}',${v})">${stars(v)}</button>`).join("")}
        </div>

        <div class="inv-fields">
          <div>
            <label class="inv-lbl" for="inv-c-${esc(it.id)}">تكلفة 50 مل بالدينار</label>
            <input id="inv-c-${esc(it.id)}" type="number" inputmode="decimal" min="0" step="0.001" value="${esc(it.cost50)}" placeholder="0.000" oninput="INV.setField('${esc(it.id)}','cost50',this.value)">
          </div>
          <div>
            <label class="inv-lbl" for="inv-t-${esc(it.id)}">ملاحظات</label>
            <textarea id="inv-t-${esc(it.id)}" placeholder="اكتب ملاحظاتك هنا" oninput="INV.setField('${esc(it.id)}','notes',this.value)">${esc(it.notes)}</textarea>
          </div>
        </div>

        <div class="inv-foot">
          <button type="button" class="inv-btn" onclick="INV.toggleCancel('${esc(it.id)}')">${it.canceled ? "↩️ إعادة العطر للقائمة" : "🚫 إلغاء العطر"}</button>
          <button type="button" class="inv-btn inv-danger" onclick="INV.remove('${esc(it.id)}')">🗑 حذف</button>
        </div>
      </div>
    </div>`;
  }
  function renderList() {
    const list = filtered();
    $("inv-count").textContent = `${list.length} من ${items.length}`;
    let title = "كل العطور";
    if (filters.gender !== "all" && filters.status === "all") title = filters.gender;
    else if (filters.status === "wanted" && filters.gender === "all") title = "قائمة الشراء";
    else if (filters.status === "purchased" && filters.gender === "all") title = "تم شراؤها";
    else if (filters.status === "canceled" && filters.gender === "all") title = "العطور الملغاة";
    else if (filters.status === "unset" && filters.gender === "all") title = "غير محدد";
    else if (filters.gender !== "all" || filters.status !== "all") title = "نتائج التصفية";
    $("inv-list-title").textContent = title;
    $("inv-list").innerHTML = GROUPS.map(g => {
      const arr = sortItems(list.filter(x => x.gender === g));
      if (!arr.length) return "";
      return `
      <section class="inv-sec">
        <h3 class="inv-sec-h"><span>${genderIcon(g)} ${g}</span><em>${arr.length}</em></h3>
        ${arr.map(rowHtml).join("")}
      </section>`;
    }).join("");
    $("inv-empty").style.display = list.length ? "none" : "block";
  }
  function renderAll() { renderStats(); renderList(); }
  function keepInView(id) {
    const e = $("inv-i-" + id);
    if (e) e.scrollIntoView({ block: "center", behavior: "smooth" });
  }

  // ── Actions ──
  function setFilter(key, val) {
    filters[key] = val;
    if (key === "status" || key === "gender") renderAll(); else renderList();
  }
  function setView(view) {
    filters.gender = GROUPS.includes(view) ? view : "all";
    filters.status = view === "wanted" ? "wanted" : "all";
    const status = $("inv-f-status");
    if (status) status.value = filters.status;
    renderAll();
  }
  function toggleFilters() {
    filtersOpen = !filtersOpen;
    const panel = $("inv-filter-panel");
    const button = $("inv-filter-btn");
    if (panel) panel.classList.toggle("show", filtersOpen);
    if (button) {
      button.classList.toggle("on", filtersOpen);
      button.setAttribute("aria-expanded", String(filtersOpen));
    }
  }
  function clearFilters() {
    filters = { search: "", gender: "all", stage: "all", status: "all" };
    $("inv-q").value = "";
    $("inv-f-stage").value = "all";
    $("inv-f-status").value = "all";
    renderAll();
  }
  function toggle(id) {
    if (expanded.has(id)) expanded.delete(id); else expanded.add(id);
    renderList();
  }
  function setState(id, val) {
    const it = find(id); if (!it) return;
    it.purchased = val === "purchased";
    it.wanted = val === "wanted";
    it.canceled = false;
    save(); renderAll(); keepInView(id);
  }
  function setPriority(id, v) {
    const it = find(id); if (!it) return;
    it.priority = v; save(); renderList(); keepInView(id);
  }
  function setField(id, field, val) {
    const it = find(id); if (!it) return;
    it[field] = val; save();
    if (field === "cost50") { renderCost(); }
  }
  function toggleCancel(id) {
    const it = find(id); if (!it) return;
    it.canceled = !it.canceled;
    save(); renderAll(); keepInView(id);
    flash(it.canceled ? "تم إلغاء العطر" : "تمت إعادة العطر");
  }
  function remove(id) {
    const it = find(id); if (!it) return;
    if (!confirm(`حذف العطر: ${it.name}؟ لا يمكن التراجع.`)) return;
    items = items.filter(x => x.id !== id);
    expanded.delete(id);
    save(); renderAll(); flash("تم حذف العطر");
  }
  function openSheet() { const s = $("inv-sheet"); if (s) s.classList.add("show"); sheetOpen = true; }
  function closeSheet() { const s = $("inv-sheet"); if (s) s.classList.remove("show"); sheetOpen = false; }
  function add(ev) {
    ev.preventDefault();
    const gender = $("inv-n-gender").value;
    const brand = $("inv-n-brand").value.trim();
    const name = $("inv-n-name").value.trim();
    if (!gender || !brand || !name) { alert("اختر القسم واكتب الماركة واسم العطر."); return; }
    const state = $("inv-n-state").value;
    const it = normalize({
      id: `custom_${Date.now()}`, gender, brand, name,
      stage: $("inv-n-stage").value,
      priority: Number($("inv-n-priority").value),
      purchased: state === "purchased", wanted: state === "wanted"
    });
    items.push(it);
    save();
    ev.target.reset();
    closeSheet();
    clearFilters();
    expanded.add(it.id);
    renderList();
    keepInView(it.id);
    flash("تمت إضافة العطر ✓");
  }
  function exportData() {
    save();
    const payload = { app: "Kuwait Perfume Manager", version: 4, exportedAt: new Date().toISOString(), perfumes: items };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `kuwait-perfumes-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
    flash("تم تصدير النسخة الاحتياطية ✓");
  }
  function importData(ev) {
    const file = ev.target.files && ev.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        const list = Array.isArray(parsed) ? parsed : parsed.perfumes;
        if (!Array.isArray(list)) throw new Error("bad format");
        if (!confirm(`سيتم استبدال القائمة الحالية بـ ${list.length} عطر من الملف. متأكد؟`)) return;
        items = list.map(normalize);
        expanded.clear();
        save(); clearFilters();
        flash("تم استيراد البيانات بنجاح ✓");
      } catch (e) {
        alert("تعذر استيراد الملف. تأكد أنه ملف النسخة الاحتياطية الصحيح.");
      } finally { ev.target.value = ""; }
    };
    reader.readAsText(file, "UTF-8");
  }
  function resetDefaults() {
    if (!confirm("سيتم حذف التعديلات الحالية وإرجاع القائمة الأصلية. هل أنت متأكد؟")) return;
    items = defaults(); expanded.clear();
    save(); clearFilters(); flash("تمت استعادة القائمة الأصلية ✓");
  }

  // ── Public ──
  function init() {
    if (ready) return;
    items = load();
    shell();
    renderAll();
    ready = true;
  }
  function show() { init(); renderAll(); }
  // يرجع true إذا تعامل مع زر الرجوع بنفسه
  function back() {
    if (!ready) return false;
    if (sheetOpen) { closeSheet(); return true; }
    if (filtersOpen) { toggleFilters(); return true; }
    if (expanded.size) { expanded.clear(); renderList(); return true; }
    if (filtersActive()) { clearFilters(); return true; }
    return false;
  }
  function canBack() { return ready && (sheetOpen || filtersOpen || expanded.size > 0 || !!filtersActive()); }

  return {
    init, show, back, canBack,
    setFilter, setView, toggleFilters, clearFilters, toggle, setState, setPriority, setField,
    toggleCancel, remove, openSheet, closeSheet, add,
    exportData, importData, resetDefaults
  };
})();
