// Get ai_insights record
query "ai_insights/{ai_insights_id}" verb=GET {
  api_group = "Auth"

  input {
    int ai_insights_id? filters=min:1
  }

  stack {
    db.get ai_insights {
      field_name = "id"
      field_value = $input.ai_insights_id
    } as $ai_insights
  
    precondition ($ai_insights != null) {
      error_type = "notfound"
      error = "Not Found."
    }
  }

  response = $ai_insights
}