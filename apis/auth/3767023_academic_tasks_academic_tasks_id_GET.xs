// Get academic_tasks record
// Retrieve a specific academic task by ID, ensuring it belongs to the authenticated user
query "academic_tasks/{academic_tasks_id}" verb=GET {
  api_group = "Auth"
  auth = "user"

  input {
    // ID of the academic task to retrieve
    int academic_tasks_id filters=min:1
  }

  stack {
    db.query academic_tasks {
      join = {
        subjects: {
          table: "subjects"
          where: $db.academic_tasks.subject_id == $db.subjects.id
        }
      }
    
      where = $db.academic_tasks.id == $input.academic_tasks_id && $db.subjects.user_id == $auth.id
      return = {type: "single"}
    } as $academic_tasks
  
    precondition ($academic_tasks != null) {
      error_type = "notfound"
      error = "Academic task not found or does not belong to the authenticated user."
    }
  }

  response = $academic_tasks
}