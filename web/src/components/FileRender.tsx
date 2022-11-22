import { File } from "../types/common";
import { Returnback } from "./ReturnBack";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { gruvboxDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { mapLangExtension } from "../utils/mapper";



interface FileRenderProps {
    file: File
}


export function FileRender({ file }: FileRenderProps) {
    return (
        <div className="flex flex-col gap-3 my-5 px-2 md:px-0">
            <Returnback />
            <FileContent {...file} />
        </div>
    )
}


function FileContent({ name, extension, content }: File) {
    const imgExtensions = ['jpg', 'png', 'jpeg', 'gif']
    return (
        <div className="flex flex-col gap-2">
            <div className="font-bold text-2xl"> {name} </div>
            {
                imgExtensions.includes(extension) ? <RenderImage src={content} /> :
                    <SyntaxHighlighter showLineNumbers={true} language={mapLangExtension(extension)} style={gruvboxDark}>
                        {content}
                    </SyntaxHighlighter>
            }
        </div>
    )
}



function RenderImage({ src }: any) {
    return <>
        <img src={src} alt="" />
    </>
}