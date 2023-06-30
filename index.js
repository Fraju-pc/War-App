function doSomething(x, y){
    if (typeof x != 'string') {
        throw new Error('X must be a string');
    }
    return x + y;
}
