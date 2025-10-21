import { tw } from "typewind";

import { useDisclosure } from "@mantine/hooks";
import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../button";
import { Popover as PopoverComponent } from "./ui";

const meta: Meta<typeof PopoverComponent> = {
    title: "Overlays/Popover",
    component: PopoverComponent,
    argTypes: {},
    tags: ["autodocs"],
};
export default meta;

export const Popover: StoryObj<typeof PopoverComponent> = {
    render: () => {
        const [opened, { toggle, close }] = useDisclosure(false);

        return (
            <div className={tw.min_h_["480px"].relative}>
                <PopoverComponent
                    onClose={close}
                    opened={opened}
                    required={true}
                    popoverProps={{ position: "bottom-start", width: "target" }}
                >
                    <PopoverComponent.Target>
                        <Button onClick={toggle}>Click me</Button>
                    </PopoverComponent.Target>

                    <PopoverComponent.Dropdown>Контент</PopoverComponent.Dropdown>
                </PopoverComponent>
            </div>
        );
    },
};
