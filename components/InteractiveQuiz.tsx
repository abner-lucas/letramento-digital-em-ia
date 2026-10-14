'use client';

import { useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle, RotateCcw, Award } from 'lucide-react';
import { QuizQuestion } from '@/data/courseData';

interface InteractiveQuizProps {
  questions: QuizQuestion[];
  moduleTitle: string;
}

export default function InteractiveQuiz({ questions, moduleTitle }: InteractiveQuizProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});

  const handleSelect = (questionId: string, optionLabel: string) => {
    if (submitted[questionId]) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionLabel }));
  };

  const handleConfirm = (questionId: string) => {
    if (!selectedAnswers[questionId]) return;
    setSubmitted((prev) => ({ ...prev, [questionId]: true }));
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted({});
  };

  const totalAnswered = Object.keys(submitted).length;
  const correctCount = questions.filter(
    (q) => submitted[q.id] && selectedAnswers[q.id] === q.correctAnswer
  ).length;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
            <HelpCircle className="w-4 h-4" />
            <span>Avaliação Formativa</span>
          </div>
          <h3 className="text-xl font-bold font-display text-white">
            Teste seu Conhecimento — {moduleTitle}
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            Exercícios oficiais com gabarito comentado do Prof. Dr. Bruno Duarte Gomes.
          </p>
        </div>

        {totalAnswered > 0 && (
          <button
            onClick={handleReset}
            className="px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md transition-colors flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Refazer</span>
          </button>
        )}
      </div>

      {/* Questions list */}
      <div className="p-6 space-y-8 bg-slate-50/40">
        {questions.map((q, idx) => {
          const isSubmitted = submitted[q.id];
          const chosen = selectedAnswers[q.id];
          const isCorrect = chosen === q.correctAnswer;

          return (
            <div
              key={q.id}
              className="p-5 bg-white rounded-xl border border-slate-200 shadow-2xs"
            >
              <div className="flex items-start gap-3 mb-4">
                <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 font-mono">
                  {idx + 1}
                </span>
                <h4 className="text-sm font-semibold text-slate-900 leading-snug">
                  {q.question}
                </h4>
              </div>

              {/* Options */}
              <div className="space-y-2 pl-9">
                {q.options.map((opt) => {
                  const isSelected = chosen === opt.label;
                  let optionStyle = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100';

                  if (isSubmitted) {
                    if (opt.label === q.correctAnswer) {
                      optionStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-medium';
                    } else if (isSelected && !isCorrect) {
                      optionStyle = 'bg-red-50 border-red-300 text-red-950';
                    } else {
                      optionStyle = 'bg-slate-50/60 border-slate-200 text-slate-400 opacity-60';
                    }
                  } else if (isSelected) {
                    optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-medium ring-1 ring-emerald-500/20';
                  }

                  return (
                    <div
                      key={opt.label}
                      onClick={() => handleSelect(q.id, opt.label)}
                      className={`p-3 rounded-lg border text-xs cursor-pointer transition-all flex items-start gap-3 ${optionStyle}`}
                    >
                      <span className="font-bold font-mono uppercase shrink-0 mt-0.5">
                        {opt.label})
                      </span>
                      <span className="flex-1 leading-relaxed">{opt.text}</span>
                      {isSubmitted && opt.label === q.correctAnswer && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                      {isSubmitted && isSelected && !isCorrect && (
                        <XCircle className="w-4 h-4 text-red-600 shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Action or Explanation */}
              <div className="mt-4 pl-9">
                {!isSubmitted ? (
                  <button
                    disabled={!chosen}
                    onClick={() => handleConfirm(q.id)}
                    className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 text-white hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Confirmar Resposta
                  </button>
                ) : (
                  <div className="p-3.5 bg-emerald-50/80 rounded-lg border border-emerald-100 text-xs text-emerald-950">
                    <span className="font-bold block mb-1">
                      {isCorrect ? '✓ Resposta Correta!' : '✕ Não foi dessa vez'} · Resposta Comentada:
                    </span>
                    <p className="leading-relaxed">{q.explanation}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Final score banner */}
        {totalAnswered === questions.length && (
          <div className="p-5 bg-gradient-to-r from-emerald-900 to-teal-900 rounded-xl text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-emerald-300" />
              <div>
                <h5 className="font-bold text-sm">Questionário Concluído!</h5>
                <p className="text-xs text-emerald-200">
                  Você acertou {correctCount} de {questions.length} questões do {moduleTitle}.
                </p>
              </div>
            </div>
            <div className="text-2xl font-bold font-mono tabular-nums text-emerald-300">
              {Math.round((correctCount / questions.length) * 100)}%
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
