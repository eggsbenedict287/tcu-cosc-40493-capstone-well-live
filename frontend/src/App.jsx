import { useState } from "react";

const sections = [
  {
    id: "wellbeing",
    title: "Wellbeing",
    items: [
      { id: "mood", text: "How are you feeling today?" },
      { id: "energy", text: "How would you describe your energy?" },
    ],
  },
  {
    id: "activity",
    title: "Activity",
    items: [
      { id: "movement", text: "How much physical activity do you get?" },
    ],
  },
];

function App() {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [reviewing, setReviewing] = useState(false);
  const [complete, setComplete] = useState(false);

  const section = sections[sectionIndex];

  function answer(itemId, value) {
    setAnswers((current) => ({ ...current, [itemId]: value }));
  }

  function skip(itemId) {
    answer(itemId, "Skipped");
  }

  function next() {
    if (sectionIndex < sections.length - 1) {
      setSectionIndex(sectionIndex + 1);
    } else {
      setReviewing(true);
    }
  }

  function confirm() {
    setComplete(true);
  }

  if (complete) {
    return (
      <main>
        <h1>Assessment complete</h1>
        <p>Your answers were recorded for this demonstration.</p>
      </main>
    );
  }

  if (reviewing) {
    return (
      <main>
        <h1>Review your answers</h1>
        {sections.flatMap((s) =>
          s.items.map((item) => (
            <p key={item.id}>
              <strong>{item.text}</strong>: {answers[item.id] ?? "Skipped"}
            </p>
          ))
        )}
        <button onClick={() => setReviewing(false)}>Edit</button>
        <button onClick={confirm}>Confirm assessment</button>
      </main>
    );
  }

  return (
    <main>
      <h1>Well Live Assessment</h1>
      <h2>{section.title}</h2>

      {section.items.map((item) => (
        <fieldset key={item.id}>
          <legend>{item.text}</legend>
          <input
            value={answers[item.id] ?? ""}
            onChange={(event) => answer(item.id, event.target.value)}
            placeholder="Type an answer"
          />
          <button type="button" onClick={() => skip(item.id)}>
            Skip
          </button>
        </fieldset>
      ))}

      <button onClick={next}>
        {sectionIndex === sections.length - 1 ? "Review" : "Next"}
      </button>
    </main>
  );
}

export default App;