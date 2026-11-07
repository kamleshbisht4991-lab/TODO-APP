const mongoose = require('mongoose');
const Todo = require('../models/Todo');


/**
 * @desc Async handler to catch errors in async functions
 * @param {Function} fn - The async function to wrap
 * @returns {Function} - A new function that handles errors
 */
const asyncHandler = (fn) => {
    return async (req, res, next) => {
        return Promise.resolve(fn(req, res, next)).catch(next);
    }
}

/**
 * @desc Get all todos
 * @route GET /api/todos
 * @access Public   
 */


const getTodos = asyncHandler(async (req, res) => {
    const todos = await Todo.find().sort({ createdAt: -1 }); // newest first
    res.json(todos);
});


/**
 * @desc Create a new todo
 * @route POST /api/todos
 * @access Public   
 */
const createTodo = asyncHandler(async (req, res) => {
    const { title, discription } = req.body;
    const todo = await Todo.create({ title, discription });
    res.status(201).json(todo);
});


/**
    * @desc Update a todo
 * @route PUT /api/todos/:id
 * @access Public   
 */

const updateTodo = asyncHandler(async (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        const error = new Error("Invalid ID");
        error.status = 400;
        throw error;
    }

    const update = {}




    if (req.body.description !== undefined) update.description = req.body.description;
    if (req.body.done !== undefined) update.done = req.body.done;
    const todo = await Todo.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!todo) {
        const error = new Error("Todo not found");
        error.status = 404;
        throw error;
    }
    res.status(200).json(todo)
}

)

/**
 * @desc Delete a todo
 * @route DELETE /api/todos/:id
 * @access Public   
 */
const deleteTodo = asyncHandler(async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        const error = new Error("Invalid ID");
        error.status = 400;
        throw error;
    }

    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo()) {
        const error = new Error("Todo not found");
        error.status = 404;
        throw error;

    }
    res.status(200).json({ message: "Todo deleted successfully" })
}

)

module.exports = { getTodos, createTodo, updateTodo, deleteTodo }


