import {css} from 'lit-element';

export const agentStyles = css`
    .agent {
        z-index: 999999;
        pointer-events: all;
        flex-grow: 1;
    }
    .agent-container {
        position: absolute;
        display: flex;
        flex-direction: column;
    }
    #Clippy {
        background: url('https://raw.githubusercontent.com/Towmeykaw/clippy-web-component/main/assets/agents/Clippy/clippy.png');
    }
    #Merlin {
        background: url('https://raw.githubusercontent.com/Towmeykaw/clippy-web-component/main/assets/agents/Merlin/merlin.png');
    }
    #Bonzi {
        background: url('https://raw.githubusercontent.com/Towmeykaw/clippy-web-component/main/assets/agents/Bonzi/bonzi.png');
    }
    #F1 {
        background: url('https://raw.githubusercontent.com/Towmeykaw/clippy-web-component/main/assets/agents/F1/f1.png');
    }
    #Genie {
        background: url('https://raw.githubusercontent.com/Towmeykaw/clippy-web-component/main/assets/agents/Genie/genie.png');
    }
    #Genius {
        background: url('https://raw.githubusercontent.com/Towmeykaw/clippy-web-component/main/assets/agents/Genius/genius.png');
    }
    #Links {
        background: url('https://raw.githubusercontent.com/Towmeykaw/clippy-web-component/main/assets/agents/Links/links.png');
    }
    #Peedy {
        background: url('https://raw.githubusercontent.com/Towmeykaw/clippy-web-component/main/assets/agents/Peedy/peedy.png');
    }
    #Rocky {
        background: url('https://raw.githubusercontent.com/Towmeykaw/clippy-web-component/main/assets/agents/Rocky/rocky.png');
    }
    #Rover {
        background: url('https://raw.githubusercontent.com/Towmeykaw/clippy-web-component/main/assets/agents/Rover/rover.png');
    }
`;
