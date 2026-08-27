// ============================================================
// QUERY EXECUTOR — Runs parsed AST against data collections
// ============================================================

import type { ParsedQuery, QueryResult, QueryError, TableName, WhereClause } from './types';
import { projects } from '../data/projects';
import { skills } from '../data/skills';
import { about } from '../data/about';
import { contact } from '../data/contact';
import { certifications } from '../data/certifications';

// Known tables
const VALID_TABLES: Set<string> = new Set(['projects', 'skills', 'about', 'contact', 'certifications']);

// ── Field aliases ─────────────────────────────────────────────
// Lets users write intuitive singular/alternate names
const FIELD_ALIASES: Record<string, string> = {
  // projects
  technology:    'technologies',
  tech:          'technologies',
  lang:          'technologies',
  language:      'technologies',
  // skills
  cat:           'category',
  // experience
  company:       'organization',
  org:           'organization',
  job:           'type',
  role_type:     'type',
};

function resolveField(field: string): string {
  return FIELD_ALIASES[field.toLowerCase()] ?? field;
}

// ── WHERE filter logic ────────────────────────────────────────

function matchesCondition(record: Record<string, unknown>, cond: WhereClause): boolean {
  const field    = resolveField(cond.field);
  const operator = cond.operator;
  const value    = cond.value;

  const recordVal = record[field];
  const valLower  = value.toLowerCase();

  // ── Boolean fields (featured, etc.)
  if (typeof recordVal === 'boolean') {
    const boolVal = valLower === 'true' || valLower === '1' || valLower === 'yes';
    switch (operator) {
      case '=':  return recordVal === boolVal;
      case '!=': return recordVal !== boolVal;
      default:   return false;
    }
  }

  // ── Array fields (technologies, highlights, skills, focus)
  if (Array.isArray(recordVal)) {
    return recordVal.some(v => {
      if (typeof v !== 'string') return false;
      const vl = v.toLowerCase();
      switch (operator) {
        case '=':    return vl === valLower;
        case '!=':   return vl !== valLower;
        case 'LIKE': return vl.includes(valLower);
        default:     return false;
      }
    });
  }

  // ── String fields
  if (typeof recordVal === 'string') {
    const rv = recordVal.toLowerCase();
    switch (operator) {
      case '=':    return rv === valLower;
      case '!=':   return rv !== valLower;
      case 'LIKE': return rv.includes(valLower);
      case '>':    return rv > valLower;
      case '<':    return rv < valLower;
    }
  }

  // ── Number fields
  if (typeof recordVal === 'number') {
    const numVal = parseFloat(value);
    if (isNaN(numVal)) return false;
    switch (operator) {
      case '=':  return recordVal === numVal;
      case '!=': return recordVal !== numVal;
      case '>':  return recordVal > numVal;
      case '<':  return recordVal < numVal;
      default:   return false;
    }
  }

  return false;
}

function applyWhere<T extends Record<string, unknown>>(
  records: T[],
  conditions: WhereClause[]
): T[] {
  return records.filter(r =>
    conditions.every(c => matchesCondition(r as Record<string, unknown>, c))
  );
}

function applyOrderBy<T extends Record<string, unknown>>(
  records: T[],
  field: string,
  direction: 'ASC' | 'DESC'
): T[] {
  const resolvedField = resolveField(field);
  return [...records].sort((a, b) => {
    const av = a[resolvedField];
    const bv = b[resolvedField];
    if (typeof av === 'string' && typeof bv === 'string') {
      return direction === 'ASC' ? av.localeCompare(bv) : bv.localeCompare(av);
    }
    if (typeof av === 'number' && typeof bv === 'number') {
      return direction === 'ASC' ? av - bv : bv - av;
    }
    return 0;
  });
}

// ── Executor ──────────────────────────────────────────────────

export function executeQuery(parsed: ParsedQuery, rawQuery: string): QueryResult {
  const start = performance.now();
  const { table, where, orderBy, limit } = parsed;

  if (!VALID_TABLES.has(table)) {
    const err: QueryError = {
      code: 'RELATION_NOT_FOUND',
      message: `RELATION "${table.toUpperCase()}" DOES NOT EXIST.`,
      hint: 'Available tables: projects, skills, about, contact',
    };
    return { type: 'error', query: rawQuery, error: err, executionTimeMs: 0 };
  }

  const executionTimeMs = Math.round(performance.now() - start);

  switch (table as TableName) {
    case 'projects': {
      let results = [...projects] as unknown as Record<string, unknown>[];
      if (where?.length) results = applyWhere(results, where);
      if (orderBy) results = applyOrderBy(results, orderBy.field, orderBy.direction);
      if (limit)   results = results.slice(0, limit);
      return { type: 'projects', query: rawQuery, count: results.length, data: results, executionTimeMs };
    }

    case 'skills': {
      let results = [...skills] as unknown as Record<string, unknown>[];
      if (where?.length) results = applyWhere(results, where);
      if (orderBy) results = applyOrderBy(results, orderBy.field, orderBy.direction);
      if (limit)   results = results.slice(0, limit);
      return { type: 'skills', query: rawQuery, count: results.length, data: results, executionTimeMs };
    }



    case 'about': {
      return { type: 'about', query: rawQuery, count: 1, data: about, executionTimeMs };
    }

    case 'contact': {
      return { type: 'contact', query: rawQuery, count: contact.length, data: contact, executionTimeMs };
    }

    case 'certifications': {
      let results = [...certifications] as unknown as Record<string, unknown>[];
      if (where?.length) results = applyWhere(results, where);
      if (orderBy) results = applyOrderBy(results, orderBy.field, orderBy.direction);
      if (limit)   results = results.slice(0, limit);
      return { type: 'certifications', query: rawQuery, count: results.length, data: results, executionTimeMs };
    }
  }
}
