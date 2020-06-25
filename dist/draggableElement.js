export class DraggableElement {
    constructor() {
        this.mouseDown = false;
        this.dragMouseDown = (e) => {
            e.preventDefault();
            // get the mouse cursor position at startup:
            this.pos3 = e.clientX;
            this.pos4 = e.clientY;
            this.mouseDown = true;
        };
        this.elementDrag = (e) => {
            e.preventDefault();
            if (this.mouseDown && this.draggableElement) {
                // calculate the new cursor position:
                this.pos1 = this.pos3 - e.clientX;
                this.pos2 = this.pos4 - e.clientY;
                this.pos3 = e.clientX;
                this.pos4 = e.clientY;
                // set the element's new position:
                this.draggableElement.style.top = (this.draggableElement.offsetTop - this.pos2) + 'px';
                this.draggableElement.style.left = (this.draggableElement.offsetLeft - this.pos1) + 'px';
            }
        };
        this.closeDragElement = () => {
            // stop moving when mouse button is released:
            this.mouseDown = false;
        };
        this.pos1 = this.pos2 = this.pos3 = this.pos4 = 0;
        this.draggableElement = document.getElementById('clippy-agent');
        if (this.draggableElement) {
            this.draggableElement.onmousedown = this.dragMouseDown;
            this.draggableElement.onmousemove = this.elementDrag;
            document.onmouseup = this.closeDragElement;
        }
    }
}
//# sourceMappingURL=draggableElement.js.map