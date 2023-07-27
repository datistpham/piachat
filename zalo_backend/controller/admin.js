const expressAsyncHandler = require("express-async-handler")
const Message = require("../models/Message")
const User = require("../models/User")
const moment= require("moment")
const bcrypt = require("bcrypt");

const adminController= {
    getUser: async (req, res)=> {
        try {
            const user= await User.find({}, "_id username phoneNumber email address profilePicture is_block")
            return res.status(200).json(user)

        }
        catch(e ){
            console.log(e)
            return res.status(500).json(e)
        }
    },
    updateUser: async (req, res)=> {

    },
    deleteUser: async (req, res)=> {
        try {
            const deleteUser= await User.deleteOne({_id: req.body.idUser})
            return res.status(200).json({delete: true})
        } catch (error) {
            console.log(e)
            return res.status(500).json(e)
        }
    },
    blockUser: async (req, res)=> {
        try {
            const {idUser }= req.body
            const blockUser= await User.findByIdAndUpdate(idUser, {is_block: true})
            return res.status(200).json({ok: true})
        } catch (error) {
            return res.status(500).json({ok: false, err})
        }
    },
    unblockUser: async (req, res)=> {
        try {
            const {idUser }= req.body
            const blockUser= await User.findByIdAndUpdate(idUser, {is_block: false})
            return res.status(200).json({ok: true})
        } catch (error) {
            return res.status(500).json({ok: false, err})
        }
    },
    stats: async (req, res)=> {
        try {
            const stats1= await Message.find({time_created: moment(new Date()).format("DD/MM/YYYY")})
            const stats2= await Message.find({time_created: moment(new Date()).subtract(1, "days").format("DD/MM/YYYY")})
            const stats3= await Message.find({time_created: moment(new Date()).subtract(2, "days").format("DD/MM/YYYY")})
            const stats4= await Message.find({time_created: moment(new Date()).subtract(3, "days").format("DD/MM/YYYY")})
            const stats5= await Message.find({time_created: moment(new Date()).subtract(4, "days").format("DD/MM/YYYY")})
            const stats6= await Message.find({time_created: moment(new Date()).subtract(5, "days").format("DD/MM/YYYY")})
            const stats7= await Message.find({time_created: moment(new Date()).subtract(6, "days").format("DD/MM/YYYY")})
            return res.status(200).json([{time: moment(new Date()).format("DD/MM/YYYY"), stats: stats1?.length || 0},
            {time: moment(new Date()).subtract(1, "days").format("DD/MM/YYYY"), stats: stats2?.length || 0},
            {time: moment(new Date()).subtract(2, "days").format("DD/MM/YYYY"), stats: stats3?.length || 0},
            {time: moment(new Date()).subtract(3, "days").format("DD/MM/YYYY"), stats: stats4?.length || 0},
            {time: moment(new Date()).subtract(4, "days").format("DD/MM/YYYY"), stats: stats5?.length || 0},
            {time: moment(new Date()).subtract(5, "days").format("DD/MM/YYYY"), stats: stats6?.length || 0},
            {time: moment(new Date()).subtract(6, "days").format("DD/MM/YYYY"), stats: stats7?.length || 0},])

        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
            
        }
    },
    createNewUser: expressAsyncHandler(async (req, res)=> {
        try {
            const user= req.body
            const passwordHash= await bcrypt.hash(req.body.password, 10)
            const newUser= new User({
                ...user, new_user: true, password: passwordHash
            })
            const newUserSaved= newUser.save()
            return res.status(200).json({ok: true, user: newUser})
        } catch (error) {
            return res.status(500).json({ok: false})
        }
    })
}

module.exports= adminController