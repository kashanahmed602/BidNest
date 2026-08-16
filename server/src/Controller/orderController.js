const Order = require('../Models/paymentModel');


const getOrder = async (req, res) => {
    try {
        const order = await Order.find({ sellerId: req.user._id }).populate('sellerId', 'name email').populate('buyerId', 'name email');

        if(!order){
            return res.status(404).json({
                success: false,
                message: "No Products Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product Found Successfully",
            orders: order
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }

};

const updateProductStatus = async (req, res) => {
    const { id } = req.params;
    const { productStatus } = req.body;
    try{
        
        const orderStatus = await Order.findByIdAndUpdate(id,
            { productStatus: productStatus },
            { new: true }
        )

        if(!orderStatus){
            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product Updated Successfully"
        })

    }catch(error){
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

module.exports = { getOrder, updateProductStatus };