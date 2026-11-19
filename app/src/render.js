// render.js — paints the checklist, the detail panel, the roadmap and the missables view.
// The spoiler setting hides the name and description of hidden story trophies until earned.
import { kindLabel, countByGrade } from './filters.js';
import { ROADMAP_STAGES, stageTrophies } from './roadmap.js';

export function spoilerHidden(trophy, spoilerOn, earned) {
  return spoilerOn && trophy.hidden && !earned.has(trophy.name);
}

export function renderProgress(trophies, earned) {
  const total = trophies.length;
  document.getElementById('progressText').textContent = `${earned.size} of ${total} earned`;
  document.getElementById('barFill').style.width = `${total ? Math.round((earned.size / total) * 100) : 0}%`;
  const counts = countByGrade(trophies, earned);
  const order = ['platinum', 'gold', 'silver', 'bronze'];
  document.getElementById('gradeCounts').textContent = order
    .filter((g) => counts[g])
    .map((g) => `${counts[g].earned}/${counts[g].total} ${g}`)
    .join(' · ');
}

export function renderList(listEl, metaEl, trophies, state, selectedId, onSelect, onToggle) {
  listEl.replaceChildren();
  for (const t of trophies) {
    const li = document.createElement('li');
    if (t.name && state.earned.has(t.name)) li.classList.add('earned');
    if (t.id === selectedId) li.classList.add('selected');
    const box = document.createElement('input');
    box.type = 'checkbox';
    box.checked = state.earned.has(t.name);
    box.setAttribute('aria-label', `Earned: ${t.name}`);
    box.addEventListener('change', (e) => { e.stopPropagation(); onToggle(t, box.checked); });
    box.addEventListener('click', (e) => e.stopPropagation());
    const main = document.createElement('div');
    main.className = 't-main';
    const name = document.createElement('div');
    name.className = 't-name';
    name.textContent = spoilerHidden(t, state.spoilerOn, state.earned) ? 'Hidden trophy — earn it to reveal' : t.name;
    const desc = document.createElement('div');
    desc.className = 't-desc';
    desc.textContent = spoilerHidden(t, state.spoilerOn, state.earned) ? 'A hidden story trophy. Its name and description stay hidden until earned.' : t.description;
    const meta = document.createElement('div');
    meta.className = 't-meta';
    const badge = document.createElement('span');
    badge.className = `grade-badge grade-${t.grade}`;
    badge.textContent = t.grade;
    meta.append(badge);
    const kind = document.createElement('span');
    kind.className = 'flag flag-kind';
    kind.textContent = kindLabel(t.kind);
    meta.append(kind);
    if (t.hidden) {
      const h = document.createElement('span');
      h.className = 'flag flag-hidden';
      h.textContent = 'Hidden';
      meta.append(h);
    }
    if (t.missable) {
      const m = document.createElement('span');
      m.className = 'flag flag-missable';
      m.textContent = 'Possibly missable';
      meta.append(m);
    }
    if (t.count) {
      const c = document.createElement('span');
      c.textContent = ` · ${t.count.toLocaleString('en-US')} to go`;
      meta.append(c);
    }
    main.append(name, desc, meta);
    li.append(box, main);
    li.addEventListener('click', () => onSelect(t));
    listEl.append(li);
  }
  metaEl.textContent = `Showing ${trophies.length} of ${state.total} trophies` +
    (state.earned.size ? ` · ${state.earned.size} earned` : '');
}

export function renderDetail(detailEl, trophy, state, onToggle) {
  detailEl.replaceChildren();
  if (!trophy) {
    const p = document.createElement('p');
    p.className = 'detail-empty';
    p.textContent = 'Select a trophy on the left to read its guide and sources.';
    detailEl.append(p);
    return;
  }
  const hidden = spoilerHidden(trophy, state.spoilerOn, state.earned);
  const h2 = document.createElement('h2');
  h2.textContent = hidden ? 'Hidden trophy' : trophy.name;
  const badges = document.createElement('p');
  const badge = document.createElement('span');
  badge.className = `grade-badge grade-${trophy.grade}`;
  badge.textContent = trophy.grade;
  badges.append(badge);
  const kind = document.createElement('span');
  kind.className = 'flag flag-kind';
  kind.textContent = kindLabel(trophy.kind);
  badges.append(kind);
  if (trophy.hidden) {
    const h = document.createElement('span');
    h.className = 'flag flag-hidden';
    h.textContent = 'Hidden on PlayStation';
    badges.append(h);
  }
  if (trophy.missable) {
    const m = document.createElement('span');
    m.className = 'flag flag-missable';
    m.textContent = 'Possibly missable';
    badges.append(m);
  }
  const official = document.createElement('p');
  official.className = 'official';
  official.textContent = hidden
    ? 'Official description hidden until earned (spoiler setting is on).'
    : `Official description: “${trophy.description}”`;
  detailEl.append(h2, badges, official);
  if (trophy.missable && trophy.missableNote) {
    const warn = document.createElement('p');
    warn.className = 'missable-warning';
    warn.textContent = trophy.missableNote;
    detailEl.append(warn);
  }
  const gh = document.createElement('h3');
  gh.textContent = 'Guide';
  const guide = document.createElement('p');
  guide.textContent = trophy.guide;
  detailEl.append(gh, guide);
  const sh = document.createElement('h3');
  sh.textContent = 'Sources';
  const list = document.createElement('ul');
  list.className = 'sources';
  for (const s of trophy.sources || []) {
    const li = document.createElement('li');
    const urlMatch = typeof s === 'string' ? s.match(/(https?:\/\/\S+)/) : null;
    if (urlMatch) {
      li.append(document.createTextNode(s.slice(0, urlMatch.index)));
      const a = document.createElement('a');
      a.href = urlMatch[0];
      a.textContent = urlMatch[0];
      a.target = '_blank';
      a.rel = 'noopener';
      li.append(a);
      const tail = s.slice(urlMatch.index + urlMatch[0].length);
      if (tail) li.append(document.createTextNode(tail));
    } else {
      li.textContent = s;
    }
    list.append(li);
  }
  detailEl.append(sh, list);
  const line = document.createElement('p');
  line.className = 'earn-line';
  const btn = document.createElement('button');
  btn.type = 'button';
  const isEarned = state.earned.has(trophy.name);
  btn.textContent = isEarned ? 'Mark as not earned' : 'Mark as earned';
  btn.addEventListener('click', () => onToggle(trophy, !isEarned));
  line.append(btn);
  detailEl.append(line);
}

export function renderRoadmap(stagesEl, trophies, earned) {
  stagesEl.replaceChildren();
  for (const stage of ROADMAP_STAGES) {
    const li = document.createElement('li');
    const h3 = document.createElement('h3');
    h3.textContent = stage.title;
    const p = document.createElement('p');
    p.textContent = stage.text;
    li.append(h3, p);
    const covered = stageTrophies(stage, trophies);
    if (covered.length) {
      const ul = document.createElement('ul');
      for (const t of covered) {
        const item = document.createElement('li');
        const mark = earned.has(t.name) ? '✓ ' : '○ ';
        item.textContent = `${mark}${t.name} — ${t.grade}`;
        ul.append(item);
      }
      li.append(ul);
    }
    stagesEl.append(li);
  }
}

export function renderMissables(listEl, trophies) {
  listEl.replaceChildren();
  const missable = trophies.filter((t) => t.missable);
  for (const t of missable) {
    const li = document.createElement('li');
    const name = document.createElement('strong');
    name.textContent = `${t.name} (${t.grade})`;
    const p = document.createElement('p');
    p.textContent = t.missableNote || t.guide;
    li.append(name, p);
    listEl.append(li);
  }
  if (!missable.length) {
    const li = document.createElement('li');
    li.textContent = 'No trophy is confirmed missable.';
    listEl.append(li);
  }
}
