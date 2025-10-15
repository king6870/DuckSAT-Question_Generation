# Design Document

## Overview

The enhanced DuckSAT practice test system will provide a comprehensive, visually appealing, and realistic SAT testing experience. The design focuses on creating an engaging user interface with prominent visual elements and implementing a multi-module test structure that mirrors the actual SAT format. The system will be built using React components with enhanced styling, state management for multi-module progression, and a flexible question pool system that supports future adaptive difficulty implementation.

## Architecture

### Component Architecture

```
PracticeTestApp
├── TestLauncher (Start screen with module overview)
├── ModuleContainer (Wrapper for each test module)
│   ├── ModuleHeader (Timer, progress, module info)
│   ├── QuestionInterface (Question display and interaction)
│   └── ModuleTransition (Break screen between modules)
├── ResultsSystem (Comprehensive results display)
└── EnhancedUI (Shared styling and animation components)
```

### State Management Structure

```typescript
interface TestState {
  currentModule: number // 1-4
  moduleType: 'reading-writing' | 'math'
  questions: Question[][]  // Array of question arrays for each module
  answers: Answer[][] // User answers for each module
  timeRemaining: number
  moduleStartTime: Date
  testStartTime: Date
  isTransitioning: boolean
  completedModules: number[]
}

interface ModuleConfig {
  id: number
  type: 'reading-writing' | 'math'
  duration: number // minutes
  questionCount: number
  title: string
}
```

### Data Flow

1. **Test Initialization**: Load question pools, initialize state, display module overview
2. **Module Execution**: Present questions, track time, collect answers
3. **Module Transition**: Calculate performance, show break screen, prepare next module
4. **Results Generation**: Compile comprehensive results across all modules

## Components and Interfaces

### Enhanced UI Components

#### Button Component
```typescript
interface EnhancedButtonProps {
  variant: 'primary' | 'secondary' | 'success' | 'danger'
  size: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  hasGlow?: boolean
  children: React.ReactNode
  onClick: () => void
}
```

**Visual Features:**
- Gradient backgrounds with hover animations
- Box shadows and glow effects
- Smooth scale transforms on hover
- Loading states with animated spinners
- Ripple effects on click

#### Question Card Component
```typescript
interface QuestionCardProps {
  question: Question
  selectedAnswer?: number
  onAnswerSelect: (index: number) => void
  questionNumber: number
  totalQuestions: number
}
```

**Visual Features:**
- Prominent card shadows and borders
- Animated answer selection with color transitions
- Progress indicators with gradient fills
- Hover effects on answer options
- Clear typography hierarchy

#### Module Header Component
```typescript
interface ModuleHeaderProps {
  moduleNumber: number
  moduleType: string
  timeRemaining: number
  progress: number
  questionsAnswered: number
  totalQuestions: number
}
```

**Visual Features:**
- Animated countdown timer with color changes
- Gradient progress bars with smooth animations
- Module badges with distinctive colors
- Floating card design with shadows

### Test Module System

#### Module Configuration
```typescript
const MODULE_CONFIGS: ModuleConfig[] = [
  {
    id: 1,
    type: 'reading-writing',
    duration: 32,
    questionCount: 27,
    title: 'Reading and Writing - Module 1'
  },
  {
    id: 2,
    type: 'reading-writing',
    duration: 32,
    questionCount: 27,
    title: 'Reading and Writing - Module 2'
  },
  {
    id: 3,
    type: 'math',
    duration: 35,
    questionCount: 22,
    title: 'Math - Module 1'
  },
  {
    id: 4,
    type: 'math',
    duration: 35,
    questionCount: 22,
    title: 'Math - Module 2'
  }
]
```

#### Question Pool Structure
```typescript
interface Question {
  id: string
  moduleType: 'reading-writing' | 'math'
  difficulty: 'easy' | 'medium' | 'hard'
  category: string // 'reading-comprehension', 'grammar', 'algebra', etc.
  question: string
  passage?: string // For reading questions
  options: string[]
  correctAnswer: number
  explanation: string
  timeEstimate: number // seconds
}

interface QuestionPool {
  readingWriting: {
    module1: Question[]
    module2Easy: Question[]
    module2Medium: Question[]
    module2Hard: Question[]
  }
  math: {
    module1: Question[]
    module2Easy: Question[]
    module2Medium: Question[]
    module2Hard: Question[]
  }
}
```

### Transition System

#### Module Transition Component
```typescript
interface ModuleTransitionProps {
  completedModule: ModuleConfig
  nextModule: ModuleConfig
  performance: ModulePerformance
  onContinue: () => void
}

interface ModulePerformance {
  score: number
  timeUsed: number
  questionsCorrect: number
  totalQuestions: number
  strongAreas: string[]
  weakAreas: string[]
}
```

**Visual Features:**
- Animated performance summary cards
- Progress celebration animations
- Countdown timer for break duration
- Motivational messaging system
- Smooth transitions between screens

## Data Models

### Question Management
```typescript
class QuestionManager {
  private questionPools: QuestionPool
  
  generateModule(moduleId: number, previousPerformance?: ModulePerformance): Question[]
  getDifficultyLevel(performance: ModulePerformance): 'easy' | 'medium' | 'hard'
  shuffleQuestions(questions: Question[]): Question[]
  validateQuestionPool(): boolean
}
```

### Performance Tracking
```typescript
interface TestSession {
  id: string
  userId: string
  startTime: Date
  endTime?: Date
  modules: ModuleResult[]
  overallScore: number
  totalTimeSpent: number
}

interface ModuleResult {
  moduleId: number
  moduleType: string
  score: number
  timeSpent: number
  answers: Answer[]
  performance: ModulePerformance
}
```

### Adaptive Difficulty System (Future)
```typescript
interface AdaptiveDifficultyEngine {
  calculatePerformanceScore(answers: Answer[], questions: Question[]): number
  determineNextModuleDifficulty(score: number): 'easy' | 'medium' | 'hard'
  selectQuestionsForDifficulty(difficulty: string, count: number): Question[]
  trackPerformancePatterns(userId: string, results: ModuleResult[]): void
}
```

## Error Handling

### Timer Management
- Automatic submission when time expires
- Grace period warnings (5 minutes, 1 minute remaining)
- Network disconnection handling with local state preservation
- Resume capability after interruption

### State Recovery
- Local storage backup of test progress
- Automatic save every 30 seconds
- Recovery prompts after browser refresh
- Data validation and integrity checks

### User Experience Errors
- Graceful handling of missing questions
- Fallback UI for loading failures
- Clear error messages with recovery options
- Support contact information for technical issues

## Testing Strategy

### Unit Testing
- Question pool validation and selection logic
- Timer functionality and state management
- Performance calculation algorithms
- UI component rendering and interactions

### Integration Testing
- Module transition workflows
- State persistence and recovery
- Timer synchronization across components
- Results compilation and display

### User Experience Testing
- Multi-module test completion flows
- Performance under time pressure
- Visual feedback and animation smoothness
- Accessibility compliance (WCAG 2.1)

### Performance Testing
- Large question pool loading
- Memory usage during long test sessions
- Animation performance on various devices
- Network resilience testing

## Visual Design System

### Color Palette
```css
:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --success-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  --warning-gradient: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
  --danger-gradient: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  
  --card-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  --card-shadow-hover: 0 15px 35px rgba(0, 0, 0, 0.15);
  --glow-primary: 0 0 20px rgba(102, 126, 234, 0.3);
}
```

### Animation System
```css
.enhanced-button {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateY(0);
}

.enhanced-button:hover {
  transform: translateY(-2px);
  box-shadow: var(--card-shadow-hover);
}

.question-card {
  animation: slideInUp 0.5s ease-out;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Typography Hierarchy
- **Headers**: Inter font family, bold weights, increased letter spacing
- **Body Text**: Inter font family, regular weight, optimized line height
- **UI Elements**: Medium weight, consistent sizing scale
- **Code/Math**: JetBrains Mono for mathematical expressions

This design provides a comprehensive foundation for implementing the enhanced SAT practice test system with improved visual appeal and realistic multi-module structure.