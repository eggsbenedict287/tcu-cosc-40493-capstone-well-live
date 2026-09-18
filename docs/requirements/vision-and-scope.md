# Vision and Scope

**Project:** _[Your project name]_
**Team:** _[Team NN]_
**Client:** _[Client name and organization]_
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
| _[YYYY-MM-DD]_ | 0.1 | Initial draft from the client brief and first client meeting | _[Name]_ |

---

## 1. Introduction

_[This document defines the goals, purpose, and boundaries of the project. It gives every stakeholder a shared understanding of what the software is for and the context it operates in: the business problem being solved, how the software fits into the client's world, and where the line falls between what is in scope and what is not.]_

### 1.1 Background

_[Summarize the rationale and context for the new product, or for the changes to an existing one. Describe the situation that led to the decision to build it.]_

_**Step 1: Describe the business.** Introduce the organization. Cover what it does (industry, products, services), its size (employees, locations), and the goals that relate to the problem you are solving._

_Example: "The client, XYZ Logistics, is a mid-sized shipping company that specializes in last-mile delivery services for e-commerce businesses. The company operates in five major cities, employs 200 delivery staff, and handles over 10,000 deliveries per day. The goal is to optimize delivery efficiency and customer satisfaction."_

_**Checklist:** Would a reader who has never heard of this organization understand what it does and why this project exists?]_

### 1.2 Current Process Flows (As-Is Process Flows)

_[Most projects require everyone involved to have a firm grasp of the business process being created, replicated, or improved. Without that understanding there is little chance users adopt the new solution. Process flows are the most effective model for building it.]_

_**Step 1: Diagram the current process.** Draw the process people execute **today**, before your software exists, as a mermaid flowchart with **one subgraph per actor** (roles, departments, existing systems). Show the sequence of activities, the decision points, and the handoffs between actors._

_Diagrams in this project are authored as mermaid inside the Markdown file, never exported from a drawing tool as an image. A picture of a diagram is invisible to your AI teammate and unreadable in a diff; a mermaid block is text it can read and revise. A skeleton to start from:_

    ```mermaid
    flowchart TD
      subgraph Student
        A[Open the shared spreadsheet] --> B[Type last week's activities]
      end
      subgraph Instructor
        C[Review the updated sheets] --> D{Complete?}
        D -- No --> E[Email the student]
        D -- Yes --> F[Enter the grade in the LMS]
      end
      B --> C
    ```

_**Step 2: Write the prose.** Not every reader reads diagrams. Explain the flow in a paragraph underneath it._

_**Step 3: List the current tools.** Enumerate what the process runs on today (spreadsheets, paper schedules, email, a legacy system) and give the limitation of each._

_Example: "XYZ Logistics relies heavily on Excel spreadsheets for order management. Printed delivery schedules are distributed to drivers daily. These tools lack automation, making the process prone to human error and delays."_

_**Step 4: Name the pain points.** Highlight the inefficient, slow, or error-prone steps, using one or two specific examples rather than a general complaint._

_Inefficiency example: "Manual entry of order details into Excel causes delays and transcription errors. During peak season, order entries pile up, delaying processing and delivery."_

_Time example: "Printing and distributing delivery schedules to drivers takes 2 hours daily, cutting into time available for deliveries."_

_**Step 5: Write for an outsider.** Assume your reader knows nothing about this domain. Define every domain term on first use and add it to the [project glossary](project-glossary.md)._

_**Checklist:** Is the business context clear to someone unfamiliar with it? Does the flow give step-by-step detail? Are all actors and tools described? Are the inefficiencies illustrated with specific examples? Is there a mermaid diagram with one subgraph per actor?]_

### 1.3 References

_[List every document referenced elsewhere in this one: the client's project brief, existing forms and reports, regulations, standards, competing products. Identify each by title, date, and where it can be obtained. The spreadsheet or screenshot your client showed you belongs here.]_

---

## 2. Business Requirements

### 2.1 Business Opportunity or Problem Statement

Most wellness apps are built around gym influencers, unrealistic beauty standards, and unvetted advice. Real people, a mother going through cancer treatments, or a family budgeting on food stamps, are often left out. At the same time, medically accurate health information is stuck behind dry academic papers or scattered across scary, generic internet searches. 

Well Live fills this gap by giving people a relatable, subscription-based community that pairs honest peer support with real, evidence-based education. Members get a space where they can talk to others walking the same road, while getting practical, vetted videos, podcasts, and articles tailored to their actual health needs and life situations. 

### 2.2 Business Objectives

* **`BO-health-literacy`**: Increase member health literacy scores by 25% within 90 days of joining.
* **`BO-retention-rate`**: Keep at least 70% of paid subscribers active after their first 3 months.
* **`BO-peer-engagement`**: Have 60% of active members post or chat in community rooms at least twice a week.
* **`BO-intake-completion`**: Hit an 85% completion rate on the onboarding health and goals assessment.
* **`BO-content-credibility`**: Maintain a 95%+ credibility approval rating on all automated and curated materials, verified by licensed professionals.

### 2.3 Success Metrics

| Metric ID | Indicator | Source | Current Baseline | Target Success | Deadline |
|---|---|---|---|---|---|
| **`SM-onboard-complete`** | New signups finishing the health assessment | App onboarding analytics | 0% (New product) | ≥ 80% completion | 4 weeks post-launch |
| **`SM-active-retention`** | Month-over-month paid renewal rate | Stripe / billing records | 0% (New product) | ≥ 65% monthly renewal | 90 days post-launch |
| **`SM-chat-participation`** | Weekly active users chatting or posting | App database logs | 0% (New product) | ≥ 50% of WAU | 60 days post-launch |
| **`SM-content-trust`** | User rating of content trustworthiness | In-app feedback survey | 0% (Industry avg ~35%) | Avg ≥ 4.2 / 5.0 | End of Q1 post-launch |
| **`SM-search-satisfaction`** | Searches leading to a viewed article or episode | Search query analytics | 0% (New product) | ≥ 70% click-through | 4 weeks post-beta |

### 2.4 Vision Statement

| | |
|---|---|
| **For** | Everyday people and families dealing with real-world health and wellness hurdles |
| **Who** | Need trustworthy medical guidance and judgment-free community without influencer hype |
| **The** *Well Live* | Is a subscription-based health education and community app |
| **That** | Delivers vetted educational media (podcasts, video, reads) and private peer chat rooms matched to your personal health background |
| **Unlike** | Commercial social networks (Instagram, Reddit) and static clinical websites (WebMD) |
| **Our product** | Normalizes truthful, accessible self-care by pairing vetted clinical information with genuine human connection |

### 2.5 Proposed Process Flows (To-Be Process Flows)

```mermaid
flowchart TD
    classDef manual fill:#f9f9f9,stroke:#666,stroke-width:1px;
    classDef automated fill:#e1f5fe,stroke:#0288d1,stroke-width:2px;
    classDef newStep fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px;

    User([Subscribing User]) --> A["Sign Up & Open App"]:::manual
    A --> B["Complete Health & Goals Assessment"]:::newStep
    B --> C{"Elect to Post Anonymously?"}:::newStep
    
    C -- Yes --> D["Generate Anonymous Handle"]:::automated
    C -- No --> E["Display Chosen Public Handle"]:::manual
    
    B --> F["Personalization Engine Maps User Tags"]:::automated
    F --> G["Deliver Personalized For You Feed"]:::automated
    
    D --> H["Enter Topic Community Chat Rooms"]:::automated
    E --> H
    
    G --> I["Engage with Articles, Audio, and Video"]:::manual
    H --> J["Share Health Journey & Give Peer Support"]:::manual

    K[("Clinical Sources & Medical Reviewers")] --> L["Curate & Manually Verify Content"]:::manual
    L --> M["Automated Ingestion Pipeline"]:::automated
    M --> G
```


 
    
### 2.6 Risks

* **`RI-privacy-breach`**: Sensitive user health conditions and medication records stored in the database could be exposed via insecure API endpoints or misconfigured cloud access, causing legal liabilities and destroying subscriber trust.  
  *(Probability: 0.3, Impact: 9)*  
  *Mitigation:* Isolate medical assessment data from user profile records, enforce role-based access control, encrypt data both at rest and in transit, and offer fully pseudonymous public profiles.
* **`RI-peer-misinformation`**: Users in community rooms might recommend unverified home remedies or dangerous prescription adjustments that vulnerable members follow without consulting a physician.  
  *(Probability: 0.6, Impact: 8)*  
  *Mitigation:* Implement automated keyword filters for high-risk medication terms, display sticky medical disclaimers in all chat rooms, and train community moderators to review flagged conversations quickly.
* **`RI-subscription-churn`**: Subscribers might treat the app as a short-term reference tool, completing their initial educational track and canceling their subscription within 30 days.  
  *(Probability: 0.5, Impact: 7)*  
  *Mitigation:* Continuously publish weekly multi-format media (expert Q&As, podcasts, webinars) across the five core wellness pillars and use automated check-ins to keep peer threads active.
* **`RI-ai-hallucination`**: Automated content scraping tools or support chatbots could retrieve outdated, contextually inappropriate, or unverified health advice from the open web.  
  *(Probability: 0.4, Impact: 9)*  
  *Mitigation:* Restrict AI retrieval pipelines strictly to approved clinical databases (e.g., Healthy People 2030, PubMed, CDC) and require clinical sign-off before publishing new modules to user feeds.

### 2.7 Business Assumptions and Dependencies

* **`AS-intake-disclosure`**: Users are willing to share detailed medical histories, current prescriptions, and personal struggles during initial onboarding if promised anonymity and personalized content.  
  *Impact if false:* We cannot personalize feeds or match chat rooms accurately, forcing a pivot to a generic forum model.
* **`AS-subscription-viability`**: Everyday individuals and low-income families will pay a monthly subscription fee for an ad-free, vetted health space rather than relying entirely on free social media.  
  *Impact if false:* The direct-to-consumer subscription model fails, requiring a shift to employer-sponsored wellness or non-profit grant funding.
* **`AS-clinician-sourcing`**: The business can consistently recruit and retain licensed medical and wellness professionals to review content pipelines and maintain clinical credibility.  
  *Impact if false:* The platform loses its primary differentiator over Reddit and Instagram, eroding member trust.
* **`AS-app-store-clearance`**: Apple and Google review teams will classify the app as a wellness and education platform rather than a regulated medical device or telehealth diagnostic service.  
  *Impact if false:* Distribution will be blocked or delayed until costly legal and regulatory compliance audits are completed.
* **`AS-continuous-maintenance`**: Dedicated engineering resources and operational funding will be permanently available to maintain both client-side apps (iOS/Android) and backend server infrastructure (security patches, API updates, cloud hosting, and database scaling).  
  *Impact if false:* Infrastructure will degrade, mobile OS updates will break core functionality, and unresolved vulnerabilities will risk health data privacy breaches.


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
