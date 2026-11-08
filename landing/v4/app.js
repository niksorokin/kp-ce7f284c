(() => {
  const I = id => `<svg class="i"><use href="#i-${id}"/></svg>`;
  const LG = n => `<svg class="lg"><use href="#lg-${n}"/></svg>`;
  const META = {"w-d01":[2000,1250],"w-d03":[2000,1250],"w-d21":[2000,1250],"w-d05":[2000,1250],"w-d40":[2000,1250],"w-d35":[2000,1250],"w-d27":[2000,1250],"w-x-company":[2000,1250],"w-x-subs":[2000,1250],"w-d47":[2000,1250],"w-d50":[2000,1250],"w-d39":[2000,1250],"w-d36":[2000,1250],"w-d17":[2000,1250],"w-d38":[2000,1250],"w-d06":[2000,1250],"c-lighter":[1400,1039],"c-rec":[1380,1056],"c-builder":[880,1352],"c-approve":[1380,1000],"c-pause":[1400,656],"c-rui":[1400,517],"c-week":[960,1040],"c-botcards":[1400,329],"m-m01":[780,1688],"m-m03":[780,1688],"m-m05":[780,1688],"m-m17":[780,1688],"m-m21":[780,1688],"m-m27":[780,1688],"m-m35":[780,1688],"m-m39":[780,1688],"m-m40":[780,1688],"m-m47":[780,1688],"m-m53":[780,1688],"c-subs":[1400,986],"c-apps":[1600,1182]};
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const narrow = () => matchMedia('(max-width: 700px)').matches;

  /* A real v11 screen: desktop window, or the phone capture on small screens when we have one. */
  const MOBILE = { d01: 'm01', d03: 'm03', d05: 'm05', d21: 'm21', d27: 'm27', d35: 'm35', d39: 'm39', d40: 'm40', d47: 'm47', 'x-company': 'm53' };
  const ALT = {
    d01: 'Silow new chat: Good afternoon, Alex, with three suggestions from recorded work',
    d03: 'A chat with Metrics bot that changes the Monday digest',
    d21: 'Files: a tree of Company, Projects and Mine pages',
    d05: 'Knowledge: Northwind’s weekly report',
    d40: 'Apps: Company, project and personal apps with previews',
    d35: 'Bots gallery with Silow suggestions and plush bot faces',
    d27: 'Agents and skills with Silow suggestions',
    'x-company': 'Company home: needs you, bots and chats',
    'x-subs': 'Subscriptions: Claude Team, ChatGPT Business, DeepSeek pool and a shared Gemini plan',
    d47: 'Investors chat with the Investor tracker app open beside it',
    d50: 'Three panes: chat, launch plan page and tasks',
  };
  function shotHTML(key, eager, phone) {
    const m = MOBILE[key], w = META['w-' + key], ld = eager ? 'eager' : 'lazy';
    if (phone && m && META['m-' + m]) return `<img src="assets/img/m-${m}.webp" width="780" height="1688" alt="${ALT[key] || ''}" loading="${ld}" decoding="async">`;
    return `<img src="assets/img/w-${key}.webp" width="${w[0]}" height="${w[1]}" alt="${ALT[key] || ''}" loading="${ld}" decoding="async">`;
  }
  function paintShot(el, key, eager) {
    const phone = narrow() && MOBILE[key];
    el.innerHTML = phone ? `<div class="phone">${shotHTML(key, eager, true)}</div>` : `<div class="shot">${shotHTML(key, eager)}</div>`;
  }
  document.querySelectorAll('[data-shot]').forEach((el, i) => paintShot(el, el.dataset.shot, i === 0));
  document.querySelectorAll('[data-crop]').forEach(el => {
    const k = el.dataset.crop, w = META[k];
    el.innerHTML = `<div class="shot"><img src="assets/img/${k}.webp" width="${w[0]}" height="${w[1]}" alt="" loading="lazy" decoding="async"></div>`;
  });

  /* ───── Everything in one place: the real sidebar as a map ───── */
  const PLACES = [
    ['i-chat', 'New chat', 'Every reply can do something.', 'private ChatGPT tabs', 'd03', 'Ask in plain words. Silow answers, or hands the job to the right bot or agent.'],
    ['i-file', 'Files', 'Pages your agents can read.', 'links lost in Slack', 'd21', 'A Notion-like tree for Company, Projects and Mine. @ a page in any chat.'],
    ['i-map', 'Knowledge', 'How the team really works, every week.', 'guessing', 'd05', 'Weekly reports per person, team and company, from recorded work.'],
    ['i-grid', 'Apps', 'CRM, tasks and trackers, built from chats.', 'another SaaS seat', 'd40', 'Company, project and personal apps, each with a live preview.'],
    ['i-bot', 'Bots', 'Recurring work with a face and a schedule.', 'the Zap nobody owns', 'd35', 'Talk to a bot, change it, give it a schedule. It asks before it sends.'],
    ['i-at', 'Agents & skills', '@Analyst, @Researcher, /customer-call-notes.', 'prompts in a doc', 'd27', 'Call an agent like a teammate. Import a skill and the whole team can use it.'],
    ['i-co', 'Company', 'The home above every project.', 'a wiki nobody opens', 'x-company', 'What needs you, the company’s bots, apps and chats, in one view.'],
    ['i-plug', 'Subscriptions', 'The AI plans you already pay for.', 'four bills, no sharing', 'x-subs', 'Claude, ChatGPT, Gemini, DeepSeek or your keys. You see who pays.'],
  ];
  const side = document.getElementById('mapSide'), frame = document.getElementById('mapFrame'), mline = document.getElementById('mapLine'), map = document.getElementById('map');
  side.innerHTML = `<div class="brand"><img src="assets/silow-logo.svg" alt="">silow</div>` +
    PLACES.map((p, i) => `${i === 6 ? '<div class="sep"></div>' : ''}<button class="mrow" role="tab" type="button" data-i="${i}" aria-selected="${i === 0}"><svg class="i"><use href="#${p[0]}"/></svg><b>${p[1]}</b><span class="why">${p[2]}<br><s>instead of ${p[3]}</s></span><span class="prog"><i></i></span></button>`).join('') +
    `<div class="ctl"><button type="button" id="mapPlay" aria-label="Pause">${I('pause')}</button><span>8 places, one sidebar</span></div>`;
  let cur = 0, timer = null, playing = !reduce, seen = false;
  frame.className = 'frame big';
  frame.innerHTML = `<div class="shot">${shotHTML(PLACES[0][4], false)}</div>`;
  function showPlace(i) {
    cur = i;
    side.querySelectorAll('.mrow').forEach((b, j) => {
      b.setAttribute('aria-selected', j === i);
      const p = b.querySelector('.prog i'); p.style.animation = 'none'; void p.offsetWidth; p.style.animation = '';
    });
    const img = frame.querySelector('img');
    const next = () => { paintShot(frame, PLACES[i][4]); frame.className = 'frame big'; };
    if (img && !reduce) { img.classList.add('fade'); setTimeout(next, 220); } else next();
    mline.innerHTML = `<b>${PLACES[i][1]}.</b> ${PLACES[i][5]}`;
    if (narrow()) { const b = side.children[i + 1 + (i >= 6 ? 1 : 0)]; b && side.scrollTo({ left: b.offsetLeft - 8, behavior: reduce ? 'auto' : 'smooth' }); }
    tick();
  }
  function tick() {
    clearTimeout(timer);
    map.classList.toggle('playing', playing && seen);
    if (playing && seen) timer = setTimeout(() => showPlace((cur + 1) % PLACES.length), 5000);
  }
  const playBtn = document.getElementById('mapPlay');
  function setPlaying(v) { playing = v; playBtn.innerHTML = I(v ? 'pause' : 'play'); playBtn.setAttribute('aria-label', v ? 'Pause' : 'Play'); tick(); }
  side.addEventListener('click', e => {
    if (e.target.closest('#mapPlay')) { setPlaying(!playing); return; }
    const b = e.target.closest('.mrow'); if (!b) return; setPlaying(false); showPlace(+b.dataset.i);
  });
  map.addEventListener('mouseenter', () => { if (playing) { clearTimeout(timer); map.classList.remove('playing'); } });
  map.addEventListener('mouseleave', tick);
  new IntersectionObserver(es => es.forEach(e => { seen = e.isIntersecting; tick(); }), { threshold: .35 }).observe(map);
  if (!playing) playBtn.innerHTML = I('play');
  showPlace(0);

  /* ───── Loop: sticky stage follows the step in view ───── */
  const steps = [...document.querySelectorAll('#loopSteps li')], stages = [...document.querySelectorAll('.loop-sticky .frame')];
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const i = +e.target.dataset.i;
    steps.forEach((s, j) => s.classList.toggle('on', j === i));
    stages.forEach((s, j) => s.classList.toggle('show', j === i));
  }), { rootMargin: '-45% 0px -45% 0px' });
  steps.forEach(s => io.observe(s));

  /* ───── Bots: the cast ───── */
  const BOTS = [
    ['morning-brief', 'Morning brief', 'next', 'Next 08:00', 'I put your day in five lines: two calls, one contract to sign, and Ines is waiting on you.'],
    ['standup-bot', 'Standup bot', 'run', 'Collecting · 3 of 5', 'Three of five updates are in. I’ll nudge Mark and Sofia at 9:50 and post at 10:00.'],
    ['support-bot', 'Support bot', 'wait', 'Waiting for you', 'I refreshed 9 FAQ articles. They’re waiting for Mark before they go to Intercom.'],
    ['metrics-bot', 'Metrics bot', 'next', 'Next Mon 09:00', 'Two accounts were flagged in the churn check. I posted them to #weekly-metrics, nowhere else.'],
    ['lead-qualifier', 'Lead qualifier', '', 'Paused', 'I’m paused until someone reconnects HubSpot. Nothing is lost; 4 leads are queued.'],
  ];
  const cast = document.getElementById('cast'), castLine = document.getElementById('castLine');
  cast.innerHTML = BOTS.map((b, i) => `<button class="bot" type="button" data-i="${i}"><img src="assets/bots/${b[0]}-face.webp" alt="" width="96" height="96" loading="lazy"><b>${b[1]}</b><span class="st ${b[2]}">${b[3]}</span></button>`).join('');
  const say = i => { cast.querySelectorAll('.bot').forEach((b, j) => b.classList.toggle('on', j === i)); castLine.innerHTML = `${BOTS[i][1]}: <q>${BOTS[i][4]}</q>`; };
  cast.addEventListener('mouseover', e => { const b = e.target.closest('.bot'); if (b) say(+b.dataset.i); });
  cast.addEventListener('focusin', e => { const b = e.target.closest('.bot'); if (b) say(+b.dataset.i); });
  cast.addEventListener('click', e => { const b = e.target.closest('.bot'); if (b) say(+b.dataset.i); });
  document.getElementById('faces').innerHTML = BOTS.map(b => `<img src="assets/bots/${b[0]}-face.webp" alt="" width="64" height="64" loading="lazy">`).join('');

  /* ───── Models ───── */
  document.getElementById('mtiles').innerHTML = [['claude', 'Claude'], ['openai', 'ChatGPT'], ['gemini', 'Gemini'], ['deepseek', 'DeepSeek'], ['mistral', 'Mistral']]
    .map(([k, n]) => `<span class="mt"><span>${LG(k)}</span>${n}</span>`).join('') + `<span class="mt keys"><span>${I('plug')}</span>Your keys</span>`;

  /* ───── Re-pick desktop/phone captures when crossing the breakpoint ───── */
  let wasNarrow = narrow();
  addEventListener('resize', () => {
    if (narrow() === wasNarrow) return; wasNarrow = narrow();
    document.querySelectorAll('[data-shot]').forEach(el => paintShot(el, el.dataset.shot));
    showPlace(cur);
  });

  /* ───── Reveal ───── */
  const rv = document.querySelectorAll('.rv');
  const rio = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); rio.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
  rv.forEach(el => rio.observe(el));
  setTimeout(() => rv.forEach(el => el.classList.add('in')), 3000);

  /* ───── Waitlist (draft: nothing is sent) ───── */
  const email = document.getElementById('email'), out = document.getElementById('joined');
  function join() {
    const v = email.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) { out.textContent = 'Enter a work email to join.'; email.focus(); return; }
    out.textContent = `Thanks, ${v} is on the list. (Draft page: nothing was sent.)`;
    email.value = '';
  }
  document.getElementById('joinBtn').addEventListener('click', join);
  email.addEventListener('keydown', e => { if (e.key === 'Enter') join(); });
})();
