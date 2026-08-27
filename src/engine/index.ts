// ============================================================
// ENGINE INDEX — public API
// ============================================================

export { parseQuery } from './parser';
export { executeQuery } from './executor';
export type { ParsedQuery, QueryResult, QueryError, QueryResultType } from './types';

import { parseQuery } from './parser';
import { executeQuery } from './executor';
import type { QueryResult } from './types';

/**
 * Main entry: run a raw SQL or natural language query string
 * and return a structured QueryResult.
 */
export function runQuery(rawInput: string): QueryResult {
  const trimmed = rawInput.trim();
  if (!trimmed) {
    return {
      type: 'error',
      query: rawInput,
      error: {
        code: 'SYNTAX_ERROR',
        message: 'EMPTY QUERY.',
        hint: 'Try: SELECT * FROM projects;',
      },
    };
  }

  const parsed = parseQuery(trimmed);
  if (!parsed.ok) {
    return {
      type: 'error',
      query: rawInput,
      error: {
        code: 'SYNTAX_ERROR',
        message: 'INVALID QUERY SYNTAX.',
        hint: parsed.message,
      },
    };
  }

  return executeQuery(parsed.query, trimmed);
}
