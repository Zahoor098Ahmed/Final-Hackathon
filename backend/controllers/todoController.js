const Todo = require('../models/Todo');

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id });
    res.status(200).json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

exports.createTodo = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) return res.status(400).json({ message: 'Text is required' });

    const newTodo = await Todo.create({ user: req.user.id, text });
    res.status(201).json(newTodo);
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, completed } = req.body;

    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { text, completed },
      { new: true }
    );

    if (!updatedTodo) return res.status(404).json({ message: 'Todo not found' });

    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTodo = await Todo.findOneAndDelete({ _id: id, user: req.user.id });

    if (!deletedTodo) return res.status(404).json({ message: 'Todo not found' });

    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
};
