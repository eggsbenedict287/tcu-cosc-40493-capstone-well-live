import type { Answers } from '../api';

export interface WellnessArticle {
  id: string;
  title: string;
  topic: string;
  summary: string;
  sourceName: string;
  sourceUrl: string;
  sections: { heading: string; text: string }[];
}

// Demo catalogue. Summaries and mappings need team/client review before publication.
// These are original resource overviews, not copies of full external articles.
export const ARTICLES: WellnessArticle[] = [
  {
    id: 'healthy-sleep', title: 'Healthy Sleep', topic: 'Sleep',
    summary: 'Explore an introduction to sleep, its role in daily life, and resources about sleep habits.',
    sourceName: 'MedlinePlus · National Library of Medicine',
    sourceUrl: 'https://medlineplus.gov/healthysleep.html',
    sections: [
      { heading: 'About this resource', text: 'The MedlinePlus Healthy Sleep page introduces sleep and explains how it supports the body and brain. It also links to information about sleep habits and sleep-related questions.' },
      { heading: 'Explore the topic', text: 'Use the original resource to explore sleep stages, sleep needs, and related educational material. Its links lead to more detailed resources for different age groups.' },
      { heading: 'Keep learning', text: 'This overview is a starting point. Open the original resource below to read the source material and explore its references.' },
    ],
  },
  {
    id: 'nutrition', title: 'Nutrition', topic: 'Nutrition',
    summary: 'Find an overview of nutrients, food choices, and further reading about nutrition.',
    sourceName: 'MedlinePlus · National Library of Medicine',
    sourceUrl: 'https://medlineplus.gov/nutrition.html',
    sections: [
      { heading: 'About this resource', text: 'MedlinePlus introduces nutrition and the nutrients in foods and drinks. The page connects readers to additional material about eating patterns and nutrition across life stages.' },
      { heading: 'Explore the topic', text: 'Browse the original resource for information about food groups, nutrients, and educational tools. Food preferences, culture, and budget are also part of its introduction to healthy eating.' },
      { heading: 'Keep learning', text: 'Open the original page for its full explanation and linked resources. This overview does not prescribe a diet or interpret your assessment answers.' },
    ],
  },
  {
    id: 'physical-activity', title: 'Exercise and Physical Fitness', topic: 'Activity',
    summary: 'Browse an introduction to physical activity, different types of exercise, and fitness resources.',
    sourceName: 'MedlinePlus · National Library of Medicine',
    sourceUrl: 'https://medlineplus.gov/exerciseandphysicalfitness.html',
    sections: [
      { heading: 'About this resource', text: 'The MedlinePlus physical fitness page describes exercise and introduces different kinds of activity. It brings together further reading, videos, and educational tools.' },
      { heading: 'Explore the topic', text: 'The original page explains basic fitness ideas and links to material about incorporating activity into everyday life. You can explore the linked resources at your own pace.' },
      { heading: 'Keep learning', text: 'Open the source below for the full discussion. This resource overview is not an individualized exercise plan.' },
    ],
  },
  {
    id: 'understanding-stress', title: 'Stress', topic: 'Emotional wellbeing',
    summary: 'Read an introduction to stress and explore links to further educational information.',
    sourceName: 'MedlinePlus · National Library of Medicine',
    sourceUrl: 'https://medlineplus.gov/stress.html',
    sections: [
      { heading: 'About this resource', text: 'MedlinePlus explains stress as a response to challenges or demands. It introduces short-term and longer-lasting stress and links to additional information.' },
      { heading: 'Explore the topic', text: 'The source page includes educational material about recognizing stress and learning more about coping resources. Read the original resource for its complete explanation and references.' },
      { heading: 'Keep learning', text: 'This overview does not label your feelings or infer a condition from your answers. Use the source link to continue learning about the topic.' },
    ],
  },
];

// Deliberately small proposed mapping using existing questionnaire IDs only.
// Do not infer topics from demographics, symptom combinations, or free text.
const ARTICLE_BY_CONCERN: Record<string, string> = {
  sleep_problems: 'healthy-sleep',
  diet_and_nutrition: 'nutrition',
  exercise_and_activity: 'physical-activity',
  worry_fear_or_anxiety: 'understanding-stress',
};

export function getArticleFeed(answers: Answers): { article: WellnessArticle; related: boolean }[] {
  const relatedIds = new Set(Object.keys(ARTICLE_BY_CONCERN)
    .filter((id) => answers[id]?.status === 'CONCERN')
    .map((id) => ARTICLE_BY_CONCERN[id]));
  const feed = ARTICLES.map((article) => ({ article, related: relatedIds.has(article.id) }));
  // Preserve catalogue order within each group for predictable, repeatable results.
  return [...feed.filter((entry) => entry.related), ...feed.filter((entry) => !entry.related)];
}
