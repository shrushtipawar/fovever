import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import razorpay from 'razorpay'


//global varible
const currency = 'inr'
const deliveryCharge = 10


//GATEWAY initialize
const razorpayInstance = new razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET,
})



// placing order using COD method
const placeOrder = async(req,res)=>{
    try {
        const {userId,items,amount,address}=req.body;
    

        const orderData={
            userId,
            items,
            amount,
            address,
            paymentMethod:"COD",
            payment:false,
            date:Date.now()

        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()
        
        await userModel.findByIdAndUpdate(userId,{cartData:{}})

        res.json({success:true,message:"Order Placed"})


    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}


// placing order using Stripe method
const placeOrderStripe = async(req,res)=>{
    
}

// placing order using razorpay method
const placeOrderRazorpay = async(req,res)=>{
    try {
        const {userId,items,amount,address}=req.body
        const {origin}=req.headers;
        const orderData={
            userId,
            items,
            address,
            amount,
            paymentMethod:"RazorPay",
            payment:false,
            date:Date.now()
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const options = {
            amount:amount * 100,
            currency:currency.toLocaleUpperCase(),
            receipt:newOrder._id.toString()
        }

        await razorpayInstance.orders.create(options,(error,order)=>{
            if(error){
                console.log(error)
                return res.json({success:false,message:error})
            }
            res.json({success:true,order})
        })
    } catch (error) {
    console.log(error)
        res.json({success:false,message:error.message})
    }
    
}

//verify razorpay
const verifyRazorpay=async(req,res)=>{
    try {
        const {userId,razorpay_order_id}=req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        console.log(orderInfo)
        if(orderInfo.status === 'paid'){
            await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true});
            await userModel.findByIdAndUpdate(userId,{cartData:{}})
            res.json({success:true,message:"Payment Successful"})

        }else{
            res.json({success:false,message:"Payment Failed"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// all oders data for admin panel


const allOrders = async(req,res)=>{
    try {
        const orders = await orderModel.find({})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
    
}

// user order data for frontend
const userOrders = async(req,res)=>{
    try {
        const{userId} = req.body
        const orders = await orderModel.find({userId})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
    
}

//update order status from admin panel

const updateStatus = async(req,res)=>{
    try {
        const {orderId,status}= req.body
        await orderModel.findByIdAndUpdate(orderId,{status})
        res.json({success:true,message:'Status Updated'})
    } catch (error) {
         console.log(error)
        res.json({success:false,message:error.message})
    }
    
}

export{verifyRazorpay,placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus}