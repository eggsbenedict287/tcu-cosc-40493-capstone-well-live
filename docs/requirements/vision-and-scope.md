# Vision and Scope

**Project:** _Well Live_
**Team:** An Cao, Esteban Hernandez-Anguiano, Elijah Johnston, Nikola Koltin, William Schuller, Angelette Munoz
**Client:** Sarah Becan
**Version:** 0.1

---

_**How to use this template.** Every section below opens with an instruction in italic square brackets: what the section is for, how to produce it, a worked example, and a checklist. Fill in the section underneath the instruction. **Leave the instructions in the file until the document is stable.** They are context for you, for the teammate who writes a later section, and for your AI teammate, which reads this file every time it works on your project._

_**This document has two readers.** Your client has to recognize their own business in it, so avoid jargon they would not use. Your AI teammate has to build from it, so avoid a claim it cannot check. When the two pull against each other, write for the client and put the precision in the use cases._

_**Work it with your agent, not instead of it.** Give the agent this template, your one-page project brief, and your meeting notes, then put it in a role: "You are an experienced business analyst. Using the instructions in this template, draft section X, and list every question you cannot answer from what I gave you." The questions it cannot answer are the point. They go in [OPEN-ISSUES.md](OPEN-ISSUES.md) and they become the agenda for your next client meeting. What the agent cannot do is decide which of its questions deserve your client's limited time, or tell enthusiasm apart from commitment. That judgment is yours._

## Identifiers in this document

_Identifiers here are **name-based slugs**, never numbers._

| Space | Shape | Example |
|---|---|---|
| Business objective | `BO-<slug>` | `BO-grading-time` |
| Success metric | `SM-<slug>` | `SM-submission-rate` |
| Risk | `RI-<slug>` | `RI-cloud-cost` |
| Assumption or dependency | `AS-<slug>` | `AS-client-maintains-stack` |
| Feature | `FEAT-<slug>` | `FEAT-performance-tracking` |

_Coin each slug from the concept itself: short, kebab-case, unique within its space. **Never renumber, rename, or repoint an identifier.** A new item gets a new slug; a retired item keeps its slug and is marked withdrawn. Cite items by identifier, never by position in a list ("the third objective")._

_Why this matters more with an agent than it used to: ask an agent to insert a new objective into a list numbered `BO-1` through `BO-6` and it has two options. Renumber everything, silently breaking every citation in your use cases and your specification, or append out of order. No test you can write detects either one. A slug has neither failure mode, and it tells a reader what the item is at the place it is cited._

## Revision History

| Date | Version | Description | Author |
|---|---|---|---|
| 2026-09-16 | 0.1 | Initial draft from the client brief and first client meeting | Well Live team |

---

## 1. Introduction

_[This document defines the goals, purpose, and boundaries of Well Live. It gives every stakeholder a shared understanding of what the software is for and the context it operates in: the business problem being solved, how the software fits into the client's world, and where the line falls between what is in scope and what is not.]_

### 1.1 Background

Well Live is a proposed subscription-based health and wellness application created for people who want trustworthy health information, practical self-care education, and support from a community with similar experiences. The product is intended to combine familiar social-media features with educational health and wellness content.

The proposed audience includes people with a wide range of health and wellness needs, including individuals managing serious illnesses, teenagers experiencing body-image concerns, families with limited financial resources, and people who want more approachable information about their health. The product should not be centered only on highly polished fitness influencers or unrealistic wellness lifestyles. Instead, it should provide an inclusive environment where users can find useful information and support that reflects real-life circumstances.

Well Live is intended to address the gap between information and support available at home, in clinics, and in hospitals. Users should be able to share health-related experiences, participate in discussions, and find educational materials related to topics such as nutrition, fitness, financial wellness, mental health, and spiritual health.

The client’s stated objectives are to:

-Enhance patient health outcomes.
-Make truthful self-care feel approachable and motivating.
-Increase health education and health literacy.
-Engage users in discussions about health and wellness.
-Promote community and engagement.
-Educate users about health topics, devices, and services.

The initial product concept includes personalized content based on a user’s interests, goals, and potentially their health history. It also includes educational content in multiple formats, such as articles, pictures, videos, and podcasts, along with community features such as discussion areas and a chat room for social support.

The project must balance usefulness and personalization with credibility, privacy, security, accessibility, and user safety. Health information should be presented as education and support rather than as a diagnosis, prescription, or replacement for professional medical care. The exact health information collected, the role of medical review, the subscription model, and the level of community moderation remain open questions for discussion with the client.

### 1.2 Current Process Flows (As-Is Process Flows)

_[Most projects require everyone involved to have a firm grasp of the business process being created, replicated, or improved. Without that understanding there is little chance users adopt the new solution. Process flows are the most effective model for building it.]_

_**Step 1: Diagram the current process.** Draw the process people execute **today**, before your software exists, as a mermaid flowchart with **one subgraph per actor** (roles, departments, existing systems). Show the sequence of activities, the decision points, and the handoffs between actors._

_Diagrams in this project are authored as mermaid inside the Markdown file, never exported from a drawing tool as an image. A picture of a diagram is invisible to your AI teammate and unreadable in a diff; a mermaid block is text it can read and revise. A skeleton to start from:_

flowchart TD
  subgraph User["Person seeking health and wellness information"]
    A[Recognize a health or wellness question] --> B[Search the internet or social media]
    B --> C[Review articles, videos, podcasts, posts, or discussions]
    C --> D{Information appears useful and trustworthy?}
    D -- No --> B
    D -- Yes --> E[Save, remember, or share the information]
    E --> F[Apply information to personal self-care or discuss it with others]
  end

  subgraph ExistingSources["Existing websites and social platforms"]
    G[Publish health articles, videos, podcasts, or social posts]
    H[Host comments, groups, or informal discussions]
  end

  subgraph PersonalNetwork["Friends, family, or personal networks"]
    I[Share personal experiences]
    J[Offer informal advice or emotional support]
  end

  B --> G
  B --> H
  C --> I
  C --> J
  I --> F
  J --> F


Currently, a person seeking health and wellness information may begin with a question, concern, or personal goal. They may search across general websites, social-media platforms, video services, podcasts, online communities, or conversations with friends and family. The person must decide for themselves whether the information is trustworthy, relevant, understandable, and appropriate for their situation.

People may also share their own experiences or ask for support through existing social platforms. These platforms can make discussion easy, but they are not necessarily designed specifically for health education. Educational material and personal opinions may appear together, making it difficult for users to distinguish evidence-based information from unsupported claims.

The current process does not provide one confirmed location where users can:

- find health education organized around their interests and goals;
- distinguish educational material from personal opinion;
- review the source or credibility of health information;
- participate in a health-focused community;
- receive content in several formats;
- control how personal information affects content recommendations; or
- report and receive a response to harmful or misleading health content.

Current tools and limitations
- Current tool or source: General internet search engines | Current Use: Locate health and wellness information | Limitation: Results vary in quality, may be difficult to evaluate, and are not necessarily personalized. |
- Current tool or source: Social-media platforms | Current use: Share experiences and participate in discussions | Limitation: Health information, personal opinions, advertising, and misinformation may appear together. |
- Current tool or source: Video and podcast platforms | Current use: Consume educational or motivational content | Limitation: Content may not be reviewed for accuracy, accessibility, or suitability for the user. |
- Current tool or source: Online health communities | Current use: Ask questions and receive peer support | Limitation: Moderation standards and the reliability of advice vary by community. |
- Current tool or source: Friends, family, and personal networks | Current use: Receive informal support and personal experiences | Limitation: Advice may be incomplete, inaccurate, or unsuitable for a person’s health situation. |
- Current tool or source: Clinics and hospitals | Current use: Receive professional health information and care | Limitation: Access may be limited by appointment availability, location, cost, or the user’s ability to ask questions during a visit. |

Current pain points
The current process creates several problems:

- Users must search across multiple websites and platforms instead of finding education and support in one health-focused environment.
- It can be difficult to determine whether information is evidence-based, current, or appropriate for a particular user.
- People may encounter health claims, body-image messages, or self-care advice that does not reflect their financial situation, culture, age, or medical circumstances.
- Personal experiences and professional health education may be mixed together without clearly identifying the difference.
- Users who need emotional or social support may have to use general-purpose platforms that were not designed around health-related safety and moderation.
- People may not have an easy way to report dangerous, misleading, abusive, or privacy-violating content.
- Health education may not be equally accessible to users who prefer articles, images, videos, podcasts, or other formats.
- Collecting health history, medication information, and personal goals without clear privacy rules could create additional risks.

Well Live is intended to improve this situation by providing a more organized health and wellness environment that combines educational content, community participation, and personalized discovery. However, the client must confirm which existing tools and processes are most important to replace or improve before the MVP scope is finalized.

**_Time example: "Printing and distributing delivery schedules to drivers takes 2 hours daily, cutting into time available for deliveries."_

**_**Step 5: Write for an outsider.** Assume your reader knows nothing about this domain. Define every domain term on first use and add it to the [project glossary](project-glossary.md)._

**_**Checklist:** Is the business context clear to someone unfamiliar with it? Does the flow give step-by-step detail? Are all actors and tools described? Are the inefficiencies illustrated with specific examples? Is there a mermaid diagram with one subgraph per actor?]_

### 1.3 References

- Well Live Project Brief by Sarah Becan | Date: 09-01-2026 | Defines the initial product vision, target audience, objectives, proposed implementation activities, and major capabilities. | Location: Provided by the client and included in the project requirements materials. |
- Well Live Pitch Summary | Date: Current Repository version at the time of drafting | Summarizes the project brief, candidate user classes, possible MVP scope, quality and safety concerns, open risks, and client questions. | Location: docs/well-live-pitch-summary.md |
- Team Contract Well Live | Date: September 2026 | Defines the team members, communication expectations, decision-making process, Git workflow, review requirements, and responsibilities when using AI tools. | Location: docs/team-contract.md |
-  Healthy People 2030 | Date: Specific source and publication date to be confirmed | Identified in the client brief as a research source for understanding current health needs and priorities. | Location: Client/team must confirm the specific Healthy People 2030 objectives or materials to be used. |
-  Well Live project repository | Date: Current project repository | Contains the project requirements, planning documents, source materials, and future implementation artifacts. | Location: https://github.com/eggsbenedict287/tcu-cosc-40493-capstone-well-live |

---

## 2. Business Requirements

_[Projects are launched in the belief that creating or changing a product will provide worthwhile benefits for someone. Business requirements describe the primary benefits the new system will provide to its sponsors, buyers, and users. Input comes from the people who know **why** the project is being undertaken: your client, their management, a subject matter expert, a product visionary. Business requirements determine which user requirements get implemented and in what order, so take this section seriously.]_

### 2.1 Business Opportunity or Problem Statement

_[State the problem being solved or the opportunity being exploited, in the client's own terms. One or two paragraphs. This is the answer to "why is anyone paying for this?"]_

### 2.2 Business Objectives

_[Summarize the business benefits the product will provide, **quantitatively and measurably**. Platitudes ("become recognized as a world-class provider") and vague improvements ("provide a more rewarding customer experience") are neither helpful nor verifiable.]_

_Examples:_

- _`BO-grading-time`: Reduce the instructor's time to grade peer evaluations by 50%._
- _`BO-submission-rate`: Increase the weekly activity report and peer evaluation submission rate by 20%._
- _`BO-student-effort`: Reduce the time a student spends completing a weekly activity report and peer evaluation by 25%._

_**How to elicit these.** Clients rarely volunteer numbers. Ask: What business problem are you trying to solve? What is the motivation for solving it now? What would a highly successful solution do for you? What is a successful solution worth? If the answer contains no number, ask what the number is today._

_**Checklist:** A year from now, could someone tell whether each objective was met? Does each one contain a quantity?]_

### 2.3 Success Metrics

_[Business objectives say what should improve. Success metrics tell you **whether you are on track to get there**, and they can be measured far sooner. That gap is the reason this section exists. A business objective often cannot be measured until well after the project ends, and sometimes depends on projects beyond yours, but you still need to know during the semester whether you are heading the right way.]_

_Specify the indicators stakeholders will use to define and measure success on this project. Identify the factors with the greatest impact on achieving it, including factors outside the organization's control._

_A success metric is sometimes the same statement as a business objective, when the objective happens to be measurable early. "Reduce time spent ordering chemicals to 10 minutes on 80 percent of orders" serves as both, because average order time can be measured during testing or shortly after release. Where an objective is measured a year out, write a metric that tracks the same thing on a shorter timeline: against an adoption objective measured annually, "track 60 percent of commercial chemical containers and 50 percent of proprietary chemicals within 4 weeks"._

_For each metric give the indicator, where the number comes from, what it is today (the baseline), and what counts as success by when. A metric with no baseline is not measurable, and "we do not track that today" is a finding worth recording rather than a gap to paper over._

_Examples:_

- _`SM-cafeteria-adoption`: 75% of employees who used the cafeteria at least 3 times per week during Q3 2013 use the Cafeteria Ordering System at least once a week, within 6 months following initial release._
- _`SM-satisfaction`: The average rating on the quarterly cafeteria satisfaction survey increases by 0.5 on a scale of 1 to 6 from the Q3 2013 rating within 3 months following initial release, and by 1.0 within 12 months._

_**How to elicit these.** Ask "how will you know this worked?", then ask what that number is today. If your client cannot say, ask who would know and whether the number is recorded anywhere. Clients often propose a metric the software cannot influence (revenue, headcount); trace it back to something your system actually changes._

_**Choose your success metrics wisely. Make sure they measure what is important to the business, not just what is easy to measure.** "Reduce product development costs by 20 percent" is easy to measure, and also easy to achieve by laying off employees or investing less in innovation, neither of which is the intended outcome. Prefer a metric that gets worse if you build the wrong thing._

_**Checklist:** Does each metric name its source, its baseline, and its deadline? Can this software actually move it? Can it be measured during testing or shortly after release, rather than a year later? Does every business objective have at least one metric behind it, and does every metric trace back to an objective?]_

### 2.4 Vision Statement

_[One statement summarizing, at the highest level, the position this product intends to fill. Fill in the table.]_

| | |
|---|---|
| **For** | _[target customer]_ |
| **Who** | _[the need or opportunity]_ |
| **The** _[product name]_ | _[is a ...]_ |
| **That** | _[major capabilities, key benefit, compelling reason to use it]_ |
| **Unlike** | _[the current process, or the competing alternative]_ |
| **Our product** | _[primary differentiation and advantage]_ |

_Worked example:_

| | |
|---|---|
| **For** | _students in the TCU senior design course_ |
| **Who** | _need an easier way to submit and update weekly activity reports and peer evaluations_ |
| **The** _Project Pulse_ | _is a web application_ |
| **That** | _lets students submit reports and evaluations in one place, and lets instructors view and grade them without downloading anything_ |
| **Unlike** | _the current process of spreadsheets and manual uploads to the learning management system_ |
| **Our product** | _keeps the whole cycle in one system, so nothing is transcribed by hand_ |

_**Use this in the meeting.** Read the filled-in table back to your client out loud and watch what they correct. It is the fastest way to discover you misunderstood the project, and it costs ninety seconds. Corrections go straight into [OPEN-ISSUES.md](OPEN-ISSUES.md)._

### 2.5 Proposed Process Flows (To-Be Process Flows)

_[Draw the improved process, with your software in it, as a second mermaid flowchart in the same shape as the as-is flow. Show how the software interacts with each actor, which steps it automates, and which pain point from section 1.2 each change addresses. Label the steps that are new or significantly changed, and say plainly which manual steps **remain** and why. There may be several major flows.]_

_The point of drawing both is the comparison. If the two diagrams look alike, either you have not understood the current process or the software is not worth building._

### 2.6 Risks

_[Summarize the major business risks of building this product, and of not building it. Categories include competition, timing, user acceptance, implementation, and negative impact on the business. Business risks are not project risks: "a teammate might drop the course" is a project risk and does not belong here. Give probability and impact for each, and a mitigation where you have one.]_

_Examples:_

- _`RI-union-contract`: The Cafeteria Employees Union might require its contract be renegotiated to reflect the new employee roles and operating hours. (Probability 0.6, Impact 3)_
- _`RI-low-adoption`: Too few employees might use the system, reducing the return on the development investment and on the changes to cafeteria operating procedures. (Probability 0.3, Impact 9)_
- _`RI-no-delivery-partners`: Local restaurants might not agree to offer delivery, reducing employee satisfaction with the system and their use of it. (Probability 0.3, Impact 3)_

_**State risks as mechanisms, not categories.** "Security risk" names a category and tells nobody anything. "The peer evaluation database holds student grades, is reachable from the public internet, and has no rate limiting" names a mechanism someone can act on._

### 2.7 Business Assumptions and Dependencies

_[An assumption is something you believe without proof, which would force this document to change if it turned out false. A dependency is something outside your control that the project relies on. Both live here under `AS-*`.]_

_Examples:_

- _`AS-ui-capacity`: Systems with appropriate user interfaces will be available for cafeteria employees to process the expected volume of meals ordered._
- _`AS-delivery-staffing`: Cafeteria staff and vehicles will be available to deliver all meals within 15 minutes of the requested delivery time._
- _`AS-restaurant-integration`: If a restaurant has its own online ordering system, the Cafeteria Ordering System must be able to communicate with it bi-directionally._

_**Checklist:** For each assumption, what happens to this project if it is false? If the answer is "nothing", it is not worth recording. If the answer is "we start over", raise it with your client this week._

---

## 3. Stakeholder Profiles and User Descriptions

_[To build something that meets real needs you have to identify everyone with a stake in the outcome, and confirm that the users are actually represented among them. This section records **who they are and why they care**, not their specific requests, which belong in the use cases.]_

_A stakeholder is not always a user. The person paying for the software, the person who maintains it after you graduate, and the person whose job changes because of it all have a stake and may never log in._

### 3.1 Stakeholder Profiles

| Stakeholder | Major value or benefit from this product | Attitude | Major features of interest | Constraints | End user? |
|---|---|---|---|---|---|
| _[Role]_ | _[What they get out of it]_ | _[Supportive, skeptical, unaware, opposed]_ | _[What they care about]_ | _[What limits them]_ | _[Yes or no]_ |

_**Attitude is the column students leave blank, and the one that predicts trouble.** A stakeholder whose workload increases because of your software is not automatically supportive, and finding that out in December is too late._

### 3.2 User Environment

_[Describe the working environment of the target users:_

- _How many people are involved in completing the task? Is that changing?_
- _How long is a task cycle, and how much time goes into each activity? Is that changing?_
- _Any environmental constraints: mobile, outdoors, noisy, gloved hands, poor connectivity?_
- _Which platforms are in use today, and which are planned?_
- _What other applications are in use, and does yours have to integrate with them?]_

### 3.3 Alternatives and Competition

_[Identify the alternatives your stakeholders see as available: buying a competitor's product, building something in-house, or keeping the status quo. Give the major strengths and weaknesses of each **as the stakeholder perceives them**, not as you do.]_

| Alternative | Strengths | Weaknesses for this client |
|---|---|---|
| _[Tool, or "the current manual process"]_ | | |

_Always include the status quo as a row. It is the alternative that wins most often, and the one your product actually has to beat._

---

## 4. Scope and Limitations

_[The section you will cite most often. Scope is what keeps a friendly client's good ideas from consuming your semester. When a new request arrives in October, this is what you point at.]_

### 4.1 Product Perspective

_[Put the product in context relative to other systems and the user's environment. If it is independent and self-contained, say so. If it is one component of something larger, describe how they interact and identify the interfaces between them. A context diagram shows this most clearly: your system as one box, every external actor and system around it, and a labeled arrow for each thing that crosses the boundary.]_

    ```mermaid
    flowchart LR
      Student[Student] --> PP[Project Pulse]
      Instructor[Instructor] --> PP
      PP --> Gmail[(Gmail)]
      PP --> LMS[(Learning management system)]
    ```

### 4.2 Major Features and Scope

_[List and briefly describe the major product features. A feature is a high-level **capability** the system provides in order to deliver a benefit: an externally visible service, not an implementation detail.]_

_Because this document is read by a wide range of people, keep the detail general enough for everyone to follow while giving your team enough to build a use-case model from. **Use cases are derived from these features**, so a feature too vague to decompose is too vague._

_Guidelines:_

- _State features at the level of product capabilities._
- _One to three sentences each._
- _No detailed workflows, user interface behavior, or algorithms._
- _Do not describe how the feature will be implemented._
- _Focus on what capability is needed and why, not how._
- _Understandable by a non-technical stakeholder, including your client._

_Examples:_

- _`FEAT-administration`: Manage senior design sections, teams, and student rosters._
- _`FEAT-performance-tracking`: Submit and review weekly activity reports and peer evaluations._
- _`FEAT-grade-generation`: Generate weekly activity report and peer evaluation grades for an entire section._

### 4.3 MVP Scope

_[Of the features above, which ones ship in the release you actually deliver in December? Name them by identifier. Then name what is explicitly **out**, also by identifier, so it is on the record.]_

_**In scope for the MVP:** `FEAT-...`, `FEAT-...`_

_**Explicitly out of scope:** `FEAT-...` (reason), `FEAT-...` (reason)_

_Ask your client the question directly: "If we can deliver only one of these in December, which one is it?" The answer is worth more than the rest of the meeting. A client who cannot choose has not thought about it yet, which is itself something you need to know now rather than in November._

### 4.4 Deployment Considerations

_[Summarize what it takes to get this into its operating environment. How will users reach it? Are they spread across locations or time zones? What infrastructure has to change for capacity, network access, data storage, or data migration? Who trains the users? Who maintains it after this team graduates, and what does that person already know how to run?]_

_That last question shapes your architecture, so ask it in the first client meeting rather than the last._
