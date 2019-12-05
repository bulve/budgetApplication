import * as React from 'react'

export interface DrawState {
    height: string
    width: string
    mouseDown: boolean
}

export class DrawLayout extends React.Component<{}, DrawState> {
    constructor(props: {}){
        super(props)
        this.state = {
            height: '5',
            width: '5',
            mouseDown: false
        }
    }

    public mouseDown = (event: any) => {
        this.setState({mouseDown: true})
        this.drawOnWindow(event)
    }

    public mouseUp = (event: any) => {
        this.setState({mouseDown: false})
    }

    public mouseMove = (event: any) => {
        if(this.state.mouseDown){
            this.drawOnWindow(event)
        }
    }

    public drawOnWindow = (event: any) => {
        const div: HTMLDivElement = document.createElement("div");
            const drawDiv = document.getElementsByClassName("drawDiv")[0]
            const drawDivPosition = drawDiv.getBoundingClientRect();
            div.style.backgroundColor = 'red'
            div.style.height = this.state.height + 'px';
            div.style.width = this.state.width + 'px';
            div.style.position = 'fixed'
            div.style.left = event.clientX + "px"
            div.style.top = event.clientY + "px"
            if(event.clientX >= drawDivPosition.right - parseInt(this.state.height, 2) - 1){
                console.log("passing right") 
                div.style.left = drawDivPosition.right - parseInt(this.state.height, 2) + "px"
            }
            if(event.clientY > drawDivPosition.bottom - parseInt(this.state.width, 2) - 1){
                console.log("passing bottom")
                div.style.top = drawDivPosition.bottom - parseInt(this.state.width, 2) + "px"
            }
            drawDiv.appendChild(div)
    }

    public changeHeight = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            height: event.currentTarget.value
        })
    }

    public changeWidth = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            width: event.currentTarget.value
        })
    }
    
    public clearWindow = () => {
        const drawDiv = document.getElementsByClassName("drawDiv")[0];
        while(drawDiv.firstChild){
            drawDiv.removeChild(drawDiv.firstChild)
        }
    }

    public render() {
        return (<div>
                    <div 
                    onMouseMove={this.mouseMove}
                    onMouseDown={this.mouseDown} 
                    onMouseUp={this.mouseUp} 
                    className='drawDiv' 
                    style={{height: '500px', width:'500px', border: 'solid black 1px', margin: '20px'}}
                    />
                    Point height: <input type="number" value={this.state.height} onChange={this.changeHeight}/> 
                    Point width: <input type="number" value={this.state.width} onChange={this.changeWidth}/> 
                    <button onClick={this.clearWindow}>Clear window</button>
                </div>)
    }
}