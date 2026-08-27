// ============================================================
// useQuery — manages query state, execution, and history
// ============================================================

import { useState, useCallback, useRef } from 'react';
import { runQuery } from '../engine';
import type { QueryResult } from '../engine';

export type QueryState = 'idle' | 'typing' | 'executing' | 'done' | 'error';

export interface UseQueryReturn {
  queryText: string;
  setQueryText: (text: string) => void;
  result: QueryResult | null;
  state: QueryState;
  history: string[];
  executeQuery: (query?: string) => void;
  clearResult: () => void;
  typeAndExecute: (query: string) => void;
}

const MAX_HISTORY = 8;
const EXECUTION_DELAY = 600; // ms — feels like a real query

export function useQuery(): UseQueryReturn {
  const [queryText, setQueryText] = useState('');
  const [result, setResult] = useState<QueryResult | null>(null);
  const [state, setState] = useState<QueryState>('idle');
  const [history, setHistory] = useState<string[]>([]);
  const typeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const executeQuery = useCallback((query?: string) => {
    const q = (query ?? queryText).trim();
    if (!q) return;

    setState('executing');
    setResult(null);

    setTimeout(() => {
      const res = runQuery(q);
      setResult(res);
      setState(res.type === 'error' ? 'error' : 'done');

      // Add to history (avoid duplicates)
      setHistory(prev => {
        const filtered = prev.filter(h => h !== q);
        return [q, ...filtered].slice(0, MAX_HISTORY);
      });
    }, EXECUTION_DELAY);
  }, [queryText]);

  const clearResult = useCallback(() => {
    setResult(null);
    setState('idle');
  }, []);

  /**
   * Animates typing a query character by character, then executes.
   * Used when quick-action buttons are clicked.
   */
  const typeAndExecute = useCallback((query: string) => {
    if (typeTimerRef.current) clearTimeout(typeTimerRef.current);

    setResult(null);
    setState('typing');
    setQueryText('');

    let i = 0;
    const PER_CHAR_DELAY = 28; // ms per character

    function typeNext() {
      if (i <= query.length) {
        setQueryText(query.slice(0, i));
        i++;
        typeTimerRef.current = setTimeout(typeNext, PER_CHAR_DELAY);
      } else {
        // Finished typing — execute
        setState('executing');
        setTimeout(() => {
          const res = runQuery(query);
          setResult(res);
          setState(res.type === 'error' ? 'error' : 'done');
          setHistory(prev => {
            const filtered = prev.filter(h => h !== query);
            return [query, ...filtered].slice(0, MAX_HISTORY);
          });
        }, EXECUTION_DELAY);
      }
    }

    typeNext();
  }, []);

  return {
    queryText,
    setQueryText,
    result,
    state,
    history,
    executeQuery,
    clearResult,
    typeAndExecute,
  };
}
