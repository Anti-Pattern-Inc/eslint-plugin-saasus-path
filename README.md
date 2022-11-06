# eslint-plugin-saasus-path

Next.jsプロジェクトのディレクトリ名の命名規則をチェックするESLintプラグイン

## インストール手法

```
yarn add --dev @anti-pattern-inc/eslint-plugin-saasus-path
# or npm install --save-dev @anti-pattern-inc/eslint-plugin-saasus-path
```

## Rules

ドメイン（例 src/domain, src/content）直下のフォルダ名をページ（pages）で使われている名前と同じかどうかを判定する。

```json
{
  "plugins": [
    "@anti-pattern-inc/saasus-path"
  ],
  "rules": {
    "@anti-pattern-inc/saasus-path/saasus-path": [2, { "rootDir": "src" }],
  }
}
```

もしとあるドメインをページ（pages）への検査対象から除外したい場合は`ignoreDomainNames`に追加する。

```json
{
  "plugins": [
    "@anti-pattern-inc/saasus-path"
  ],
  "rules": {
    "@anti-pattern-inc/saasus-path/saasus-path": [2, {
      "rootDir": "src",  "ignoreDomainNames": ["apikeys"]
    }],
  }
}
```
