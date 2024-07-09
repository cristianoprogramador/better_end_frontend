export const questions_pt = [
  {
    id: 1,
    question: "Os seus dados possuem uma estrutura fixa e bem definida?",
    options: [
      { answer: "Sim", result: "SQL" },
      { answer: "Não", result: "NoSQL" },
    ],
  },
  {
    id: 2,
    question: "Os dados possuem muitos relacionamentos complexos?",
    options: [
      { answer: "Sim", result: "SQL" },
      { answer: "Não", result: "NoSQL" },
    ],
  },
  {
    id: 3,
    question: "Qual é a prioridade de escalabilidade para o seu projeto?",
    options: [
      { answer: "Vertical (escala em um único servidor)", result: "SQL" },
      { answer: "Horizontal (adicionar mais servidores)", result: "NoSQL" },
    ],
  },
  {
    id: 4,
    question:
      "A consistência imediata dos dados é crucial para o seu aplicativo?",
    options: [
      { answer: "Sim", result: "SQL" },
      { answer: "Não", result: "NoSQL" },
    ],
  },
  {
    id: 5,
    question:
      "O seu aplicativo requer transações complexas (ACID - Atomicidade, Consistência, Isolamento, Durabilidade)?",
    options: [
      { answer: "Sim", result: "SQL" },
      { answer: "Não", result: "NoSQL" },
    ],
  },
  {
    id: 6,
    question: "O seu aplicativo realiza muitas consultas complexas e joins?",
    options: [
      { answer: "Sim", result: "SQL" },
      { answer: "Não", result: "NoSQL" },
    ],
  },
  {
    id: 7,
    question: "O schema dos seus dados pode mudar com frequência?",
    options: [
      { answer: "Sim", result: "NoSQL" },
      { answer: "Não", result: "SQL" },
    ],
  },
  {
    id: 8,
    question:
      "O seu aplicativo precisa lidar com grandes volumes de dados não estruturados ou semi-estruturados?",
    options: [
      { answer: "Sim", result: "NoSQL" },
      { answer: "Não", result: "SQL" },
    ],
  },
  {
    id: 9,
    question: "Que tipos de dados o seu aplicativo vai armazenar?",
    options: [
      { answer: "Dados tabulares e estruturados", result: "SQL" },
      {
        answer: "Documentos, chave-valor, gráficos, dados em coluna",
        result: "NoSQL",
      },
    ],
  },
  {
    id: 10,
    question: "Você precisa de análises complexas e relatórios avançados?",
    options: [
      { answer: "Sim", result: "SQL" },
      { answer: "Não", result: "NoSQL" },
    ],
  },
  {
    id: 11,
    question:
      "A latência baixa é um requisito essencial para o seu aplicativo?",
    options: [
      { answer: "Sim", result: "NoSQL" },
      { answer: "Não", result: "SQL" },
    ],
  },
  {
    id: 12,
    question:
      "O seu aplicativo realiza mais operações de leitura ou de escrita?",
    options: [
      { answer: "Mais leituras", result: "SQL" },
      { answer: "Mais escritas", result: "NoSQL" },
    ],
  },
  {
    id: 13,
    question:
      "A sua aplicação precisa continuar funcionando mesmo com a falha de partes da rede?",
    options: [
      { answer: "Sim", result: "NoSQL" },
      { answer: "Não", result: "SQL" },
    ],
  },
  {
    id: 14,
    question:
      "Qual é a prioridade em termos de facilidade de uso e configuração?",
    options: [
      { answer: "Alta prioridade", result: "SQL" },
      { answer: "Menor prioridade", result: "NoSQL" },
    ],
  },
  {
    id: 15,
    question:
      "O seu projeto requer integração com várias ferramentas de terceiros?",
    options: [
      { answer: "Sim", result: "SQL" },
      { answer: "Não", result: "NoSQL" },
    ],
  },
  {
    id: 16,
    question:
      "Os seus dados se enquadram melhor em um modelo relacional ou em um modelo flexível de documentos/chave-valor/coluna?",
    options: [
      { answer: "Relacional", result: "SQL" },
      { answer: "Flexível", result: "NoSQL" },
    ],
  },
  {
    id: 17,
    question: "A recuperação de dados precisa ser rápida e frequente?",
    options: [
      { answer: "Sim", result: "NoSQL" },
      { answer: "Não", result: "SQL" },
    ],
  },
  {
    id: 18,
    question:
      "Qual é a complexidade do ambiente em que o banco de dados será implementado?",
    options: [
      { answer: "Menos complexo", result: "SQL" },
      { answer: "Mais complexo", result: "NoSQL" },
    ],
  },
  {
    id: 19,
    question: "Qual é a sua prioridade em relação ao custo do banco de dados?",
    options: [
      { answer: "Baixo custo", result: "NoSQL" },
      { answer: "Não é um problema", result: "SQL" },
    ],
  },
  {
    id: 20,
    question:
      "O seu projeto precisa estar em conformidade com regulamentações rigorosas e auditorias frequentes?",
    options: [
      { answer: "Sim", result: "SQL" },
      { answer: "Não", result: "NoSQL" },
    ],
  },
];
