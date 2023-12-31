# create-electron.ts

setup electron project template with typescript and node integration.

[![npm Package Version](https://img.shields.io/npm/v/create-electron)](https://www.npmjs.com/package/create-electron)

## Usage

You can start an electron project with `npm init`:

```bash
npm init electron.ts
```

You can use the latest version with `npx`:

```bash
npx create-electron.ts@latest
```

## Why not create-electron-app?

Unlike create-electron-app, the project setup by this starter does not depends on electron-forge nor yarn, hence it works just fine with pnpm without `shamefully-hoist` flag.

## License

This project is licensed with [BSD-2-Clause](./LICENSE)

This is free, libre, and open-source software. It comes down to four essential freedoms [[ref]](https://seirdy.one/2021/01/27/whatsapp-and-the-domestication-of-users.html#fnref:2):

- The freedom to run the program as you wish, for any purpose
- The freedom to study how the program works, and change it so it does your computing as you wish
- The freedom to redistribute copies so you can help others
- The freedom to distribute copies of your modified versions to others
