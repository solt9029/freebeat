## FreeBeat
### Setup
```sh
cp .env.local.example .env
vi .env.local
yarn install
yarn run dev # localhost:3000
```

### Development
- Update graphql client
```sh
yarn run codegen # generates graphql/generated/graphql-client.tsx
```

### Supplement
- `codegen.yml` has been initialized with `npx graphql-codegen init` https://qiita.com/ryo2132/items/601ec3c085fcd99658e5