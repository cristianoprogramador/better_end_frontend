export const questions = [
  {
    id: 1,
    question: "Do your data have a fixed and well-defined structure?",
    options: [
      { answer: "Yes", result: "SQL" },
      { answer: "No", result: "NoSQL" },
    ],
  },
  {
    id: 2,
    question: "Do the data have many complex relationships?",
    options: [
      { answer: "Yes", result: "SQL" },
      { answer: "No", result: "NoSQL" },
    ],
  },
  {
    id: 3,
    question: "What is the scalability priority for your project?",
    options: [
      { answer: "Vertical (scaling on a single server)", result: "SQL" },
      { answer: "Horizontal (adding more servers)", result: "NoSQL" },
    ],
  },
  {
    id: 4,
    question: "Is immediate data consistency crucial for your application?",
    options: [
      { answer: "Yes", result: "SQL" },
      { answer: "No", result: "NoSQL" },
    ],
  },
  {
    id: 5,
    question:
      "Does your application require complex transactions (ACID - Atomicity, Consistency, Isolation, Durability)?",
    options: [
      { answer: "Yes", result: "SQL" },
      { answer: "No", result: "NoSQL" },
    ],
  },
  {
    id: 6,
    question: "Does your application perform many complex queries and joins?",
    options: [
      { answer: "Yes", result: "SQL" },
      { answer: "No", result: "NoSQL" },
    ],
  },
  {
    id: 7,
    question: "Can the schema of your data change frequently?",
    options: [
      { answer: "Yes", result: "NoSQL" },
      { answer: "No", result: "SQL" },
    ],
  },
  {
    id: 8,
    question:
      "Does your application need to handle large volumes of unstructured or semi-structured data?",
    options: [
      { answer: "Yes", result: "NoSQL" },
      { answer: "No", result: "SQL" },
    ],
  },
  {
    id: 9,
    question: "What types of data will your application store?",
    options: [
      { answer: "Tabular and structured data", result: "SQL" },
      {
        answer: "Documents, key-value, graphs, columnar data",
        result: "NoSQL",
      },
    ],
  },
  {
    id: 10,
    question: "Do you need complex analytics and advanced reporting?",
    options: [
      { answer: "Yes", result: "SQL" },
      { answer: "No", result: "NoSQL" },
    ],
  },
  {
    id: 11,
    question: "Is low latency an essential requirement for your application?",
    options: [
      { answer: "Yes", result: "NoSQL" },
      { answer: "No", result: "SQL" },
    ],
  },
  {
    id: 12,
    question: "Does your application perform more read or write operations?",
    options: [
      { answer: "More reads", result: "SQL" },
      { answer: "More writes", result: "NoSQL" },
    ],
  },
  {
    id: 13,
    question:
      "Does your application need to continue functioning even with partial network failures?",
    options: [
      { answer: "Yes", result: "NoSQL" },
      { answer: "No", result: "SQL" },
    ],
  },
  {
    id: 14,
    question: "What is the priority in terms of ease of use and configuration?",
    options: [
      { answer: "High priority", result: "SQL" },
      { answer: "Lower priority", result: "NoSQL" },
    ],
  },
  {
    id: 15,
    question:
      "Does your project require integration with various third-party tools?",
    options: [
      { answer: "Yes", result: "SQL" },
      { answer: "No", result: "NoSQL" },
    ],
  },
  {
    id: 16,
    question:
      "Do your data fit better into a relational model or a flexible document/key-value/column model?",
    options: [
      { answer: "Relational", result: "SQL" },
      { answer: "Flexible", result: "NoSQL" },
    ],
  },
  {
    id: 17,
    question: "Does data retrieval need to be fast and frequent?",
    options: [
      { answer: "Yes", result: "NoSQL" },
      { answer: "No", result: "SQL" },
    ],
  },
  {
    id: 18,
    question:
      "What is the complexity of the environment where the database will be implemented?",
    options: [
      { answer: "Less complex", result: "SQL" },
      { answer: "More complex", result: "NoSQL" },
    ],
  },
  {
    id: 19,
    question: "What is your priority in relation to the database cost?",
    options: [
      { answer: "Low cost", result: "NoSQL" },
      { answer: "Not a problem", result: "SQL" },
    ],
  },
  {
    id: 20,
    question:
      "Does your project need to comply with strict regulations and frequent audits?",
    options: [
      { answer: "Yes", result: "SQL" },
      { answer: "No", result: "NoSQL" },
    ],
  },
];
