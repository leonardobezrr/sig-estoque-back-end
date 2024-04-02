
# Documento Lista de User Stories

Documento construído a partido do **HistoriasDeUsuario** que pode ser encontrado no
link: https://docs.google.com/document/d/15KgOK44Be65ad9GpLHBKG5SfhE8z3pzZD6Pqz2Wzu9g/edit
## Descrição

Este documento descreve os User Stories criados a partir da Lista de Requisitos no [Documento 001 - Documento de Visão](doc-visao.md). Este documento também pode ser adaptado para descrever Casos de Uso. Modelo de documento baseado nas características do processo easYProcess (YP).

## Histórico de revisões

| Data       | Versão  | Descrição                          | Autor                          |
| :--------- | :-----: | :--------------------------------: | :----------------------------- |
| 05/12/2023 | 0.1  | Documento inicial  | Todos |
| 29/02/2024 | 0.2  | Criação do doc-visao  | Luís |
| 01/03/2024 | 0.2  | Criação do doc-userstories  | Luís |
| 06/03/2024 | 0.2  | Correção do doc-visao  | Leonardo |
| 09/03/2024 | 0.2  | Criação do doc-modelos  | Luís |
| 09/03/2024 | 0.2  | Criação do doc-modelos  | Luís |
| 10/03/2024 | 0.2  | Correção do doc-modelos  | Leonardo |
| ...        | ...     | ...                                | ...     |
|  |    | Documento completo com o detalhamento de todos os User Stories |      |
|  |    | Adição das informações da equipe: Analista, Desenvolvedor, Revisor e Testador. |  |



### User Story US01 - Gerenciar usuários

|               |                                                                |
| ------------- | :------------------------------------------------------------- |
| **Descrição** | Esse processo é responsável por fazer cadastro, exclusão, edição e visualização dos funcionários cadastrados no sistema. As informações constantes neste cadastro são: nome, data de nascimento, endereço, telefone, CPF e RG. |

| **Requisitos envolvidos** |                                                    |
| ------------- | :------------------------------------------------------------- |
| US01.RF01          | Cadastrar usuários |
| US01.RF02          | Excluir usuários |
| US01.RF03          | Editar usuários |
| US01.RF04          | Visualizar usuários |

|                           |                                     |
| ------------------------- | ----------------------------------- | 
| **Prioridade**            | Essencial                           | 
| **Estimativa**            | 5 h                                 | 
| **Tempo Gasto (real):**   | 2 h                                 | 
| **Tamanho Funcional**     | 8 PF                                | 
| **Analista**              | -                             | 
| **Desenvolvedor**         | Gabriel, Breno e Ricardo                                  | 
| **Revisor**               | -                               | 
| **Testador**              | -                                | 



| Testes de Aceitação (TA) |  |
| ----------- | --------- |
| **Código**     | **Descrição** |
| **TA01.01** |  Inserção de dados válidos e corretos para teste de um retorno positivo|
| **TA01.02** |  Inserção de dados inválidos e/ou incorretos para teste de um retorno negativo|

### User Story US02 - Gerenciar produto

|               |                                                                |
| ------------- | :------------------------------------------------------------- |
| **Descrição** | Esse processo é responsável por fazer cadastro, exclusão, edição e visualização dos produtos cadastrados no sistema. As informações constantes neste cadastro são: Nome, código de barras e o CNPJ do fornecedor |

| **Requisitos envolvidos** |                                                    |
| ------------- | :------------------------------------------------------------- |
| US02.RF05          | Cadastrar produtos |
| US02.RF06          | Excluir produtos |
| US02.RF07          | Editar produtos |
| US02.RF08          | Visualizar produtos |

|                           |                                     |
| ------------------------- | ----------------------------------- | 
| **Prioridade**            | Essencial                           | 
| **Estimativa**            | 8 h                                 | 
| **Tempo Gasto (real):**   | 10 h                                | 
| **Tamanho Funcional**     | 7 PF                                | 
| **Analista**              | -                             | 
| **Desenvolvedor**         | Gabriel, Breno e Ricardo                                  | 
| **Revisor**               | -                               | 
| **Testador**              | -                                | 



| Testes de Aceitação (TA) |  |
| ----------- | --------- |
| **Código**     | **Descrição** |
| **TA01.01** |  Inserção de dados válidos e corretos para teste de um retorno positivo|
| **TA01.02** |  Inserção de dados inválidos e/ou incorretos para teste de um retorno negativo|

### User Story US03 - Gerenciar fornecedor

|               |                                                                |
| ------------- | :------------------------------------------------------------- |
| **Descrição** | Esse processo é responsável por fazer cadastro, exclusão, edição e visualização dos fornecedores cadastrados no sistema. As informações constantes neste cadastro são: Razão social, nome fantasia, CNPJ, endereço, telefone e e-mail |

| **Requisitos envolvidos** |                                                    |
| ------------- | :------------------------------------------------------------- |
| US03.RF09          | Cadastrar fornecedores |
| US03.RF10          | Excluir fornecedores |
| US03.RF11          | Editar fornecedores |
| US03.RF12          | Visualizar fornecedores |


|                           |                                     |
| ------------------------- | ----------------------------------- | 
| **Prioridade**            | Essencial                           | 
| **Estimativa**            | 8 h                                 | 
| **Tempo Gasto (real):**   | 10 h                                | 
| **Tamanho Funcional**     | 7 PF                                | 
| **Analista**              | -                             | 
| **Desenvolvedor**         | Gabriel, Breno e Ricardo                                  | 
| **Revisor**               | -                               | 
| **Testador**              | -                                | 


| Testes de Aceitação (TA) |  |
| ----------- | --------- |
| **Código**     | **Descrição** |
| **TA01.01** |  Inserção de dados válidos e corretos para teste de um retorno positivo|
| **TA01.02** |  Inserção de dados inválidos e/ou incorretos para teste de um retorno negativo|

### User Story US04 - Gerar log

|               |                                                                |
| ------------- | :------------------------------------------------------------- |
| **Descrição** | Este caso de uso é capaz de gerar um histórico de todas as informações encontradas nos arquivos gerados pelos casos de uso Gerenciar Fornecedores, Gerenciar Produtos e Registrar Entradas. As informações constantes neste relatório são: Data, mudanças realizadas no Gerenciar Produtos, mudanças no Gerenciar Fornecedores e Registrar Entradas |

| **Requisitos envolvidos** |                                                    |
| ------------- | :------------------------------------------------------------- |
| US04.RF05          | Cadastrar produtos |
| US04.RF06          | Excluir produtos |
| US04.RF07          | Editar produtos |
| US04.RF08          | Visualizar produtos |
| US04.RF09          | Cadastrar fornecedores |
| US04.RF10          | Excluir fornecedores |
| US04.RF11          | Editar fornecedores |
| US04.RF12          | Visualizar fornecedores |
| US04.RF014          | Registrar Nota Fiscal Eletrônica |
| US04.RF015          | Gerar Log |

|                           |                                     |
| ------------------------- | ----------------------------------- | 
| **Prioridade**            | Essencial                           | 
| **Estimativa**            | 8 h                                 | 
| **Tempo Gasto (real):**   | 10 h                                | 
| **Tamanho Funcional**     | 7 PF                                | 
| **Analista**              | -                             | 
| **Desenvolvedor**         | Gabriel, Breno e Ricardo                                  | 
| **Revisor**               | -                               | 
| **Testador**              | -                                | 



| Testes de Aceitação (TA) |  |
| ----------- | --------- |
| **Código**     | **Descrição** |
| **TA01.01** |  Inserção de dados válidos e corretos para teste de um retorno positivo|
| **TA01.02** |  Inserção de dados inválidos e/ou incorretos para teste de um retorno negativo|

### User Story US05 - Login

|               |                                                                |
| ------------- | :------------------------------------------------------------- |
| **Descrição** | Permite que funcionários e gerentes acessem o sistema para fazer qualquer tipo de alteração que for necessária. As informações constantes são login e senha |

| **Requisitos envolvidos** |                                                    |
| ------------- | :------------------------------------------------------------- |
| US05.RF01          | Cadastrar usuários |
| US05.RF02          | Excluir usuários |
| US05.RF03          | Editar usuários |
| US05.RF04          | Visualizar usuários |
| US05.RF05          | Cadastrar produtos |
| US05.RF06          | Excluir produtos |
| US05.RF07          | Editar produtos |
| US05.RF08          | Visualizar produtos |
| US05.RF013          | Login |

|                           |                                     |
| ------------------------- | ----------------------------------- | 
| **Prioridade**            | Essencial                           | 
| **Estimativa**            | 8 h                                 | 
| **Tempo Gasto (real):**   | 10 h                                | 
| **Tamanho Funcional**     | 7 PF                                | 
| **Analista**              | -                             | 
| **Desenvolvedor**         | Gabriel, Breno e Ricardo                                  | 
| **Revisor**               | -                               | 
| **Testador**              | -                                | 



| Testes de Aceitação (TA) |  |
| ----------- | --------- |
| **Código**     | **Descrição** |
| **TA01.01** |  Inserção de dados válidos e corretos para teste de um retorno positivo|
| **TA01.02** |  Inserção de dados inválidos e/ou incorretos para teste de um retorno negativo|

### User Story US06 - Registrar entradas

|               |                                                                |
| ------------- | :------------------------------------------------------------- |
| **Descrição** | Faz um registro de todas as vezes que entra alguma mercadoria no sistema. As informações constantes neste registro são: data, nome do produto e CNPJ do fornecedor |

| **Requisitos envolvidos** |                                                    |
| ------------- | :------------------------------------------------------------- |
| US06.RF014         | Registrar Nota Fiscal Eletrônica  |


|                           |                                     |
| ------------------------- | ----------------------------------- | 
| **Prioridade**            | Essencial                           | 
| **Estimativa**            | 8 h                                 | 
| **Tempo Gasto (real):**   | 10 h                                | 
| **Tamanho Funcional**     | 7 PF                                | 
| **Analista**              | -                             | 
| **Desenvolvedor**         | Gabriel, Breno e Ricardo                                  | 
| **Revisor**               | -                               | 
| **Testador**              | -                                | 



| Testes de Aceitação (TA) |  |
| ----------- | --------- |
| **Código**     | **Descrição** |
| **TA01.01** |  Inserção de dados válidos e corretos para teste de um retorno positivo|
| **TA01.02** |  Inserção de dados inválidos e/ou incorretos para teste de um retorno negativo|

### User Story US07 - Registrar saídas (venda)

|               |                                                                |
| ------------- | :------------------------------------------------------------- |
| **Descrição** | Responsável por realizar as saídas/vendas de mercadorias, logo em seguida será feito um registro das mesmas. As informações constantes neste registro são: data, nome do produto e CNPJ do fornecedor |

| **Requisitos envolvidos** |                                                    |
| ------------- | :------------------------------------------------------------- |
| US07.RF014         | Registrar Nota Fiscal Eletrônica  |


|                           |                                     |
| ------------------------- | ----------------------------------- | 
| **Prioridade**            | Essencial                           | 
| **Estimativa**            | 8 h                                 | 
| **Tempo Gasto (real):**   | 10 h                                | 
| **Tamanho Funcional**     | 7 PF                                | 
| **Analista**              | -                             | 
| **Desenvolvedor**         | Gabriel, Breno e Ricardo                                  | 
| **Revisor**               | -                               | 
| **Testador**              | -                                | 



| Testes de Aceitação (TA) |  |
| ----------- | --------- |
| **Código**     | **Descrição** |
| **TA01.01** |  Inserção de dados válidos e corretos para teste de um retorno positivo|
| **TA01.02** |  Inserção de dados inválidos e/ou incorretos para teste de um retorno negativo|

### User Story US08 - Registrar Compras

|               |                                                                |
| ------------- | :------------------------------------------------------------- |
| **Descrição** | Responsável por registrar todas as compras feitas pelo gerente e após a confirmação de recebimento dos itens, o funcionário dará entrada dos mesmos no sistema. As informações constantes neste registro são: data, nome do produto e CNPJ do fornecedor, preço e quantidade |

| **Requisitos envolvidos** |                                                    |
| ------------- | :------------------------------------------------------------- |
| US08.RF014         | Registrar Nota Fiscal Eletrônica  |


|                           |                                     |
| ------------------------- | ----------------------------------- | 
| **Prioridade**            | Essencial                           | 
| **Estimativa**            | 8 h                                 | 
| **Tempo Gasto (real):**   | 10 h                                | 
| **Tamanho Funcional**     | 7 PF                                | 
| **Analista**              | -                             | 
| **Desenvolvedor**         | Gabriel, Breno e Ricardo                                  | 
| **Revisor**               | -                               | 
| **Testador**              | -                                | 



| Testes de Aceitação (TA) |  |
| ----------- | --------- |
| **Código**     | **Descrição** |
| **TA01.01** |  Inserção de dados válidos e corretos para teste de um retorno positivo|
| **TA01.02** |  Inserção de dados inválidos e/ou incorretos para teste de um retorno negativo|