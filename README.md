# Endpoints

# Auth
route | data | returns
------|------|--------
**POST** /auth/register | { username, password } | { uuid, username, token }
**POST** /auth/login | { username, password } | { uuid, username, token }

# Todo
route | data | returns
------|------|--------
**GET** /todo/ | { } | { todo: 'route and authentication works' }
**GET** /todo/fetch/:id | {  } | [{ (users todo's by uuid) }]
**POST** /todo/add | { uuid, title, body, due_date, recurring, (optional) location = { x, y } } | { { todo added}, location_id }
**POST** /todo/edit/:id | (all optional) { title, body, due_date, completed, recurring } | { edited todo }
**DELETE** /todo/remove/:id | { } | number of records deleted