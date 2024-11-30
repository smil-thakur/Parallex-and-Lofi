export function loadSprite(path) {
    return new Promise((res, rej) => {
        const img = new Image();
        img.src = path;
        img.onload = () => res(img);
        img.onerror = (err) => rej(err);
    });
}
export function makeSprite(context, sprite, pos, scale = 1) {
    const tempSprite = {
        width: sprite.width,
        height: sprite.height,
        pos: pos,
        scale: scale,
        draw() {
            context.drawImage(sprite, this.pos.x, this.pos.y, this.width * scale, this.height * scale);
        }
    };
    return tempSprite;
}
export function makeLayer(context, sprite, pos, scale = 1) {
    const layer = {
        head: makeSprite(context, sprite, pos, scale),
        tail: makeSprite(context, sprite, { x: pos.x + sprite.width * scale, y: pos.y }, scale)
    };
    return layer;
}
export function makeInfiniteScroll(dt, layer, speed) {
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
//# sourceMappingURL=utils.js.map