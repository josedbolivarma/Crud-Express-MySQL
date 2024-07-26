import { pool } from "../db.js";

const getEmployees = async (req, res) => {
    const response = await pool.query('SELECT * FROM employee');
    res.json(response[0]);
}

const createEmployees = async (req, res) => {
    const {name, salary} = req.body;
    const [rows] = await pool.query('INSERT INTO employee (name, salary) VALUES (?, ?)',
        [name, salary]
    );
    res.json({
        id: rows.insertId,
        name,
        salary
    });
};

const updateEmployees = async (req, res) => {
    const id = req.params.id;
    const {name, salary} = req.body;

    const response = await pool.query('UPDATE employee SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?',
        [name, salary, id]
    );

    if (response.affectedRows <= 0) return res.status(404).json({
        message: 'Employee not found'
    });

    const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [id]);

    res.json(rows);
};

const deleteEmployees = async (req, res) => {
    const id = req.params.id;
    const [rows] = await pool.query('DELETE FROM employee WHERE id = ?',
        [id]
    );

    if (rows.affectedRows <= 0) return res.status(404).json({
        message: 'Employee not found'
    });

    res.sendStatus(204);
};

export {
    getEmployees,
    createEmployees,
    updateEmployees,
    deleteEmployees
}