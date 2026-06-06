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

const STORAGE_KEY = 'hc_quiz_state_v1';

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
    <section id="quiz" className="bg-bg py-20 md:py-32" aria-labelledby="quiz-title">
      <div className="wrap">
        <div className="max-w-[640px] mx-auto">
          <h2 id="quiz-title" className="font-display text-h2 text-text">
            Descubre tu camino en 60 segundos.
          </h2>
          <div className="mt-12 min-h-[320px]" />
        </div>
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
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { answers: Answers; current: Step };
      if (parsed.answers && typeof parsed.answers === 'object') {
        setAnswers((a) => ({ ...a, ...parsed.answers }));
      }
      if (typeof parsed.current === 'number' && parsed.current >= 1 && parsed.current <= 4) {
        setCurrent(parsed.current);
      }
    } catch {
      // ignore corrupted state
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ answers, current }),
      );
    } catch {
      // ignore quota errors
    }
  }, [answers, current]);

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
      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
      setCurrent('result');
    } catch {
      setSubmitError('No se pudo enviar. Intenta de nuevo o escríbenos directo a WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  }

  const profile = current === 'result' ? routeQuiz(answers) : null;

  return (
    <section id="quiz" className="bg-bg py-20 md:py-32" aria-labelledby="quiz-title">
      <div className="wrap">
        <div className="max-w-[640px] mx-auto reveal">
          <div className="flex items-baseline justify-between font-mono text-mono text-text-muted">
            <span>
              {current === 'result' ? '04' : String(current).padStart(2, '0')}
              <span className="text-text-subtle"> / 04</span>
            </span>
            {current !== 'result' && typeof current === 'number' && current > 1 && (
              <button
                type="button"
                onClick={goBack}
                className="back font-sans text-small text-text-muted hover:text-text transition-colors"
              >
                Atrás
              </button>
            )}
          </div>
          <h2 id="quiz-title" className="font-display text-h2 mt-3 text-text">
            {current === 'result' ? 'Listo.' : 'Descubre tu camino.'}
          </h2>
        </div>

        <div ref={cardRef} className="max-w-[640px] mx-auto mt-10 relative">
          <div aria-live="polite">
            {current === 1 && (
              <Step1 answers={answers} onSelect={(v) => selectOption('priority', v)} />
            )}
            {current === 2 && (
              <Step2
                answers={answers}
                onSelect={(v) => selectOption('time', v)}
              />
            )}
            {current === 3 && (
              <Step3
                answers={answers}
                onSelect={(v) => selectOption('interest', v)}
              />
            )}
            {current === 4 && (
              <Step4
                answers={answers}
                errors={errors}
                submitting={submitting}
                submitError={submitError}
                onChange={setAnswer}
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

function Step1({
  answers,
  onSelect,
}: {
  answers: Answers;
  onSelect: (v: string) => void;
}) {
  return (
    <div id="step-1">
      <p className="font-sans text-text mt-2">
        ¿Qué es lo que más buscas en este momento?
      </p>
      <div className="flex flex-col gap-3 mt-8" role="group" aria-label="Selecciona tu prioridad">
        <Option
          label="Mejorar mi salud física"
          pressed={answers.priority === 'health'}
          onClick={() => onSelect('health')}
        />
        <Option
          label="Generar ingresos adicionales"
          pressed={answers.priority === 'income'}
          onClick={() => onSelect('income')}
        />
        <Option
          label="Tener más tiempo libre"
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
}: {
  answers: Answers;
  onSelect: (v: string) => void;
}) {
  return (
    <div id="step-2">
      <p className="font-sans text-text mt-2">
        ¿Cuánto tiempo podrías dedicar por semana?
      </p>
      <div className="flex flex-col gap-3 mt-8" role="group" aria-label="Selecciona tu disponibilidad semanal">
        <Option
          label="1 a 5 horas"
          pressed={answers.time === '1-5'}
          onClick={() => onSelect('1-5')}
        />
        <Option
          label="5 a 10 horas"
          pressed={answers.time === '5-10'}
          onClick={() => onSelect('5-10')}
        />
        <Option
          label="Más de 10 horas"
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
}: {
  answers: Answers;
  onSelect: (v: string) => void;
}) {
  return (
    <div id="step-3">
      <p className="font-sans text-text mt-2">
        En una escala del 1 al 5, ¿cuál es tu nivel de interés en emprender un modelo digital?
      </p>
      <div className="grid grid-cols-5 gap-2 mt-8" role="group" aria-label="Nivel de interés del 1 al 5">
        {(['1', '2', '3', '4', '5'] as const).map((n) => (
          <button
            key={n}
            type="button"
            data-q="interest"
            data-val={n}
            aria-pressed={answers.interest === n}
            onClick={() => onSelect(n)}
            className={`opt min-h-[72px] px-1 py-2.5 rounded-md border cursor-pointer font-sans text-body flex flex-col items-center justify-center gap-1 transition-colors duration-150 ${
              answers.interest === n
                ? 'border-accent bg-surfaceHigh text-text'
                : 'border-border bg-transparent text-text-muted hover:border-accent hover:text-text'
            }`}
          >
            {n}
            <small className="font-mono text-mono text-text-subtle">
              {n === '1' ? 'poco' : n === '5' ? 'mucho' : ''}
            </small>
          </button>
        ))}
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
  onSubmit,
}: {
  answers: Answers;
  errors: Partial<Record<keyof LeadFormData, string>>;
  submitting: boolean;
  submitError: string | null;
  onChange: <K extends keyof Answers>(key: K, value: Answers[K]) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <div id="step-4">
      <p className="font-sans text-text mt-2">
        ¿A dónde te enviamos tu recomendación?
      </p>
      <form onSubmit={onSubmit} noValidate className="mt-10 space-y-8">
        <Field
          label="Nombre"
          id="f-name"
          name="name"
          type="text"
          placeholder="Tu nombre"
          autoComplete="given-name"
          maxLength={80}
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
          maxLength={120}
          value={answers.email}
          onChange={(v) => onChange('email', v)}
          error={errors.email}
        />
        <div>
          <label htmlFor="f-phone" className="block font-mono text-mono text-text-muted mb-3">
            WhatsApp
          </label>
          <div className="flex gap-2">
            <select
              id="f-cc"
              name="cc"
              aria-label="Código de país"
              value={answers.cc}
              onChange={(e) => onChange('cc', e.target.value)}
              className="font-sans text-body min-h-[56px] px-3 flex-none w-[112px] rounded-md border border-border bg-transparent text-text cursor-pointer"
            >
              <option value="1">+1</option>
              <option value="57">+57</option>
              <option value="34">+34</option>
              <option value="506">+506</option>
            </select>
            <input
              id="f-phone"
              name="phone"
              type="tel"
              autoComplete="tel-national"
              inputMode="numeric"
              placeholder="Número de WhatsApp"
              maxLength={20}
              pattern="[0-9 ]+"
              value={answers.phone}
              onChange={(e) => onChange('phone', e.target.value)}
              className="font-sans text-body min-h-[56px] px-4 rounded-md border border-border bg-transparent text-text flex-1 min-w-0 transition-colors duration-150 focus:border-accent placeholder:text-text-subtle"
            />
          </div>
          {errors.phone && <p className="mt-2 text-accent text-small font-medium">{errors.phone}</p>}
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="btn btn-primary btn-block disabled:opacity-50"
        >
          {submitting ? (
            <span className="flex items-center gap-2.5">
              <Spinner /> Enviando
            </span>
          ) : (
            'Ver mi recomendación'
          )}
        </button>
        {submitError && (
          <p className="text-accent text-small text-center font-medium">
            {submitError}
          </p>
        )}
        <p className="text-center text-small text-text-muted">
          Tus datos están seguros. Solo Hanzeth te contactará.
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
  maxLength,
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
  maxLength?: number;
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block font-mono text-mono text-text-muted mb-3">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        maxLength={maxLength}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full font-sans text-body min-h-[56px] px-4 rounded-md border border-border bg-transparent text-text transition-colors duration-150 focus:border-accent placeholder:text-text-subtle"
      />
      {error && <p className="mt-2 text-accent text-small font-medium">{error}</p>}
    </div>
  );
}

function Option({
  label,
  pressed,
  onClick,
}: {
  label: string;
  pressed: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`opt w-full text-left cursor-pointer font-sans min-h-[64px] px-5 py-4 rounded-md border flex items-center text-body transition-colors duration-150 ${
        pressed
          ? 'border-accent bg-surfaceHigh text-text'
          : 'border-border bg-transparent text-text-muted hover:border-accent hover:text-text'
      }`}
    >
      {label}
    </button>
  );
}

function Spinner() {
  return (
    <span
      className="inline-block w-4 h-4 border-[1.5px] border-bg/30 border-t-bg rounded-full animate-spin"
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
    <div id="step-result" className="text-center">
      <span
        className="inline-flex items-center font-mono uppercase text-accent"
        style={{ fontSize: '11px', letterSpacing: '0.14em' }}
      >
        {isBusiness ? 'Camino recomendado · Emprendedor' : 'Camino recomendado · Bienestar'}
      </span>
      <h3 className="font-display italic text-h2 mt-3 text-text">
        {isBusiness
          ? `${hi}tu perfil encaja con la oportunidad.`
          : `${hi}empieza por tu bienestar.`}
      </h3>
      <p className="mt-5 max-w-[55ch] mx-auto text-text-muted text-body">
        {isBusiness
          ? 'Por tus respuestas, el modelo SEN es tu mejor punto de partida. Hablemos por WhatsApp para diseñar tu plan paso a paso.'
          : 'Por tus respuestas, te recomendamos comenzar con los suplementos premium de 4Life. Entra a la tienda de tu país para elegir tu primer producto.'}
      </p>
      <div className="mt-10">
        <a
          className="btn btn-primary btn-block sm:w-auto sm:min-w-[280px]"
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
      <p className="mt-8 pt-6 border-t border-border text-small text-text-muted">
        {isBusiness ? (
          <>
            ¿Solo quieres los productos?{' '}
            <a
              href={storeUrl}
              target="_blank"
              rel="noopener"
              className="text-text underline underline-offset-4 hover:text-accent"
              onClick={() => trackEvent('fourlife_click', { source: 'quiz_result_alt', country })}
            >
              Ver la tienda 4Life
            </a>
          </>
        ) : (
          <>
            ¿Te interesa también el negocio?{' '}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener"
              className="text-text underline underline-offset-4 hover:text-accent"
              onClick={() => trackEvent('whatsapp_click', { source: 'quiz_result_alt', country })}
            >
              Escríbele a Hanzeth
            </a>
          </>
        )}
      </p>
    </div>
  );
}
