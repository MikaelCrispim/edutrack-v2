// Add academic_tasks record
query academic_tasks verb=POST {
  api_group = "Auth"
  auth = "user"

  input {
    // Title of the academic task
    text title filters=trim
  
    // Description of the academic task
    text description? filters=trim
  
    // Due date for the academic task
    timestamp due_date?
  
    // Status of the academic task (default: pending)
    text status?=pending filters=trim
  
    // ID of the subject this task belongs to
    int subject_id? {
      table = "subjects"
    }
  }

  stack {
    db.add academic_tasks {
      data = {
        title      : $input.title
        description: $input.description
        due_date   : $input.due_date
        status     : $input.status
        subject_id : $input.subject_id
        user_id    : $auth.id
        created_at : now
      }
    } as $academic_tasks
  }

  response = $academic_tasks
}