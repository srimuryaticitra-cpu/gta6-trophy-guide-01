// filters.js — search, grade, kind and earned-state filtering for the checklist.
export const KIND_LABELS = {
  story: 'Story',
  missable: 'Missable',
  collectibles: 'Collectibles',
  activities: 'Activities',
  exploration: 'Exploration',
  robbery: 'Robbery',
  money: 'Money',
  misc: 'Odds & ends',
  online: 'Online',
  platinum: 'Platinum',
  completion: '100% completion',
};

export function kindLabel(kind) {
  return KIND_LABELS[kind] || kind;
}

// state: { query, grade, kind, unearnedOnly, earned }
export function applyFilters(trophies, state) {
  const q = state.query.trim().toLowerCase();
  return trophies.filter((t) => {
    if (state.grade !== 'all' && t.grade !== state.grade) return false;
    if (state.kind === 'missable' && !t.missable) return false;
    if (state.kind === 'online') return false; // no online trophies exist in this list
    if (state.kind !== 'all' && state.kind !== 'missable' && state.kind !== 'online' && t.kind !== state.kind) return false;
    if (state.unearnedOnly && state.earned.has(t.name)) return false;
    if (q && !(t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q))) return false;
    return true;
  });
}

export function countByGrade(trophies, earned) {
  const out = {};
  for (const t of trophies) {
    out[t.grade] = out[t.grade] || { total: 0, earned: 0 };
    out[t.grade].total += 1;
    if (earned.has(t.name)) out[t.grade].earned += 1;
  }
  return out;
}
