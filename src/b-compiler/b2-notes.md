• What happened to type Time in the .js file?
Types are erased from the .js; with declaration: true they’re also written to the .d.ts

• What is in the .d.ts file, and who would use it?
Signatures and types without bodies. Used by the TS compiler and editor of anyone who imports the compiled .js.

• Why does the build exclude the test files?
Tests are only for development. Users of the build never run them, and the compiled tests would import vitest, a dev dependency they don’t have installed.

• What does extends save you from repeating?
extends reuses the base tsconfig.json, so the build config only lists what’s different. Change a setting once in the base and every config follows.