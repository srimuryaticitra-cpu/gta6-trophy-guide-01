// main.js — boots Kura Trophy Atlas: loads the trophy data, wires the tracker,
// filters, spoiler setting, views and screenshot states (?shot=guide|roadmap|tracker|filters).
import { loadEarned, saveEarned, loadSettings, saveSettings, exportProgress, importProgressFile } from './storage.js';
import { applyFilters } from './filters.js';
import { renderProgress, renderList, renderDetail, renderRoadmap, renderMissables } from './render.js';

const params = new URLSearchParams(location.search);
const shot = params.get('shot');
const SHOT_EARNED = ['Just Like Paradise', 'Paradise Lost', 'Cunning Stunts', 'Stick Fiddler', 'The Goodtime State', 'Whip It Good', 'Treat Yo Self', 'Little Boxes', 'On the Spot'];

const state = {
  trophies: [],
  earned: loadEarned(),
  selectedId: null,
  view: 'checklist',
  query: '',
  grade: 'all',
  kind: 'all',
  unearnedOnly: false,
  spoilerOn: true,
  total: 0,
};

const savedSettings = loadSettings();
if (typeof savedSettings.spoilerOn === 'boolean') state.spoilerOn = savedSettings.spoilerOn;

const listEl = document.getElementById('trophyList');
const metaEl = document.getElementById('listMeta');
const detailEl = document.getElementById('detail');
const searchEl = document.getElementById('search');
const gradeEl = document.getElementById('grade');
const kindEl = document.getElementById('kind');
const unearnedEl = document.getElementById('unearnedOnly');
const spoilerEl = document.getElementById('spoiler');

function selectedTrophy() {
  return state.trophies.find((t) => t.id === state.selectedId) || null;
}

function renderAll() {
  const filtered = applyFilters(state.trophies, state);
  renderProgress(state.trophies, state.earned);
  renderList(listEl, metaEl, filtered, state, state.selectedId,
    (t) => { state.selectedId = t.id; renderAll(); },
    (t, checked) => toggleEarned(t, checked));
  renderDetail(detailEl, selectedTrophy(), state, (t, checked) => toggleEarned(t, checked));
  renderRoadmap(document.getElementById('stages'), state.trophies, state.earned);
  renderMissables(document.getElementById('missableList'), state.trophies);
  document.getElementById('missablePill').textContent = String(state.trophies.filter((t) => t.missable).length);
}

function toggleEarned(trophy, checked) {
  if (checked) state.earned.add(trophy.name);
  else state.earned.delete(trophy.name);
  saveEarned(state.earned);
  renderAll();
}

function setView(view) {
  state.view = view;
  document.querySelectorAll('.view-tab').forEach((b) => b.classList.toggle('active', b.dataset.view === view));
  document.getElementById('checklistView').hidden = view !== 'checklist';
  document.getElementById('detail').hidden = view !== 'checklist';
  document.getElementById('controls').style.display = view === 'checklist' ? '' : 'none';
  document.getElementById('roadmapView').hidden = view !== 'roadmap';
  document.getElementById('missablesView').hidden = view !== 'missables';
  document.querySelector('.layout').style.gridTemplateColumns = view === 'checklist' ? '' : '1fr';
}

document.querySelectorAll('.view-tab').forEach((b) => b.addEventListener('click', () => setView(b.dataset.view)));
searchEl.addEventListener('input', () => { state.query = searchEl.value; renderAll(); });
gradeEl.addEventListener('change', () => { state.grade = gradeEl.value; renderAll(); });
kindEl.addEventListener('change', () => {
  state.kind = kindEl.value;
  document.getElementById('onlineNote').hidden = state.kind !== 'online';
  renderAll();
});
unearnedEl.addEventListener('change', () => { state.unearnedOnly = unearnedEl.checked; renderAll(); });
spoilerEl.addEventListener('change', () => {
  state.spoilerOn = spoilerEl.checked;
  saveSettings({ spoilerOn: state.spoilerOn });
  renderAll();
});
document.getElementById('export').addEventListener('click', () => exportProgress(state.earned));
document.getElementById('import').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  try {
    state.earned = await importProgressFile(file, state.trophies.map((t) => t.name));
    saveEarned(state.earned);
    renderAll();
  } catch (err) {
    alert(`Could not import that file: ${err.message}`);
  }
  e.target.value = '';
});

spoilerEl.checked = state.spoilerOn;

async function loadTrophies() {
  const res = await fetch('data/trophies.json');
  if (!res.ok) throw new Error(`trophies.json failed: ${res.status}`);
  const doc = await res.json();
  return doc.trophies;
}

function applyShotState() {
  // Deterministic states for screenshots: ?shot=guide|roadmap|tracker|filters
  if (shot === 'tracker') {
    state.earned = new Set(SHOT_EARNED);
    saveEarned(state.earned);
    state.selectedId = 42;
  } else if (shot === 'guide') {
    // Show the real names in this shot so the checklist reads at a glance;
    // the spoiler toggle stays visible (off) beside the filters.
    state.spoilerOn = false;
    spoilerEl.checked = false;
    state.selectedId = 28;
  } else if (shot === 'roadmap') {
    setView('roadmap');
  } else if (shot === 'filters') {
    state.kind = 'missable';
    kindEl.value = 'missable';
    state.selectedId = 28;
  }
}

try {
  state.trophies = await loadTrophies();
  state.total = state.trophies.length;
  applyShotState();
  renderAll();
} catch (err) {
  detailEl.replaceChildren();
  const p = document.createElement('p');
  p.textContent = `Could not load the trophy list: ${err.message}`;
  detailEl.append(p);
}
window.__shotReady = true;
