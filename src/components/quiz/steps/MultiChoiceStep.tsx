'use client';

import { useEffect, useState } from 'react';
import type { QuizStep } from '@/lib/config/quizConfig';

interface MultiChoiceStepProps {
  step: QuizStep;
  initialValue?: string;
  onContinue: (value: string) => void;
}

export default function MultiChoiceStep({
  step,
  initialValue,
  onContinue,
}: MultiChoiceStepProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  useEffect(() => {
    const parsed = new Set(
      (initialValue ?? '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    );
    setSelected(parsed);
  }, [initialValue, step.id]);

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      const isNone = id === 'none';

      if (isNone) {
        if (next.has('none')) next.delete('none');
        else {
          next.clear();
          next.add('none');
        }
        return next;
      }

      next.delete('none');
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleContinue = () => {
    const value = Array.from(selected).join(',');
    onContinue(value);
  };

  const hasSelection = selected.size > 0;
  const groupedOptions = step.options?.reduce<Record<string, typeof step.options>>((acc, opt) => {
    const key = opt.category ?? 'Other';
    if (!acc[key]) acc[key] = [];
    acc[key].push(opt);
    return acc;
  }, {});
  const hasCategories = Object.keys(groupedOptions ?? {}).length > 1 || step.options?.some((opt) => opt.category);

  const selectAll = () => {
    const allIds = (step.options ?? [])
      .filter((opt) => opt.id !== 'none')
      .map((opt) => opt.id);
    setSelected(new Set(allIds));
  };

  const clearAll = () => {
    setSelected(new Set());
  };

  return (
    <div className="animate-slide-left w-full max-w-xl mx-auto px-4 py-8 flex flex-col gap-4">
      {step.question && (
        <h1
          className="text-[1.6rem] font-bold text-[#1A1A1A] text-center mb-2 leading-snug"
          style={{ fontFamily: 'Poppins, system-ui, sans-serif' }}
        >
          {step.question}
        </h1>
      )}

      {hasCategories && (
        <div className="flex gap-2 items-center justify-center mb-2 text-sm text-[#374151]">
          <button
            type="button"
            onClick={selectAll}
            className="px-3 py-1 rounded-md bg-[#F3F4F6] hover:bg-[#E5E7EB]"
          >
            Select everything
          </button>
          <button
            type="button"
            onClick={clearAll}
            className="px-3 py-1 rounded-md bg-[#F3F4F6] hover:bg-[#E5E7EB]"
          >
            Clear all
          </button>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {hasCategories
          ? Object.entries(groupedOptions ?? {}).map(([category, opts]) => (
              <div key={category} className="rounded-lg border border-[#E5E7EB] bg-white p-3">
                <h2 className="text-sm font-semibold text-[#111827] mb-2">{category}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {opts.map((opt) => {
                    const isSelected = selected.has(opt.id);
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => toggle(opt.id)}
                        className={`py-2 px-2 rounded-md border text-[13px] text-left transition-all duration-150 ${
                          isSelected
                            ? 'bg-[#F8EFD9] border-[#E3C47A]'
                            : 'bg-white border-[#E5E7EB] hover:border-[#D1D5DB]'
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
          : step.options?.map((opt) => {
              const isSelected = selected.has(opt.id);
              return (
                <button
                  key={opt.id}
                  onClick={() => toggle(opt.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-md border text-left transition-all duration-150 ${
                    isSelected
                      ? 'bg-[#F8EFD9] border-[#E3C47A]'
                      : 'bg-white border-[#E5E7EB] hover:border-[#D1D5DB]'
                  }`}
                >
                  <span className="text-lg leading-none w-6 text-center">{opt.emoji ?? '•'}</span>
                  <span className="flex-1 text-[13px] font-medium text-[#111827]">{opt.label}</span>
                  <span
                    className={`w-4 h-4 rounded-full border ${
                      isSelected ? 'border-[#111827] bg-[#111827]' : 'border-[#9CA3AF] bg-transparent'
                    }`}
                  />
                </button>
              );
            })}
      </div>

      <button
        onClick={handleContinue}
        disabled={!hasSelection}
        className={`w-full mt-3 text-white font-semibold text-sm py-3 rounded-md transition-all duration-150 ${
          hasSelection
            ? 'bg-[#111111] hover:bg-[#2A2A2A] active:scale-[0.98]'
            : 'bg-[#C7C9CF] cursor-not-allowed'
        }`}
      >
        Continue
      </button>
    </div>
  );
}
