**Relatório de Testes de Módulo/Sistema**  
Responsabilidade do Testador

**Legenda**

**Teste** : Código ou identificação do Teste.  
**Descrição**: Descrição dos passos e detalhes do teste a ser executado.  
**Especificação**: Informações sobre a função testada e se ela de acordo com a especificação do caso de uso.  
**Resultado**: Resultado do teste, modificações sugeridas ou resultados do teste. No caso de erro ou problema na execução do teste descrever o erro em detalhes e adicionar print's das telas.

**US003 – Manter Fornecedor**

| Teste | Descrição | Especificação | Resultado |
| :---- | :---- | :---- | :---- |
| Teste 01: Incluir Fornecedor | A1 \- Incluir Fornecedor		 A1.1. cria-se um fornecedor; 			 A1.2. As informações são inseridas; 			 A1.3. O sistema salva os dados; 			 A1.4. O sistema verifica se o id criado foi válido; A1.5. Fim do fluxo. | Especificação OK.	 | Passed. |		 |
| Teste 02: Buscar todos os fornecedores | A3 –Buscar todos os fornecedores 	 A3.1 \- Dois fornecedores são criados 			 A3.2 \- Um método é chamado para obter todos os fornecedores; A3.3 –É verificado se o retorno foi 2; 	 A3.3 \- É verificado o nome dos fornecedores cadastrados; 	 			 A3.6 – Fim do fluxo. (P2) | Especificação OK.	 | Passed. |
| Teste 03: Buscar fornecedores por nome da empresa | A2 – Buscar fornecedores por nome da empresa 			 A2.1 \-Três fornecedores são criados; 			 A2.2 \- Um método é chamado para obter todos os fornecedores com o nome da empresa `Company 1`; 			 A2.3 \-É verificado se o retorno foi 2; 			 A2.4 \- É verificado se os fornecedores possuem o campo company\_name correspondente; 	 			 A2.6 \- Fim do fluxo. (P2) | Especificação OK.	 | Passed. |
| Teste 04: Buscar fornecedores por Id | A2 – Buscar fornecedores por Id 			 A2.1 \-Três fornecedores são criados; A2.2 \- Um método é chamado com o Id do fornecedor criado; 			 A2.3 \-O teste verifica se o fornecedor retornado tem o Id correto e as propriedades como esperado; 			 A2.4 \- Um método é chamado com um Id não cadastrado; A2.5 \-É verificado se o serviço lança um erro com a mensagem `Supplier not found`; 			 A2.6 \- Fim do fluxo. (P2)  | Especificação OK.	 | Passed. |

**US002 – Manter Produto**

| Teste | Descrição | Especificação | Resultado |
| :---- | :---- | :---- | :---- |
| Teste 01: Cadastrar Produto | A1 \- Cadastrar Produto 		 A1.1. Dois produtos são criados diretamente no repositório com dados específicos; 			 A1.2. O sistema salva os dados; 			 A1.3. O sistema verifica se o id criado foi válido; A1.4. Fim do fluxo. | Especificação OK.	 | Passed. |
| Teste 02: Buscar todos os produtos | A3 –Buscar todos os produtos 	 A3.1 \- Dois produtos são criados 			 A3.2 \- Um método é chamado para obter todos os produtos; A3.3 –É verificado se o retorno foi 2; 	 A3.3 \- É verificado o nome dos produtos cadastrados; 	 			 A3.6 – Fim do fluxo. (P2) | Especificação OK.	 | Passed. |
| Teste 03: Buscar produtos por Id | A2 – Buscar produto por Id 			 A2.1 Um produto é criado; A2.2 \- Um método é chamado com o Id do produto criado; 			 A2.3 \-O teste verifica se o produto retornado tem o Id correspondente ao criado; 			 A2.4 \- Um método é chamado com um Id não cadastrado; A2.5 \-É verificado se o serviço lança um erro `ResourceNotFoundError` indicando que o produto não foi encontrado; 			 A2.6 \- Fim do fluxo. (P2)  | Especificação OK.	 | Passed. |
| Teste 04: Desativar produto por Id | A2 – Buscar produto por Id 			 A2.1 Um produto é criado; A2.2 \- Um método é chamado com o Id do produto criado para desativá-lo; 			 A2.3 \-O teste verifica se o produto foi desativado e não é NULL; 			 A2.4 \- Um método é chamado com um Id não cadastrado; A2.5 \-É verificado se o serviço lança um erro `Product not found` indicando que o produto não foi encontrado; 			 A2.6 \- Fim do fluxo. (P2)  | Especificação OK.	 | Passed. |

**US001 – Manter Usuário**

| Teste | Descrição | Especificação | Resultado |
| :---- | :---- | :---- | :---- |
| Teste 01: Cadastrar Usuário | A1 \- Cadastrar Usuário 		 A1.1. Um usuário é criado diretamente no repositório com dados válidos; 			 A1.3. O serviço de autenticação é executado com o email e a senha correta; A1.4.O teste verifica se o Id do usuário retornado é válido. A1.5. É verificado se o serviço falha ao tentar autenticar com um email incorreto. A1.6. É verificado se o serviço falha ao tentar autenticar com uma senha incorreta. A1.7.O teste verifica se é lançada uma exceção do tipo `InvalidCredentialError para ambos os casos`. A1.8. Fim do fluxo. | Especificação OK.	 | Passed. |
| Teste 02: Obter perfil do usuário | A3 –Verificar se o serviço consegue recuperar o perfil de um usuário existente 	 A3.1 \- Um usuário é criado diretamente no repositório com dados válidos; 			 A3.2 \- O serviço de perfil de usuário é executado com o ID do usuário criado.; A3.3 –O teste verifica se o ID do usuário retornado é válido; 	 A3.4 \- O serviço de perfil de usuário é executado com um ID que não existe no repositório; A3.5 \- O teste verifica se é lançada uma exceção do tipo `ResourceNotFoundError`;	 			 A3.6 – Fim do fluxo. (P2) | Especificação OK.	 | Passed. |

**Relatório de Bugs e Providências**  
Responsabilidade do Gerente

| Teste | Providência | Tarefas/Tipo |
| :---- | :---- | :---- |
| US001 Manter Usuário | Realizar a implementação de mais testes. | Tarefa: Criar novos testes para alterar e buscar . |
| US004 Manter Gerente | Realizar a implementação de mais testes. | Tarefa: Criar novos testes para inserir, alterar e buscar . |