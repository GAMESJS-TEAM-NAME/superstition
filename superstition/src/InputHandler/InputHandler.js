class InputHandler extends EventTarget
{
    // constructor(){
    // }
    update()
    {
        
        if(keyIsPressed)
        {
            let keyPressed = key.toUpperCase();

            if(keyPressed === 'W')
                this.dispatchEvent(new Event('jump'));
                

            if(keyPressed === 'A')
                this.dispatchEvent(new Event('left'));

            if(keyPressed === 'D')
                this.dispatchEvent(new Event('right'));

            if(keyPressed === 'S')
                this.dispatchEvent(new Event('duck'));
        }
    }


}