
**Relatório de Testes de Módulo/Sistema**  
Responsabilidade do Testador

**Legenda**

**Teste** : Código ou identificação do Teste.  
**Descrição**: Descrição dos passos e detalhes do teste a ser executado.  
**Especificação**: Informações sobre a função testada e se ela de acordo com a especificação do caso de uso.  
**Resultado**: Resultado do teste, modificações sugeridas ou resultados do teste. No caso de erro ou problema na execução do teste descrever o erro em detalhes e adicionar print's das telas.

**AC001 – Login**

| Teste | Descrição | Especificação | Resultado |
| :---- | :---- | :---- | :---- |
| Teste 01: Obrigatoriedade do campo email | A1 \- Ao apertar o botão de login sem preencher o campo de email o usuário é informado da falta do mesmo e não consegue fazer o login | Especificação OK.	 | Passed. |		 
| Teste 02: Obrigatoriedade do campo senha | A2 - Ao apertar o botão de login sem preencher o campo de senha o usuário é informado da falta do mesmo e não consegue fazer o login  | Especificação OK.	 | Passed. |
| Teste 03: Validação email | A3 - Ao inserir um email inválido o usuário é informado do mesmo e não consegue efetuar o login | Especificação OK.	 | Passed. |
| Teste 04: Tentativa de fazer login com usuário inexistente | A4 - Ao tentar fazer login com um email e senha válidos porém inexistentes no banco do sistema, o usuário não foi informado de nenhuma irregularidade | É preciso adicionar uma mensagem para informar o usuário que seus dados não existem no banco	 | Denied. |
| Teste 05: Tentativa de fazer login com usuário existente porém com senha inválida | A5 - Ao tentar fazer login com um email válido porém senha inválida usuário não foi informado de nenhuma irregularidade | É preciso adicionar uma mensagem para informar o usuário que algum dos seus dados estão incorretos	 | Denied. |
| Teste 06: Editar usuário | A6 - É possível editar usuário clicando no botão existente  | Especificação OK.	 | Passed. |
| Teste 07: Excluir usuário | A7 - É possível excluir usuário clicando no botão existente  | Especificação OK.	 | Passed. |
| Teste 08: Cadastrar usuário | A8 - É possível cadastrar um novo usuário clicando no botão existente  | Especificação OK.	 | Passed. |
| Teste 09: Visualizar usuário | A9 - É possível visualizar os usuários  | Especificação OK.	 | Passed. |


**AC002 – Produto**

| Teste | Descrição | Especificação | Resultado |
| :---- | :---- | :---- | :---- |
| Teste 01: Cadastrar produto | A1 - Ao apertar o botão de login sem preencher o campo de email o usuário é informado da falta do mesmo e não consegue fazer o login | Especificação OK.	 | Passed. |
| Teste 02: Excluir produto | A2 - É possível excluir um produto ao clicar no botão existente.| Especificação OK.	  | Passed. |
| Teste 03: Editar produto | A3 - É possível editar um produto ao clicar no botão existente.| Especificação OK.	  | Passed. |
| Teste 04: Visualizar produto | A4 - É possível visualizar os produtos existentes.| Especificação OK.	  | Passed. |

**AC003 – Usuário**

| Teste | Descrição | Especificação | Resultado |
| :---- | :---- | :---- | :---- |
| Teste 01: Cadastrar usuário | B1 - Ao apertar o botão de cadastro sem preencher o campo de email, o usuário é informado da falta do mesmo e não consegue se cadastrar | Especificação OK. | Passed. |
| Teste 02: Excluir usuário | B2 - É possível excluir um usuário ao clicar no botão de exclusão existente. | Especificação OK. | Passed. |
| Teste 03: Editar usuário | B3 - É possível editar um usuário ao clicar no botão de edição existente. | Especificação OK. | Passed. |
| Teste 04: Visualizar usuário | B4 - É possível visualizar os usuários existentes. | Especificação OK. | Passed. |

**AC004 – Fornecedores**

| Teste | Descrição | Especificação | Resultado |
| :---- | :---- | :---- | :---- |
| Teste 01: Cadastrar fornecedor | C1 - Ao apertar o botão de cadastro sem preencher o campo de email, o usuário é informado da falta do mesmo e não consegue cadastrar o fornecedor. | Especificação OK. | Passed. |
| Teste 02: Excluir fornecedor | C2 - É possível excluir um fornecedor ao clicar no botão de exclusão existente. | Especificação OK. | Passed. |
| Teste 03: Editar fornecedor | C3 - É possível editar um fornecedor ao clicar no botão de edição existente. | Especificação OK. | Passed. |
| Teste 04: Visualizar fornecedor | C4 - É possível visualizar os fornecedores existentes. | Especificação OK. | Passed. |

**AC005 – Registrar entradas**

| Teste | Descrição | Especificação | Resultado |
| :---- | :---- | :---- | :---- |
| Teste 01: Registrar entrada de mercadoria | D1 - Ao registrar a entrada de uma mercadoria, são inseridos corretamente a data, o nome do produto e o CNPJ do fornecedor. | Especificação OK. | Passed. |

**AC006 – Registrar saídas**

| Teste | Descrição | Especificação | Resultado |
| :---- | :---- | :---- | :---- |
| Teste 01: Registrar saída de mercadoria | E1 - Ao registrar a saída de uma mercadoria, são inseridos corretamente a data, o nome do produto e o CNPJ do fornecedor. | Especificação OK. | Passed. |













**Relatório de Bugs e Providências**  
Responsabilidade do Gerente

| Teste | Providência | Tarefas/Tipo |
| :---- | :---- | :---- |
| AC001 Fazer login com usuário inexistente | Realizar a implementação de uma mensagem de erro. | Tarefa: Criar mensagem de erro . |
| AC001 Erro de dados ao fazer login | Realizar a implementação de uma mensagem de erro ao tentar fazer login e identificar que algum dos dados está incorreto. | Tarefa: Criar mensagem de erro . |

