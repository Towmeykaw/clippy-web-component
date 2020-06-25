import { css } from 'lit-element';
export const agentStyles = css `
    .agent {
        z-index: 999999;
        pointer-events: all;
        flex-grow: 1;
    }
    .agent-container{
        position: absolute;
        display: flex;
    }
    #Clippy {
        background: url("https://raw.githubusercontent.com/Towmeykaw/js-clippy/master/assets/agents/Clippy/clippy.png");
    }

    #Merlin {
        background: url('https://raw.githubusercontent.com/Towmeykaw/js-clippy/master/assets/agents/Merlin/merlin.png');
    }

    #Bonzi {
        background: url('https://raw.githubusercontent.com/Towmeykaw/js-clippy/master/assets/agents/Bonzi/bonzi.png');
    }

    #F1 {
        background: url('https://raw.githubusercontent.com/Towmeykaw/js-clippy/master/assets/agents/F1/f1.png');
    }
    #Genie {
        background: url('https://raw.githubusercontent.com/Towmeykaw/js-clippy/master/assets/agents/Genie/genie.png');
    }
    #Genius {
        background: url('https://raw.githubusercontent.com/Towmeykaw/js-clippy/master/assets/agents/Genius/genius.png');
    }
    #Links {
        background: url('https://raw.githubusercontent.com/Towmeykaw/js-clippy/master/assets/agents/Links/links.png');
    }
    #Peedy {
        background: url('https://raw.githubusercontent.com/Towmeykaw/js-clippy/master/assets/agents/Peedy/peedy.png');
    }
    #Rocky {
        background: url('https://raw.githubusercontent.com/Towmeykaw/js-clippy/master/assets/agents/Rocky/rocky.png');
    }
    #Rover {
        background: url('https://raw.githubusercontent.com/Towmeykaw/js-clippy/master/assets/agents/Rover/rover.png');
    }
    .clippy-content {
        max-width: 200px;
        min-width: 120px;
        font-family: "Microsoft Sans", sans-serif;
        font-size: 10pt;
    }
    .clippy-balloon {
        background: #FFC;
        border: 1px solid #a7a7a7;
        -webkit-border-radius: 4px;
                border-radius: 4px;
        -webkit-box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.2);
                box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.2);
        font-size: 1.2rem;
        line-height: 1.3;
        margin: 0 auto 20px;
        max-width: 400px;
        padding: 8px;
        position: relative;
    }

    .clippy-tip {
        border-left: 21px solid transparent;
        border-top: 20px solid rgba(0, 0, 0, 0.2);
        bottom: -25px;
        position: absolute;
        right: 85px;
    }
    .clippy-tip::before {
        border-left: 23px solid transparent;
        border-top: 23px solid #a7a7a7;
        bottom: 2px;
        content: "";
        position: absolute;
        right: 5px;
    }
    .clippy-tip::after {
        border-left: 21px solid transparent;
        border-top: 21px solid #FFC;
        bottom: 4px;
        content: "";
        position: absolute;
        right: 6px;
    }`;
//# sourceMappingURL=styles copy.js.map