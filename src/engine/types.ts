// ============================================================
// QUERY ENGINE TYPES — AST and result types
// ============================================================

export type TableName = 'projects' | 'skills' | 'about' | 'contact' | 'certifications';

export type ColumnList = '*' | string[];

export interface WhereClause {
  field: string;
  operator: '=' | '!=' | 'LIKE' | '>' | '<';
  value: string;
}

export interface OrderByClause {
  field: string;
  direction: 'ASC' | 'DESC';
}

export interface ParsedQuery {
  type: 'SELECT';
  columns: ColumnList;
  table: TableName;
  where?: WhereClause[];   // AND-joined conditions
  orderBy?: OrderByClause;
  limit?: number;
}

// ── Result types ──

export type QueryResultType =
  | 'projects'
  | 'skills'
  | 'about'
  | 'contact'
  | 'certifications'
  | 'error'
  | 'empty';

export interface QueryResult {
  type: QueryResultType;
  query: string;           // The original query string
  count?: number;
  data?: unknown;
  error?: QueryError;
  executionTimeMs?: number;
}

export interface QueryError {
  code: 'RELATION_NOT_FOUND' | 'SYNTAX_ERROR' | 'INVALID_COLUMN' | 'UNKNOWN';
  message: string;
  hint?: string;
}
