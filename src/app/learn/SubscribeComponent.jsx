'use client';
import {Button} from "@mui/material";

const SubscribeComponent = ({priceId, price, description}) => {

    return (
        <div>
            Click Below button to get {description}
            <Button href={"https://buy.stripe.com/test_eVaeWOb6Ce1f4iQ8ww"}>
                Upgrade to {price}
            </Button>
        </div>
    );
};
export default SubscribeComponent;