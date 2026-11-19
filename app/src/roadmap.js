// roadmap.js — the eight stages to the platinum, built from the official descriptions.
// Each stage lists the trophy ids it covers (by the "roadmap" field in trophies.json).
export const ROADMAP_STAGES = [
  {
    title: 'Before you start — saves and settings',
    text: 'Keep a manual save at the start of every chapter and one before the final mission. Guides report there is no mission replay, so a save is your only way back to a chapter. Do not turn cheats on: guides report cheats disable trophies, and you cannot save once one is used.',
    trophies: [],
  },
  {
    title: 'Play the story — Chapters 1 to 4 and the final mission',
    text: 'Finish the story in order. Every chapter trophy and every named-mission trophy pops as you play, and they are all unmissable. While you are in Chapter 1, meditate at Lucia’s balcony spot — it is the one meditation spot guides say may not return. Once Chapter 2 opens, both protagonists are playable and most of the open world unlocks.',
    trophies: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  },
  {
    title: 'Side-character finales and stranger strands',
    text: 'Finish the mission strands for Andy, Kenton, Billy, Randy and Tyrone, hunt the unique animal for Bret, and complete 8 stranger strands across Leonida. Take these missions whenever they appear rather than leaving them all for after the story — the finales are unmissable, but the strands are spread across the whole state.',
    trophies: [22, 23, 24, 25, 26, 27, 29],
  },
  {
    title: 'Explore Leonida and collect',
    text: 'Sweep the map region by region: all 52 areas, all 18 meditation spots, 100 WAiNK It locations, 100 vehicles discovered, 3 card sets, and 10 vehicles registered to the Scooter Bros app. One drive can feed four trophies at once — explore, photograph, meditate and sample every vehicle you meet.',
    trophies: [28, 30, 31, 35, 42, 55],
  },
  {
    title: 'Activities and combat',
    text: 'The grind stage: 250 stunts, gold in all 42 Shooting Range challenges, drone-race wins at all 14 locations, 20 different races won, a fishing win over Cal, an arcade game, a bowling game, 50 challenges, 5 enemies in one Combat Focus, and the partner wanted-level escape. Work through them one activity at a time; every one can be retried on the spot.',
    trophies: [15, 16, 17, 18, 19, 20, 21, 32, 33, 36, 38, 46, 51],
  },
  {
    title: 'Robberies',
    text: 'Five bank vaults, one armored truck, one jewelry store robbed without being detected, three shops back-to-back with your partner while keeping the wanted level, and one illegal operation for each of the 9 gangs. Plan an escape vehicle for every job — the trophy pops on the getaway, not on the grab.',
    trophies: [34, 39, 40, 41, 43],
  },
  {
    title: 'Money and property',
    text: 'Launder $250,000 of marked bills through your contacts, spend $100,000 across all shops, and buy all 8 garage properties. The heists and robberies fund this stage, so it comes naturally late — launder after every big score and buy garages as the money lands.',
    trophies: [52, 53, 54],
  },
  {
    title: 'Odds, ends and 100%',
    text: 'Mop up the cryptic trophies — the Ocean Beach cocktail, the showroom smash, the unscheduled VCIA departure, the Rhinos, and the strange-encounter trophies whose descriptions are the only confirmed hint — then check the in-game stats for what 100% completion still needs. The platinum pops the moment the last of the other 54 is earned.',
    trophies: [1, 14, 37, 44, 45, 47, 48, 49, 50],
  },
];

export function stageTrophies(stage, trophies) {
  const byId = new Map(trophies.map((t) => [t.id, t]));
  return stage.trophies.map((id) => byId.get(id)).filter(Boolean);
}
