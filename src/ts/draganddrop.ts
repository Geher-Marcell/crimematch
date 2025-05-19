export default{
    dragstartHandler(ev: any) {
        ev.dataTransfer.setData("text", ev.target.id);
    },
    dragoverHandler(ev:any) {
        ev.preventDefault();
    },
    dropHandler(ev: any) {
        ev.preventDefault();
        const data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
    }
}