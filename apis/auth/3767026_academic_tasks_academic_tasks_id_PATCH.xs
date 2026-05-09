// Edit academic_tasks record
query "academic_tasks/{academic_tasks_id}" verb=PATCH {
  api_group = "Auth"
  auth = "user"

  input {
    int academic_tasks_id? filters=min:1
    text title? filters=trim
    text description? filters=trim
    timestamp? due_date?
    text status? filters=trim
  }

  stack {
    // Verify the academic task belongs to the authenticated user
    db.query academic_tasks {
      where = $db.academic_tasks.id == $input.academic_tasks_id && $db.academic_tasks.user_id == $auth.id
      return = {type: "single"}
    } as $existing_task
  
    // Verify that the academic task exists and belongs to the authenticated user
    precondition (($existing_task|count) > 0) {
      error_type = "accessdenied"
      error = "You do not have permission to update this academic task."
    }
  
    util.get_raw_input {
      encoding = "json"
      exclude_middleware = false
    } as $raw_input
  
    db.patch academic_tasks {
      field_name = "id"
      field_value = $input.academic_tasks_id
      data = `$input|pick:($raw_input|keys)`
    } as $academic_tasks
  }

  response = $academic_tasks
}