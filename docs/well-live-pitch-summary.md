# **Well Live Pitch Summary**

## **Document Status**

This is a requirements-discovery artifact based on the Well Live project brief. It is not yet part of the canonical five-document requirements set and does not assign stable `BO-*`, `FEAT-*`, `UC-*`, `FR-*`, or `BR-*` identifiers. Those identifiers should be introduced only after the client confirms the product boundary and the team derives an approved requirements baseline.

Source: [Well Live project brief](https://github.com/eggsbenedict287/tcu-cosc-40493-capstone-well-live/blob/f038733d5c6608f630d65ce0e6f08881d488efa2/docs/team-07-well-live-pitch.pdf)

## **Pitch Summary**

Well Live is proposed as a subscription-based health-and-wellness community that combines social interaction, personalized education, and evidence-oriented content. The intended experience is familiar to users of social platforms such as Facebook, Reddit, and Twitter, but limited to health and wellness topics.

The pitch describes a platform where users can:

- share health-related experiences;
- connect with a supportive community;
- participate in discussions;
- receive educational content customized to their interests and health history;
- consume educational material through pictures, videos, and podcasts; and
- use a chat room for social support.

The pitch emphasizes organization, usability, credibility, and inclusiveness. It explicitly rejects an image of wellness centered only on highly polished fitness influencers. Instead, it names people such as a mother battling cancer, a teenager experiencing body-image concerns, and a family living on food stamps as examples of users the product should serve.

The broader vision is to improve the connection between home, clinic, and hospital by making trustworthy health education and peer support more accessible. This is a product aspiration, not yet a testable system guarantee.

## **Intended Value**

The pitch identifies six objectives:

- enhance patient health outcomes;
- make truthful self-care feel approachable and motivating;
- increase education and health literacy;
- engage users in health and wellness discussions;
- promote community and engagement; and
- educate users about health topics, devices, and services.

These objectives suggest three related value propositions:

1. **Accessible education** — users receive understandable health and wellness information in multiple media formats.
2. **Personal relevance** — content is selected or organized around the user's interests, goals, and possibly health history.
3. **Supportive community** — users can share experiences and communicate with others in a health-focused environment.

The client should confirm which of these is the primary value proposition for the first release. A product that attempts to deliver all three at equal depth will have a large and high-risk MVP.

## **Proposed User Classes**

The pitch names or implies the following user classes:

- **Member** — a subscribed person who consumes content, participates in discussions, shares experiences, and uses personalization.
- **Content contributor** — a person or organization that submits or publishes educational material.
- **Moderator** — a person who enforces community rules and responds to harmful, abusive, misleading, or unsafe content.
- **Health professional or subject-matter reviewer** — a possible reviewer of health education, if the credibility objective is to be operationalized.
- **Subscription administrator** — a role responsible for plans, payments, access, and account status.
- **Platform administrator** — a role responsible for users, content, moderation, configuration, and operational controls.

The brief does not explicitly define these roles. They are candidate roles for discussion, not confirmed requirements.

## **Candidate MVP Scope**

The following is a candidate MVP derived from the pitch. It is intentionally narrower than the entire vision and must be validated with the client.

### **Account and Subscription Access**

- A visitor can learn what Well Live provides and create an account.
- A member can sign in and sign out.
- The system can distinguish active, canceled, expired, and trial subscription states if subscriptions are in the MVP.
- A member can view the information needed to understand the service before subscribing.

### **Member Profile and Goals**

- A member can maintain basic profile information.
- A member can select wellness interests and goals.
- The system can use selected interests and goals to organize or filter educational content.
- The system does not require a member to disclose sensitive health information unless the client explicitly confirms that this is necessary.

### **Educational Content**

- A member can browse educational content by topic.
- A member can filter content by format, such as article, image, video, or podcast.
- Each published item identifies its topic, publication status, and source or review information where applicable.
- The system distinguishes educational information from diagnosis, emergency advice, or individualized medical treatment.
- An authorized contributor or administrator can create, review, publish, update, and unpublish content if the client confirms that content authoring is in scope.

### **Community Participation**

- A member can create a community post in an allowed health or wellness topic.
- A member can view posts and participate through comments or replies.
- A member can report content that violates community rules or appears unsafe.
- A moderator can review reports and take an appropriate moderation action.
- Community features have clear rules for harassment, misinformation, medical claims, privacy, and crisis-related content.

### **Personalized Discovery**

- A member can receive a content view organized around selected interests and goals.
- A member can understand why content is being recommended, or can disable personalization, if personalization is included.
- The MVP should prefer transparent topic-based filtering over opaque medical inference unless the client explicitly requests a more advanced recommendation system.

### **Accessibility and Usability**

- The primary member workflows are usable on supported mobile and desktop browsers.
- Text, media controls, navigation, and forms follow an agreed accessibility target.
- Educational media provides appropriate captions, transcripts, alternative text, or equivalent access where applicable.

## **Potential Post-MVP Scope**

These capabilities may support the broader vision but should not be assumed to belong in the first release:

- individualized recommendations derived from detailed health history or medication data;
- automated extraction of evidence-based content using scripts or AI tools;
- automated evidence evaluation or medical-claim detection;
- verified health-professional profiles;
- integration with wearable devices, health devices, clinics, hospitals, or electronic health records;
- direct messaging or private support groups;
- live group chat or moderated support sessions;
- subscription tiers, family plans, gift plans, discounts, or financial-assistance plans;
- multilingual education;
- crisis-response workflows for mental-health or self-harm content;
- health-outcome tracking and longitudinal progress dashboards;
- appointment, referral, or care-navigation features; and
- partnerships with healthcare organizations, nonprofits, or public-health programs.

## **Candidate Quality and Safety Requirements**

These are areas the team should evaluate during requirements elicitation. They are not confirmed requirements because the client has not yet specified the intended legal, clinical, operational, or technical boundaries.

- **Credibility:** The system should make the source, review state, publication date, and update date of educational content visible when those data exist.
- **Safety:** The product should not present general education as a diagnosis, prescription, or substitute for professional care.
- **Privacy:** The team must define what personal, health, medication, payment, and community data are collected, retained, shared, exported, and deleted.
- **Security:** Accounts, subscriptions, private communications, moderation records, and sensitive profile information require appropriate access control and auditability.
- **Moderation:** The system needs defined rules and workflows for harmful content, harassment, scams, disordered-eating content, dangerous medical claims, and privacy violations.
- **Availability and resilience:** The team should define the expected behavior when media, recommendation, payment, or content services are unavailable.
- **Accessibility:** The client should confirm the target accessibility standard and the media accessibility expectations.
- **Transparency:** Members should be able to understand personalization, community rules, content provenance, and moderation decisions.
- **Performance:** The team should define acceptable load times for feeds, search, media pages, and chat if those capabilities are included.

## **Open Scope Risks**

- **Medical-safety risk:** Users may interpret educational content or community advice as clinical guidance.
- **Sensitive-data risk:** Health history and medication information may create significant privacy, security, retention, and compliance obligations.
- **Vulnerable-user risk:** The proposed audience includes people with serious illness, teenagers, body-image concerns, and limited financial resources.
- **Misinformation risk:** A social platform can amplify unsafe or inaccurate health claims.
- **Moderation workload risk:** Community discussion and chat can require continuous human review and escalation.
- **Credibility risk:** The product's stated emphasis on evidence-based education requires a concrete source, review, update, and correction process.
- **Personalization risk:** Personalization based on sensitive information may be inaccurate, discriminatory, difficult to explain, or unsafe.
- **Subscription risk:** Paid access introduces billing, cancellation, refunds, failed payments, entitlement, and customer-support requirements.
- **Scope risk:** Social networking, content publishing, media delivery, personalization, subscriptions, and healthcare integration together exceed a likely student-project MVP unless sharply bounded.

## **Client Questions**

### **Product Boundary and Success**

- What is the single most important user problem Well Live must solve in its first release?
- Which audience is the primary MVP audience: adults generally, patients with specific conditions, families, teenagers, caregivers, or another group?
- Is Well Live intended to provide general education and peer support, or any form of clinical guidance, care navigation, or treatment support?
- Which objective is the highest priority for the first release: education, community, personalization, engagement, or connection to care?
- How will the client decide whether the MVP is successful?

### **MVP and Delivery**

- Which capabilities are mandatory for the first demonstration or release?
- Should the MVP include subscriptions and payment, or should access be free or simulated?
- Should users be able to publish content, or will the first release use administrator-curated content only?
- Are comments sufficient for the MVP, or is a real-time chat room required?
- Which media formats must work in the MVP: text, images, video, podcasts, or all four?
- Is mobile-browser support sufficient, or are native mobile applications expected?

### **Health and Safety Boundaries**

- What types of health information may the system collect, if any?
- Why are health history, medications, and goals collected, and what user-visible behavior depends on each?
- Should a member be able to use the product without entering health history or medication information?
- Which topics are out of scope because they require clinical oversight?
- What disclaimer, emergency guidance, or escalation behavior should appear around health content?
- Who is responsible for reviewing content for medical accuracy?
- How often must published content be reviewed or revalidated?
- What should happen when a member reports dangerous or misleading health information?

### **Audience Protections**

- Will people under 18 be allowed to create accounts?
- If teenagers are in scope, what age verification, consent, privacy, and moderation rules are required?
- What protections are needed for users discussing cancer, mental health, body image, eating disorders, or other sensitive subjects?
- Should members be able to post anonymously or pseudonymously?
- Can a member delete posts, comments, profile data, health data, and account history?

### **Community and Moderation**

- What community behavior is prohibited?
- Are moderators employees, volunteers, health professionals, or trusted members?
- Which moderation actions are needed: hide, delete, warn, suspend, ban, escalate, or appeal?
- Should moderation decisions be visible to the affected member?
- Is private messaging required, and if so, can messages be reported or reviewed?
- What is the expected response time for safety reports?

### **Content and Evidence**

- Where will educational content come from?
- What qualifies as evidence-based content?
- Which source types are acceptable, and how should citations be displayed?
- Is AI allowed to draft, summarize, classify, or recommend content?
- If AI is used, who reviews its output before publication?
- How should the system handle outdated, corrected, disputed, or withdrawn content?
- Does “devices or services” mean product reviews, purchasing guidance, provider directories, or something else?

### **Personalization**

- What inputs should drive personalization: topics, goals, age, location, health history, medication, activity, or behavior?
- Is personalization a simple preference-based feed or an adaptive recommendation system?
- Can members inspect, change, or reset the information used for personalization?
- Can members opt out of personalized content?
- What recommendations must never be made automatically?

### **Subscription and Business Model**

- What does a subscription provide?
- Are there free accounts, trials, paid tiers, family plans, or financial-assistance options?
- Which payment provider should be used?
- What happens when a payment fails, a subscription is canceled, or a refund is issued?
- Should members retain access to their posts and personal data after cancellation?

### **Privacy, Security, and Compliance**

- Which privacy and health-data laws or organizational policies apply to the product?
- Is the client expecting the team to handle regulated health information, or should the product explicitly avoid it?
- Where may data be stored, and how long should each data category be retained?
- Who may access health information, moderation records, and account data?
- Are audit logs, data exports, data deletion, consent records, or breach notifications required?
- What external services may receive member data?

### **Operations and Integration**

- Who will operate the platform after the student project ends?
- Who will maintain educational content and moderation policies?
- Are integrations with clinics, hospitals, wearable devices, or health services part of the intended product or only a long-term vision?
- What analytics are needed, and what data may be used for product measurement?
- What is the expected number of members, concurrent users, posts, media items, and chat participants?

## **Recommended Next Requirements Steps**

1. Agree on the primary MVP user and the one problem the MVP solves.
2. Decide whether Well Live is strictly an education-and-community product or also a health-history and care-support product.
3. Define the minimum content model, publishing workflow, evidence policy, and moderation workflow.
4. Decide whether subscriptions, payments, and real-time chat are in scope for the first release.
5. Resolve the treatment of minors and sensitive health topics before collecting any health history or medication data.
6. Convert the confirmed scope into the canonical requirements chain:
   - glossary terms and domain boundaries;
   - vision and scope objectives, risks, assumptions, and features;
   - use cases with main flows and extensions;
   - business rules for access, safety, privacy, content, and moderation; and
   - SRS functional, interface, data, and quality requirements.
7. After the client answers the questions above, run the requirements through the repository's `/spec-build` workflow and record the resulting traceability baseline.
