# @cdonet/gtools

> 🚀 **gtools** is a sleek, lightweight CLI toolkit that simplifies and humanizes your everyday Git commands.  
> Think of it as your Git command shorthand, making your workflow faster, clearer, and more enjoyable.

---

## Why gtools?

Git commands are powerful but often verbose and sometimes hard to remember.  
**gtools** offers friendly, short commands — like `gbranch` — that run your usual Git operations,  
but with improved, clean, human-readable outputs designed for developers who want clarity without complexity.

---

## Features

- Intuitive short commands wrapping common Git operations
- Enhanced output formatting for better readability
- Smart branch grouping (`feat/`, `fix/`, `release/`, etc.) with clear color-coded sections
- Easy install/uninstall via npm scoped package
- Written in TypeScript with zero dependencies outside the essential

---

## Installation

Make sure you have [Node.js](https://nodejs.org/) installed.

Install globally with npm:

```bash
npm install -g @cdonet/gtools
```

---

## Usage

After installation, you can run:

```bash
gbranch
```

This command lists your local Git branches, grouped by purpose (`feat/`, `fix/`, `release/`, etc.),  
highlighting the current branch in a clean, easy-to-read format.

---

## Development & Contribution

Want to contribute or customize?

1. Clone the repo
2. Install dependencies: `npm install`
3. Build: `npm run build`
4. Run commands locally with: `node ./bin/gbranch.js`
5. Feel free to open issues or submit pull requests!

---

## License

MIT License © Carlos Donet

---

## Contact

Made with ❤️ by Carlos Donet  
[GitHub Profile](https://github.com/CarlosDonet-dev)

---

Keep coding sharp and your Git cleaner with **gtools**!
