# Project Glossary

**Project:** Well Live
**Team:** 07
**Client:** Sarah Becan / Well Live
**Version:** 0.1

---

_**How to use this template.** Instructions appear in italic square brackets. Fill in underneath them and leave them in the file until the document is stable._

_**What this document is for.** Every project has words that mean something specific inside the client's organization and something else outside it, or nothing at all. This file fixes one word to one concept, and commits the team, the client, and the AI teammate to using it. That shared vocabulary is called a **ubiquitous language**: the same term in the client conversation, in the vision and scope, in the use cases, in the class names, and in the database columns._

_**Why the glossary is the first artifact you write and the last one you finish.** It is the cheapest document to start, because your client hands you the terms in the first meeting whether you ask or not, and it is the one that keeps paying: every later document cites it instead of redefining things._

## Why this matters when an agent writes your code

_[Read this once, then delete this section when the document goes stable.]_

_If two words in your project mean the same thing and nothing says so, your team will use both. So will your agent. You will end up with a `Team` class and a `Group` table, a `submitReport` endpoint and a `war_entry` record, and every one of those pairs is a bug waiting for the week you try to join them._

_An agent cannot resolve this on its own. Asked to add a feature, it reads what is in the repository and imitates it. If the repository is inconsistent it will faithfully reproduce the inconsistency, and it will invent a plausible synonym for anything the repository never names. A glossary in the repository is the only thing that stops it, because the repository is the whole of the agent's memory of your project._

_The other half is human. When your client says "cycle" in one sentence and "sprint" in the next, that is your signal to ask which one they mean, in the meeting, while they are in front of you. An agent reading the transcript later cannot ask._

## The entries that earn their place

_[The temptation is to define words your teammates already know. Skip those. The entries worth writing are:]_

- _**Terms two stakeholders use differently.** The highest-value entry in any glossary. In airline statistics, the International Civil Aviation Organization says **city-pair** and the International Air Transport Association says **O and D**, for the same thing; the two bodies also say **traffic by flight stage** and **segment traffic** for another. A team that misses this builds a report that silently mixes them._
- _**Terms that sound generic but are not.** "Active", "submitted", "complete", "week". Ask what makes a record active and you often find a business rule nobody had stated._
- _**The client's acronyms**, spelled out, including the ones they use so fluently they have forgotten they are acronyms._
- _**Terms you invented** that the client does not use. Record them, then consider dropping them in favor of the client's word._

_Ask the client directly: "Is there a word your team uses here that I would not guess the meaning of?"_

## Conventions

_[The **term itself is the identifier**. There is no separate numbering scheme, because a glossary entry already has a unique, meaningful name: the word. Cite a term by writing it, and keep the spelling identical everywhere it appears._

_Rules:_

- _One entry per concept. If two words mean the same thing, pick one, define it, and list the other as a synonym under it rather than giving it its own entry._
- _Alphabetical order, so a reader can find a term without searching._
- _Define the concept, not the implementation. "A weekly record of what a student did" is a definition; "a row in the `war` table" is not._
- _Use the client's word when the client has one. You are joining their world, not renaming it._
- _If a term has a meaning outside this project that differs from the one here, say so explicitly.]_

## Revision History

| Date | Version | Description | Author |
|---|---|---|---|
| 2026-09-17 | 0.1 | Initial terms from the client brief, first client meeting, and early requirements work | Team 07 |

---

## Definitions

### Assessment

The initial collection of information from a user about their health history, medications, goals, and other relevant information. Well Live uses this information to help determine what educational content may be relevant to the user.

**Not to be confused with:** a medical examination or professional diagnosis.

### Community

The social portion of Well Live where users can interact with and support other users through shared health and wellness experiences. The community is intended to encourage discussion, education, and social support.

### Educational Content

Health and wellness information provided through Well Live to help users improve their health knowledge and make informed decisions about self-care. Educational content may include text, pictures, videos, podcasts, and other media.

**Not to be confused with:** medical advice, diagnosis, or treatment provided by a healthcare professional.

### Evidence-Based Content

Health and wellness information supported by credible evidence or trustworthy sources rather than unsupported claims. Well Live aims to use evidence-based information when educating users about health topics, devices, services, and self-care.

### Health Goal

An outcome related to health or wellness that a user identifies as something they want to work toward. Health goals may be collected during the user's assessment and used to help personalize their experience.

### Health History

Information supplied by a user about their previous and current health-related experiences. Health history is part of the information Well Live may use to personalize educational content.

### Health Literacy

A user's ability to understand and use health-related information. Improving health literacy is one of the objectives of Well Live.

### Medication

A medicine or drug that a user reports as part of their health information. Medication information may be considered when determining which educational content is relevant to the user.

### Personalized Content

Educational health and wellness content selected or presented based on information associated with a particular user, such as their health history, medications, interests, or health goals.

**Not to be confused with:** individualized medical advice or a diagnosis.

### Profile

The representation of a user within Well Live. A profile contains information associated with the user and supports the user's personalized and social experience within the platform.

### Self-Care

Actions a person takes to support their own health and wellness. Well Live aims to promote truthful and informed self-care through education rather than replacing professional healthcare.

### Social Support

Interaction between Well Live users intended to provide encouragement, discussion, shared experiences, or a sense of community around health and wellness topics.

### User

A person who uses Well Live to access health and wellness education, personalized content, community features, or other services provided by the platform.

### Well Live

A subscription-based health and wellness platform that combines personalized, evidence-based education with social and community features. Well Live is intended to help users improve health literacy, support informed self-care, and participate in health-related discussions.
