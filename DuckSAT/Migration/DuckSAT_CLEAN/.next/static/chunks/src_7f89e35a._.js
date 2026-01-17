(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/data/moduleConfigs.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "MODULE_CONFIGS": ()=>MODULE_CONFIGS,
    "getMathModules": ()=>getMathModules,
    "getModuleConfig": ()=>getModuleConfig,
    "getModulesByType": ()=>getModulesByType,
    "getReadingWritingModules": ()=>getReadingWritingModules,
    "getTotalQuestions": ()=>getTotalQuestions,
    "getTotalTestTime": ()=>getTotalTestTime
});
const MODULE_CONFIGS = [
    {
        id: 1,
        type: 'reading-writing',
        duration: 32,
        questionCount: 27,
        title: 'Reading and Writing - Module 1',
        description: 'This module tests your reading comprehension, grammar, and writing skills. You have 32 minutes to complete 27 questions.',
        icon: '📚',
        color: 'from-blue-500 to-indigo-600'
    },
    {
        id: 2,
        type: 'reading-writing',
        duration: 32,
        questionCount: 27,
        title: 'Reading and Writing - Module 2',
        description: 'This module adapts to your Module 1 performance with appropriate difficulty questions. You have 32 minutes to complete 27 questions.',
        icon: '📖',
        color: 'from-indigo-500 to-purple-600'
    },
    {
        id: 3,
        type: 'math',
        duration: 35,
        questionCount: 22,
        title: 'Math - Module 1',
        description: 'This module covers algebra, geometry, statistics, and advanced math topics. You have 35 minutes to complete 22 questions.',
        icon: '🔢',
        color: 'from-green-500 to-emerald-600'
    },
    {
        id: 4,
        type: 'math',
        duration: 35,
        questionCount: 22,
        title: 'Math - Module 2',
        description: 'This module adapts to your Module 3 performance with appropriate difficulty questions. You have 35 minutes to complete 22 questions.',
        icon: '🧮',
        color: 'from-emerald-500 to-teal-600'
    }
];
const getModuleConfig = (moduleId)=>{
    return MODULE_CONFIGS.find((config)=>config.id === moduleId);
};
const getTotalTestTime = ()=>{
    return MODULE_CONFIGS.reduce((total, config)=>total + config.duration, 0);
};
const getTotalQuestions = ()=>{
    return MODULE_CONFIGS.reduce((total, config)=>total + config.questionCount, 0);
};
const getModulesByType = (type)=>{
    return MODULE_CONFIGS.filter((config)=>config.type === type);
};
const getReadingWritingModules = ()=>{
    return getModulesByType('reading-writing');
};
const getMathModules = ()=>{
    return getModulesByType('math');
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/hooks/useTestState.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "useTestState": ()=>useTestState
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$moduleConfigs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/moduleConfigs.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
function useTestState(userId) {
    _s();
    const [testState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [hasStarted, setHasStarted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [currentModuleIndex, setCurrentModuleIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isTransitioning, setIsTransitioning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isComplete, setIsComplete] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [moduleStarted, setModuleStarted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isBreakTime, setIsBreakTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [breakTimeRemaining, setBreakTimeRemaining] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    // Timer and answer state
    const [timeRemaining, setTimeRemaining] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [selectedAnswers, setSelectedAnswers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [moduleStartTime, setModuleStartTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [testStartTime, setTestStartTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Test results tracking
    const [testResults, setTestResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [moduleResults, setModuleResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // Questions from database with no-repeat tracking
    const [currentModuleQuestions, setCurrentModuleQuestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [usedQuestionIds, setUsedQuestionIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // Per-question time tracking
    const [questionStartTimes, setQuestionStartTimes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Map());
    const [questionTimeSpent, setQuestionTimeSpent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Map());
    // Get current module config
    const currentModule = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useTestState.useMemo[currentModule]": ()=>{
            if (currentModuleIndex >= __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$moduleConfigs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MODULE_CONFIGS"].length) return null;
            return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$moduleConfigs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MODULE_CONFIGS"][currentModuleIndex];
        }
    }["useTestState.useMemo[currentModule]"], [
        currentModuleIndex
    ]);
    // Get current question
    const currentQuestion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useTestState.useMemo[currentQuestion]": ()=>{
            if (!currentModule || currentModuleQuestions.length === 0) return null;
            if (currentQuestionIndex >= currentModuleQuestions.length) return null;
            return currentModuleQuestions[currentQuestionIndex];
        }
    }["useTestState.useMemo[currentQuestion]"], [
        currentModule,
        currentModuleQuestions,
        currentQuestionIndex
    ]);
    // Fetch questions from database with no-repeat logic
    const fetchQuestions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTestState.useCallback[fetchQuestions]": async (moduleType, questionCount)=>{
            try {
                setIsLoading(true);
                const limit = questionCount || (moduleType === 'math' ? 22 : 27);
                console.log("🔍 Fetching ".concat(limit, " questions for moduleType: ").concat(moduleType));
                // Get more questions than needed to filter out used ones
                const response = await fetch("/api/questions?moduleType=".concat(moduleType, "&limit=").concat(limit * 2));
                if (!response.ok) {
                    throw new Error("Failed to fetch questions: ".concat(response.statusText));
                }
                const data = await response.json();
                const questions = data.questions || data // Handle both {questions: [...]} and [...] formats
                ;
                console.log("📝 Received ".concat(questions.length || 0, " questions from API"));
                if (!questions || questions.length === 0) {
                    console.warn('⚠️ No questions available from API, returning empty array');
                    setCurrentModuleQuestions([]);
                    setSelectedAnswers([]);
                    setIsLoading(false);
                    return [];
                }
                // Filter out already used questions
                const availableQuestions = questions.filter({
                    "useTestState.useCallback[fetchQuestions].availableQuestions": (q)=>!usedQuestionIds.includes(q.id)
                }["useTestState.useCallback[fetchQuestions].availableQuestions"]);
                // If we don't have enough unused questions, reset the used set (allow repeats but minimize them)
                let questionsToUse = availableQuestions;
                if (availableQuestions.length < limit) {
                    console.log('⚠️ Not enough unused questions, allowing some repeats');
                    questionsToUse = questions;
                    setUsedQuestionIds([]); // Reset used questions to allow repeats
                }
                // Select the required number of questions
                const selectedQuestions = questionsToUse.slice(0, limit);
                // Add selected question IDs to used set
                const newUsedIds = [
                    ...usedQuestionIds
                ];
                selectedQuestions.forEach({
                    "useTestState.useCallback[fetchQuestions]": (q)=>{
                        if (!newUsedIds.includes(q.id)) newUsedIds.push(q.id);
                    }
                }["useTestState.useCallback[fetchQuestions]"]);
                setUsedQuestionIds(newUsedIds);
                setCurrentModuleQuestions(selectedQuestions);
                setSelectedAnswers(new Array(selectedQuestions.length).fill(-1));
                console.log("✅ Set ".concat(selectedQuestions.length, " questions for current module"));
            } catch (error) {
                console.error('❌ Error fetching questions:', error);
                throw error;
            } finally{
                setIsLoading(false);
            }
        }
    }["useTestState.useCallback[fetchQuestions]"], [
        usedQuestionIds
    ]);
    // Auto-start module 2 after 10 seconds
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useTestState.useEffect": ()=>{
            if (isTransitioning && currentModuleIndex === 1 && !moduleStarted) {
                const timer = setTimeout({
                    "useTestState.useEffect.timer": ()=>{
                        startModule();
                    }
                }["useTestState.useEffect.timer"], 10000) // 10 seconds
                ;
                return ({
                    "useTestState.useEffect": ()=>clearTimeout(timer)
                })["useTestState.useEffect"];
            }
        }
    }["useTestState.useEffect"], [
        isTransitioning,
        currentModuleIndex,
        moduleStarted
    ]);
    // Auto-start math module after 10 seconds
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useTestState.useEffect": ()=>{
            if (isTransitioning && currentModuleIndex === 2 && !moduleStarted) {
                const timer = setTimeout({
                    "useTestState.useEffect.timer": ()=>{
                        startModule();
                    }
                }["useTestState.useEffect.timer"], 10000) // 10 seconds
                ;
                return ({
                    "useTestState.useEffect": ()=>clearTimeout(timer)
                })["useTestState.useEffect"];
            }
        }
    }["useTestState.useEffect"], [
        isTransitioning,
        currentModuleIndex,
        moduleStarted
    ]);
    // Start timing when a new question is displayed
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useTestState.useEffect": ()=>{
            if (moduleStarted && !isTransitioning && currentQuestion) {
                setQuestionStartTimes({
                    "useTestState.useEffect": (prev)=>{
                        const newTimes = new Map(prev);
                        if (!newTimes.has(currentQuestionIndex)) {
                            newTimes.set(currentQuestionIndex, new Date());
                        }
                        return newTimes;
                    }
                }["useTestState.useEffect"]);
            }
        }
    }["useTestState.useEffect"], [
        moduleStarted,
        isTransitioning,
        currentQuestion,
        currentQuestionIndex
    ]);
    // Handle 10-minute break between reading and math
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useTestState.useEffect": ()=>{
            if (isBreakTime && breakTimeRemaining > 0) {
                const timer = setTimeout({
                    "useTestState.useEffect.timer": ()=>{
                        setBreakTimeRemaining({
                            "useTestState.useEffect.timer": (prev)=>prev - 1
                        }["useTestState.useEffect.timer"]);
                    }
                }["useTestState.useEffect.timer"], 1000);
                return ({
                    "useTestState.useEffect": ()=>clearTimeout(timer)
                })["useTestState.useEffect"];
            } else if (isBreakTime && breakTimeRemaining === 0) {
                // Break is over, start math module
                setIsBreakTime(false);
                setIsTransitioning(true);
                setCurrentModuleIndex(2); // Math module
            }
        }
    }["useTestState.useEffect"], [
        isBreakTime,
        breakTimeRemaining
    ]);
    const startTest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTestState.useCallback[startTest]": async ()=>{
            try {
                setIsLoading(true);
                setTestStartTime(new Date());
                setHasStarted(true);
                setCurrentModuleIndex(0);
                setCurrentQuestionIndex(0);
                // Start with reading-writing module
                await fetchQuestions('reading-writing', 27);
                setIsTransitioning(false);
                setModuleStarted(false);
            } catch (error) {
                console.error('Error starting test:', error);
                setIsLoading(false);
            }
        }
    }["useTestState.useCallback[startTest]"], [
        fetchQuestions
    ]);
    const startModule = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTestState.useCallback[startModule]": ()=>{
            if (!currentModule) return;
            console.log('🚀 Starting module:', currentModule.title);
            setModuleStartTime(new Date());
            setModuleStarted(true);
            setIsTransitioning(false);
            setCurrentQuestionIndex(0);
            // Set timer for current module (convert minutes to seconds)
            setTimeRemaining(currentModule.duration * 60);
            // Reset time tracking for new module
            setQuestionStartTimes(new Map());
            setQuestionTimeSpent(new Map());
            console.log('✅ Module started successfully');
        }
    }["useTestState.useCallback[startModule]"], [
        currentModule
    ]);
    // Track time spent on current question before navigating away
    const recordQuestionTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTestState.useCallback[recordQuestionTime]": ()=>{
            const startTime = questionStartTimes.get(currentQuestionIndex);
            if (startTime) {
                const now = new Date();
                const timeSpent = Math.floor((now.getTime() - startTime.getTime()) / 1000);
                const existingTime = questionTimeSpent.get(currentQuestionIndex) || 0;
                const newTimeSpent = new Map(questionTimeSpent);
                newTimeSpent.set(currentQuestionIndex, existingTime + timeSpent);
                setQuestionTimeSpent(newTimeSpent);
            }
        }
    }["useTestState.useCallback[recordQuestionTime]"], [
        currentQuestionIndex,
        questionStartTimes,
        questionTimeSpent
    ]);
    const completeModule = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTestState.useCallback[completeModule]": async ()=>{
            if (!currentModule || !moduleStartTime) return;
            const endTime = new Date();
            // Record time for current question before completing
            recordQuestionTime();
            // Calculate module results with actual time per question
            const moduleQuestionResults = currentModuleQuestions.map({
                "useTestState.useCallback[completeModule].moduleQuestionResults": (question, index)=>({
                        questionId: question.id,
                        question: question.question,
                        category: question.category,
                        difficulty: question.difficulty,
                        moduleType: question.moduleType,
                        userAnswer: selectedAnswers[index] || -1,
                        correctAnswer: question.correctAnswer,
                        isCorrect: selectedAnswers[index] === question.correctAnswer,
                        timeSpent: questionTimeSpent.get(index) || 0,
                        options: question.options,
                        explanation: question.explanation
                    })
            }["useTestState.useCallback[completeModule].moduleQuestionResults"]);
            // Add to module results
            const newModuleResults = [
                ...moduleResults
            ];
            newModuleResults[currentModuleIndex] = moduleQuestionResults;
            setModuleResults(newModuleResults);
            // Check if this is the end of reading modules (before math)
            if (currentModuleIndex === 1) {
                // Start 10-minute break
                setIsBreakTime(true);
                setBreakTimeRemaining(600); // 10 minutes = 600 seconds
                setModuleStarted(false);
                return;
            }
            // Move to next module or complete test
            if (currentModuleIndex < __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$moduleConfigs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MODULE_CONFIGS"].length - 1) {
                setCurrentModuleIndex({
                    "useTestState.useCallback[completeModule]": (prev)=>prev + 1
                }["useTestState.useCallback[completeModule]"]);
                setIsTransitioning(true);
                setModuleStarted(false);
                setCurrentModuleQuestions([]); // Clear questions for next module
                // Fetch questions for next module
                const nextModule = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$moduleConfigs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MODULE_CONFIGS"][currentModuleIndex + 1];
                if (nextModule) {
                    await fetchQuestions(nextModule.type, nextModule.questionCount);
                }
            } else {
                // Test complete
                completeTest(newModuleResults);
            }
        }
    }["useTestState.useCallback[completeModule]"], [
        currentModule,
        moduleStartTime,
        currentModuleQuestions,
        selectedAnswers,
        moduleResults,
        currentModuleIndex,
        fetchQuestions,
        recordQuestionTime,
        questionTimeSpent
    ]);
    const completeTest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTestState.useCallback[completeTest]": (finalModuleResults)=>{
            if (!testStartTime) return;
            const endTime = new Date();
            const totalTimeSpent = Math.floor((endTime.getTime() - testStartTime.getTime()) / 1000);
            // Calculate overall results
            const allResults = finalModuleResults.flat();
            const correctAnswers = allResults.filter({
                "useTestState.useCallback[completeTest]": (r)=>r.isCorrect
            }["useTestState.useCallback[completeTest]"]).length;
            const totalQuestions = allResults.length;
            // Calculate category performance
            const categoryPerformance = {};
            allResults.forEach({
                "useTestState.useCallback[completeTest]": (result)=>{
                    if (!categoryPerformance[result.category]) {
                        categoryPerformance[result.category] = {
                            correct: 0,
                            total: 0
                        };
                    }
                    categoryPerformance[result.category].total++;
                    if (result.isCorrect) {
                        categoryPerformance[result.category].correct++;
                    }
                }
            }["useTestState.useCallback[completeTest]"]);
            const finalResults = {
                id: "test-".concat(Date.now()),
                userId,
                startTime: testStartTime,
                endTime,
                totalTimeSpent,
                totalQuestions,
                correctAnswers,
                score: Math.round(correctAnswers / totalQuestions * 100),
                moduleResults: finalModuleResults,
                categoryPerformance,
                completedAt: endTime
            };
            setTestResults(finalResults);
            setIsComplete(true);
        }
    }["useTestState.useCallback[completeTest]"], [
        testStartTime,
        userId
    ]);
    // Timer countdown effect
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useTestState.useEffect": ()=>{
            if (moduleStarted && timeRemaining > 0 && !isTransitioning && !isComplete) {
                const timer = setTimeout({
                    "useTestState.useEffect.timer": ()=>{
                        setTimeRemaining({
                            "useTestState.useEffect.timer": (prev)=>prev - 1
                        }["useTestState.useEffect.timer"]);
                    }
                }["useTestState.useEffect.timer"], 1000);
                return ({
                    "useTestState.useEffect": ()=>clearTimeout(timer)
                })["useTestState.useEffect"];
            } else if (moduleStarted && timeRemaining === 0) {
                // Time's up for this module
                completeModule();
            }
        }
    }["useTestState.useEffect"], [
        moduleStarted,
        timeRemaining,
        isTransitioning,
        isComplete,
        completeModule
    ]);
    const selectAnswer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTestState.useCallback[selectAnswer]": (answerIndex)=>{
            if (currentQuestionIndex >= 0 && currentQuestionIndex < selectedAnswers.length) {
                const newAnswers = [
                    ...selectedAnswers
                ];
                newAnswers[currentQuestionIndex] = answerIndex;
                setSelectedAnswers(newAnswers);
            }
        }
    }["useTestState.useCallback[selectAnswer]"], [
        currentQuestionIndex,
        selectedAnswers
    ]);
    const nextQuestion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTestState.useCallback[nextQuestion]": ()=>{
            if (currentQuestionIndex < currentModuleQuestions.length - 1) {
                recordQuestionTime();
                setCurrentQuestionIndex({
                    "useTestState.useCallback[nextQuestion]": (prev)=>prev + 1
                }["useTestState.useCallback[nextQuestion]"]);
            }
        }
    }["useTestState.useCallback[nextQuestion]"], [
        currentQuestionIndex,
        currentModuleQuestions.length,
        recordQuestionTime
    ]);
    const previousQuestion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTestState.useCallback[previousQuestion]": ()=>{
            if (currentQuestionIndex > 0) {
                recordQuestionTime();
                setCurrentQuestionIndex({
                    "useTestState.useCallback[previousQuestion]": (prev)=>prev - 1
                }["useTestState.useCallback[previousQuestion]"]);
            }
        }
    }["useTestState.useCallback[previousQuestion]"], [
        currentQuestionIndex,
        recordQuestionTime
    ]);
    const goToQuestion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTestState.useCallback[goToQuestion]": (questionIndex)=>{
            if (questionIndex >= 0 && questionIndex < currentModuleQuestions.length) {
                recordQuestionTime();
                setCurrentQuestionIndex(questionIndex);
            }
        }
    }["useTestState.useCallback[goToQuestion]"], [
        currentModuleQuestions.length,
        recordQuestionTime
    ]);
    var _selectedAnswers_currentQuestionIndex;
    return {
        // State
        testState,
        isLoading,
        error,
        hasStarted,
        currentModuleIndex,
        currentQuestionIndex,
        isTransitioning,
        isComplete,
        moduleStarted,
        isBreakTime,
        breakTimeRemaining,
        timeRemaining,
        selectedAnswers,
        testResults,
        currentModule,
        currentQuestion,
        currentModuleQuestions,
        // Actions
        startTest,
        startModule,
        completeModule,
        selectAnswer,
        nextQuestion,
        previousQuestion,
        goToQuestion,
        // Computed values
        progress: currentModuleQuestions.length > 0 ? Math.round((currentQuestionIndex + 1) / currentModuleQuestions.length * 100) : 0,
        questionsAnswered: selectedAnswers.filter((answer)=>answer !== -1).length,
        canGoNext: currentQuestionIndex < currentModuleQuestions.length - 1,
        canGoPrevious: currentQuestionIndex > 0,
        selectedAnswer: (_selectedAnswers_currentQuestionIndex = selectedAnswers[currentQuestionIndex]) !== null && _selectedAnswers_currentQuestionIndex !== void 0 ? _selectedAnswers_currentQuestionIndex : -1
    };
}
_s(useTestState, "6SFzH3tWsq8HnAI1mGTgMMJfIbI=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/MathRenderer.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "InlineMathRenderer": ()=>InlineMathRenderer,
    "MathEquation": ()=>MathEquation,
    "default": ()=>MathRenderer
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$katex$2f$dist$2f$react$2d$katex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-katex/dist/react-katex.js [app-client] (ecmascript)");
"use client";
;
;
;
function MathRenderer(param) {
    let { children, block = false, className = '' } = param;
    // Convert common math notation to LaTeX
    const convertToLatex = (text)=>{
        return text// Fractions: 1/2 -> \frac{1}{2}
        .replace(/(\d+)\/(\d+)/g, '\\frac{$1}{$2}')// Exponents: x^2 -> x^{2}, x^(2+3) -> x^{(2+3)}
        .replace(/\^(\d+)/g, '^{$1}').replace(/\^(\([^)]+\))/g, '^{$1}')// Square roots: sqrt(x) -> \sqrt{x}
        .replace(/sqrt\(([^)]+)\)/g, '\\sqrt{$1}')// Subscripts: x_1 -> x_{1}
        .replace(/_(\d+)/g, '_{$1}')// Greek letters
        .replace(/\bpi\b/g, '\\pi').replace(/\btheta\b/g, '\\theta').replace(/\balpha\b/g, '\\alpha').replace(/\bbeta\b/g, '\\beta').replace(/\bgamma\b/g, '\\gamma').replace(/\bdelta\b/g, '\\delta')// Infinity
        .replace(/infinity/g, '\\infty')// Plus/minus
        .replace(/\+\/-/g, '\\pm')// Degree symbol
        .replace(/degrees?/g, '^\\circ')// Inequalities
        .replace(/<=/g, '\\leq').replace(/>=/g, '\\geq').replace(/!=/g, '\\neq')// Functions
        .replace(/\bsin\b/g, '\\sin').replace(/\bcos\b/g, '\\cos').replace(/\btan\b/g, '\\tan').replace(/\blog\b/g, '\\log').replace(/\bln\b/g, '\\ln');
    };
    // Check if the text contains math expressions
    const containsMath = (text)=>{
        const mathPatterns = [
            /\^[\d\{\(]/,
            /_[\d\{]/,
            /\\[a-zA-Z]+/,
            /\\\{|\\\}/,
            /\bsqrt\(/,
            /\d+\/\d+/,
            /[xy]\s*[=<>]/,
            /\([^)]*[xy][^)]*\)/
        ];
        return mathPatterns.some((pattern)=>pattern.test(text));
    };
    // Split text into math and non-math parts
    const renderMixedContent = (text)=>{
        // Look for inline math expressions in $...$ or between common math patterns
        const parts = [];
        let currentIndex = 0;
        // Find math expressions
        const mathRegex = /(\$[^$]+\$|[xy]\s*=\s*[^,\s.!?]+|f\([^)]+\)\s*=\s*[^,\s.!?]+|\d+\/\d+|[a-zA-Z]\^[\d\{]|\\[a-zA-Z]+\{[^}]*\})/g;
        let match;
        while((match = mathRegex.exec(text)) !== null){
            // Add text before math
            if (match.index > currentIndex) {
                parts.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: text.slice(currentIndex, match.index)
                }, "text-".concat(currentIndex), false, {
                    fileName: "[project]/src/components/MathRenderer.tsx",
                    lineNumber: 84,
                    columnNumber: 11
                }, this));
            }
            // Add math expression
            let mathExpression = match[1];
            if (mathExpression.startsWith('$') && mathExpression.endsWith('$')) {
                mathExpression = mathExpression.slice(1, -1);
            }
            try {
                parts.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$katex$2f$dist$2f$react$2d$katex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineMath"], {
                    children: convertToLatex(mathExpression)
                }, "math-".concat(match.index), false, {
                    fileName: "[project]/src/components/MathRenderer.tsx",
                    lineNumber: 98,
                    columnNumber: 11
                }, this));
            } catch (error) {
                // If LaTeX parsing fails, show as regular text
                parts.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "font-mono bg-gray-100 px-1 rounded",
                    children: mathExpression
                }, "fallback-".concat(match.index), false, {
                    fileName: "[project]/src/components/MathRenderer.tsx",
                    lineNumber: 105,
                    columnNumber: 11
                }, this));
            }
            currentIndex = match.index + match[0].length;
        }
        // Add remaining text
        if (currentIndex < text.length) {
            parts.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: text.slice(currentIndex)
            }, "text-".concat(currentIndex), false, {
                fileName: "[project]/src/components/MathRenderer.tsx",
                lineNumber: 117,
                columnNumber: 9
            }, this));
        }
        return parts.length > 0 ? parts : [
            text
        ];
    };
    // If it's a block math expression or contains only math
    if (block || containsMath(children) && children.trim().match(/^[\s\$]*[xy]\s*=|^[\s\$]*f\([^)]+\)\s*=|^[\s\$]*\\[a-zA-Z]/)) {
        try {
            let mathExpression = children;
            if (mathExpression.startsWith('$') && mathExpression.endsWith('$')) {
                mathExpression = mathExpression.slice(1, -1);
            }
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "math-block ".concat(className),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$katex$2f$dist$2f$react$2d$katex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlockMath"], {
                    children: convertToLatex(mathExpression)
                }, void 0, false, {
                    fileName: "[project]/src/components/MathRenderer.tsx",
                    lineNumber: 136,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/MathRenderer.tsx",
                lineNumber: 135,
                columnNumber: 9
            }, this);
        } catch (error) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "font-mono bg-gray-100 p-2 rounded ".concat(className),
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/MathRenderer.tsx",
                lineNumber: 141,
                columnNumber: 9
            }, this);
        }
    }
    // For mixed content (text with inline math)
    if (containsMath(children)) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: className,
            children: renderMixedContent(children)
        }, void 0, false, {
            fileName: "[project]/src/components/MathRenderer.tsx",
            lineNumber: 151,
            columnNumber: 7
        }, this);
    }
    // Regular text
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: className,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/MathRenderer.tsx",
        lineNumber: 158,
        columnNumber: 10
    }, this);
}
_c = MathRenderer;
function MathEquation(param) {
    let { children, className = '' } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MathRenderer, {
        block: true,
        className: className,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/MathRenderer.tsx",
        lineNumber: 163,
        columnNumber: 10
    }, this);
}
_c1 = MathEquation;
function InlineMathRenderer(param) {
    let { children, className = '' } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MathRenderer, {
        block: false,
        className: className,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/MathRenderer.tsx",
        lineNumber: 168,
        columnNumber: 10
    }, this);
}
_c2 = InlineMathRenderer;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "MathRenderer");
__turbopack_context__.k.register(_c1, "MathEquation");
__turbopack_context__.k.register(_c2, "InlineMathRenderer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ChartRenderer.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>ChartRenderer
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$vega$2f$dist$2f$react$2d$vega$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-vega/dist/react-vega.js [app-client] (ecmascript)");
"use client";
;
;
const resolveType = (cd)=>cd.type || cd.graphType || cd.diagramType;
const allowedTypes = [
    'scatter',
    'coordinate-plane',
    'scatter-plot',
    'bar',
    'bar-chart',
    'geometry',
    'geometric-diagram',
    'image'
];
function ChartRenderer(param) {
    let { chartData, imageUrl, imageData, imageMimeType, imageAlt = "Question diagram", className = "" } = param;
    // Check if imageUrl is a Vega spec (starts with data:image/svg+xml;base64 and contains Vega schema)
    const isVegaSpec = imageUrl === null || imageUrl === void 0 ? void 0 : imageUrl.startsWith('data:image/svg+xml;base64,');
    if (isVegaSpec && imageUrl) {
        // Decode the base64 Vega spec and render with DynamicChart
        try {
            const base64Data = imageUrl.split(',')[1];
            const decodedSpec = atob(base64Data);
            const vegaSpec = JSON.parse(decodedSpec);
            // Use DynamicChart to render the Vega spec
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "chart-container ".concat(className),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white p-4 rounded border shadow-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-sm font-semibold text-gray-700 mb-2",
                            children: "📊 Chart"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ChartRenderer.tsx",
                            lineNumber: 87,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs text-gray-600 mb-2",
                            children: "Vega-Lite diagram (interactive visualization)"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ChartRenderer.tsx",
                            lineNumber: 88,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$vega$2f$dist$2f$react$2d$vega$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VegaEmbed"], {
                            spec: vegaSpec,
                            options: {
                                actions: false
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/ChartRenderer.tsx",
                            lineNumber: 92,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ChartRenderer.tsx",
                    lineNumber: 86,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ChartRenderer.tsx",
                lineNumber: 85,
                columnNumber: 9
            }, this);
        } catch (e) {
            console.error('Failed to decode Vega spec:', e);
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "chart-container ".concat(className),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-gray-100 p-4 rounded text-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-red-600",
                        children: "Failed to render diagram"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ChartRenderer.tsx",
                        lineNumber: 104,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/ChartRenderer.tsx",
                    lineNumber: 103,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ChartRenderer.tsx",
                lineNumber: 102,
                columnNumber: 9
            }, this);
        }
    }
    // Construct image source URL
    let src;
    if (imageData) {
        // Use binary imageData if available
        const mimeType = imageMimeType || 'image/png';
        src = "data:".concat(mimeType, ";base64,").concat(imageData);
    } else if (imageUrl) {
        // Always use imageUrl if provided
        src = imageUrl;
    } else if (chartData && typeof chartData === 'object' && 'imageUrl' in chartData && chartData.imageUrl) {
        // Check chartData for imageUrl
        src = chartData.imageUrl;
    } else {
        // Fallback to placeholder if nothing else
        src = '/assets/diagram-placeholder.svg';
    }
    if (src && !isVegaSpec) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "chart-container ".concat(className),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: src,
                alt: imageAlt,
                className: "max-w-full h-auto rounded border shadow-sm",
                style: {
                    maxHeight: '400px'
                },
                onError: (e)=>{
                    // If image fails to load, show placeholder
                    const img = e.target;
                    img.src = '/assets/diagram-placeholder.svg';
                }
            }, void 0, false, {
                fileName: "[project]/src/components/ChartRenderer.tsx",
                lineNumber: 132,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/ChartRenderer.tsx",
            lineNumber: 131,
            columnNumber: 7
        }, this);
    }
    if (!chartData) {
        return null;
    }
    // Check if chartData itself is a Vega-Lite spec
    if (typeof chartData === 'object' && chartData && '$schema' in chartData) {
        const vegaSpec = chartData;
        if (typeof vegaSpec.$schema === 'string' && vegaSpec.$schema.includes('vega-lite')) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "chart-container ".concat(className),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white p-4 rounded border shadow-sm",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$vega$2f$dist$2f$react$2d$vega$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VegaEmbed"], {
                        spec: vegaSpec,
                        options: {
                            actions: false
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/ChartRenderer.tsx",
                        lineNumber: 158,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/ChartRenderer.tsx",
                    lineNumber: 157,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ChartRenderer.tsx",
                lineNumber: 156,
                columnNumber: 9
            }, this);
        }
    }
    // Check if chartData has a nested vegaSpec property
    if (typeof chartData === 'object' && chartData && 'vegaSpec' in chartData) {
        const vegaSpec = chartData.vegaSpec;
        if (typeof vegaSpec === 'object' && vegaSpec) {
            // Add $schema if missing (required for VegaLite component)
            const completeSpec = {
                $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
                ...vegaSpec
            };
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "chart-container ".concat(className),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white p-4 rounded border shadow-sm",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$vega$2f$dist$2f$react$2d$vega$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VegaEmbed"], {
                        spec: completeSpec,
                        options: {
                            actions: false
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/ChartRenderer.tsx",
                        lineNumber: 181,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/ChartRenderer.tsx",
                    lineNumber: 180,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ChartRenderer.tsx",
                lineNumber: 179,
                columnNumber: 9
            }, this);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "chart-container ".concat(className),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DynamicChart, {
            chartData: chartData
        }, void 0, false, {
            fileName: "[project]/src/components/ChartRenderer.tsx",
            lineNumber: 193,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ChartRenderer.tsx",
        lineNumber: 192,
        columnNumber: 5
    }, this);
}
_c = ChartRenderer;
function DynamicChart(param) {
    let { chartData } = param;
    if (!chartData) {
        return null;
    }
    const type = resolveType(chartData);
    if (isScatter(chartData)) {
        let normalized = {
            ...chartData
        };
        if (!normalized.points && Array.isArray(normalized.data)) {
            var _normalized_data;
            const points = ((_normalized_data = normalized.data) !== null && _normalized_data !== void 0 ? _normalized_data : []).filter((p)=>typeof (p === null || p === void 0 ? void 0 : p.x) === 'number' && typeof (p === null || p === void 0 ? void 0 : p.y) === 'number').map((p)=>{
                var _p_label, _ref;
                return {
                    x: p.x,
                    y: p.y,
                    label: (_ref = (_p_label = p.label) !== null && _p_label !== void 0 ? _p_label : p.point) !== null && _ref !== void 0 ? _ref : ''
                };
            });
            normalized = {
                ...normalized,
                points
            };
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ScatterPlot, {
            data: normalized
        }, void 0, false, {
            fileName: "[project]/src/components/ChartRenderer.tsx",
            lineNumber: 214,
            columnNumber: 12
        }, this);
    }
    if (isBar(chartData)) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BarChart, {
            data: chartData
        }, void 0, false, {
            fileName: "[project]/src/components/ChartRenderer.tsx",
            lineNumber: 218,
            columnNumber: 12
        }, this);
    }
    if (isGeometry(chartData)) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GeometryDiagram, {
            data: chartData
        }, void 0, false, {
            fileName: "[project]/src/components/ChartRenderer.tsx",
            lineNumber: 222,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-blue-50 p-4 rounded border",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-sm font-semibold text-blue-700 mb-2",
                children: "📊 Chart"
            }, void 0, false, {
                fileName: "[project]/src/components/ChartRenderer.tsx",
                lineNumber: 227,
                columnNumber: 7
            }, this),
            chartData.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-sm text-blue-600 mb-2",
                children: chartData.description
            }, void 0, false, {
                fileName: "[project]/src/components/ChartRenderer.tsx",
                lineNumber: 229,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-xs text-gray-500",
                children: [
                    "Type: ",
                    type || 'Unknown'
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ChartRenderer.tsx",
                lineNumber: 231,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ChartRenderer.tsx",
        lineNumber: 226,
        columnNumber: 5
    }, this);
}
_c1 = DynamicChart;
function isScatter(cd) {
    const t = resolveType(cd);
    return t === 'scatter' || t === 'coordinate-plane' || t === 'scatter-plot' || !!cd.points;
}
function isBar(cd) {
    const t = resolveType(cd);
    return t === 'bar' || t === 'bar-chart' || Array.isArray(cd.data);
}
function isGeometry(cd) {
    const t = resolveType(cd);
    return t === 'geometry' || t === 'geometric-diagram' || !!cd.shape;
}
function ScatterPlot(param) {
    let { data } = param;
    var _data_points;
    const width = 300;
    const height = 300;
    const padding = 40;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white p-4 rounded border shadow-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-sm font-semibold text-gray-700 mb-2",
                children: "📈 Coordinate Plane"
            }, void 0, false, {
                fileName: "[project]/src/components/ChartRenderer.tsx",
                lineNumber: 260,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                width: width,
                height: height,
                className: "border border-gray-300",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pattern", {
                            id: "grid",
                            width: "20",
                            height: "20",
                            patternUnits: "userSpaceOnUse",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M 20 0 L 0 0 0 20",
                                fill: "none",
                                stroke: "#e5e7eb",
                                strokeWidth: "0.5"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ChartRenderer.tsx",
                                lineNumber: 265,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/ChartRenderer.tsx",
                            lineNumber: 264,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ChartRenderer.tsx",
                        lineNumber: 263,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        x: padding,
                        y: padding,
                        width: width - 2 * padding,
                        height: height - 2 * padding,
                        fill: "url(#grid)"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ChartRenderer.tsx",
                        lineNumber: 268,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                        x1: padding,
                        y1: height / 2,
                        x2: width - padding,
                        y2: height / 2,
                        stroke: "#374151",
                        strokeWidth: "2"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ChartRenderer.tsx",
                        lineNumber: 271,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                        x1: width / 2,
                        y1: padding,
                        x2: width / 2,
                        y2: height - padding,
                        stroke: "#374151",
                        strokeWidth: "2"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ChartRenderer.tsx",
                        lineNumber: 272,
                        columnNumber: 9
                    }, this),
                    (_data_points = data.points) === null || _data_points === void 0 ? void 0 : _data_points.map((point, index)=>{
                        const x = width / 2 + (point.x || 0) * 10;
                        const y = height / 2 - (point.y || 0) * 10;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                    cx: x,
                                    cy: y,
                                    r: "5",
                                    fill: "#3b82f6",
                                    stroke: "#1d4ed8",
                                    strokeWidth: "2"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ChartRenderer.tsx",
                                    lineNumber: 281,
                                    columnNumber: 15
                                }, this),
                                point.label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                    x: x + 8,
                                    y: y - 8,
                                    fontSize: "12",
                                    fill: "#374151",
                                    fontWeight: "bold",
                                    children: point.label
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ChartRenderer.tsx",
                                    lineNumber: 290,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, index, true, {
                            fileName: "[project]/src/components/ChartRenderer.tsx",
                            lineNumber: 280,
                            columnNumber: 13
                        }, this);
                    }),
                    data.line && data.points && data.points.length >= 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                        x1: width / 2 + (data.points[0].x || 0) * 10,
                        y1: height / 2 - (data.points[0].y || 0) * 10,
                        x2: width / 2 + (data.points[1].x || 0) * 10,
                        y2: height / 2 - (data.points[1].y || 0) * 10,
                        stroke: "#ef4444",
                        strokeWidth: "2",
                        strokeDasharray: "5,5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ChartRenderer.tsx",
                        lineNumber: 306,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ChartRenderer.tsx",
                lineNumber: 261,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ChartRenderer.tsx",
        lineNumber: 259,
        columnNumber: 5
    }, this);
}
_c2 = ScatterPlot;
function BarChart(param) {
    let { data } = param;
    const width = 300;
    const height = 200;
    const padding = 40;
    var _data_data;
    const values = (_data_data = data.data) !== null && _data_data !== void 0 ? _data_data : [];
    // If no data, create sample data to prevent "No data available"
    if (values.length === 0) {
        console.log('⚠️ Bar chart has no data, creating sample data');
        const sampleData = [
            {
                label: "Jan",
                value: 150
            },
            {
                label: "Feb",
                value: 200
            },
            {
                label: "Mar",
                value: 175
            },
            {
                label: "Apr",
                value: 225
            }
        ];
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BarChart, {
            data: {
                ...data,
                data: sampleData
            }
        }, void 0, false, {
            fileName: "[project]/src/components/ChartRenderer.tsx",
            lineNumber: 337,
            columnNumber: 12
        }, this);
    }
    const maxValue = Math.max(...values.map((item)=>{
        var _item_score, _ref;
        return (_ref = (_item_score = item.score) !== null && _item_score !== void 0 ? _item_score : item.value) !== null && _ref !== void 0 ? _ref : 1;
    }));
    const barWidth = Math.max(20, (width - 2 * padding) / values.length - 10);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white p-4 rounded border shadow-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-sm font-semibold text-gray-700 mb-2",
                children: "📊 Bar Chart"
            }, void 0, false, {
                fileName: "[project]/src/components/ChartRenderer.tsx",
                lineNumber: 345,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                width: width,
                height: height,
                className: "border border-gray-300",
                children: [
                    values.map((item, index)=>{
                        var _item_score, _ref;
                        const value = (_ref = (_item_score = item.score) !== null && _item_score !== void 0 ? _item_score : item.value) !== null && _ref !== void 0 ? _ref : 0;
                        const barHeight = Math.max(0, value / maxValue * (height - 2 * padding));
                        const x = padding + index * (barWidth + 10);
                        const y = height - padding - barHeight;
                        var _item_student, _ref1;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                    x: x,
                                    y: y,
                                    width: barWidth,
                                    height: barHeight,
                                    fill: "#3b82f6",
                                    stroke: "#1d4ed8"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ChartRenderer.tsx",
                                    lineNumber: 355,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                    x: x + barWidth / 2,
                                    y: y - 5,
                                    fontSize: "10",
                                    fill: "#374151",
                                    textAnchor: "middle",
                                    children: value
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ChartRenderer.tsx",
                                    lineNumber: 363,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                    x: x + barWidth / 2,
                                    y: height - padding + 15,
                                    fontSize: "10",
                                    fill: "#374151",
                                    textAnchor: "middle",
                                    children: (_ref1 = (_item_student = item.student) !== null && _item_student !== void 0 ? _item_student : item.label) !== null && _ref1 !== void 0 ? _ref1 : "".concat(index + 1)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ChartRenderer.tsx",
                                    lineNumber: 372,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, index, true, {
                            fileName: "[project]/src/components/ChartRenderer.tsx",
                            lineNumber: 354,
                            columnNumber: 13
                        }, this);
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                        x1: padding,
                        y1: height - padding,
                        x2: width - padding,
                        y2: height - padding,
                        stroke: "#374151",
                        strokeWidth: "1"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ChartRenderer.tsx",
                        lineNumber: 386,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                        x1: padding,
                        y1: padding,
                        x2: padding,
                        y2: height - padding,
                        stroke: "#374151",
                        strokeWidth: "1"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ChartRenderer.tsx",
                        lineNumber: 387,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ChartRenderer.tsx",
                lineNumber: 346,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ChartRenderer.tsx",
        lineNumber: 344,
        columnNumber: 5
    }, this);
}
_c3 = BarChart;
function GeometryDiagram(param) {
    let { data } = param;
    const width = 400;
    const height = 350;
    const centerX = width / 2;
    const centerY = height / 2;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white p-4 rounded border shadow-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-sm font-semibold text-gray-700 mb-2",
                children: "🔺 Geometry Diagram"
            }, void 0, false, {
                fileName: "[project]/src/components/ChartRenderer.tsx",
                lineNumber: 401,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                width: width,
                height: height,
                className: "border border-gray-200",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TriangleShape, {
                    data: data,
                    centerX: centerX,
                    centerY: centerY
                }, void 0, false, {
                    fileName: "[project]/src/components/ChartRenderer.tsx",
                    lineNumber: 404,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ChartRenderer.tsx",
                lineNumber: 402,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ChartRenderer.tsx",
        lineNumber: 400,
        columnNumber: 5
    }, this);
}
_c4 = GeometryDiagram;
function TriangleShape(param) {
    let { data, centerX, centerY } = param;
    const size = 80;
    const triHeight = size * Math.sqrt(3) / 2;
    const points = [
        [
            centerX,
            centerY - triHeight / 2
        ],
        [
            centerX - size / 2,
            centerY + triHeight / 2
        ],
        [
            centerX + size / 2,
            centerY + triHeight / 2
        ]
    ];
    const pathData = "M ".concat(points[0][0], " ").concat(points[0][1], " L ").concat(points[1][0], " ").concat(points[1][1], " L ").concat(points[2][0], " ").concat(points[2][1], " Z");
    // Use provided angles or default to 60° each for equilateral triangle
    const angles = Array.isArray(data.angles) && data.angles.length >= 3 ? data.angles : [
        60,
        60,
        60
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: pathData,
                fill: "rgba(59, 130, 246, 0.1)",
                stroke: "#3b82f6",
                strokeWidth: "2"
            }, void 0, false, {
                fileName: "[project]/src/components/ChartRenderer.tsx",
                lineNumber: 427,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                x: centerX,
                y: centerY - triHeight / 2 + 15,
                fontSize: "12",
                fill: "#374151",
                textAnchor: "middle",
                children: [
                    angles[0],
                    "°"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ChartRenderer.tsx",
                lineNumber: 430,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                x: centerX - size / 2 + 15,
                y: centerY + triHeight / 2 - 5,
                fontSize: "12",
                fill: "#374151",
                textAnchor: "middle",
                children: [
                    angles[1],
                    "°"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ChartRenderer.tsx",
                lineNumber: 433,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                x: centerX + size / 2 - 15,
                y: centerY + triHeight / 2 - 5,
                fontSize: "12",
                fill: "#374151",
                textAnchor: "middle",
                children: [
                    angles[2],
                    "°"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ChartRenderer.tsx",
                lineNumber: 436,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                x: centerX,
                y: centerY - triHeight / 2 - 10,
                fontSize: "12",
                fill: "#374151",
                textAnchor: "middle",
                fontWeight: "bold",
                children: "A"
            }, void 0, false, {
                fileName: "[project]/src/components/ChartRenderer.tsx",
                lineNumber: 441,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                x: centerX - size / 2 - 15,
                y: centerY + triHeight / 2 + 15,
                fontSize: "12",
                fill: "#374151",
                textAnchor: "middle",
                fontWeight: "bold",
                children: "B"
            }, void 0, false, {
                fileName: "[project]/src/components/ChartRenderer.tsx",
                lineNumber: 442,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                x: centerX + size / 2 + 15,
                y: centerY + triHeight / 2 + 15,
                fontSize: "12",
                fill: "#374151",
                textAnchor: "middle",
                fontWeight: "bold",
                children: "C"
            }, void 0, false, {
                fileName: "[project]/src/components/ChartRenderer.tsx",
                lineNumber: 443,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ChartRenderer.tsx",
        lineNumber: 426,
        columnNumber: 5
    }, this);
}
_c5 = TriangleShape;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "ChartRenderer");
__turbopack_context__.k.register(_c1, "DynamicChart");
__turbopack_context__.k.register(_c2, "ScatterPlot");
__turbopack_context__.k.register(_c3, "BarChart");
__turbopack_context__.k.register(_c4, "GeometryDiagram");
__turbopack_context__.k.register(_c5, "TriangleShape");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/practice-test/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>PracticeTestPage
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTestState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useTestState.ts [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '../../components/TestLauncher'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '../../components/ModuleStart'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '../../components/TestAnalytics'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '../../components/ReviewPage'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '../../components/QuestionNavigator'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$MathRenderer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/MathRenderer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ChartRenderer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ChartRenderer.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
function PracticeTestPage() {
    var _session_user;
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { data: session } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"] ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"])() : {
        data: null
    };
    const { hasStarted, moduleStarted, currentModule, currentQuestion, currentQuestionIndex, currentModuleQuestions, completeModule, selectedAnswers, selectedAnswer, startTest, startModule, isTransitioning, isComplete, testResults, isBreakTime, breakTimeRemaining, goToQuestion, setShowReview, showReview, timeRemaining, selectAnswer, nextQuestion, previousQuestion, questionsAnswered } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTestState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])((session === null || session === void 0 ? void 0 : (_session_user = session.user) === null || _session_user === void 0 ? void 0 : _session_user.email) || '');
    const submitModule = completeModule;
    const currentSelectedAnswer = selectedAnswer;
    // Track answered questions for navigator
    const answeredQuestions = selectedAnswers ? selectedAnswers.map((answer, index)=>answer !== -1 ? index : -1).filter((index)=>index !== -1) : [];
    // Error state for loading and submission
    const [fetchError, setFetchError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [submitError, setSubmitError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PracticeTestPage.useEffect": ()=>{
            if ("object" !== 'undefined' && !session) {
                router.push('/');
            }
        }
    }["PracticeTestPage.useEffect"], [
        session,
        router
    ]);
    // Debug logging
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PracticeTestPage.useEffect": ()=>{
            console.log('Test State Debug:', {
                hasStarted,
                moduleStarted,
                currentModule: currentModule === null || currentModule === void 0 ? void 0 : currentModule.id,
                currentQuestion: currentQuestion === null || currentQuestion === void 0 ? void 0 : currentQuestion.id,
                currentQuestionPassage: currentQuestion === null || currentQuestion === void 0 ? void 0 : currentQuestion.passage,
                isTransitioning,
                isComplete
            });
        }
    }["PracticeTestPage.useEffect"], [
        hasStarted,
        moduleStarted,
        currentModule,
        currentQuestion,
        isTransitioning,
        isComplete
    ]);
    if (!session) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex space-x-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-4 h-4 bg-blue-600 rounded-full animate-bounce"
                    }, void 0, false, {
                        fileName: "[project]/src/app/practice-test/page.tsx",
                        lineNumber: 79,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-4 h-4 bg-purple-600 rounded-full animate-bounce delay-100"
                    }, void 0, false, {
                        fileName: "[project]/src/app/practice-test/page.tsx",
                        lineNumber: 80,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-4 h-4 bg-pink-600 rounded-full animate-bounce delay-200"
                    }, void 0, false, {
                        fileName: "[project]/src/app/practice-test/page.tsx",
                        lineNumber: 81,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/practice-test/page.tsx",
                lineNumber: 78,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/practice-test/page.tsx",
            lineNumber: 77,
            columnNumber: 7
        }, this);
    }
    // Test launcher screen
    if (!hasStarted) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TestLauncher, {
            onStartTest: startTest
        }, void 0, false, {
            fileName: "[project]/src/app/practice-test/page.tsx",
            lineNumber: 89,
            columnNumber: 12
        }, this);
    }
    // Break time screen
    if (isBreakTime) {
        const minutes = Math.floor(breakTimeRemaining / 60);
        const seconds = breakTimeRemaining % 60;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-2xl shadow-2xl p-12 text-center max-w-md",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-6xl mb-6",
                        children: "☕"
                    }, void 0, false, {
                        fileName: "[project]/src/app/practice-test/page.tsx",
                        lineNumber: 99,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-3xl font-bold text-gray-900 mb-4",
                        children: "Break Time"
                    }, void 0, false, {
                        fileName: "[project]/src/app/practice-test/page.tsx",
                        lineNumber: 100,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600 mb-6",
                        children: "Take a 10-minute break before starting the Math section"
                    }, void 0, false, {
                        fileName: "[project]/src/app/practice-test/page.tsx",
                        lineNumber: 102,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-4xl font-bold text-blue-600 mb-4",
                        children: [
                            minutes,
                            ":",
                            seconds.toString().padStart(2, '0')
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/practice-test/page.tsx",
                        lineNumber: 105,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-gray-500",
                        children: "The Math section will start automatically when the break ends"
                    }, void 0, false, {
                        fileName: "[project]/src/app/practice-test/page.tsx",
                        lineNumber: 108,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/practice-test/page.tsx",
                lineNumber: 98,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/practice-test/page.tsx",
            lineNumber: 97,
            columnNumber: 7
        }, this);
    }
    // Module start screen (before starting each module)
    if (currentModule && hasStarted && !moduleStarted && !isTransitioning) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ModuleStart, {
            module: currentModule,
            onStartModule: startModule
        }, void 0, false, {
            fileName: "[project]/src/app/practice-test/page.tsx",
            lineNumber: 119,
            columnNumber: 7
        }, this);
    }
    // Final results screen with analytics
    if (isComplete && testResults) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TestAnalytics, {
            testResults: testResults
        }, void 0, false, {
            fileName: "[project]/src/app/practice-test/page.tsx",
            lineNumber: 128,
            columnNumber: 12
        }, this);
    }
    // Fallback completion screen (if no results)
    if (isComplete) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-3xl shadow-2xl p-12 text-center max-w-2xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-6xl mb-6",
                        children: "🎉"
                    }, void 0, false, {
                        fileName: "[project]/src/app/practice-test/page.tsx",
                        lineNumber: 136,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-4xl font-bold text-gray-900 mb-4",
                        children: "Test Complete!"
                    }, void 0, false, {
                        fileName: "[project]/src/app/practice-test/page.tsx",
                        lineNumber: 137,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xl text-gray-600 mb-8",
                        children: "Congratulations on completing your SAT practice test!"
                    }, void 0, false, {
                        fileName: "[project]/src/app/practice-test/page.tsx",
                        lineNumber: 138,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>router.push('/practice-test'),
                        className: "bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-lg transition-all",
                        children: "Take Another Test"
                    }, void 0, false, {
                        fileName: "[project]/src/app/practice-test/page.tsx",
                        lineNumber: 141,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/practice-test/page.tsx",
                lineNumber: 135,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/practice-test/page.tsx",
            lineNumber: 134,
            columnNumber: 7
        }, this);
    }
    // Main test interface
    if (currentModule && currentQuestion && hasStarted && moduleStarted && !isTransitioning && !isComplete) {
        // Show review page if user clicked review
        if (showReview) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ReviewPage, {
                questions: currentModuleQuestions,
                selectedAnswers: selectedAnswers,
                currentModule: currentModule,
                onQuestionClick: (index)=>{
                    goToQuestion(index);
                    setShowReview(false);
                },
                onSubmit: ()=>{
                    setShowReview(false);
                    submitModule();
                },
                onBackToTest: ()=>setShowReview(false),
                timeRemaining: timeRemaining
            }, void 0, false, {
                fileName: "[project]/src/app/practice-test/page.tsx",
                lineNumber: 157,
                columnNumber: 9
            }, this);
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4 flex justify-between items-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>router.push('/'),
                        className: "bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-all",
                        children: "← Back to Home"
                    }, void 0, false, {
                        fileName: "[project]/src/app/practice-test/page.tsx",
                        lineNumber: 178,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/practice-test/page.tsx",
                    lineNumber: 177,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(QuestionNavigator, {
                    totalQuestions: currentModule.questionCount,
                    currentQuestion: currentQuestionIndex,
                    answeredQuestions: answeredQuestions,
                    onQuestionClick: goToQuestion,
                    onReviewClick: ()=>setShowReview(true)
                }, void 0, false, {
                    fileName: "[project]/src/app/practice-test/page.tsx",
                    lineNumber: 186,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-6xl mx-auto px-4 py-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                className: "text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent",
                                                children: currentModule.title
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/practice-test/page.tsx",
                                                lineNumber: 199,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-600",
                                                children: [
                                                    "Question ",
                                                    currentQuestionIndex + 1,
                                                    " of ",
                                                    currentModule.questionCount
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/practice-test/page.tsx",
                                                lineNumber: 202,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/practice-test/page.tsx",
                                        lineNumber: 198,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-right",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-2xl font-bold transition-colors ".concat(timeRemaining <= 300 // 5 minutes
                                                 ? 'text-red-500 animate-pulse' : timeRemaining <= 600 // 10 minutes
                                                 ? 'text-orange-500' : 'text-purple-600'),
                                                children: [
                                                    Math.floor(timeRemaining / 60),
                                                    ":",
                                                    (timeRemaining % 60).toString().padStart(2, '0')
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/practice-test/page.tsx",
                                                lineNumber: 207,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm text-gray-500",
                                                children: timeRemaining <= 300 ? '⚠️ Time Running Out!' : 'Time Remaining'
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/practice-test/page.tsx",
                                                lineNumber: 216,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/practice-test/page.tsx",
                                        lineNumber: 206,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/practice-test/page.tsx",
                                lineNumber: 197,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-full bg-gray-200 rounded-full h-2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300",
                                        style: {
                                            width: "".concat((currentQuestionIndex + 1) / currentModule.questionCount * 100, "%")
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/practice-test/page.tsx",
                                        lineNumber: 225,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/practice-test/page.tsx",
                                    lineNumber: 224,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/practice-test/page.tsx",
                                lineNumber: 223,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/practice-test/page.tsx",
                        lineNumber: 196,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/practice-test/page.tsx",
                    lineNumber: 195,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-4xl mx-auto px-2 sm:px-4 py-4 sm:py-8 w-full",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-2 sm:p-8 border border-white/20 w-full",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-8",
                                children: [
                                    currentQuestion.passage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200 shadow-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center mb-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold mr-3",
                                                        children: "📖 Reading Passage"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/practice-test/page.tsx",
                                                        lineNumber: 241,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-blue-700 text-sm font-medium",
                                                        children: "Read carefully before answering"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/practice-test/page.tsx",
                                                        lineNumber: 244,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/practice-test/page.tsx",
                                                lineNumber: 240,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "prose prose-lg max-w-none",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-gray-800 leading-relaxed font-medium bg-white p-4 rounded-lg border border-blue-100",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$MathRenderer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        children: currentQuestion.passage
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/practice-test/page.tsx",
                                                        lineNumber: 250,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/practice-test/page.tsx",
                                                    lineNumber: 249,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/practice-test/page.tsx",
                                                lineNumber: 248,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/practice-test/page.tsx",
                                        lineNumber: 239,
                                        columnNumber: 17
                                    }, this),
                                    (currentQuestion.chartData || currentQuestion.imageUrl) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-6",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ChartRenderer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            chartData: currentQuestion.chartData,
                                            imageUrl: currentQuestion.imageUrl,
                                            imageAlt: currentQuestion.imageAlt || 'Question diagram'
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/practice-test/page.tsx",
                                            lineNumber: 259,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/practice-test/page.tsx",
                                        lineNumber: 258,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-xl font-semibold mb-6 text-gray-900",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$MathRenderer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            children: currentQuestion.question
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/practice-test/page.tsx",
                                            lineNumber: 268,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/practice-test/page.tsx",
                                        lineNumber: 267,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-3",
                                        children: currentQuestion.options.map((option, index)=>{
                                            const isSelected = currentSelectedAnswer === index;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>selectAnswer(index),
                                                className: "w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ".concat(isSelected ? 'border-purple-500 bg-purple-100 shadow-md' : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'),
                                                "aria-pressed": isSelected,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-semibold mr-3 w-8 h-8 rounded-full flex items-center justify-center text-sm ".concat(isSelected ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-600 group-hover:bg-purple-200 group-hover:text-purple-700'),
                                                            children: String.fromCharCode(65 + index)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/practice-test/page.tsx",
                                                            lineNumber: 286,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "".concat(isSelected ? 'text-purple-900 font-medium' : 'text-gray-700'),
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$MathRenderer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                children: option
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/practice-test/page.tsx",
                                                                lineNumber: 294,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/practice-test/page.tsx",
                                                            lineNumber: 293,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/practice-test/page.tsx",
                                                    lineNumber: 285,
                                                    columnNumber: 23
                                                }, this)
                                            }, index, false, {
                                                fileName: "[project]/src/app/practice-test/page.tsx",
                                                lineNumber: 275,
                                                columnNumber: 21
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/practice-test/page.tsx",
                                        lineNumber: 271,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/practice-test/page.tsx",
                                lineNumber: 236,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4 w-full",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: previousQuestion,
                                        disabled: currentQuestionIndex === 0,
                                        className: "px-6 py-3 bg-gray-200 text-gray-700 rounded-2xl disabled:opacity-50 hover:bg-gray-300 transition-colors font-medium",
                                        children: "← Previous"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/practice-test/page.tsx",
                                        lineNumber: 304,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm text-gray-500 text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    currentQuestionIndex + 1,
                                                    " / ",
                                                    currentModule.questionCount
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/practice-test/page.tsx",
                                                lineNumber: 313,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs mt-1",
                                                children: [
                                                    questionsAnswered,
                                                    " answered"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/practice-test/page.tsx",
                                                lineNumber: 314,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/practice-test/page.tsx",
                                        lineNumber: 312,
                                        columnNumber: 15
                                    }, this),
                                    currentQuestionIndex === currentModule.questionCount - 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowReview(true),
                                        className: "px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-2xl hover:shadow-lg transition-all font-medium",
                                        children: "Review & Submit →"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/practice-test/page.tsx",
                                        lineNumber: 320,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: nextQuestion,
                                        className: "px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl hover:shadow-lg transition-all font-medium",
                                        children: "Next →"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/practice-test/page.tsx",
                                        lineNumber: 327,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/practice-test/page.tsx",
                                lineNumber: 303,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/practice-test/page.tsx",
                        lineNumber: 235,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/practice-test/page.tsx",
                    lineNumber: 234,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/practice-test/page.tsx",
            lineNumber: 176,
            columnNumber: 7
        }, this);
    }
    // Loading and error state
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex flex-col items-center justify-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex space-x-2 mb-6",
                role: "status",
                "aria-live": "polite",
                "aria-label": "Loading",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-4 h-4 bg-blue-600 rounded-full animate-bounce",
                        "aria-hidden": "true"
                    }, void 0, false, {
                        fileName: "[project]/src/app/practice-test/page.tsx",
                        lineNumber: 345,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-4 h-4 bg-purple-600 rounded-full animate-bounce delay-100",
                        "aria-hidden": "true"
                    }, void 0, false, {
                        fileName: "[project]/src/app/practice-test/page.tsx",
                        lineNumber: 346,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-4 h-4 bg-pink-600 rounded-full animate-bounce delay-200",
                        "aria-hidden": "true"
                    }, void 0, false, {
                        fileName: "[project]/src/app/practice-test/page.tsx",
                        lineNumber: 347,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/practice-test/page.tsx",
                lineNumber: 344,
                columnNumber: 7
            }, this),
            fetchError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-red-100 border border-red-300 text-red-700 px-6 py-4 rounded-xl text-center max-w-md w-full mb-2",
                role: "alert",
                children: [
                    fetchError,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            setFetchError(null); /* re-trigger fetch/init here */ 
                        },
                        className: "ml-4 underline text-indigo-700 font-semibold hover:text-indigo-900",
                        children: "Retry"
                    }, void 0, false, {
                        fileName: "[project]/src/app/practice-test/page.tsx",
                        lineNumber: 352,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/practice-test/page.tsx",
                lineNumber: 350,
                columnNumber: 9
            }, this),
            submitError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-red-100 border border-red-300 text-red-700 px-6 py-4 rounded-xl text-center max-w-md w-full mb-2",
                role: "alert",
                children: submitError
            }, void 0, false, {
                fileName: "[project]/src/app/practice-test/page.tsx",
                lineNumber: 361,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/practice-test/page.tsx",
        lineNumber: 343,
        columnNumber: 5
    }, this);
}
_s(PracticeTestPage, "n9+eDFRZ5WXggcHuaoUNXjgBRb8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTestState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    ];
});
_c = PracticeTestPage;
var _c;
__turbopack_context__.k.register(_c, "PracticeTestPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_7f89e35a._.js.map