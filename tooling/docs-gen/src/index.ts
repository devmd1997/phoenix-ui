import fg from "fast-glob";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

type CVAVariants = Record<string, Record<string, string>>;

function findCvaVariants(source: string): CVAVariants | null {
  // Very pragmatic extraction:
  // finds "variants: { ... }" block inside cva(, { ... })
  const m = source.match(/variants\s*:\s*({[\s\S]*?})\s*,\s*defaultVariants\s*:/);
  if (!m) return null;

  const variantsObjText = m[1];

  // Convert to JSON-ish by quoting keys where safe is hard; we’ll eval in a sandboxed Function.
  // Since this is your own repo code, this is acceptable for internal tooling.
  // IMPORTANT: this assumes the variants object is pure data (strings/booleans) and no identifiers.
  try {
    // wrap in parentheses so it's an expression
    const obj = new Function(`return (${variantsObjText});`)() as CVAVariants;
    return obj;
  } catch {
    return null;
  }
}

function pascalToTitle(name: string) {
  return name.replace(/([a-z])([A-Z])/g, "$1 $2");
}

function storyTemplate(opts: {
  componentName: string;
  importPath: string;
  variants: CVAVariants;
}) {
  const { componentName, importPath, variants } = opts;
  const variantNames = Object.keys(variants.variant ?? {});
  const toneNames = Object.keys(variants.tone ?? {});

  const hasTone = toneNames.length > 0;
  const hasVariant = variantNames.length > 0;

  const rows = hasVariant
    ? variantNames
        .map(
          (v) =>
            `<div className="ui:flex ui:flex-col ui:gap-2 ui:p-4 ui:border ui:border-ui-border ui:rounded-md">
  <div className="ui:text-body-sm ui:text-ui-fg-muted">${v}</div>
  <${componentName} variant="${v}"${hasTone ? ` tone="default"` : ""}>
    Phoenix UI Text
  </${componentName}>
</div>`
        )
        .join("\n")
    : `<${componentName}${hasTone ? ` tone="default"` : ""}>Phoenix UI Text</${componentName}>`;

  const tonesGrid = hasTone
    ? toneNames
        .map(
          (t) =>
            `<div className="ui:flex ui:flex-col ui:gap-2 ui:p-4 ui:border ui:border-ui-border ui:rounded-md">
  <div className="ui:text-body-sm ui:text-ui-fg-muted">${t}</div>
  <${componentName}${hasVariant ? ` variant="body-md"` : ""} tone="${t}">
    Phoenix UI Text
  </${componentName}>
</div>`
        )
        .join("\n")
    : "";

  return `import type { Meta, StoryObj } from "@storybook/react-vite";
import { ${componentName} } from "${importPath}";

const meta: Meta<typeof ${componentName}> = {
  title: "${pascalToTitle(componentName)}/${componentName}",
  component: ${componentName},
  tags: ["autodocs"],
  parameters: {
    controls: { expanded: true }
  }
};

export default meta;
type Story = StoryObj<typeof ${componentName}>;

export const Playground: Story = {
  args: {
    ${hasVariant ? `variant: "body-md",` : ""}
    ${hasTone ? `tone: "default",` : ""}
    truncate: false,
    uppercase: false
  }
};

export const Variants: Story = {
  render: () => (
    <div className="ui:grid ui:grid-cols-1 md:ui:grid-cols-2 ui:gap-4">
      ${rows}
    </div>
  )
};

${hasTone ? `export const Tones: Story = {
  render: () => (
    <div className="ui:grid ui:grid-cols-1 md:ui:grid-cols-2 ui:gap-4">
      ${tonesGrid}
    </div>
  )
};` : ""}

export const WithLongText: Story = {
  render: () => (
    <div className="ui:w-[240px] ui:border ui:border-ui-border ui:p-3 ui:rounded-md">
      <${componentName}${hasVariant ? ` variant="body-sm"` : ""} truncate>
        This is a very long line of text that should truncate with an ellipsis in a narrow container.
      </${componentName}>
    </div>
  )
};
`;
}

function guideTemplate(opts: { componentName: string }) {
  const { componentName } = opts;
  return `import { Meta, Canvas } from "@storybook/blocks";
import { ${componentName} } from "@phoenix-ui/ui";
import DocChecklist from "../docs/DocChecklist.mdx";

<Meta title="Guides/${componentName}" of={${componentName}} />

# ${componentName}

> **Phoenix UI principle:** rebirth through clarity — typography should feel warm, crisp, and structured.

## When to use
- TODO (AI): Describe where this component shines.

## Accessibility
- TODO (AI): Add a11y notes.

## Examples
<Canvas of={${componentName}} />

<DocChecklist />
`;
}

async function main() {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const uiRoot = path.resolve(__dirname, "../../../packages/ui/src");
  const docsRoot = path.resolve(__dirname, "../../../apps/docs/src");

  const componentFiles = await fg(["components/**/Text.tsx", "components/**/Text.ts"], {
    cwd: uiRoot,
    absolute: true,
  });
  console.log(uiRoot)
  console.log(`Found ${componentFiles.length} components to generate docs for.`)

  for (const file of componentFiles) {
    const source = fs.readFileSync(file, "utf8");
    const variants = findCvaVariants(source);
    if (!variants) continue;

    const componentName = "Text";
    const storiesOutDir = path.join(docsRoot, "stories");
    const guidesOutDir = path.join(docsRoot, "guides");

    fs.mkdirSync(storiesOutDir, { recursive: true });
    fs.mkdirSync(guidesOutDir, { recursive: true });

    const storyOut = path.join(storiesOutDir, `${componentName}.stories.tsx`);
    const guideOut = path.join(guidesOutDir, `${componentName}.mdx`);

    console.log(`Generating docs for ${componentName}...`)
    console.log(`Writing to ${storyOut} and ${guideOut}`)
    fs.writeFileSync(
      storyOut,
      storyTemplate({ componentName, importPath: "@phoenix-ui/ui", variants }),
      "utf8"
    );
    fs.writeFileSync(guideOut, guideTemplate({ componentName }), "utf8");
  }

  console.log("Docs generated.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
