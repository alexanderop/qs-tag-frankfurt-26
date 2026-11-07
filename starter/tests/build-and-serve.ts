import type { TestProject } from 'vitest/node'
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync, statSync } from 'node:fs'
import { createServer } from 'node:http'
import { extname, join, resolve } from 'node:path'

const starter = resolve(import.meta.dirname, '..')
const outDir = join(starter, 'tests/.dist')

const types: Record<string, string> = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.webmanifest': 'application/manifest+json',
  '.mp4': 'video/mp4',
}

declare module 'vitest' {
  export interface ProvidedContext {
    deckUrl: string
    deckDir: string
  }
}

/** Build the starter deck once and serve it like a static host (SPA fallback to index.html). */
export default async function setup(project: TestProject) {
  execFileSync('pnpm', ['exec', 'slidev', 'build', '--out', outDir], { cwd: starter, stdio: 'inherit' })

  const server = createServer((req, res) => {
    const path = decodeURIComponent(new URL(req.url ?? '/', 'http://x').pathname)
    let file = join(outDir, path)
    if (!file.startsWith(outDir) || !existsSync(file) || statSync(file).isDirectory())
      file = join(outDir, 'index.html')
    res.writeHead(200, { 'content-type': types[extname(file)] ?? 'application/octet-stream' })
    res.end(readFileSync(file))
  })
  await new Promise<void>(r => server.listen(0, '127.0.0.1', r))
  const { port } = server.address() as { port: number }

  project.provide('deckUrl', `http://127.0.0.1:${port}`)
  project.provide('deckDir', outDir)

  return () => new Promise<void>(r => server.close(() => r()))
}
