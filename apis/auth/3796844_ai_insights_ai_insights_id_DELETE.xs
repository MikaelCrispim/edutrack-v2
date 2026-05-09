// Delete ai_insights record.
query "ai_insights/{ai_insights_id}" verb=DELETE {
  api_group = "Auth"

  input {
    int ai_insights_id? filters=min:1
  }

  stack {
    db.del ai_insights {
      field_name = "id"
      field_value = $input.ai_insights_id
    }
  }

  response = null
}