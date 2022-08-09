import Room from '../models/romm'

import ErrorHandler from '../utils/errorHandler'
import catchAsyncErrors from  '../middlewares/catchAsyncErrors'
import APIFeatures from '../utils/apiFeatures'

// Create all rooms  =>  /api/rooms
const allRooms = catchAsyncErrors(async (req, res) => {

    const resPerPage = 4
    const roomsCount = await Room.countDocuments()

    const apiFeatures = new APIFeatures(Room.find(), req.query).search().filter()

    let rooms = await apiFeatures.query
    let filteredRoomsCount = rooms.lenght

    apiFeatures.pagination(resPerPage)
    rooms = await apiFeatures.query

    res.status(200).json({
        success: true,
        roomsCount,
        resPerPage,
        filteredRoomsCount,
        rooms
    })

})


// Create new room  =>  /api/rooms