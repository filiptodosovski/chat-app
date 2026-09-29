module.exports = {
  'apps/api/src/**/*.{js,ts,jsx,tsx}': (files) => [
    `pnpm --filter api lint --max-warnings=0 ${files
      .map((file) => `"${file.split('apps/api/').pop()}"`)
      .join(' ')}`,
  ],
}
