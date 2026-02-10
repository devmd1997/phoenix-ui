import { extendTailwindMerge } from "tailwind-merge";

export const customTwMerge = extendTailwindMerge({
    extend: {
        theme: {
            font: ["heading", "body"],
            radius: ["ui-sm", "ui-md", "ui-lg"],
            spacing: ["ui-1", "ui-2", "ui-3", "ui-4", "ui-5", "ui-6", "ui-7", "ui-8", "ui-9", "ui-10", "ui-11", "ui-12"],
            text: ["h1", "h2", "h3", "h4", "h5", "h6", "body-lg", "body-md", "body-sm", "caption", "label-md", "label-sm", "label-xs"]

        }
    }
})