query generate_insights verb=POST {
  api_group = "Auth"
  auth = "user"

  input {
  }

  stack {
    var $gemini_key {
      value = $env.GEMINI_API_KEY
    }
  
    precondition (($gemini_key|strlen) > 0) {
      error_type = "inputerror"
      error = "Gemini API key not configured"
    }
  
    db.query subjects {
      where = $db.subjects.user_id == $auth.id
      return = {type: "list"}
    } as $subjects
  
    db.query academic_tasks {
      where = $db.academic_tasks.user_id == $auth.id
      return = {type: "list"}
    } as $tasks
  
    var $subjects_text {
      value = "Nenhuma matéria encontrada"
    }
  
    conditional {
      if (($subjects|count) > 0) {
        var $subjects_text {
          value = $subjects|json_encode
        }
      }
    }
  
    var $tasks_text {
      value = "Nenhuma tarefa encontrada"
    }
  
    conditional {
      if (($tasks|count) > 0) {
        var $tasks_text {
          value = $tasks|json_encode
        }
      }
    }
  
    var $prompt_text {
      value = "Gere insights para um estudante com as seguintes matérias: \"" ~ $subjects_text ~ "\". As tarefas dele são: \"" ~ $tasks_text ~ "\". Retorne SOMENTE um array JSON válido com strings de insights, sem nenhum texto adicional, sem blocos de código markdown, sem explicações. Exemplo de formato esperado: [\"Insight 1\", \"Insight 2\"]"
    }
  
    var $request_body {
      value = {
        contents        : [{parts: [{text: $prompt_text}]}]
        generationConfig: {responseMimeType: "application/json"}
      }
    }
  
    api.request {
      url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" ~ $gemini_key
      method = "POST"
      params = $request_body
      headers = []
        |push:"Content-Type: application/json"
      timeout = 60
    } as $api_response
  
    var $api_response_retry {
      value = null
    }
  
    conditional {
      if ($api_response && $api_response.status == 429) {
        api.request {
          url = "https://httpbin.org/delay/2"
          method = "GET"
        } as $delay_response
      
        api.request {
          url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" ~ $gemini_key
          method = "POST"
          params = $request_body
          headers = []
            |push:"Content-Type: application/json"
          timeout = 60
        } as $api_response_retry
      
        conditional {
          if ($api_response_retry) {
            var $api_response {
              value = $api_response_retry
            }
          }
        }
      }
    }
  
    conditional {
      if ($api_response && $api_response.status == 429) {
        var $retry_after {
          value = ""
        }
      
        conditional {
          if ($api_response.headers && $api_response.headers["Retry-After"]) {
            var $retry_after {
              value = " Tente novamente em " ~ $api_response.headers["Retry-After"] ~ " segundos."
            }
          }
        }
      
        throw {
          name = "rate_limit"
          value = "Quota excedida no serviço de IA. Tente novamente mais tarde." ~ $retry_after
        }
      }
    }
  
    var $resp_body {
      value = null
    }
  
    conditional {
      if ($api_response && $api_response.body) {
        var $resp_body {
          value = $api_response.body|json_decode
        }
      }
    }
  
    conditional {
      if (!$resp_body) {
        throw {
          name = "api_error"
          value = "Resposta vazia ou inválida da API Gemini"
        }
      }
    }
  
    conditional {
      if ($resp_body && $resp_body.error) {
        var $err_code {
          value = $resp_body.error.code
        }
      
        var $err_status {
          value = $resp_body.error.status
        }
      
        conditional {
          if ($err_code == 429 || $err_status == "RESOURCE_EXHAUSTED") {
            var $err_msg {
              value = $resp_body.error.message
            }
          
            conditional {
              if (!$err_msg || ($err_msg|strlen) == 0) {
                var $err_msg {
                  value = "Quota excedida no serviço de IA."
                }
              }
            }
          
            throw {
              name = "rate_limit"
              value = $err_msg
            }
          }
        
          else {
            throw {
              name = "api_error"
              value = "Erro retornado pela API Gemini: " ~ $resp_body.error.message
            }
          }
        }
      }
    }
  
    var $candidates {
      value = null
    }
  
    conditional {
      if ($resp_body && $resp_body.candidates && ($resp_body.candidates|count) > 0) {
        var $candidates {
          value = $resp_body.candidates
        }
      }
    }
  
    conditional {
      if (!$candidates) {
        throw {
          name = "api_error"
          value = "Nenhum candidate retornado pela API Gemini"
        }
      }
    }
  
    var $candidate {
      value = $candidates|first
    }
  
    conditional {
      if (!$candidate) {
        throw {
          name = "api_error"
          value = "Candidate vazio na resposta Gemini"
        }
      }
    }
  
    conditional {
      if (!$candidate.content) {
        throw {
          name = "api_error"
          value = "Campo content ausente no candidate Gemini"
        }
      }
    }
  
    conditional {
      if (!$candidate.content.parts || ($candidate.content.parts|count) == 0) {
        throw {
          name = "api_error"
          value = "Campo parts ausente no candidate Gemini"
        }
      }
    }
  
    var $first_part {
      value = $candidate.content.parts|first
    }
  
    var $response_text {
      value = $first_part.text
    }
  
    var $clean_text {
      value = $response_text
        |regex_replace:"```json":""
        |regex_replace:"```":""
        |trim
    }
  
    var $insights_array {
      value = $clean_text|json_decode
    }
  
    conditional {
      if (!$insights_array || ($insights_array|count) == 0) {
        throw {
          name = "parse_error"
          value = "Não foi possível parsear o JSON retornado pelo modelo. Resposta recebida: " ~ $response_text
        }
      }
    }
  
    var $added_insights {
      value = []
    }
  
    foreach ($insights_array) {
      each as $item {
        conditional {
          if (($item|strlen) > 0) {
            db.add ai_insights {
              data = {user_id: $auth.id, created_at: now, text: $item}
            } as $insight
          
            array.push $added_insights {
              value = $insight
            }
          }
        }
      }
    }
  }

  response = {
    success : ($added_insights|count) > 0
    insights: $added_insights
    count   : $added_insights|count
  }
}