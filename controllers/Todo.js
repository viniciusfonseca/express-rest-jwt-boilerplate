const Todo = require('../models/Todo')

module.exports = app => {

    app.get('/todos', async (req, res) => {
        const todos = await Todo.findAll({
            where: {
                userId: req.user.user_id
            }
        })
        res.send(todos)
    })
    
    app.get('/todos/:id', async (req, res) => {
        const { id } = req.params
    
        const todo = await Todo.findOne({
            where: {
                id
            }
        })
    
        if (!todo) {
            res.status(404).send()
            return
        }
    
        res.send(todo)
    })
    
    app.post('/todos', async (req, res) => {

        const newTodo = req.body

        newTodo.userId = req.user.user_id
    
        let todo = null
        try {
            todo = await Todo.create(newTodo)
        }
        catch (e) {
            res.status(400).send()
            return
        }
    
        res.send(todo)
    })
    
    app.put('/todos/:id', async (req, res) => {
        const updatedTodo = req.body
        const { id } = req.params
    
        const todo = await Todo.findOne({ where: { id } })
    
        if (!todo) {
            res.status(400).send()
            return
        }
    
        try {
            await todo.update(updatedTodo)
        }
        catch(e) {
            res.status(400).send()
            return
        }
    
        res.status(200).send()
    })
    
    app.delete('/todos', async (req, res) => {
        const destroyed = await Todo.destroy({ where: {} })
    
        res.status(destroyed > 0 ? 200 : 400).send()    
    })
    
    app.delete('/todos/:id', async (req, res) => {
        const { id } = req.params
    
        const destroyed = await Todo.destroy({
            where: {
                id
            }
        })
    
        res.status(destroyed > 0 ? 200 : 400).send()
    })
}
