import { GitHubUser } from '../services/github';
import { DeveloperStats } from './scoring';

const LANGUAGE_ROASTS: Record<string, string[]> = {
  JavaScript: [
    "A JavaScript dev? I'm surprised your profile didn't crash on load.",
    "Your repos are 90% node_modules and 10% unhandled promises.",
    "You write JavaScript. Which means you spend more time picking frameworks than writing code.",
    "You probably think 'undefined is not a function' is a deep philosophical quote.",
    "I bet you use left-pad and think you're a senior engineer.",
    "JavaScript: where you use 14,000 dependencies to render a static button."
  ],
  TypeScript: [
    "TypeScript: Because you needed Microsoft to hold your hand to write JavaScript.",
    "You spend 3 hours defining an interface just to return 'any' anyway.",
    "Ah, a TypeScript developer. I bet your type definitions are longer than your actual logic.",
    "You act superior to JS devs, but deep down you know it compiles to the exact same garbage.",
    "Your code is 80% types and 20% actually solving the problem."
  ],
  Python: [
    "Python dev. I bet you import a library just to print 'Hello World'.",
    "You think you're a data scientist, but you just copied a Jupyter Notebook.",
    "Significant whitespace is the only structure in your life right now.",
    "You love Python because you couldn't figure out where the curly braces went.",
    "I see Python. Let me guess, you 'built an AI' by calling the OpenAI API once."
  ],
  Java: [
    "Java? Did you inherit this profile from a bank in 2005?",
    "AbstractSingletonProxyFactoryBean. That's it. That's the roast.",
    "You write Java. You've probably typed 'public static void main' more times than you've said 'I love you'.",
    "Your boilerplate code has more lines than my entire application.",
    "Still waiting for the JVM to warm up before I can finish this roast."
  ],
  Rust: [
    "We get it, you write Rust. You don't have to rewrite this app too.",
    "You spend more time fighting the borrow checker than actually deploying features.",
    "You're a Rustacean. Your code is safe, but your social life is entirely unsafe.",
    "I bet you bring up memory safety on first dates.",
    "If 'rewriting it in Rust' was an Olympic sport, you'd win gold."
  ],
  Go: [
    "if err != nil { return err }. There, I summarized your entire codebase.",
    "You write Go because you think generics are a conspiracy theory.",
    "Go developers: the only people who think typing 'err != nil' 500 times is 'elegant'.",
    "Rob Pike didn't invent Go for you to build another CRUD API.",
    "You love Go because it validates your refusal to learn complex programming concepts."
  ],
  PHP: [
    "PHP. Oh honey... who hurt you?",
    "You write PHP. It's not 2012 anymore, you can stop now.",
    "A PHP developer! I didn't know they still made those.",
    "Your codebase is basically a WordPress plugin masquerading as a SaaS.",
    "I'd roast you, but honestly, debugging PHP in production is punishment enough."
  ],
  C: [
    "Segfault (core dumped).",
    "You write C. You probably think memory management is a personality trait.",
    "You're still writing C? Grandpa, it's time to take your meds.",
    "Malloc this, calloc that... how about you allocate some time to touch grass?",
    "I bet you complain about 'bloatware' while spending 4 days fixing a pointer arithmetic bug."
  ],
  "C++": [
    "C++: because you wanted all the footguns of C, but object-oriented.",
    "I bet compiling your repos takes longer than watching the Lord of the Rings extended edition.",
    "You write C++. The language is as overly complex as your commit history.",
    "Template metaprogramming is not a substitute for therapy.",
    "You use C++ because you love the feeling of 200-line compiler errors for missing a semicolon."
  ],
  "C#": [
    "C#: For when you want to write Java, but you worship Bill Gates.",
    "You probably dream in Visual Studio Enterprise Edition.",
    "LINQ is cool, but it won't query you a social life.",
    "Let me guess, Unity game dev who never finished a single tutorial project?"
  ],
  Ruby: [
    "Ruby on Rails? Did I time travel back to 2013?",
    "You probably still think you're going to build the next Twitter.",
    "Your code is 'elegant', but your server response time is measured in business days."
  ],
  HTML: [
    "HTML is your top language? Let me know when you learn how to program.",
    "You're an 'HTML Programmer'. That's like calling yourself a chef because you can use a microwave.",
    "<h1>Wow, much code, very developer</h1>."
  ],
  CSS: [
    "You write CSS. Which means you center divs for a living.",
    "I bet you use !important as a crutch for your terrible cascading logic.",
    "Your stylesheet has more specificity conflicts than a political debate."
  ]
};

const LOW_COMMIT_ROASTS = [
  "Your commit graph looks like a barren wasteland. Do you even code?",
  "You push less code than a retired product manager.",
  "Your contribution square is so empty, Greenpeace is trying to adopt it.",
  "You code exclusively on February 29th, don't you?",
  "With this commit history, I assume 'git commit' is a concept you're still studying.",
  "Did you forget your GitHub password for 11 months out of the year?",
  "You treat pushing code to main like it's a terrifying life decision."
];

const HIGH_COMMIT_ROASTS = [
  "You have a lot of commits. We get it, you don't have a life outside the terminal.",
  "Your commit history is dark green, but your vitamin D levels are definitely critically low.",
  "Do you ever close your laptop, or is your IDE permanently burned into your retinas?",
  "You commit so much I suspect you're just fixing typos in README files.",
  "With this much activity, your keyboard must be begging for mercy.",
  "You're single-handedly keeping GitHub's database servers running hot. Go outside.",
  "Commit often, commit early... but maybe take a shower occasionally?"
];

const HIGH_STARS_ROASTS = [
  "Wow, lots of stars! How much did you pay for those bots?",
  "High stars. You're practically an influencer, which means you probably don't actually write code anymore.",
  "All those stars and still searching for validation in a terminal UI.",
  "People star your repos so they never have to look at them again.",
  "You have stars, but let's be real, half of them are from your bootcamp classmates.",
  "Stars don't equal talent, but keep telling yourself that during code reviews."
];

const LOW_STARS_ROASTS = [
  "Zero stars. Even your mom didn't star your repos.",
  "Your repositories are like a digital graveyard. Nobody visits.",
  "You have fewer stars than a cloudy night in London.",
  "I'd star your repo, but I don't want to encourage this behavior.",
  "It's okay, maybe one day someone will accidentally click the star button on your fork.",
  "Your code is so obscure, even search engines refuse to index it."
];

export const generateRoast = (stats: DeveloperStats, user: GitHubUser, contributions: number): string => {
  const parts: string[] = [];

  // 1. Language Roast
  const topLang = stats.topLanguage;
  if (LANGUAGE_ROASTS[topLang]) {
    const langRoasts = LANGUAGE_ROASTS[topLang];
    parts.push(langRoasts[Math.floor(Math.random() * langRoasts.length)]);
  } else if (topLang !== 'Unknown') {
    parts.push(`Your top language is ${topLang}? Are you just inventing esoteric languages to avoid real work?`);
  } else {
    parts.push(`You have no code. Are you just using GitHub as an overpriced bookmark manager?`);
  }

  // 2. Commit Activity Roast
  if (contributions < 50) {
    parts.push(LOW_COMMIT_ROASTS[Math.floor(Math.random() * LOW_COMMIT_ROASTS.length)]);
  } else if (contributions > 2000) {
    parts.push(HIGH_COMMIT_ROASTS[Math.floor(Math.random() * HIGH_COMMIT_ROASTS.length)]);
  } else {
    const MID_ROASTS = [
      `You have ${contributions} contributions. Aggressively mediocre.`,
      `You commit just enough to not get fired. I respect the hustle.`,
      `${contributions} commits. You're the vanilla ice cream of developers.`
    ];
    parts.push(MID_ROASTS[Math.floor(Math.random() * MID_ROASTS.length)]);
  }

  // 3. Stars Roast
  if (stats.totalStars > 500) {
    parts.push(HIGH_STARS_ROASTS[Math.floor(Math.random() * HIGH_STARS_ROASTS.length)]);
  } else if (stats.totalStars < 5) {
    parts.push(LOW_STARS_ROASTS[Math.floor(Math.random() * LOW_STARS_ROASTS.length)]);
  } else {
    parts.push(`A few stars here and there. Just enough to feed your ego.`);
  }

  // 4. Personalized finishing blow
  const blows = [
    `Honestly ${user.name || user.login}, your code makes me want to ` + "rm -rf /",
    `Level ${stats.level}? I've seen 'Hello World' tutorials with more complexity.`,
    `You might be a '${stats.archetype}', but let's be real: you rely heavily on StackOverflow.`,
    `Anyway, keep pushing to main. What's the worst that could happen?`,
    `I'd roast you harder, but reading your commit messages already brought me to tears.`,
    `${user.login}, you're the reason we have merge conflicts.`,
    `If your code was a building, it would be condemned by the city council.`,
    `I've seen cleaner code in a bowl of spaghetti.`
  ];

  parts.push(blows[Math.floor(Math.random() * blows.length)]);

  return parts.join(' ');
};
