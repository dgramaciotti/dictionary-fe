# Dictionary

This is a dictionary application, meant to work fully offline. It leverages Dexie to interface with the browser IndexedDB API.

State is managed using zustand. Async DB operations are managed with reactQuery.

## Setup

1. nvm use
2. pnpm install
3. npm run dev

## Features

### Dictionary

Main feature, a dictionary of technical terms with some search capability. No full text search, as IndexedDB has no native support for that, and I'm stll planning if I want to load things into memory and use that for searching.

### Quiz

Wordle-like feature, a way to test and discover words based on the dictionary definition.

### Settings

Some admin tasks. For now allowing importing and exporting of data. Importing is currently not safety checked.
