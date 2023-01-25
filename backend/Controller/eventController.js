const ObjectId = require("bson").ObjectId;
const Event = require("../Model/eventModel");
const Login = require("../Model/loginModel");

const getEvents = async (req, res) => {
    try {
        const id = new ObjectId(req.user.id.trim());
        const data = await Event.find({ user: id }).populate("user").exec();
        res.status(200).json({
            status: "succeeded",
            data,
            error: null,
        });


    } catch (error) {
        res.status(500).json({
            status: "failed",
            data: null,
            error: error.message,
        });
    }
};

const createEvent = async (req, res) => {
    try {
        const { title, start, end, allDay } = req.body;
        const user = new ObjectId(req.user.id);
        const newEvent = new Event({
            title,
            start,
            end,
            allDay,
            user,
        });
        const event = await newEvent.save();
        res.status(200).json(event);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

const updateEvent = async (req, res) => {
    try {
        const { title, start, end, allDay } = req.body;
        const event = await Event.findById(req.params.id);
        if (event.user.toString() !== req.user) {
            return res.status(403).json("No tienes permiso para editar este evento");
        }
        event.title = title;
        event.start = start;
        event.end = end;
        event.allDay = allDay;
        await event.save();
        res.status(200).json(event);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (event.user.toString() !== req.user) {
            return res
                .status(403)
                .json("No tienes permiso para eliminar este evento");
        }
        await event.remove();
        res.status(200).json("Evento eliminado");
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
};