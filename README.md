# FlowPilot

Uma plataforma de automação de processos para pequenas empresas transformarem tarefas repetitivas em fluxos rastreáveis.

> Projeto desenvolvido por mim durante minha formação em Engenharia de Software. O MVP usa dados locais para demonstrar o produto; nenhuma integração externa é executada.

## Problema

Muitas equipes ainda copiam dados entre sistemas, avisam pessoas manualmente e não conseguem descobrir por que uma tarefa ficou parada. O FlowPilot organiza gatilhos, etapas, tentativas e histórico em uma visão única.

## Funcionalidades do MVP

- painel de workflows ativos;
- indicadores de execuções, sucesso e tempo economizado;
- filtro e busca de automações;
- simulação de uma execução com etapas e tentativas;
- histórico recente de eventos;
- criação de uma automação de demonstração;
- estados de sucesso, atenção e pausa;
- layout responsivo.

## Como executar

Abra `index.html` no navegador. O projeto não exige instalação ou servidor.

Para executar os testes do motor de automação:

```bash
npm test
```

## Decisões técnicas

- A interface usa HTML, CSS e JavaScript puro para deixar o comportamento fácil de inspecionar.
- A lógica de execução fica em `model.js`, separada da apresentação.
- Os dados são simulados para o MVP e não fingem representar uma integração de produção.

## Próximos passos

- adicionar gatilhos por webhook e agendamento;
- persistir workflows em PostgreSQL;
- criar fila de execução com retries e dead-letter queue;
- adicionar autenticação, equipes e permissões;
- integrar e-mail, Slack e APIs externas;
- registrar auditoria e métricas em uma API.

