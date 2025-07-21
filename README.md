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
- Enhanced output formatting and spinners for better UX
- Smart branch grouping (`feat/`, `fix/`, `release/`, etc.) with clear color-coded sections
- Interactive config setup with `gconfig`
- Fun extras like `gchill` to take a break with nerdy quotes ☕
- Easy install/uninstall via npm scoped package
- Written in TypeScript with minimal dependencies (`ora`, `execa`, etc.)

---

## Installation

Make sure you have [Node.js](https://nodejs.org/) installed.

Install globally with npm:

```bash
npm install -g @cdonet/gtools
```

---

## Usage

After installation, the following commands are available globally:

### 🔀 Branch Management

#### `gbranch`

Lists all local Git branches, grouped by type (`feat/`, `fix/`, `release/`, etc.),  
highlighting the current branch with color-coded formatting.

```bash
gbranch
```

#### `gcheck <ID>`

Checks out a local branch by task ID. For example:

```bash
gcheck 123
# → git checkout feat/GE-123-your-branch-name
```

---

### 🧹 Maintenance Commands

#### `gclean`

Deletes all local branches that have been removed from the remote.

```bash
gclean
```

#### `gfetch`

Fetches the latest changes and prunes removed remote branches.

```bash
gfetch
```

---

### 🔄 Workflow Commands

#### `gmerge <name>`

Merges `origin/release/<name>` into the current branch with `--no-commit --no-ff`.

```bash
gmerge planner
```

#### `gok`

Continues an in-progress merge after resolving conflicts.

```bash
gok
```

#### `gpull`

Pulls the latest changes from the current remote branch.

```bash
gpull
```

#### `gpush`

Pushes your commits to the remote.

```bash
gpush
```

#### `gstash [-a]`

Stashes current changes. Use `-a` to apply the most recent stash.

```bash
gstash       # Stash current changes
gstash -a    # Apply the most recent stash
```

---

### 🎛 Configuration

#### `gconfig`

Interactive or manual configuration.

```bash
gconfig                   # Launch interactive setup
gconfig get PREFIX        # Get the current value of PREFIX
gconfig set PREFIX feat/  # Set a new value
```

---

### 🧠 Extras

#### `gchill`

Prints a random funny/nerdy sentence to chill out. Because you deserve it.

```bash
gchill
```

Use `gchill --help` for usage info.

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
[LinkedIn Profile](https://www.linkedin.com/in/carlos-donet-45917396/)
[Buy Me a Coffee ☕](https://buymeacoffee.com/carlosdonet)

---

Keep coding sharp and your Git cleaner with **gtools**!
