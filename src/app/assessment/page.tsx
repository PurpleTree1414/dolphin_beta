'use client';

import { useCallback, useState } from 'react';
import type { AssessmentAnswers, Pillar, PillarWeights } from '@/types';
import { TopNav } from '@/components/ui/TopNav';
import { AssessmentTopBar } from '@/components/assessment/AssessmentTopBar';
import { BottomNav } from '@/components/assessment/BottomNav';
import { WelcomeScreen } from '@/components/assessment/screens/WelcomeScreen';
import { TradeOffScreen } from '@/components/assessment/screens/TradeOffScreen';
import { PillarPickScreen } from '@/components/assessment/screens/PillarPickScreen';
import { SatisfactionRatingScreen } from '@/components/assessment/screens/SatisfactionRatingScreen';
import { ContextScreen } from '@/components/assessment/screens/ContextScreen';
import { WeightRevealScreen } from '@/components/assessment/screens/WeightRevealScreen';
import { DoneScreen } from '@/components/assessment/screens/DoneScreen';
import {
  q5_mostDissatisfied,
  q6_satisfactionRating,
  q7_strongest,
  q8_lifeSituation,
  q9_focusArea,
  tradeOffQuestions,
} from '@/mocks/assessment';
import { deriveWeights } from '@/lib/assessment';
import { saveAssessmentResult } from '@/lib/storage';

/**
 * /assessment — the full Flow Assessment flow.
 *
 * 12 screens, all rendered under one URL. Step state is local to this
 * component; URL never changes. Auto-advance fires 260 ms after every
 * question pick (matches the prototype's `setTimeout(asxNext, 260)`).
 *
 * Flow:
 *   0       Welcome
 *   1..4    Trade-offs (Q1–Q4, forced binary choice)
 *   5       Most dissatisfied pillar (Q5)
 *   6       1–5 satisfaction with that pillar (Q6)
 *   7       Strongest pillar (Q7, excludes Q5 answer)
 *   8       Life situation (Q8)
 *   9       Attention & energy (Q9)
 *   10      Weight reveal + adjustment
 *   11      Done
 *
 * Persistence: on Confirm weights, `saveAssessmentResult` writes the
 * full state to localStorage (`dolphin.assessment` key) and flips the
 * onboarded flag. The Done screen offers a Restart that wipes local
 * state but does NOT clear the persisted assessment.
 */
export default function AssessmentPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<AssessmentAnswers>>({});
  const [weights, setWeights] = useState<PillarWeights | null>(null);

  // ── Question setters ──────────────────────────────────────────────
  const setAnswer = useCallback(
    <K extends keyof AssessmentAnswers>(key: K, value: AssessmentAnswers[K]) => {
      setAnswers((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  // 260 ms auto-advance after each pick — matches the prototype.
  const advanceSoon = useCallback(() => {
    setTimeout(() => {
      setStep((s) => {
        // Going from S9 → S10 also derives the weights.
        if (s === 9) {
          setAnswers((curAnswers) => {
            const w = deriveWeights(curAnswers);
            setWeights(w);
            return curAnswers;
          });
          return 10;
        }
        return Math.min(11, s + 1);
      });
    }, 260);
  }, []);

  const pickPillar = useCallback(
    <K extends 'q1' | 'q2' | 'q3' | 'q4' | 'q5' | 'q7'>(
      key: K,
      pillar: Pillar,
    ) => {
      setAnswer(key, pillar as AssessmentAnswers[K]);

      // Q5 changes: if Q7 was already set to that same pillar, clear it.
      if (key === 'q5') {
        setAnswers((prev) => (prev.q7 === pillar ? { ...prev, q7: undefined } : prev));
      }
      advanceSoon();
    },
    [setAnswer, advanceSoon],
  );

  const pickRating = useCallback(
    (value: 1 | 2 | 3 | 4 | 5) => {
      setAnswer('q6', value);
      advanceSoon();
    },
    [setAnswer, advanceSoon],
  );

  const pickContext = useCallback(
    (key: 'q8' | 'q9', value: string) => {
      setAnswer(key, value as AssessmentAnswers[typeof key]);
      advanceSoon();
    },
    [setAnswer, advanceSoon],
  );

  const goBack = useCallback(() => {
    setStep((s) => (s > 0 && s < 11 ? s - 1 : s));
  }, []);

  const restart = useCallback(() => {
    setStep(0);
    setAnswers({});
    setWeights(null);
  }, []);

  const confirmWeights = useCallback(() => {
    if (!weights) return;
    // TODO: replace with API call.
    saveAssessmentResult({
      answers,
      derivedWeights: deriveWeights(answers),
      adjustedWeights: weights,
    });
    setStep(11);
  }, [answers, weights]);

  return (
    <>
      <TopNav active="home" user={null} />
      <div className="asx-wrap">
        <AssessmentTopBar step={step} onRestart={restart} />

        <div className="asx-body">
          {/* Re-key on step so the asx-fi enter animation replays per screen. */}
          <div key={step}>{renderStep()}</div>
        </div>

        <BottomNav step={step} onBack={goBack} />
      </div>
    </>
  );

  function renderStep() {
    if (step === 0) return <WelcomeScreen onBegin={() => setStep(1)} />;

    if (step >= 1 && step <= 4) {
      const q = tradeOffQuestions[step - 1];
      if (!q) return null;
      const key = q.id; // 'q1' | 'q2' | 'q3' | 'q4'
      return (
        <TradeOffScreen
          question={q}
          selected={answers[key]}
          onSelect={(p) => pickPillar(key, p)}
        />
      );
    }

    if (step === 5) {
      return (
        <PillarPickScreen
          question={q5_mostDissatisfied}
          selected={answers.q5}
          onSelect={(p) => pickPillar('q5', p)}
        />
      );
    }

    if (step === 6) {
      return (
        <SatisfactionRatingScreen
          question={q6_satisfactionRating}
          q5Pillar={answers.q5}
          selected={answers.q6}
          onSelect={pickRating}
        />
      );
    }

    if (step === 7) {
      return (
        <PillarPickScreen
          question={q7_strongest}
          selected={answers.q7}
          onSelect={(p) => pickPillar('q7', p)}
          excludePillar={answers.q5}
        />
      );
    }

    if (step === 8) {
      return (
        <ContextScreen
          question={q8_lifeSituation}
          selected={answers.q8}
          onSelect={(v) => pickContext('q8', v)}
        />
      );
    }

    if (step === 9) {
      return (
        <ContextScreen
          question={q9_focusArea}
          selected={answers.q9}
          onSelect={(v) => pickContext('q9', v)}
        />
      );
    }

    if (step === 10 && weights) {
      return (
        <WeightRevealScreen
          weights={weights}
          onChange={setWeights}
          onConfirm={confirmWeights}
        />
      );
    }

    if (step === 11) return <DoneScreen onRestart={restart} />;

    return null;
  }
}
