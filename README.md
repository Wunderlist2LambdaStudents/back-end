#Endpoints

#Auth
route|data|return
POST /auth/register|{ username, password }|{ uuid, username, token }
POST /auth/login|{ username, password }|{ uuid, username, token }

#Todo
route|data|return
GET /todo/|{ }|{ todo: 'route and authentication works' }
GET /todo/:id|{  }|[{ (users todo's by uuid) }]
POST /todo/add|{ uuid, title, body, due_date, recurring, (optional) location = { x, y } }|{ { todo added}, location_id }