// Get subjects record
query "subjects/{subjects_id}" verb=GET {
  api_group = "Auth"
  auth = "user"

  input {
    int subjects_id? filters=min:1
  }

  stack {
    db.get subjects {
      field_name = "id"
      field_value = $input.subjects_id
    } as $subjects
  
    precondition ($subjects != null) {
      error_type = "notfound"
      error = "Not Found."
    }
  
    precondition ($subjects.user_id == $auth.id) {
      error_type = "accessdenied"
      error = "Access denied. You do not own this subject."
    }
  }

  response = $subjects
}