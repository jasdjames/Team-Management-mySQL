INSERT INTO department (name)
VALUES 
('Human Resources'),
('Engineering'),
( 'Sales')
;


INSERT INTO role (title,salary,department_id )
values
('HR associate', 72000.52,1),
('HR INTERN', 24500.00, 1),
('Back-End Developer',100000.50,2),
('Sale Team Lead', 74500.89,3);

INSERT INTO employee (first_name, last_name,role_id, manager_id )
VALUES
('Jasmine','James',3,1),
('Robyn','Douglas',1,1),
('Jessica', 'Back',4,2),
('Kristin','Bird',2,3);