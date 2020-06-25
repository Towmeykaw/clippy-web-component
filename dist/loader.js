export class Loader {
    async loadAgent(name) {
        return await fetch('https://raw.githubusercontent.com/Towmeykaw/clippy-web-component/main/agents/' + name + '/agent.json').then(resp => resp.json());
    }
    async loadSounds(name) {
        return await fetch('https://raw.githubusercontent.com/Towmeykaw/clippy-web-component/main/agents/' +
            name +
            '/sounds-mp3.json').then((resp) => resp.json());
    }
}
