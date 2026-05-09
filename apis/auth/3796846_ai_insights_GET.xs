// Query all ai_insights records
query ai_insights verb=GET {
  api_group = "Auth"
  auth = "user"

  input {
  }

  stack {
    db.query ai_insights {
      where = $db.ai_insights.user_id == $auth.id
      return = {type: "list"}
    } as $ai_insights
  }

  response = {insights: $ai_insights}
}