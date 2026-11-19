import { ARTICLES, getArticleFeed } from './articles';
import type { Answers } from '../api';

test('an explicit sleep concern ranks the sleep resource first', () => {
  const feed = getArticleFeed({ sleep_problems: { status: 'CONCERN' } });
  expect(feed[0].article.id).toBe('healthy-sleep');
  expect(feed[0].related).toBe(true);
});

test.each(['NO_CONCERN', 'SKIPPED', 'OTHER'] as const)(
  '%s does not cause personalization', (status) => {
    expect(getArticleFeed({ sleep_problems: { status, value: 'sleep' } })
      .some((entry) => entry.related)).toBe(false);
  },
);

test('empty, demographic, unknown, and free-text answers do not infer topics', () => {
  const cases: Answers[] = [{}, { age: { value: '42' } },
    { unknown: { status: 'CONCERN' } },
    { additional_lifestyle_needs: { value: 'exercise sleep nutrition' } }];
  for (const answers of cases) {
    const feed = getArticleFeed(answers);
    expect(feed).toHaveLength(ARTICLES.length);
    expect(feed.some((entry) => entry.related)).toBe(false);
  }
});

test('multiple matches appear once each and all resources remain browsable', () => {
  const feed = getArticleFeed({
    sleep_problems: { status: 'CONCERN' },
    diet_and_nutrition: { status: 'CONCERN' },
  });
  expect(feed.filter((entry) => entry.related).map((entry) => entry.article.id))
    .toEqual(['healthy-sleep', 'nutrition']);
  expect(new Set(feed.map((entry) => entry.article.id)).size).toBe(ARTICLES.length);
});

test('catalogue IDs are unique and sources use clean HTTPS links', () => {
  expect(new Set(ARTICLES.map((article) => article.id)).size).toBe(ARTICLES.length);
  ARTICLES.forEach((article) => {
    const url = new URL(article.sourceUrl);
    expect(url.protocol).toBe('https:');
    expect(url.hostname).toBe('medlineplus.gov');
    expect(url.search).toBe('');
    expect(article.sections.length).toBeGreaterThan(0);
  });
});
