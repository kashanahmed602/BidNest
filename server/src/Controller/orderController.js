const Order = require('../Models/paymentModel');
const Product = require('../Models/productsModel');

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

const getUserOrders = async (req, res) => {
    try{
        const order = await Order.find({ buyerId: req.user._id }).populate('buyerId', 'name email').populate('sellerId', 'name email');

        if(!order){
            return res.status(404).json({
                success: false,
                message: 'Order Not Found'
            });
        }

        res.status(200).json({
            success: true,
            message: "Order Fetched Successfully",
            orders: order
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
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

const rateProduct = async (req, res) => {
    const { productId, message, rating } = req.body;

    try{
        if(!productId || rating === undefined || rating === null){
            return res.status(400).json({
                success: false,
                message: "Product and Rating are Required"
            });
        }

        if (rating < 1 || rating > 5){
            return res.status(400).json({
                success: false,
                message: "Rating should be > 0 and <= 5"
            });
        }

        const product = await Product.findById(productId);

        if(!product){
            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            });
        }

        const order = await Order.findOne({
            productId: productId,
            buyerId: req.user._id,
            paymentStatus: "paid",
            productStatus: "delivered"
        });

        if(!order){
            return res.status(403).json({
                success: false,
                message: "You can only review a product after purchasing and receiving it"
            });
        }

         const alreadyReviewed = product.comment.some(
      (comment) =>
        comment.userId.toString() === req.user.id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this product"
      });
    }

    // ----------------------------------------
    // 6. Add comment
    // ----------------------------------------

    product.comment.push({
      userId: req.user.id,
      message: message.trim(),
      rating: Number(rating)
    });

    // ----------------------------------------
    // 7. Calculate average rating
    // ----------------------------------------

    const totalRating = product.comment.reduce(
      (sum, comment) => sum + comment.rating,
      0
    );

    product.rating =
      totalRating / product.comment.length;

    // ----------------------------------------
    // 8. Save product
    // ----------------------------------------

    await product.save();

    // ----------------------------------------
    // 9. Response
    // ----------------------------------------

    return res.status(201).json({
      success: true,
      message: "Feedback added successfully",
      rating: product.rating,
      comment: product.comment[
        product.comment.length - 1
      ]
    });

    }catch(error){
    return res.status(500).json({
      success: false,
      message: error.message
    });
    }
}

module.exports = { getOrder, updateProductStatus, getUserOrders, rateProduct };