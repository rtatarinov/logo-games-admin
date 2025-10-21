import { useDisclosure } from "@mantine/hooks";
import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../button";
import type { ModalProps } from "./ui";
import { Modal as ModalComponent } from "./ui";

const meta: Meta<typeof ModalComponent> = {
    title: "Overlays/Modal",
    component: ModalComponent,
    tags: ["autodocs"],
};

export default meta;

export const Modal: StoryObj<ModalProps> = {
    render: () => {
        const [opened, { open, close }] = useDisclosure();

        return (
            <div>
                <Button onClick={open}>Open modal</Button>

                <ModalComponent
                    opened={opened}
                    onClose={close}
                    title="Детали события “Ввод препарата”"
                >
                    Modal content
                </ModalComponent>
            </div>
        );
    },
};
