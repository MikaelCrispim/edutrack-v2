// Query all academic_tasks records
query academic_tasks verb=GET {
  api_group = "Auth"
  auth = "user"

  input {
  }

  stack {
    db.query academic_tasks {
      where = $db.academic_tasks.user_id == $auth.id
      return = {type: "list"}
    } as $academic_tasks
  }

  response = $academic_tasks
}