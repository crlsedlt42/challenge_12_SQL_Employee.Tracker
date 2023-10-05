INSERT INTO department (name) 
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal'),
    ('Human Resources');


INSERT INTO role (title, salary, department_id) 
VALUES
    ('Sales Lead', 100000.00, 1),
    ('Salesperson', 80000.00, 1),
    ('Lead Engineer', 150000.00, 2),
    ('Software Engineer', 120000.00, 2),
    ('Accountant', 125000.00, 3),
    ('Legal Team Lead', 250000.00, 4),
    ('Lawyer', 190000.00, 4),
    ('HR Lead', 140000.00, 5),
    ('HR Representative', 65000.00, 5);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, NULL),
    ('Mike', 'Chan', 2, 1),
    ('Ashley', 'Rodriguez', 3, NULL),
    ('Kevin', 'Tupik', 4, 3),
    ('Malia', 'Brown', 5, NULL),
    ('Sarah', 'Lourd', 6, 5),
    ('Tom', 'Allen', 7, NULL),
    ('Sam', 'Carter', 8, 7),
    ('Suzie', 'Smith', 9, 7);