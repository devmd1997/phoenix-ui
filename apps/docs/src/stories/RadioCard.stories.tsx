import {
  RadioCard,
  type RadioCardContainerSize,
  type RadioCardContainerVariant,
} from "@phoenix-ui/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";

const sizeOptions: RadioCardContainerSize[] = ["sm", "md", "lg"];
const variantOptions: RadioCardContainerVariant[] = [
  "solid",
  "subtle",
  "outline",
  "surface",
];
const noop = () => undefined;

const baseArgs = {
  id: "email",
  label: "Email notifications",
  description: "Get product updates and account alerts in your inbox.",
  selected: false,
  size: "md" as const,
  variant: "outline" as const,
  radioIndicator: true,
  icon: "bell" as const,
  responsive: { lg: "md" as const },
  onClick: noop,
};

const meta = {
  title: "Forms/RadioCard",
  component: RadioCard,
  tags: ["autodocs"],
  argTypes: {
    id: { control: "text" },
    label: { control: "text" },
    description: { control: "text" },
    selected: { control: "boolean" },
    size: { control: { type: "select" }, options: sizeOptions },
    variant: { control: { type: "select" }, options: variantOptions },
    radioIndicator: { control: "boolean" },
    align: {
      control: { type: "select" },
      options: ["start", "center", "end"],
    },
    direction: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
    },
  },
  parameters: {
    controls: { expanded: true },
  },
  args: {
    ...baseArgs,
  },
  render: ({ id, selected, onClick, ...args }) => {
    const [selectedId, setSelectedId] = useState<string>(selected ? id : "");

    useEffect(() => {
      setSelectedId(selected ? id : "");
    }, [id, selected]);

    return (
      <div className="ui:w-full ui:max-w-xl">
        <RadioCard
          {...args}
          id={id}
          selected={selectedId === id}
          onClick={(nextId) => {
            setSelectedId(nextId);
            onClick?.(nextId);
          }}
        />
      </div>
    );
  },
} satisfies Meta<typeof RadioCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    ...baseArgs,
  },
};

export const Variants: Story = {
  render: () => {
    const [selected, setSelected] = useState("outline");

    return (
      <div className="ui:grid ui:grid-cols-1 ui:gap-4 ui:w-full ui:max-w-2xl">
        {variantOptions.map((variant) => (
          <RadioCard
            key={variant}
            id={variant}
            label={`${variant} card`}
            description={`Variant coverage for ${variant}.`}
            selected={selected === variant}
            size="md"
            variant={variant}
            icon="bell"
            radioIndicator
            onClick={setSelected}
            responsive={{ lg: "md" }}
          />
        ))}
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [selected, setSelected] = useState("md");

    return (
      <div className="ui:grid ui:grid-cols-1 ui:gap-4 ui:w-full ui:max-w-2xl">
        {sizeOptions.map((size) => (
          <RadioCard
            key={size}
            id={size}
            label={`Size ${size}`}
            description={`Radio card using the ${size} spacing scale.`}
            selected={selected === size}
            size={size}
            variant="outline"
            icon="checkmark"
            radioIndicator
            onClick={setSelected}
            responsive={{ lg: size }}
          />
        ))}
      </div>
    );
  },
};

export const GroupSelectionExample: Story = {
  render: () => {
    const [selected, setSelected] = useState("email");
    const options = [
      {
        id: "email",
        icon: "bell" as const,
        label: "Email",
        description: "Best for weekly digests and account updates.",
      },
      {
        id: "sms",
        icon: "user" as const,
        label: "SMS",
        description: "Good for urgent alerts and verification codes.",
      },
      {
        id: "push",
        icon: "home" as const,
        label: "Push",
        description: "Ideal for mobile-first real-time notifications.",
      },
    ];

    return (
      <div className="ui:grid ui:grid-cols-1 ui:gap-3 ui:w-full ui:max-w-xl">
        {options.map((option) => (
          <RadioCard
            key={option.id}
            id={option.id}
            icon={option.icon}
            label={option.label}
            description={option.description}
            selected={selected === option.id}
            size="md"
            variant="outline"
            radioIndicator
            onClick={setSelected}
            responsive={{ lg: "md" }}
          />
        ))}
      </div>
    );
  },
};

export const LongContent: Story = {
  args: {
    ...baseArgs,
    id: "long-content",
    label:
      "Notify me when production incidents, billing changes, and security events affect my workspace",
    description:
      "This edge case covers longer copy so the card layout can be reviewed for wrapping, spacing rhythm, and indicator alignment across multiple lines.",
    selected: true,
  },
};
