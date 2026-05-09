// Edit ai_insights record
query "ai_insights/{ai_insights_id}" verb=PATCH {
  api_group = "Auth"

  input {
    int ai_insights_id? filters=min:1
    dblink {
      table = "ai_insights"
    }
  }

  stack {
    util.get_raw_input {
      encoding = "json"
      exclude_middleware = false
    } as $raw_input
  
    db.patch ai_insights {
      field_name = "id"
      field_value = $input.ai_insights_id
      data = `$input|pick:($raw_input|keys)`|filter_null|filter_empty_text
    } as $ai_insights
  }

  response = $ai_insights
}