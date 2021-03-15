module.exports = {
    files: [ "src/**/*" ],
    extensions: [".js",".jsx",".ts",".tsx"],
    env: {
        node: true
    },
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
      '@typescript-eslint',
    ],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier'
    ], 
}