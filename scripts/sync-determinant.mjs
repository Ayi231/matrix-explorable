import { cpSync, mkdirSync } from 'node:fs';
mkdirSync('docs/determinant', { recursive: true });
cpSync('static/determinant', 'docs/determinant', { recursive: true });
