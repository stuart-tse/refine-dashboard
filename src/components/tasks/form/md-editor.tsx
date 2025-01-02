declare module "@uiw/react-md-editor" {
    import * as React from "react";

    const MDEditor: React.FC<{
        value?: string;
        onChange?: (value: string) => void;
        preview?: "edit" | "live" | "preview";
        height?: number;
        DataColorMode?: "light" | "dark";
    }>;
    export default MDEditor;
}