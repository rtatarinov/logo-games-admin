import type { Preview } from "@storybook/react";

import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { ThemeProvider } from "../src/shared/ui-kit/theme";
import "../src/index.css";

const preview: Preview = {
    decorators: [
        (Story) => (
            <ThemeProvider theme="light">
                <Story />
            </ThemeProvider>
        ),
    ],
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        viewport: {
            viewports: INITIAL_VIEWPORTS,
        },
        options: {
            storySort: {
                order: ["Overview", "Design system", "*"],
                method: "alphabetical",
            },
        },
    },
};

export default preview;
