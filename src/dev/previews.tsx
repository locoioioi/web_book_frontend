import React from "react";
import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import {PaletteTree} from "./palette";
import {BookDetail} from "../layouts/product/BookDetail";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/BookDetail">
                <BookDetail/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;