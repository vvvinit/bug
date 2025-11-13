# Bug 🐱 - A Cute Surprise Web App

A charming React web application featuring an interactive cat puzzle game and a beautiful artwork gallery. Created as a loving surprise with Firebase integration for dynamic content.

## ✨ Features

- **🧩 Cat Puzzle Game**: Interactive quiz to test if you're really a cat!
  - Heart-based life system
  - Multiple question types (multiple choice & text input)
  - Cute cat animations and feedback
  - Game completion states

- **🎨 Artwork Gallery**: Beautiful image viewer powered by Firebase
  - Dynamic image loading from Firebase Storage
  - Floating navigation buttons with smooth animations
  - Click-to-spawn My Melody effects
  - Responsive image display

- **🎯 Interactive Elements**:
  - Animated gradient backgrounds
  - Smooth transitions and hover effects
  - Mobile-responsive design
  - Cute sound and visual feedback

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase project with Storage enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bug
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your Firebase configuration:
   ```env
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

4. **Start development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── common/          # Shared components
│   │   ├── Navigation.js
│   │   ├── LoadingSpinner.js
│   │   └── ErrorMessage.js
│   ├── pages/           # Page components
│   │   ├── HomePage.js
│   │   ├── CatPuzzlePage.js
│   │   └── ArtworkGalleryPage.js
│   ├── puzzle/          # Cat puzzle components
│   │   ├── QuestionDisplay.js
│   │   ├── HeartsDisplay.js
│   │   ├── CatDisplay.js
│   │   └── GameResult.js
│   └── gallery/         # Gallery components
│       ├── ImageDisplay.js
│       └── FloatingButtons.js
├── hooks/               # Custom React hooks
│   ├── useFirebaseImages.js
│   ├── useCatPuzzle.js
│   ├── useFloatingButtons.js
│   └── useMelodyEffect.js
├── config/              # Configuration files
│   └── firebase.js
├── constants/           # App constants
│   ├── gameConfig.js
│   └── uiConfig.js
├── styles/              # CSS files
│   ├── components.css
│   └── puzzle.css
└── assets/              # Static assets
    └── images/
```

## 🛠️ Available Scripts

- **`npm start`** - Start development server
- **`npm build`** - Build for production
- **`npm test`** - Run tests
- **`npm run lint`** - Check code quality
- **`npm run lint:fix`** - Fix linting issues
- **`npm run format`** - Format code with Prettier
- **`npm run analyze`** - Analyze bundle size
- **`npm run deploy`** - Deploy to GitHub Pages

## 🎮 How to Play

### Cat Puzzle Game
1. Navigate to "bug puzzle" from the home page
2. Answer questions to prove you're a cat
3. You have 2 hearts (lives) - wrong answers cost a heart
4. Complete all questions to win!

### Artwork Gallery
1. Navigate to "cute art :3" from the home page
2. Click the floating buttons to navigate between images
3. Click anywhere to spawn cute My Melody images
4. Enjoy the animated gradient background

## 🔧 Configuration

### Game Settings
Edit `src/constants/gameConfig.js` to modify:
- Number of hearts/lives
- Animation timings
- Quiz questions and answers

### UI Settings
Edit `src/constants/uiConfig.js` to modify:
- Button counts and behavior
- Image sizes and effects
- Route paths

### Firebase Setup
1. Create a Firebase project
2. Enable Storage
3. Upload images to Storage root
4. Configure authentication rules as needed

## 🎨 Customization

### Adding New Questions
Edit `src/constants/gameConfig.js`:
```javascript
{
  question: 'Your question here?',
  options: ['Option 1', 'Option 2', 'Option 3'], // For multiple choice
  answer: 'Correct answer',
  isTextAnswer: false, // true for text input questions
  answeredCorrectly: false
}
```

### Styling
- Global styles: `src/App.css`
- Component styles: `src/styles/components.css`
- Puzzle styles: `src/styles/puzzle.css`

### Adding New Images
Upload images to your Firebase Storage bucket - they'll automatically appear in the gallery!

## 🚀 Deployment

### GitHub Pages
```bash
npm run deploy
```

### Other Platforms
```bash
npm run build
# Deploy the 'build' folder to your hosting service
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is a personal gift and is not intended for commercial use.

## 💖 Acknowledgments

Created with love as a surprise gift. Special thanks to:
- React community for the amazing framework
- Firebase for reliable backend services
- All the cute cat and My Melody images that make this special

---

*Made with 💜 for someone special*
