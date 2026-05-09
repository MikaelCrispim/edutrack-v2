import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

/**
 * Monta o contexto do estudante em texto para o prompt do Gemini.
 * @param {Array} subjects - Lista de disciplinas do Xano
 * @param {Object} tasksBySubject - Mapa { subjectId: [tasks] }
 */
function buildStudentContext(subjects, tasksBySubject) {
  if (!subjects || subjects.length === 0) {
    return 'O estudante ainda não possui disciplinas cadastradas.';
  }

  return subjects
    .map((subject) => {
      const tasks = tasksBySubject[subject.id] || [];
      const total = tasks.length;
      const done = tasks.filter((t) => t.status === 'concluida' || t.status === 'done' || t.status === 'completed').length;
      const pending = tasks.filter((t) => t.status !== 'concluida' && t.status !== 'done' && t.status !== 'completed');
      const overdue = pending.filter((t) => t.due_date && new Date(t.due_date) < new Date());

      return `
Disciplina: ${subject.name}
  - Carga horária: ${subject.workload || 'não informada'}h
  - Total de tarefas: ${total}
  - Tarefas concluídas: ${done}/${total} (${total > 0 ? Math.round((done / total) * 100) : 0}%)
  - Tarefas pendentes atrasadas: ${overdue.length}
  - Próximas tarefas: ${pending.slice(0, 3).map((t) => `"${t.title}" (${t.due_date ? new Date(t.due_date).toLocaleDateString('pt-BR') : 'sem prazo'})`).join(', ') || 'nenhuma'}
`.trim();
    })
    .join('\n\n');
}

/**
 * Gera insights educacionais personalizados via Gemini API.
 * @param {Array} subjects - Lista de disciplinas
 * @param {Object} tasksBySubject - Mapa { subjectId: [tasks] }
 * @returns {Promise<string[]>} Array de strings com os insights gerados
 */
export async function generateInsightsWithGemini(subjects, tasksBySubject) {
  if (!API_KEY) {
    throw new Error(
      'VITE_GEMINI_API_KEY não configurada. Adicione a variável no arquivo frontend/.env.local'
    );
  }

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const studentContext = buildStudentContext(subjects, tasksBySubject);

  const prompt = `Você é um assistente educacional inteligente especializado em ajudar estudantes universitários e técnicos a melhorarem seu desempenho acadêmico.

Analise os dados acadêmicos abaixo e gere exatamente 2 insights personalizados, práticos e motivadores em português.

DADOS DO ESTUDANTE:
${studentContext}

REGRAS OBRIGATÓRIAS:
1. Cada insight deve ser específico, acionável e baseado nos dados fornecidos
2. Priorize: tarefas atrasadas, disciplinas com baixo progresso e oportunidades de melhoria
3. Use linguagem encorajadora e direta
4. Responda SOMENTE com um array JSON de strings, sem markdown, sem texto extra antes ou depois
5. Formato exato esperado: ["Insight 1 aqui.", "Insight 2 aqui.", "Insight 3 aqui."]`;

  const result = await model.generateContent(prompt);
  const responseText = result.response.text().trim();

  // Tenta extrair o array JSON da resposta
  try {
    // Remove possíveis blocos de código markdown (```json ... ```)
    const cleaned = responseText.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim();
    const parsed = JSON.parse(cleaned);

    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.map(String);
    }
    // Se retornou objeto, tenta extrair valores
    if (typeof parsed === 'object') {
      return Object.values(parsed).map(String);
    }
  } catch {
    // Se não conseguiu parsear JSON, retorna o texto como um único insight
    console.warn('Gemini retornou resposta fora do formato JSON esperado. Usando como insight único.');
    return [responseText];
  }

  return [responseText];
}
