import test from 'node:test';
import assert from 'node:assert/strict';
import { getRankFromXp, getNextRankProgress, RANKS } from './progression.ts';

test('progression starts at Recruit with 0 XP', () => {
  const rank = getRankFromXp(0);
  assert.equal(rank.title, 'Recruit');
  assert.equal(rank.level, 1);
});

test('progression promotes to Apprentice at 300 XP', () => {
  const rank = getRankFromXp(350);
  assert.equal(rank.title, 'Apprentice');
  assert.equal(rank.level, 2);
});

test('progression promotes to Master Systems Engineer at top tier', () => {
  const rank = getRankFromXp(40000);
  assert.equal(rank.title, 'Master Systems Engineer');
  assert.equal(rank.level, 13);
});

test('getNextRankProgress calculates percentage accurately', () => {
  // Recruit to Apprentice is 0 to 300 XP. At 150 XP, exactly 50%.
  const progress = getNextRankProgress(150);
  assert.equal(progress.currentRank.title, 'Recruit');
  assert.equal(progress.nextRank?.title, 'Apprentice');
  assert.equal(progress.percent, 50);
  assert.equal(progress.xpNeededForNext, 150);
});

test('getNextRankProgress handles max rank without errors', () => {
  const progress = getNextRankProgress(50000);
  assert.equal(progress.currentRank.title, 'Master Systems Engineer');
  assert.equal(progress.nextRank, null);
  assert.equal(progress.percent, 100);
});
