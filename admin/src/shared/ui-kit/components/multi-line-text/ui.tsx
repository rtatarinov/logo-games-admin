import { Fragment } from "react";

export interface MultiLineTextProps {
    text: string;
    skipEmpty?: boolean;
}

export const MultiLineText = ({ text, skipEmpty = true }: MultiLineTextProps) => {
    const lines = text.split("\n").filter((line) => !skipEmpty || line.trim() !== "");

    return (
        <>
            {lines.map((line, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <Fragment key={i}>
                    {i !== 0 && <br />}
                    {line}
                </Fragment>
            ))}
        </>
    );
};
