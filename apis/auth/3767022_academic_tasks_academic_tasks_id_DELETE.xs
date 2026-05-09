// Delete academic_tasks record.
query "academic_tasks/{academic_tasks_id}" verb=DELETE {
  api_group = "Auth"
  auth = "user"

  input {
    // ID of the academic task to delete
    int academic_tasks_id filters=min:1
  }

  stack {
    // Verify the task exists and belongs to the authenticated user
    db.query academic_tasks {
      where = $db.academic_tasks.id == $input.academic_tasks_id && $db.academic_tasks.user_id == $auth.id
      return = {type: "exists"}
    } as $task_exists
  
    // Verify task exists and belongs to authenticated user
    precondition ($task_exists) {
      error_type = "accessdenied"
      error = "Academic task not found or you do not have permission to delete it."
    }
  
    // Delete the task
    db.del academic_tasks {
      field_name = "id"
      field_value = $input.academic_tasks_id
    }
  }

  response = null
}