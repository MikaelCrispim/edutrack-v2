// Delete subjects record.
query "subjects/{subjects_id}" verb=DELETE {
  api_group = "Auth"
  auth = "user"

  input {
    int subjects_id? filters=min:1
  }

  stack {
    // Verify the subject exists and belongs to the authenticated user
    db.query subjects {
      where = $db.subjects.id == $input.subjects_id && $db.subjects.user_id == $auth.id
      return = {type: "single"}
    } as $subject
  
    // Verify subject exists and belongs to authenticated user
    precondition ($subject != null) {
      error_type = "accessdenied"
      error = "Subject not found or you don't have permission to delete it."
    }
  
    // Delete the subject
    db.del subjects {
      field_name = "id"
      field_value = $input.subjects_id
    }
  }

  response = null
}