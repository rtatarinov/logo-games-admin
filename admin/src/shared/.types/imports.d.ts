declare module "*?url" { // URL imports as strings
    const content: string;

    export default content;
}

declare module "*.svg" { // SVG imports as components
    const content: React.FunctionComponent<React.SVGAttributes<SVGSVGElement>>;

    export default content;
}
