import React from "react";
import SHOP_DATA from "./shop.data";
import CollectionPreview from "../../components/preview-collection/collection-preview";

class ShopPage extends React.Component{
    constructor(){
        super();

        this.state = {
            collections: SHOP_DATA
        }
    }


render() {
    const {collections} = this.state;
    return(
        <div className="shop-page">
            {
                collections.map(({id, title, items }) => (
                    <CollectionPreview key={id} title={title} items={items} />
                ))
            }
            
        </div>
    )
}
}

export default ShopPage;