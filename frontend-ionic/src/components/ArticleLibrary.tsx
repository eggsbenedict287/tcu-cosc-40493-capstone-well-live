import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { Answers } from '../api';
import { ARTICLES, getArticleFeed, WellnessArticle } from '../data/articles';
import './ArticleLibrary.css';

interface Props { answers: Answers }

const ArticleLibrary: React.FC<Props> = ({ answers }) => {
  const [selected, setSelected] = useState<WellnessArticle | null>(null);
  const [showAll, setShowAll] = useState(false);
  const detailHeading = useRef<HTMLHeadingElement>(null);
  const lastOpenedId = useRef<string | null>(null);
  const cardButtons = useRef<Record<string, HTMLButtonElement | null>>({});
  const feed = useMemo(() => getArticleFeed(answers), [answers]);
  const hasMatches = feed.some((entry) => entry.related);
  const visibleFeed = showAll ? ARTICLES.map((article) => ({ article, related: false })) : feed;

  useEffect(() => {
    if (selected) {
      detailHeading.current?.focus();
    } else if (lastOpenedId.current) {
      cardButtons.current[lastOpenedId.current]?.focus();
    }
  }, [selected]);

  return (
    <section className="wl-library" aria-label="Wellness article library">
      <p className="wl-library__notice">Demo library · Content and topic matching awaiting team review</p>
      {selected ? (
        <article className="wl-reader">
          <button className="wl-button wl-button--outline" type="button" onClick={() => setSelected(null)}>
            ← Back to articles
          </button>
          <p className="wl-topic">{selected.topic}</p>
          <h2 tabIndex={-1} ref={detailHeading}>{selected.title}</h2>
          <p className="wl-source">Source: {selected.sourceName}</p>
          <p className="wl-reader__intro">{selected.summary}</p>
          <p className="wl-reader__caption">Well Live resource overview · The complete source opens separately.</p>
          {selected.sections.map((section) => (
            <section key={section.heading}>
              <h3>{section.heading}</h3>
              <p>{section.text}</p>
            </section>
          ))}
          <div className="wl-source-box">
            <h3>Continue at the original source</h3>
            <p>You are leaving Well Live. The source opens in a new tab.</p>
            <a className="wl-button" href={selected.sourceUrl} target="_blank"
              rel="noopener noreferrer" referrerPolicy="no-referrer">
              Open original resource ↗
            </a>
          </div>
          <p className="wl-disclaimer">For education only. This information does not diagnose a condition or replace professional medical advice.</p>
        </article>
      ) : (
        <>
          <header className="wl-library__header">
            <p className="wl-eyebrow">Learn at your own pace</p>
            <h2>Explore wellness articles</h2>
            <p>{hasMatches && !showAll
              ? 'Topics related to your selected concerns appear first. You can explore every resource.'
              : 'Showing general wellness resources. Explore whichever topics interest you.'}</p>
            <div className="wl-library__controls" aria-label="Article ordering">
              <button type="button" className="wl-button wl-button--outline"
                aria-pressed={!showAll} onClick={() => setShowAll(false)}>For you</button>
              <button type="button" className="wl-button wl-button--outline"
                aria-pressed={showAll} onClick={() => setShowAll(true)}>All articles</button>
            </div>
          </header>
          <div className="wl-article-grid">
            {visibleFeed.map(({ article, related }) => (
              <article className="wl-article-card" key={article.id}>
                <p className="wl-topic">{article.topic}</p>
                <h3>{article.title}</h3>
                {related && <p className="wl-related">Related to your selected topics</p>}
                <p className="wl-article-card__summary">{article.summary}</p>
                <p className="wl-source">{article.sourceName}</p>
                <button type="button" className="wl-button" aria-label={`Read overview: ${article.title}`}
                  ref={(element) => { cardButtons.current[article.id] = element; }}
                  onClick={() => { lastOpenedId.current = article.id; setSelected(article); }}>
                  Read overview →
                </button>
              </article>
            ))}
          </div>
          <p className="wl-disclaimer">Educational resources, not a diagnosis or treatment recommendation. Skipped answers are never treated as a concern.</p>
        </>
      )}
    </section>
  );
};

export default ArticleLibrary;
