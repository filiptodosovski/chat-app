module.exports = {
  'apps/cms/src/**/*.{js,ts,jsx,tsx}': (files) => [
    `yarn workspace cms lint --max-warnings=0 --file ${files
      .map((file) => `"${file.split('apps/cms/').pop()}"`)
      .join(' --file ')}`,
  ],
  'apps/api/src/**/*.{js,ts,jsx,tsx}': (files) => [
    `yarn workspace api lint --max-warnings=0 ${files
      .map((file) => `"${file.split('apps/api/').pop()}"`)
      .join(' ')}`,
  ],
}
