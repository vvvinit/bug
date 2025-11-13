// Game configuration constants
export const GAME_CONFIG = {
  INITIAL_HEARTS: 3,
  TRANSITION_DELAY: 2000,
  NEXT_QUESTION_DELAY: 1000,
  CAT_DISPLAY_DURATION: 2000,
  HEART_ANIMATION_DURATION: 1500,
};

// Quiz questions data
export const QUIZ_QUESTIONS = [
  {
    question: 'what amongst these is literally ur face?',
    options: [':(', ':3', ':)'],
    answer: ':3',
    isTextAnswer: false,
    answeredCorrectly: false
  },
  {
    question: 'how do u spell "cat" backwards?',
    answer: 'tac',
    isTextAnswer: true,
    answeredCorrectly: false
  },
  {
    question: 'whats ur brain size?',
    options: ['very tiny >:3','tiny', 'small', 'medium', 'big'],
    answer: 'very tiny >:3',
    isTextAnswer: false,
    answeredCorrectly: false
  },
  {
    question: 'what is the best thing to do when u see a cat?',
    options: ['run away', 'chase it', 'pet it', 'ignore it'],
    answer: 'pet it',
    isTextAnswer: false,
    answeredCorrectly: false
  },
  {
    question: 'solve this to prove that you are not a robot: 45 + 32 = ? (if u use a calculator, u are a robot)',
    answer: '77',
    isTextAnswer: true,
    answeredCorrectly: false
  },
  {
    question: 'which amongst these is u?',
    options: ['a velicocopeter', 'a dog', 'a pretty stinky owl', 'a human'],
    answer: 'a pretty stinky owl',
    isTextAnswer: false,
    answeredCorrectly: false
  },
  {
    question: 'how do u feel about vinnie?',
    options: ['i love vinnie', 'i hate vinnie', 'i am vinnie', 'i am a robot'],
    answer: 'i love vinnie',
    isTextAnswer: false,
    answeredCorrectly: false
  }
];

// Page titles
export const PAGE_TITLES = {
  CAT_PUZZLE: 'the cat puzzle :3',
  ARTWORK_GALLERY: 'Happy pride month!!! :3',
  HOME: 'Bug - A Cute Surprise :3'
};
