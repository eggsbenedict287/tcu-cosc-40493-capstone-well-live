package com.welllive.backend.assessment;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
public class AssessmentDefinition {
    public static final int VERSION = 1;
    private static final List<AnswerOption> CONCERN_OPTIONS = List.of(
            new AnswerOption("CONCERN", "Concern", false),
            new AnswerOption("NO_CONCERN", "No concern", false),
            new AnswerOption("SKIPPED", "Skip", false),
            new AnswerOption("OTHER", "Others", true));
    private final List<AssessmentSection> sections;
    private final Map<String, AssessmentItem> items;

    public AssessmentDefinition() {
        List<AssessmentSection> definition = new ArrayList<>();
        definition.add(section("review_of_systems", "Review of Systems",
                measure("height", "Height", List.of("cm", "in")),
                measure("weight", "Weight", List.of("kg", "lb")),
                text("biological_sex", "Biological sex"),
                text("ethnicity", "Ethnicity"),
                integer("age", "Age", 0, 150),
                text("education_level", "Education level"),
                text("language", "Language")));
        definition.add(section("physical_concerns", "Physical concerns",
                concerns("memory_difficulties", "Memory difficulties"),
                concerns("trouble_concentrating", "Trouble concentrating"),
                concerns("mood_changes", "Mood changes"),
                concerns("tired_or_exhausted", "Feeling tired or exhausted"),
                concerns("muscle_tension", "Muscle tension"),
                concerns("sensory_reactivity", "Hyper or hypo reactivity to sensory input"),
                concerns("tremors", "Tremors"),
                concerns("weakness", "Weakness"),
                concerns("dizziness", "Dizziness"),
                concerns("vertigo", "Vertigo"),
                concerns("ringing_in_ears", "Ringing in ears"),
                concerns("breathing_difficulties", "Breathing difficulties"),
                concerns("swelling", "Swelling"),
                concerns("skin_or_nail_changes", "Changes in skin or nails (color, texture, etc.)",
                        "Describe skin or nail changes"),
                concerns("itching", "Itching"),
                concerns("constipation", "Constipation"),
                concerns("diarrhea", "Diarrhea"),
                concerns("indigestion", "Indigestion"),
                concerns("nausea_or_vomiting", "Nausea or vomiting"),
                concerns("eating_or_appetite", "Eating or appetite"),
                concerns("weight_change", "Weight loss or weight gain"),
                concerns("sore_or_dry_mouth", "Sore or dry mouth"),
                concerns("sleep_problems", "Sleep problems"),
                concerns("numbness_or_tingling", "Numbness or tingling in hands or feet"),
                concerns("sweating_or_hot_flashes", "Sweating or hot flashes"),
                concerns("vision_hearing_or_taste_changes", "Changes in vision, hearing, or taste",
                        "Describe vision, hearing, or taste changes"),
                concerns("urinating", "Urinating"),
                concerns("swallowing_difficulty", "Swallowing difficulty"),
                concerns("speech_problems", "Speech problems"),
                concerns("bruising", "Bruising"),
                concerns("abnormal_menstrual_cycle", "Abnormal menstrual cycle"),
                concerns("lesions_lumps_or_abscesses", "Lesions, lumps, abscesses", "Where?"),
                concerns("heat_or_cold_intolerance", "Intolerance to heat or cold"),
                concerns("pain", "Pain"),
                concerns("disability", "Disability", "Specify disability"),
                concerns("medical_device_or_mobility_aid_difficulty",
                        "Medical device or mobility aid difficulty", "Specify what device")));
        definition.add(section("practical_concerns", "Practical concerns",
                concerns("walking", "Walking"),
                concerns("bathing", "Bathing"),
                concerns("getting_dressed", "Getting dressed"),
                concerns("eating", "Eating"),
                concerns("preparing_meals", "Preparing meals"),
                concerns("caregiver_responsibilities", "Caregiver responsibilities"),
                concerns("housework", "Housework"),
                concerns("shopping", "Shopping"),
                concerns("work", "Work"),
                concerns("education", "Education"),
                concerns("money", "Money"),
                concerns("housing", "Housing"),
                concerns("insurance", "Insurance"),
                concerns("transportation", "Transportation")));
        definition.add(section("family_relationship_concerns", "Family/Relationship concerns",
                concerns("partner", "Partner"),
                concerns("children", "Children"),
                concerns("relatives", "Relatives"),
                concerns("friends", "Friends"),
                concerns("coworkers", "Coworkers"),
                concerns("teachers", "Teachers"),
                concerns("neighbor", "Neighbor")));
        definition.add(section("emotional_concerns", "Emotional concerns",
                concerns("loss_of_interest", "Loss of interest/activities"),
                concerns("difficulty_making_plans", "Difficulty making plans"),
                concerns("unable_to_express_feelings", "Unable to express feelings"),
                concerns("anger_or_frustration", "Anger or frustration"),
                concerns("panic", "Panic"),
                concerns("detachment", "Detachment"),
                concerns("guilt", "Guilt"),
                concerns("hopelessness", "Hopelessness"),
                concerns("impulsive", "Impulsive"),
                concerns("loneliness_or_isolation", "Loneliness or isolation"),
                concerns("sadness_or_depression", "Sadness or depression"),
                concerns("worry_fear_or_anxiety", "Worry, fear, or anxiety"),
                concerns("thoughts_of_self_harm", "Intrusive thoughts of hurting yourself"),
                concerns("thoughts_of_harming_others", "Intrusive thoughts of hurting others"),
                concerns("nightmares", "Nightmares"),
                concerns("flashbacks", "Flashbacks")));
        definition.add(section("spiritual_religious_concerns", "Spiritual or religious concerns",
                concerns("loss_of_faith", "Loss of faith"),
                concerns("loss_of_meaning_or_purpose", "Loss of meaning or purpose in life"),
                concerns("loss_of_hope", "Loss of hope"),
                concerns("not_at_peace", "Not being at peace"),
                concerns("regret_or_resentment", "Regret about past, resolving old grievances, resentment"),
                concerns("overcoming_fear", "Overcoming fear"),
                concerns("dealing_with_suffering", "Dealing with suffering"),
                concerns("coping_with_sadness", "Coping with feelings of sadness"),
                concerns("dying", "Dying"),
                concerns("curious_about_higher_presence", "Curious about a higher presence"),
                concerns("not_religious_or_spiritual", "Not religious or spiritual"),
                concerns("have_religion", "Have religion"),
                text("religion_specification", "Specify religion")));
        definition.add(section("lifestyle_information_needs", "Lifestyle or information needs",
                concerns("alcohol", "Alcohol"),
                concerns("drugs", "Drugs"),
                concerns("smoking", "Smoking"),
                concerns("domestic_violence", "Domestic violence"),
                concerns("exposure_to_toxins", "Exposure to toxins, chemicals, etc."),
                concerns("diet_and_nutrition", "Diet and nutrition"),
                concerns("hydration", "Hydration"),
                concerns("exercise_and_activity", "Exercise and activity"),
                concerns("sun_protection", "Sun protection"),
                concerns("complementary_therapies", "Complementary therapies"),
                concerns("self_care", "Self-care"),
                concerns("medication_explanation", "Medication explanation"),
                concerns("hygiene", "Hygiene"),
                concerns("sexual_protection", "Sexual protection"),
                concerns("infant_or_adolescent_safety", "Infant/adolescent safety"),
                concerns("breastfeeding", "Breastfeeding"),
                concerns("pregnancy", "Pregnancy"),
                concerns("support_groups", "Support groups"),
                text("additional_lifestyle_needs", "Specify additional needs")));

        this.sections = List.copyOf(definition);
        this.items = definition.stream()
                .flatMap(section -> section.items().stream())
                .collect(Collectors.toUnmodifiableMap(AssessmentItem::id, Function.identity()));
    }

    public int version() {
        return VERSION;
    }

    public String explanation() {
        return "Answers are saved to your account to support educational content organization. Every question is optional. This assessment is not a medical evaluation and does not diagnose, score, or infer a condition.";
    }

    public List<AssessmentSection> sections() {
        return sections;
    }

    public Map<String, AssessmentItem> items() {
        return items;
    }

    public Optional<AssessmentSection> findSection(String id) {
        return sections.stream().filter(section -> section.id().equals(id)).findFirst();
    }

    private static AssessmentSection section(String id, String title, AssessmentItem... items) {
        String followUpPrompt = id.equals("family_relationship_concerns")
                ? "Specify concern (optional)"
                : null;
        return new AssessmentSection(id, title, List.of(items), followUpPrompt);
    }

    private static AssessmentItem concerns(String id, String label) {
        return concerns(id, label, null);
    }

    private static AssessmentItem concerns(String id, String label, String followUpPrompt) {
        return new AssessmentItem(id, label, InputType.CONCERN, List.of(), CONCERN_OPTIONS, null,
                followUpPrompt);
    }

    private static AssessmentItem text(String id, String label) {
        return new AssessmentItem(id, label, InputType.TEXT, List.of(), List.of(), null, null);
    }

    private static AssessmentItem integer(String id, String label, int min, int max) {
        return new AssessmentItem(id, label, InputType.INTEGER, List.of(), List.of(), min + ".." + max, null);
    }

    private static AssessmentItem measure(String id, String label, List<String> units) {
        return new AssessmentItem(id, label, InputType.NUMBER, units, List.of(),
                "positive; at most 2 decimal places", null);
    }

    public enum InputType {
        CONCERN,
        TEXT,
        NUMBER,
        INTEGER
    }

    public record AssessmentSection(
            String id,
            String title,
            List<AssessmentItem> items,
            String followUpPrompt) {
    }

    public record AnswerOption(String value, String label, boolean requiresShortAnswer) {
    }

    public record AssessmentItem(
            String id,
            String question,
            InputType inputType,
            List<String> units,
            List<AnswerOption> options,
            String validationHint,
            String followUpPrompt) {
    }
}
