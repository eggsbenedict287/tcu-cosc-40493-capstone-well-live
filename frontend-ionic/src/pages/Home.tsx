import React, { useState } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonTitle,
  IonToolbar,
} from "@ionic/react";


const questions = [
  {
    id: "wellbeing-01",
    text: "Are you experiencing any memory difficulties?",
  },
  {
    id: "wellbeing-02",
    text: "Trouble concentrating on tasks or conversations?",
  },
   {
    id: "wellbeing-03",
    text: "Mood swings or changes in personality?",
  },
   {
    id: "wellbeing-04",
    text: "Feeling tired or lacking energy?",
  },
   {
    id: "wellbeing-05",
    text: "Muscle Tension or stiffness?",
  },
   {
    id: "wellbeing-06",
    text: "Tremors or involuntary movements?",
  },
   {
    id: "wellbeing-07",
    text: "Weakness or loss of strength in any part of the body?",
  },
   {
    id: "wellbeing-08",
    text: "Dizziness or balance problems?",
  },
   {
    id: "wellbeing-09",
    text: "Vertigo or spinning sensation?",
  },
   {
    id: "wellbeing-10",
    text: "Ringing in the ears (tinnitus)?",
  },
   {
    id: "wellbeing-11",
    text: "Breathing difficulties or shortness of breath?",
  },
   {
    id: "wellbeing-12",
    text: "Swelling in any part of the body?",
  },
   {
    id: "wellbeing-13",
    text: "Changes in skin or nails(Color, texture, or appearance)?",
  },
];

const Home: React.FC = () => {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Well Live Assessment</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2>Health Assessment</h2>

        {questions.map((question) => (
          <IonRadioGroup
            key={question.id}
            value={answers[question.id]}
            onIonChange={(event) =>
              setAnswers((current) => ({
                ...current,
                [question.id]: event.detail.value,
              }))
            }
          >
            <IonItem>
              <IonLabel>{question.text}</IonLabel>
            </IonItem>
            <IonItem>
              <IonRadio value="Concern">Concern</IonRadio>
            </IonItem>
            <IonItem>
              <IonRadio value="No concern">No concern</IonRadio>
            </IonItem>
            <IonItem>
              <IonRadio value="Skipped">Skipped</IonRadio>
            </IonItem>
          </IonRadioGroup>
        ))}

        <IonButton expand="block">Continue</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
