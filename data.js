export const TICKER_LINES = [
  "Circular 12B: Lunch DMZ pending approval",
  "1,284 quick calls reported — no agenda attached",
  "Camera-off rights under parliamentary review",
  "Meleeium index: HIGH across NCR corporate belt",
  "Wellness webinar immunity bill in committee"
];

export const HERO_LINES = [
  "India's first emotionally exhausted political party.",
  "Serving the nation one unnecessary meeting at a time.",
  "From KPI victims to policy makers.",
  "Your burnout has been received by the ministry."
];

export const MANIFESTO_POLICIES = [
  { id: "01", cat: "boundaries", title: "Right to Context Act", punch: "No task without owner, deadline, or reason.", body: "Every task needs owner, deadline, objective, and one sentence explaining why it exists.", legal: "Section 4(2): Failure to provide context shall result in automatic deferral to next quarter.", human: "Tell me what this is before I lose my mind.", status: "ENACTED" },
  { id: "02", cat: "boundaries", title: "Camera-Off Leave", punch: "Your face is not a KPI.", body: "Two protected days per month. Your face is not required to prove contribution.", legal: "Biometric smile detection prohibited during protected hours.", human: "I will attend. You will not see me.", status: "ENACTED" },
  { id: "03", cat: "survival", title: "Quarterly Crashout Provision", punch: "One honest no per quarter.", body: "One protected \"I cannot do this today\" per quarter. No 19-slide justification.", legal: "Manager rebuttal limited to one GIF and a calendar link.", human: "Today is not the day. Respect it.", status: "PROPOSED" },
  { id: "04", cat: "boundaries", title: "After-Hours Escalation Tax", punch: "Weekend pings cost compensation.", body: "Weekend pings require compensation, context, and apology to your nervous system.", legal: "Each ping after 7 PM accrues 1.5x chai credits payable within 48 hours.", human: "If it's urgent, pay for it with money or silence.", status: "HR PENDING" },
  { id: "05", cat: "meetings", title: "No-Meeting Lunch Bill", punch: "12:30–2:00 is sacred.", body: "12:30–2:00 PM is a demilitarized zone. Chai diplomacy may continue.", legal: "Calendar invites during DMZ flagged as hostile acts.", human: "I am eating. Do not perceive me.", status: "ENACTED" },
  { id: "06", cat: "meetings", title: "PPT Revision Limitation Act", punch: "Seven revisions, then release the deck.", body: "After seven revisions, the deck is a spiritual object and must be released.", legal: "Version 8+ classified as ceremonial artifacts only.", human: "Ship it before we all die.", status: "ENACTED" },
  { id: "07", cat: "meetings", title: "Reply-All Amnesty", punch: "One corporate sin forgiven yearly.", body: "One mass-email mistake forgiven per fiscal year without performance review.", legal: "Amnesty void if sent after 11 PM with \"per my last email.\"", human: "We do not speak of March 3rd.", status: "PROPOSED" },
  { id: "08", cat: "boundaries", title: "Scope Creep Tariff", punch: "New ask after 5 PM costs chai.", body: "New scope after 5 PM requires written scope, timeline, and one chai.", legal: "Tariff doubles if prefixed with \"quick\".", human: "Sure — here's what it will cost you.", status: "HR PENDING" },
  { id: "09", cat: "survival", title: "Wellness Webinar Immunity", punch: "Optional. Always optional.", body: "Wellness webinars optional. Attendance not linked to performance.", legal: "Hosts may not use the word \"mandatory\" in any derivative form.", human: "My wellness is not your Zoom link.", status: "ENACTED" },
  { id: "10", cat: "meetings", title: "Quick Call Cooling Period", punch: "15 minutes before \"quick\" is legal.", body: "15-minute buffer before calendar may label any invite \"quick\".", legal: "Violations punishable by mandatory agenda PDF.", human: "Nothing is quick. Stop lying.", status: "PROPOSED" }
];

export const ARCHETYPES = [
  { title: "The LinkedIn Monk", front: "Posts sunrise gratitude after a 9 PM escalation.", quote: "\"Thrilled to share...\"", tip: "Survival: Mute notifications. Post quarterly only." },
  { title: "The PPT Warrior", front: "Feels a misaligned icon from 40 feet away.", quote: "\"Can we make this more premium?\"", tip: "Survival: Lock deck at v3. Go offline." },
  { title: "The HR Diplomat", front: "Converts pain into policy-compliant paragraphs.", quote: "\"We hear you.\"", tip: "Survival: Ask for written follow-up. Always." },
  { title: "The Quick Call Criminal", front: "Two minutes becomes 47 minutes.", quote: "\"Can we hop on?\"", tip: "Survival: Reply with \"send agenda\"." },
  { title: "The Slack Ninja", front: "Decisions buried in threads.", quote: "\"As mentioned above.\"", tip: "Survival: Summarize in one pinned message." },
  { title: "The Hustlepreneur", front: "Main job, side hustle, podcast, eye twitch.", quote: "\"Sleep is a limiting belief.\"", tip: "Survival: Sleep. Seriously." }
];

export const QUIZ_QUESTIONS = [
  { q: "Friday 6 PM: manager schedules \"quick sync.\" You:", opts: [{ t: "Join with camera off and silence", a: "ninja" }, { t: "Ask for agenda or decline", a: "diplomat" }, { t: "Join and say \"thrilled to align\"", a: "monk" }, { t: "Redesign their slide deck instead", a: "warrior" }] },
  { q: "Your calendar has 6 back-to-back calls. You:", opts: [{ t: "Block 15 min and call it \"focus time\"", a: "diplomat" }, { t: "Accept — culture of hustle", a: "hustle" }, { t: "Decline two with \"bandwidth\"", a: "ninja" }, { t: "Make a premium agenda template", a: "warrior" }] },
  { q: "Someone says \"let's take this offline.\" You hear:", opts: [{ t: "Fight with better lighting", a: "diplomat" }, { t: "Another meeting", a: "criminal" }, { t: "Run", a: "ninja" }, { t: "Opportunity to synergize", a: "monk" }] },
  { q: "Sunday Slack ping. Your soul:", opts: [{ t: "Leaves body, types \"noted\"", a: "ninja" }, { t: "Replies with podcast recommendation", a: "hustle" }, { t: "Screenshots for HR folder", a: "diplomat" }, { t: "Opens Figma to cope", a: "warrior" }] },
  { q: "All-hands theme is \"grit.\" You:", opts: [{ t: "Post LinkedIn gratitude", a: "monk" }, { t: "Schedule PTO", a: "diplomat" }, { t: "Mute and meal prep", a: "ninja" }, { t: "Build grit-themed slide", a: "warrior" }] }
];

export const QUIZ_RESULTS = {
  monk: { title: "The LinkedIn Monk", line: "You perform wellness while burning. Iconic." },
  warrior: { title: "The PPT Warrior", line: "You fight chaos with kerning. Respect." },
  diplomat: { title: "The HR Diplomat", line: "You translate pain into policy. Dangerous skill." },
  ninja: { title: "The Slack Ninja", line: "You survive through ambiguity and mute buttons." },
  criminal: { title: "The Quick Call Criminal", line: "You schedule \"quick\" calls. Seek help." },
  hustle: { title: "The Hustlepreneur", line: "Sleep is not a limiting belief. It is a need." }
};

export const WALL_ENTRIES = [
  "Survived QBR. Still unclear what Q means.",
  "Manager said \"quick call.\" It was 52 minutes.",
  "Applied PTO. Felt guilt. Applied anyway.",
  "Deck v9 shipped. I am a ghost now.",
  "Wellness webinar during lunch. I ate in silence.",
  "Typed \"per my last email\" and blacked out.",
  "Camera off. Spirit on.",
  "Scope changed. Compensation did not."
];

export const TOOL_DATA = {
  excuse: {
    label: "Meeting excuse generator",
    items: [
      ["\"Currently in a cross-functional sync with my nervous system.\"", "Approved for vague invites and calls titled only 'Discussion'."],
      ["\"My keyboard is undergoing emergency alignment therapy.\"", "Deploy when you cannot look at another spreadsheet today."],
      ["\"Resolving a high-priority spiritual bandwidth incident.\"", "Perfect for when your brain has too many tabs open."],
      ["\"Need urgent context recovery to remember what my job is.\"", "Use when nobody knows who owns the project anymore."],
      ["\"Stuck in a parallel universe where this meeting has an agenda.\"", "Ideal for decline replies to surprise Friday 5:30 PM calendar blocks."]
    ]
  },
  buzzword: {
    label: "Buzzword translator",
    items: [
      ["\"High visibility\" means high risk, low credit.", "Public success, private panic."],
      ["\"Take this offline\" means let us fight with better lighting.", "Let's take this behind the digital shed and bury it forever."],
      ["\"Ownership mindset\" means scope up, pay flat.", "Classic fiscal magic where you are the magician and the volunteer."],
      ["\"Leverage synergies\" means double the meetings, half the progress.", "Combining two mediocre processes to form one giant bottleneck."],
      ["\"Circle back\" means let us hope we all forget this next week.", "The polite corporate way to postpone an idea to the afterlife."],
      ["\"A lot on my plate\" means stop talking to me.", "I am currently one email away from throwing my laptop into a lake."]
    ]
  },
  pto: {
    label: "PTO guilt calculator",
    items: [
      ["Guilt Index: 82 out of 100.", "Apply anyway. Avoid Slack for at least 36 hours."],
      ["Guilt Index: 46 out of 100.", "Manager's reply tone is survivable. Proceed to pack bags."],
      ["Guilt Index: 99 out of 100.", "Fake network instability or a plumbing emergency recommended."],
      ["Guilt Index: 110 out of 100.", "You are currently feeling bad for wanting to eat lunch. Close the tab immediately."],
      ["Guilt Index: 5 out of 100.", "Spiritual freedom achieved. You no longer care if the database explodes."]
    ]
  },
  bandwidth: {
    label: "Emotional bandwidth meter",
    items: [
      ["Status: Can only react with emoji reactions.", "Avoid humans saying 'quick call'."],
      ["Status: Do not perceive me.", "Camera-off is a medical necessity at this stage."],
      ["Status: Able to collaborate at 1% capacity.", "I will nod, but I am spiritually in the mountains."],
      ["Status: Mentally checked out since last Tuesday.", "Answering Slack pings with 'noted' while staring into the abyss."],
      ["Status: High bandwidth for chai breaks only.", "Will participate in tea diplomacy. Do not ask for slides."]
    ]
  },
  resignation: {
    label: "Resignation letter generator",
    items: [
      ["Dear Leadership, I resign from ambiguity.", "Effective immediately, or after I find my mouse in my 52 open browser tabs."],
      ["I am leaving to pursue my health and actual boundaries.", "This meeting could have been an email. It was not, so I am leaving."],
      ["Please accept this resignation as my final quarterly deliverable.", "My synergy is fully aligned with my departure."],
      ["I am taking myself offline permanently.", "Best of luck circling back on my tasks."],
      ["Trading my stakeholder ownership for early afternoon naps.", "No transition document will survive this QBR."]
    ]
  },
  boundary: {
    label: "Boundary email generator",
    items: [
      ["I will not be available after 7 PM without written chai compensation.", "Urgent means pre-compensated or scheduled."],
      ["I need a written agenda before I click accept.", "Otherwise I will protect my focus time with my life."],
      ["My Slack status is active but my spirit is not.", "Please email me only if the building is physically on fire."],
      ["Let's not take this offline. Let's not take it online either.", "Let's never speak of this idea again."],
      ["I am unavailable for calls that could have been a single Slack message.", "Please type it out. You can do it."]
    ]
  }
};
