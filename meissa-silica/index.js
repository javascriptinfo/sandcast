
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

const editor = monaco.editor.create(document.getElementById('container'), {
    value: 'console.log("Hello, sandcast!")',
    language: 'javascript'
});

window.talk = function talk(data) {    
    var current = editor.getValue();
    console.log("writing:", current + data);
    editor.setValue(current + data);
}