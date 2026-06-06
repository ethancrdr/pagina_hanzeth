'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  routeQuiz,
  buildWhatsAppMessage,
  countryFromCC,
  type Answers,
  type Profile,
} from '@/lib/quiz/scoring';
import { leadFormSchema, type LeadFormData } from '@/lib/quiz/validation';
import { getFourLifeUrl, buildWhatsAppUrl } from '@/lib/geo';
import { trackEvent } from '@/lib/analytics/events';

type Step = 1 | 2 | 3 | 4 | 'result';

const initialAnswers: Answers = {
  priority: null,
  time: null,
  interest: null,
  name: '',
  email: '',
  cc: '1',
  phone: '',
};

export function Quiz() {
  return (
    <Suspense fallback={<QuizSkeleton />}>
      <QuizInner />
    </Suspense>
  );
}

function QuizSkeleton() {
  return (
    <section id="quiz" className="bg-bg py-16 md:py-24" aria-labelledby="quiz-title">
      <div className="wrap">
        <div className="text-center max-w-[620px] mx-auto">
          <p className="eyebrow">Tu camino</p>
          <h2 id="quiz-title" className="mt-2.5 text-h2 text-balance">
            Descubre tu camino en 60 segundos
          </h2>
        </div>
        <div className="max-w-[560px] mx-auto mt-8 bg-surface border border-border rounded-xl shadow-md p-6 md:p-8 min-h-[400px]" />
      </div>
    </section>
  );
}

function QuizInner() {
  const searchParams = useSearchParams();
  const intent = searchParams.get('intent');
  const [current, setCurrent] = useState<Step>(1);
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [errors, setErrors] = useState<Partial<Record<keyof LeadFormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (intent !== 'health' && intent !== 'business') return;
    setAnswers((a) =>
      a.priority
        ? a
        : { ...a, priority: intent === 'health' ? 'health' : 'income' },
    );
  }, [intent]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const lang = (navigator.language || '').toLowerCase();
    const map: Record<string, string> = {
      'es-co': '57',
      'es-es': '34',
      'es-cr': '506',
      'es-us': '1',
      'en-us': '1',
    };
    if (map[lang]) {
      setAnswers((a) => ({ ...a, cc: map[lang] }));
    }
  }, []);

  useEffect(() => {
    if (current === 'result') return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const card = cardRef.current;
    if (card && !reduce) {
      const top = card.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    const stepEl = document.getElementById(`step-${current}`);
    const focusable = stepEl?.querySelector(
      '.opt, input, button.btn, .back',
    ) as HTMLElement | null;
    if (focusable) {
      setTimeout(() => focusable.focus({ preventScroll: true }), reduce ? 0 : 180);
    }
  }, [current]);

  function setAnswer<K extends keyof Answers>(key: K, value: Answers[K]) {
    setAnswers((a) => ({ ...a, [key]: value }));
  }

  function selectOption(q: 'priority' | 'time' | 'interest', val: string) {
    setAnswer(q, val as Answers[typeof q]);
    trackEvent('quiz_step_complete', { question: q, value: val });
    const next: Record<string, Step> = { priority: 2, time: 3, interest: 4 };
    const nextStep = next[q];
    if (nextStep) {
      const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      setTimeout(() => setCurrent(nextStep), reduce ? 0 : 220);
    }
  }

  function goBack() {
    if (current === 'result') return;
    if (typeof current === 'number' && current > 1) {
      setCurrent((current - 1) as Step);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);
    const data = {
      name: answers.name,
      email: answers.email,
      cc: answers.cc,
      phone: answers.phone,
    };
    const result = leadFormSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof LeadFormData, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0];
        if (typeof key === 'string') {
          (fieldErrors as Record<string, string>)[key] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      if (
        answers.priority &&
        answers.time &&
        answers.interest
      ) {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);
        fetch('/api/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: result.data.name,
            email: result.data.email,
            cc: result.data.cc,
            phone: result.data.phone,
            priority: answers.priority,
            time: answers.time,
            interest: answers.interest,
          }),
          signal: controller.signal,
        })
          .then((r) => {
            if (!r.ok) console.error('[/api/lead] non-2xx', r.status);
          })
          .catch((err) => {
            console.error('[/api/lead] failed', err);
          })
          .finally(() => clearTimeout(timeout));
      }
      await new Promise((r) => setTimeout(r, 900));
      try {
        localStorage.setItem('hc_quiz_done', '1');
      } catch {
        // ignore
      }
      trackEvent('quiz_complete', {
        profile: routeQuiz(answers),
        country: countryFromCC(answers.cc),
      });
      setCurrent('result');
    } catch {
      setSubmitError('No se pudo enviar. Intenta de nuevo o escríbenos directo a WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  }

  const profile = current === 'result' ? routeQuiz(answers) : null;

  return (
    <section id="quiz" className="bg-bg py-16 md:py-24" aria-labelledby="quiz-title">
      <div className="wrap">
        <div className="text-center max-w-[620px] mx-auto">
          <p className="eyebrow">Tu camino</p>
          <h2 id="quiz-title" className="mt-2.5 text-h2 text-balance">
            Descubre tu camino en 60 segundos
          </h2>
          <ProgressDots current={current} />
        </div>

        <div
          ref={cardRef}
          className="max-w-[560px] mx-auto mt-8 bg-surface border border-border rounded-xl shadow-md p-6 md:p-8 relative"
        >
          <div aria-live="polite">
            {current === 1 && (
              <Step1 answers={answers} onSelect={(v) => selectOption('priority', v)} />
            )}
            {current === 2 && (
              <Step2
                answers={answers}
                onSelect={(v) => selectOption('time', v)}
                onBack={goBack}
              />
            )}
            {current === 3 && (
              <Step3
                answers={answers}
                onSelect={(v) => selectOption('interest', v)}
                onBack={goBack}
              />
            )}
            {current === 4 && (
              <Step4
                answers={answers}
                errors={errors}
                submitting={submitting}
                submitError={submitError}
                onChange={setAnswer}
                onBack={goBack}
                onSubmit={handleSubmit}
              />
            )}
            {current === 'result' && profile && <Result profile={profile} answers={answers} />}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgressDots({ current }: { current: Step }) {
  const idx = current === 'result' ? 4 : current;
  return (
    <div
      className="flex items-center justify-center gap-2.5 mt-6"
      role="presentation"
      aria-hidden="true"
    >
      {[1, 2, 3, 4].map((n) => {
        const state = n < idx ? 'done' : n === idx ? 'active' : 'pending';
        return (
          <span
            key={n}
            className={
              state === 'active'
                ? 'h-2.5 w-7.5 bg-accent rounded-full'
                : 'h-2.5 w-2.5 rounded-full ' +
                  (state === 'done' ? 'bg-accent-soft' : 'bg-white/[0.16]')
            }
          />
        );
      })}
    </div>
  );
}

function Step1({
  answers,
  onSelect,
}: {
  answers: Answers;
  onSelect: (v: string) => void;
}) {
  return (
    <div id="step-1" className="step active" data-step="1">
      <p className="text-[0.8rem] font-bold tracking-[0.08em] uppercase text-accent-soft">
        Pregunta 1 de 3
      </p>
      <p className="font-display font-bold text-[1.375rem] mt-2 leading-[1.25] text-balance">
        ¿Qué es lo que más buscas en este momento?
      </p>
      <div className="flex flex-col gap-3 mt-6" role="group" aria-label="Selecciona tu prioridad">
        <Option
          label="Mejorar mi salud física"
          letter="A"
          pressed={answers.priority === 'health'}
          onClick={() => onSelect('health')}
        />
        <Option
          label="Generar ingresos adicionales"
          letter="B"
          pressed={answers.priority === 'income'}
          onClick={() => onSelect('income')}
        />
        <Option
          label="Tener más tiempo libre"
          letter="C"
          pressed={answers.priority === 'time'}
          onClick={() => onSelect('time')}
        />
      </div>
    </div>
  );
}

function Step2({
  answers,
  onSelect,
  onBack,
}: {
  answers: Answers;
  onSelect: (v: string) => void;
  onBack: () => void;
}) {
  return (
    <div id="step-2" className="step active" data-step="2">
      <BackButton onClick={onBack} />
      <p className="text-[0.8rem] font-bold tracking-[0.08em] uppercase text-accent-soft">
        Pregunta 2 de 3
      </p>
      <p className="font-display font-bold text-[1.375rem] mt-2 leading-[1.25] text-balance">
        ¿Cuánto tiempo podrías dedicar por semana?
      </p>
      <div
        className="flex flex-col gap-3 mt-6"
        role="group"
        aria-label="Selecciona tu disponibilidad semanal"
      >
        <Option
          label="1 a 5 horas"
          letter="A"
          pressed={answers.time === '1-5'}
          onClick={() => onSelect('1-5')}
        />
        <Option
          label="5 a 10 horas"
          letter="B"
          pressed={answers.time === '5-10'}
          onClick={() => onSelect('5-10')}
        />
        <Option
          label="Más de 10 horas"
          letter="C"
          pressed={answers.time === '10+'}
          onClick={() => onSelect('10+')}
        />
      </div>
    </div>
  );
}

function Step3({
  answers,
  onSelect,
  onBack,
}: {
  answers: Answers;
  onSelect: (v: string) => void;
  onBack: () => void;
}) {
  return (
    <div id="step-3" className="step active" data-step="3">
      <BackButton onClick={onBack} />
      <p className="text-[0.8rem] font-bold tracking-[0.08em] uppercase text-accent-soft">
        Pregunta 3 de 3
      </p>
      <p className="font-display font-bold text-[1.375rem] mt-2 leading-[1.25] text-balance">
        En una escala del 1 al 5, ¿cuál es tu nivel de interés en emprender un modelo digital?
      </p>
      <div
        className="grid grid-cols-5 gap-2 mt-6"
        role="group"
        aria-label="Nivel de interés del 1 al 5"
      >
        {(['1', '2', '3', '4', '5'] as const).map((n) => (
          <button
            key={n}
            type="button"
            data-q="interest"
            data-val={n}
            aria-pressed={answers.interest === n}
            onClick={() => onSelect(n)}
            className={`min-h-[72px] px-1 py-2.5 rounded-md border-[1.5px] cursor-pointer font-sans font-bold text-[1.25rem] flex flex-col items-center justify-center gap-1 transition-colors duration-150 ${
              answers.interest === n
                ? 'border-accent bg-accent/15 text-text'
                : 'border-border bg-[#161922] text-text hover:border-accent hover:bg-[#1B1E29]'
            }`}
          >
            {n}
            <small className="text-[0.62rem] font-semibold text-text-muted">
              {n === '1' ? 'Poco' : n === '5' ? 'Mucho' : ''}
            </small>
          </button>
        ))}
      </div>
      <div className="flex justify-between mt-2 text-[0.75rem] text-text-muted">
        <span>Poco interés</span>
        <span>Muy interesado</span>
      </div>
    </div>
  );
}

function Step4({
  answers,
  errors,
  submitting,
  submitError,
  onChange,
  onBack,
  onSubmit,
}: {
  answers: Answers;
  errors: Partial<Record<keyof LeadFormData, string>>;
  submitting: boolean;
  submitError: string | null;
  onChange: <K extends keyof Answers>(key: K, value: Answers[K]) => void;
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <div id="step-4" className="step step4 active" data-step="4">
      <BackButton onClick={onBack} />
      <p className="text-[0.8rem] font-bold tracking-[0.08em] uppercase text-accent-soft">
        Último paso
      </p>
      <p className="font-display font-bold text-[1.375rem] mt-2 leading-[1.25] text-balance">
        ¿A dónde te enviamos tu recomendación?
      </p>
      <form onSubmit={onSubmit} noValidate>
        <Field
          label="Nombre"
          id="f-name"
          name="name"
          type="text"
          placeholder="Tu nombre"
          autoComplete="given-name"
          value={answers.name}
          onChange={(v) => onChange('name', v)}
          error={errors.name}
        />
        <Field
          label="Correo electrónico"
          id="f-email"
          name="email"
          type="email"
          placeholder="tucorreo@ejemplo.com"
          autoComplete="email"
          inputMode="email"
          value={answers.email}
          onChange={(v) => onChange('email', v)}
          error={errors.email}
        />
        <div className="flex flex-col gap-1.5 mt-4">
          <label htmlFor="f-phone" className="text-[0.85rem] font-semibold text-band">
            WhatsApp
          </label>
          <div className="flex gap-2">
            <select
              id="f-cc"
              name="cc"
              aria-label="Código de país"
              value={answers.cc}
              onChange={(e) => onChange('cc', e.target.value)}
              className="font-sans text-[1rem] min-h-[56px] px-2.5 flex-none w-[108px] rounded-md border-[1.5px] border-border bg-[#161922] text-text cursor-pointer focus:outline focus:outline-2 focus:outline-accent focus:outline-offset-2"
            >
              <option value="1">🇺🇸 +1</option>
              <option value="57">🇨🇴 +57</option>
              <option value="34">🇪🇸 +34</option>
              <option value="506">🇨🇷 +506</option>
            </select>
            <input
              id="f-phone"
              name="phone"
              type="tel"
              autoComplete="tel-national"
              inputMode="numeric"
              placeholder="Número de WhatsApp"
              value={answers.phone}
              onChange={(e) => onChange('phone', e.target.value)}
              className="font-sans text-[1rem] min-h-[56px] px-4 rounded-md border-[1.5px] border-border bg-[#161922] text-text flex-1 min-w-0 transition-colors duration-150 focus:outline focus:outline-2 focus:outline-accent focus:outline-offset-2 focus:bg-[#1B1E29] focus:border-accent placeholder:text-[#6E778A]"
            />
          </div>
          {errors.phone && <p className="text-accent text-[0.8rem] font-semibold min-h-[1em]">{errors.phone}</p>}
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="btn btn-accent btn-block mt-5 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <span className="flex items-center gap-2.5">
              <Spinner /> Enviando…
            </span>
          ) : (
            'Ver mi recomendación'
          )}
        </button>
        {submitError && (
          <p className="text-accent text-[0.85rem] mt-3 text-center font-semibold">
            {submitError}
          </p>
        )}
        <p className="mt-4 text-center text-[0.82rem] text-text-muted flex items-center justify-center gap-1.5">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-[15px] h-[15px] flex-none stroke-accent-soft"
          >
            <rect x="4" y="11" width="16" height="10" rx="2" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
          </svg>
          Tus datos están seguros. No spam. Solo Hanzeth te contactará.
        </p>
      </form>
    </div>
  );
}

function Field({
  label,
  id,
  name,
  type,
  placeholder,
  autoComplete,
  inputMode,
  value,
  onChange,
  error,
}: {
  label: string;
  id: string;
  name: string;
  type: string;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: 'text' | 'email' | 'tel' | 'numeric' | 'search' | 'url';
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5 mt-4 first-of-type:mt-6">
      <label htmlFor={id} className="text-[0.85rem] font-semibold text-band">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="font-sans text-[1rem] min-h-[56px] px-4 rounded-md border-[1.5px] border-border bg-[#161922] text-text transition-colors duration-150 focus:outline focus:outline-2 focus:outline-accent focus:outline-offset-2 focus:bg-[#1B1E29] focus:border-accent placeholder:text-[#6E778A]"
      />
      {error && <p className="text-accent text-[0.8rem] font-semibold min-h-[1em]">{error}</p>}
    </div>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-transparent border-0 cursor-pointer text-text-muted font-semibold text-[0.9rem] inline-flex items-center gap-1.5 p-1.5 mb-4 font-sans hover:text-text-onBand"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-4 h-4"
      >
        <path d="m12 19-7-7 7-7M5 12h14" />
      </svg>
      Atrás
    </button>
  );
}

function Option({
  label,
  letter,
  pressed,
  onClick,
}: {
  label: string;
  letter: string;
  pressed: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      data-q={letter === 'A' ? 'priority' : letter === 'B' ? 'priority' : 'priority'}
      data-val={letter}
      aria-pressed={pressed}
      onClick={onClick}
      className={`w-full text-left cursor-pointer font-sans min-h-[64px] px-[18px] py-4 rounded-md border-[1.5px] flex items-center gap-4 text-[1.0625rem] font-medium transition-colors duration-150 ${
        pressed
          ? 'border-accent bg-accent/15 text-text'
          : 'border-border bg-[#161922] text-text hover:border-accent hover:bg-[#1B1E29]'
      }`}
    >
      <span
        className={`flex-none w-[34px] h-[34px] rounded-full border-[1.5px] flex items-center justify-center font-bold text-[0.95rem] ${
          pressed
            ? 'bg-accent text-white border-accent'
            : 'bg-[#1B1E29] text-text border-border'
        }`}
      >
        {letter}
      </span>
      {label}
    </button>
  );
}

function Spinner() {
  return (
    <span
      className="inline-block w-5 h-5 border-[2.5px] border-white/40 border-t-white rounded-full animate-spin"
      aria-hidden="true"
    />
  );
}

function Result({ profile, answers }: { profile: Profile; answers: Answers }) {
  const country = countryFromCC(answers.cc);
  const isBusiness = profile === 'emprendedor';
  const firstName = (answers.name || '').split(' ')[0] || '';
  const hi = firstName ? `${firstName}, ` : '';
  const waMessage = buildWhatsAppMessage(answers);
  const waUrl = buildWhatsAppUrl(waMessage);
  const storeUrl = getFourLifeUrl(country);

  return (
    <div id="step-result" className="step result active text-center" data-step="result">
      <span className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-pill font-bold text-[0.82rem] tracking-[0.04em] uppercase">
        {isBusiness ? 'Camino recomendado · Emprendedor' : 'Camino recomendado · Bienestar'}
      </span>
      <h3 className="mt-4 text-[1.5rem]">
        {isBusiness
          ? `${hi}tu perfil encaja con la oportunidad de negocio`
          : `${hi}empieza por tu bienestar con 4Life`}
      </h3>
      <p className="mt-3 text-text-muted text-[1.02rem] text-pretty">
        {isBusiness
          ? 'Por tus respuestas, el modelo SEN es tu mejor punto de partida. Hablemos por WhatsApp para diseñar tu plan paso a paso.'
          : 'Por tus respuestas, te recomendamos comenzar con los suplementos premium de 4Life. Entra a la tienda de tu país para elegir tu primer producto.'}
      </p>
      <div className="mt-6">
        <a
          className="btn btn-accent btn-block"
          href={isBusiness ? waUrl : storeUrl}
          target="_blank"
          rel="noopener"
          data-cta={isBusiness ? 'whatsapp' : 'fourlife'}
          onClick={() =>
            trackEvent(isBusiness ? 'whatsapp_click' : 'fourlife_click', {
              source: 'quiz_result',
              country,
            })
          }
        >
          {isBusiness ? 'Hablar con Hanzeth por WhatsApp' : 'Ir a la tienda 4Life'}
        </a>
      </div>
      <p className="mt-6 pt-5 border-t border-border text-[0.92rem] text-text-muted">
        {isBusiness ? (
          <>
            ¿Solo quieres los productos?{' '}
            <a
              href={storeUrl}
              target="_blank"
              rel="noopener"
              className="text-accent font-bold no-underline hover:underline"
              onClick={() => trackEvent('fourlife_click', { source: 'quiz_result_alt', country })}
            >
              Ver la tienda 4Life →
            </a>
          </>
        ) : (
          <>
            ¿Te interesa también el negocio?{' '}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener"
              className="text-accent font-bold no-underline hover:underline"
              onClick={() => trackEvent('whatsapp_click', { source: 'quiz_result_alt', country })}
            >
              Escríbele a Hanzeth →
            </a>
          </>
        )}
      </p>
    </div>
  );
}
