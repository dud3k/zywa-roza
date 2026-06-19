import Ajv2020 from "ajv/dist/2020.js";
import { readFileSync, readdirSync } from "fs";
import { resolve, dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");
const rozeDir = join(rootDir, "public", "roze");
const schemaPath = join(rootDir, "SCHEMA-roza.json");

const ajv = new Ajv2020({ allErrors: true });

const schema = JSON.parse(readFileSync(schemaPath, "utf8"));
const validate = ajv.compile(schema);

const files = readdirSync(rozeDir).filter((f) => f.endsWith(".json"));

if (files.length === 0) {
  console.log("walidacja schematu — brak róż w public/roze/ (exit 0)");
  process.exit(0);
}

let hasErrors = false;

for (const file of files) {
  const filePath = join(rozeDir, file);
  let data;

  try {
    data = JSON.parse(readFileSync(filePath, "utf8"));
  } catch (err) {
    console.error(`[${file}] BŁĄD parsowania JSON: ${err.message}`);
    hasErrors = true;
    continue;
  }

  const valid = validate(data);

  if (!valid) {
    for (const error of validate.errors) {
      const path = error.instancePath || "(root)";
      console.error(`[${file}] BŁĄD schematu: ${path} — ${error.message}`);
    }
    hasErrors = true;
    continue;
  }

  // Reguły semantyczne (JSON Schema nie wyraża unikalności/kompletności po wartości pola)

  // 1. Zbiór poz === {1..20} — każda pozycja dokładnie raz, bez luk
  const pozValues = data.osoby.map((o) => o.poz);
  const pozSet = new Set(pozValues);

  if (pozSet.size !== 20) {
    const duplicates = pozValues.filter((v, i) => pozValues.indexOf(v) !== i);
    console.error(
      `[${file}] BŁĄD semantyczny: duplikat poz [${[...new Set(duplicates)].join(", ")}]`
    );
    hasErrors = true;
    continue;
  }

  for (let i = 1; i <= 20; i++) {
    if (!pozSet.has(i)) {
      console.error(
        `[${file}] BŁĄD semantyczny: brak poz ${i} — róża nie jest kompletna (wymagane poz 1..20)`
      );
      hasErrors = true;
      break;
    }
  }

  if (hasErrors) continue;

  // 2. displayName unikalne w obrębie róży
  const displayNames = data.osoby.map((o) => o.displayName);
  const nameSet = new Set(displayNames);

  if (nameSet.size !== displayNames.length) {
    const duplicates = displayNames.filter(
      (v, i) => displayNames.indexOf(v) !== i
    );
    console.error(
      `[${file}] BŁĄD semantyczny: duplikat displayName [${[
        ...new Set(duplicates),
      ].join(", ")}]`
    );
    hasErrors = true;
    continue;
  }

  console.log(`[${file}] OK`);
}

process.exit(hasErrors ? 1 : 0);
