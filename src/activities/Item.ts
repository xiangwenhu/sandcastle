import * as uuid from "uuid";

class Item {
    public id: string;

    constructor() {
        this.id = uuid.v4();
    }
}

export default Item;
