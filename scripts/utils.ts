export function loadSprite(path: string): Promise<HTMLImageElement> {
    return new Promise((res, rej) => {
        const img = new Image();
        img.src = path;
        img.onload = () => res(img);
        img.onerror = (err) => rej(err);
    })
}

export interface Pos {
    x: number,
    y: number
}

export interface Sprite {
    width: number,
    height: number,
    pos: Pos,
    draw: Function,
    scale: number,
}

export function makeSprite(context: CanvasRenderingContext2D, sprite: HTMLImageElement, pos: Pos, scale = 1) {
    const tempSprite: Sprite = {
        width: sprite.width,
        height: sprite.height,
        pos: pos,
        scale: scale,
        draw() {
            context.drawImage(
                sprite,
                this.pos.x,
                this.pos.y,
                this.width * scale,
                this.height * scale
            )
        }
    }
    return tempSprite;
}

export interface Layer {
    head: Sprite,
    tail: Sprite
}

export function makeLayer(context: CanvasRenderingContext2D, sprite: HTMLImageElement, pos: Pos, scale = 1) {
    const layer: Layer = {
        head: makeSprite(context, sprite, pos, scale),
        tail: makeSprite(context, sprite, { x: pos.x + sprite.width * scale, y: pos.y }, scale)
    }

    return layer;
}

export function makeInfiniteScroll(dt: number, layer: Layer, speed: number) {
    if (layer.head.pos.x + layer.head.width * layer.head.scale < 0) {
        layer.head.pos.x = layer.tail.pos.x + layer.tail.width * layer.tail.scale;
    }

    if (layer.tail.pos.x + layer.tail.width * layer.head.scale < 0) {
        layer.tail.pos.x = layer.head.pos.x + layer.head.width * layer.tail.scale;
    }

    layer.head.pos.x += speed * dt;
    layer.head.draw();
    layer.tail.pos.x += speed * dt;
    layer.tail.draw();
}