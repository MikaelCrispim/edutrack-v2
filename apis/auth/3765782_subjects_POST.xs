// Add subjects record
query subjects verb=POST {
  api_group = "Auth"
  auth = "user"

  input {
    text name? filters=trim
    text professor? filters=trim
    int course_load?
    text description? filters=trim
    timestamp? start_date?
    timestamp? end_date?
  }

  stack {
    db.add subjects {
      data = {
        name       : $input.name
        professor  : $input.professor
        course_load: $input.course_load
        description: $input.description
        start_date : $input.start_date
        end_date   : $input.end_date
        user_id    : $auth.id
      }
    } as $subjects
  }

  response = $subjects
}