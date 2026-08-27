// ============================================================
// QUERY PARSER — Tokenizer + Recursive-descent parser
// Supports: SELECT [cols] FROM [table] [WHERE ...] [ORDER BY ...] [LIMIT n]
// ============================================================

import type { ParsedQuery, TableName, WhereClause, OrderByClause, ColumnList } from './types';

// ── Tokenizer ──────────────────────────────────────────────

type TokenType =
  | 'KEYWORD' | 'IDENT' | 'STRING' | 'NUMBER'
  | 'STAR' | 'COMMA' | 'SEMICOLON' | 'EQ' | 'NEQ'
  | 'GT' | 'LT' | 'EOF';

interface Token {
  type: TokenType;
  value: string;
}

const SQL_KEYWORDS = new Set([
  'SELECT', 'FROM', 'WHERE', 'ORDER', 'BY', 'LIMIT',
  'ASC', 'DESC', 'AND', 'OR', 'LIKE', 'NOT', 'IN',
]);

function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  let pos = 0;
  const src = input.trim();

  while (pos < src.length) {
    // Skip whitespace
    if (/\s/.test(src[pos])) { pos++; continue; }

    // String literals (single or double quoted)
    if (src[pos] === "'" || src[pos] === '"') {
      const quote = src[pos++];
      let str = '';
      while (pos < src.length && src[pos] !== quote) {
        str += src[pos++];
      }
      pos++; // closing quote
      tokens.push({ type: 'STRING', value: str });
      continue;
    }

    // Number
    if (/[0-9]/.test(src[pos])) {
      let num = '';
      while (pos < src.length && /[0-9.]/.test(src[pos])) num += src[pos++];
      tokens.push({ type: 'NUMBER', value: num });
      continue;
    }

    // Identifier or keyword
    if (/[a-zA-Z_]/.test(src[pos])) {
      let word = '';
      while (pos < src.length && /[a-zA-Z0-9_.@-]/.test(src[pos])) word += src[pos++];
      const upper = word.toUpperCase();
      tokens.push({ type: SQL_KEYWORDS.has(upper) ? 'KEYWORD' : 'IDENT', value: upper === word ? upper : word });
      continue;
    }

    // Symbols
    const ch = src[pos];
    if (ch === '*')  { tokens.push({ type: 'STAR',      value: '*' });  pos++; continue; }
    if (ch === ',')  { tokens.push({ type: 'COMMA',     value: ',' });  pos++; continue; }
    if (ch === ';')  { tokens.push({ type: 'SEMICOLON', value: ';' });  pos++; continue; }
    if (ch === '=')  { tokens.push({ type: 'EQ',        value: '=' });  pos++; continue; }
    if (ch === '>')  { tokens.push({ type: 'GT',        value: '>' });  pos++; continue; }
    if (ch === '<')  { tokens.push({ type: 'LT',        value: '<' });  pos++; continue; }
    if (ch === '!' && src[pos+1] === '=') {
      tokens.push({ type: 'NEQ', value: '!=' }); pos += 2; continue;
    }
    pos++; // skip unknown character
  }

  tokens.push({ type: 'EOF', value: '' });
  return tokens;
}

// ── Parser ─────────────────────────────────────────────────

class Parser {
  private tokens: Token[];
  private pos = 0;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  private peek(): Token { return this.tokens[this.pos]; }
  private consume(): Token { return this.tokens[this.pos++]; }
  private match(...types: TokenType[]): boolean {
    return types.includes(this.peek().type);
  }
  private expect(type: TokenType, value?: string): Token {
    const t = this.consume();
    if (t.type !== type) throw new Error(`Expected ${type} but got ${t.type}("${t.value}")`);
    if (value && t.value.toUpperCase() !== value.toUpperCase()) {
      throw new Error(`Expected "${value}" but got "${t.value}"`);
    }
    return t;
  }
  private peekKeyword(kw: string): boolean {
    const t = this.peek();
    return t.type === 'KEYWORD' && t.value.toUpperCase() === kw.toUpperCase();
  }

  parse(): ParsedQuery {
    // SELECT
    this.expect('KEYWORD', 'SELECT');

    // Columns
    let columns: ColumnList = '*';
    if (this.match('STAR')) {
      this.consume();
    } else {
      const cols: string[] = [];
      cols.push(this.consume().value); // first column
      while (this.match('COMMA')) {
        this.consume(); // comma
        cols.push(this.consume().value);
      }
      columns = cols;
    }

    // FROM
    this.expect('KEYWORD', 'FROM');
    const tableName = this.consume().value.toLowerCase();

    const query: ParsedQuery = {
      type: 'SELECT',
      columns,
      table: tableName as TableName,
    };

    // Optional WHERE
    if (this.peekKeyword('WHERE')) {
      this.consume(); // WHERE
      const conditions: WhereClause[] = [];
      conditions.push(this.parseCondition());
      // Support AND-chained conditions
      while (this.peekKeyword('AND')) {
        this.consume(); // AND
        conditions.push(this.parseCondition());
      }
      query.where = conditions;
    }

    // Optional ORDER BY
    if (this.peekKeyword('ORDER')) {
      this.consume(); // ORDER
      this.expect('KEYWORD', 'BY');
      const field = this.consume().value;
      let direction: 'ASC' | 'DESC' = 'ASC';
      if (this.peekKeyword('DESC')) { this.consume(); direction = 'DESC'; }
      else if (this.peekKeyword('ASC')) { this.consume(); }
      query.orderBy = { field, direction } as OrderByClause;
    }

    // Optional LIMIT
    if (this.peekKeyword('LIMIT')) {
      this.consume(); // LIMIT
      const n = this.expect('NUMBER');
      query.limit = parseInt(n.value, 10);
    }

    return query;
  }

  private parseCondition(): WhereClause {
    const field = this.consume().value.toLowerCase();
    let operator: WhereClause['operator'] = '=';
    if (this.match('EQ'))             { this.consume(); operator = '='; }
    else if (this.match('NEQ'))       { this.consume(); operator = '!='; }
    else if (this.match('GT'))        { this.consume(); operator = '>'; }
    else if (this.match('LT'))        { this.consume(); operator = '<'; }
    else if (this.peekKeyword('LIKE')){ this.consume(); operator = 'LIKE'; }
    const valueTok = this.consume();
    return { field, operator, value: valueTok.value };
  }
}

// ── Natural language shorthand resolution ──────────────────

const NL_MAP: Record<string, string> = {
  // table shorthands
  'show projects':          'SELECT * FROM projects;',
  'show skills':            'SELECT * FROM skills;',
  'show contact':           'SELECT * FROM contact;',
  'show resume':            'SELECT * FROM contact;',
  'contact':                'SELECT * FROM contact;',
  'who is sarthak':         'SELECT * FROM about;',
  'about sarthak':          'SELECT * FROM about;',
  'about me':               'SELECT * FROM about;',
  'about':                  'SELECT * FROM about;',
  'resume':                 'SELECT * FROM contact;',
  'projects':               'SELECT * FROM projects;',
  'skills':                 'SELECT * FROM skills;',
  'select * from portfolio': 'SELECT * FROM about;',
  // domain shortcuts
  'vlsi projects':          "SELECT * FROM projects WHERE domain LIKE 'VLSI';",
  'vlsi':                   "SELECT * FROM projects WHERE domain LIKE 'VLSI';",
  'database projects':      "SELECT * FROM projects WHERE domain = 'Databases';",
  'databases':              "SELECT * FROM projects WHERE domain = 'Databases';",
  'embedded projects':      "SELECT * FROM projects WHERE domain LIKE 'TinyML';",
  'tinyml projects':        "SELECT * FROM projects WHERE domain LIKE 'TinyML';",
  'tinyml project':         "SELECT * FROM projects WHERE domain LIKE 'TinyML';",
  'ml projects':            "SELECT * FROM projects WHERE domain LIKE 'TinyML';",
  // language/tech shortcuts
  'c++ projects':           "SELECT * FROM projects WHERE technologies = 'C++17';",
  'python projects':        "SELECT * FROM projects WHERE technologies = 'Python';",
  'featured projects':      "SELECT * FROM projects WHERE featured = 'true';",
  // skills shortcuts
  'languages':              "SELECT * FROM skills WHERE category = 'Languages';",
  'embedded and iot':       "SELECT * FROM skills WHERE category = 'Embedded & IoT';",
  'tools':                  "SELECT * FROM skills WHERE category = 'Tools';",
  // sort shortcuts
  'latest projects':        'SELECT * FROM projects ORDER BY year DESC;',
  'recent projects':        'SELECT * FROM projects ORDER BY year DESC;',
  // certifications
  'certifications':         'SELECT * FROM certifications;',
  'certs':                  'SELECT * FROM certifications;',
  'show certifications':    'SELECT * FROM certifications;',
  'my certs':               'SELECT * FROM certifications;',
  'aws':                    "SELECT * FROM certifications WHERE issuer = 'Amazon Web Services';",
};

function resolveNaturalLanguage(input: string): string {
  const lower = input.trim().toLowerCase().replace(/;$/, '').trim();
  return NL_MAP[lower] ?? input;
}

// ── Public API ─────────────────────────────────────────────

export interface ParseResult {
  ok: true;
  query: ParsedQuery;
  normalized: string;
}

export interface ParseError {
  ok: false;
  message: string;
}

export function parseQuery(rawInput: string): ParseResult | ParseError {
  const resolved = resolveNaturalLanguage(rawInput);
  try {
    const tokens = tokenize(resolved);
    const parser = new Parser(tokens);
    const query = parser.parse();
    return { ok: true, query, normalized: resolved };
  } catch (e) {
    return {
      ok: false,
      message: e instanceof Error ? e.message : 'Unknown parse error',
    };
  }
}
