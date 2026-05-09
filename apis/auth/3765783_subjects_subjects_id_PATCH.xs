// Edit subjects record
query "subjects/{subjects_id}" verb=PATCH {
  api_group = "Auth"
  auth = "user"

  input {
    int subjects_id? filters=min:1
    text name? filters=trim
    text professor? filters=trim
    int course_load?
    text description? filters=trim
    timestamp? start_date?
  }

  stack {
    // First, get the current subject to verify ownership
    db.get subjects {
      field_name = "id"
      field_value = $input.subjects_id
    } as $current_subject
  
    precondition ($current_subject != null) {
      error_type = "notfound"
      error = "Subject not found."
    }
  
    precondition ($current_subject.user_id == $auth.id) {
      error_type = "accessdenied"
      error = "Access denied. You do not own this subject."
    }
  
    util.get_raw_input {
      encoding = "json"
      exclude_middleware = false
    } as $raw_input
  
    db.patch subjects {
      field_name = "id"
      field_value = $input.subjects_id
      data = `$input|pick:($raw_input|keys)`
    } as $subjects
  }

  response = $subjects
}