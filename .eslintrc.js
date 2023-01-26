module.exports = {
    extends: [
      '@nuxtjs/eslint-config',
    ],
    overrides: [
        {
          files: ['*.ts', '*.tsx'],
          extends: [
            '@nuxtjs/eslint-config-typescript',
          ],
        }
    ]
}